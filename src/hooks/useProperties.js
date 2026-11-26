import { useEffect, useState } from 'react';
import { getProperty, listProperties } from '../lib/api';

// Small in-memory cache so moving between pages feels instant.
let cache = null;
let inflight = null;

export function invalidatePropertyCache() {
  cache = null;
}

export function useProperties() {
  const [state, setState] = useState({ items: cache || [], loading: !cache, error: null });
  useEffect(() => {
    let alive = true;
    if (!inflight) inflight = listProperties().finally(() => { inflight = null; });
    inflight
      .then((items) => {
        cache = items;
        if (alive) setState({ items, loading: false, error: null });
      })
      .catch((error) => alive && setState((s) => ({ ...s, loading: false, error })));
    return () => { alive = false; };
  }, []);
  return state;
}

export function useProperty(refId) {
  const cached = cache?.find((p) => p.refId.toLowerCase() === String(refId).toLowerCase());
  const [state, setState] = useState({ item: cached || null, loading: !cached, error: null });
  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: !s.item || s.item.refId !== refId }));
    getProperty(refId)
      .then((item) => alive && setState({ item, loading: false, error: null }))
      .catch((error) => alive && setState({ item: null, loading: false, error }));
    return () => { alive = false; };
  }, [refId]);
  return state;
}

/** Client-side filtering. Listings are few enough (hundreds) to filter instantly in the browser. */
export function filterProperties(items, f) {
  const q = (f.q || '').trim().toLowerCase();
  let out = items.filter((p) => {
    if (f.district && p.district !== f.district) return false;
    if (f.type && p.propertyType !== f.type) return false;
    if (f.landUse && p.landUse !== f.landUse) return false;
    if (f.status === 'available' && p.status !== 'available') return false;
    const price = p.priceTotal;
    if ((f.minPrice != null || f.maxPrice != null) && price == null) return false;
    if (f.minPrice != null && price < f.minPrice) return false;
    if (f.maxPrice != null && price > f.maxPrice) return false;
    const size = p.extentPerches;
    if ((f.minSize != null || f.maxSize != null) && size == null) return false;
    if (f.minSize != null && size < f.minSize) return false;
    if (f.maxSize != null && size > f.maxSize) return false;
    if (q) {
      const hay = `${p.title} ${p.city} ${p.district} ${p.address} ${p.refId} ${p.propertyType} ${p.landUse}`.toLowerCase();
      if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  });
  const priceKey = (p) => p.priceTotal ?? null;
  const bySold = (a, b) => (a.status === 'sold') - (b.status === 'sold');
  switch (f.sort) {
    case 'price-asc':
      out = out.sort((a, b) => bySold(a, b) || (priceKey(a) ?? Infinity) - (priceKey(b) ?? Infinity));
      break;
    case 'price-desc':
      out = out.sort((a, b) => bySold(a, b) || (priceKey(b) ?? -1) - (priceKey(a) ?? -1));
      break;
    case 'size-desc':
      out = out.sort((a, b) => bySold(a, b) || (b.extentPerches ?? -1) - (a.extentPerches ?? -1));
      break;
    default:
      out = out.sort((a, b) => bySold(a, b) || String(b.createdAt).localeCompare(String(a.createdAt)));
  }
  return out;
}
