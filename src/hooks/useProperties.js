import { useEffect, useState } from 'react';
import { getProperty, listProperties } from '../lib/api';

// Listings are cached in memory and in the browser (localStorage), so returning visitors see
// properties instantly — even while the API is waking up — and fresh data replaces them a moment later.
const STORE_KEY = 'rr-listings-v1';
const MAX_AGE = 7 * 24 * 3600 * 1000;

function readStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (raw && Array.isArray(raw.items) && Date.now() - raw.at < MAX_AGE) return raw.items;
  } catch {
    /* storage blocked or corrupt */
  }
  return null;
}
function writeStore(items) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ at: Date.now(), items }));
  } catch {
    /* quota or blocked — memory cache still works */
  }
}

let cache = readStore();
let fresh = false; // has this page load fetched from the API yet?
let inflight = null;

export function invalidatePropertyCache() {
  cache = null;
  fresh = false;
  try {
    localStorage.removeItem(STORE_KEY);
  } catch {
    /* ignore */
  }
}

export function useProperties() {
  // `loading` is only true when there is nothing to show yet; `refreshing` while updating cached data.
  const [state, setState] = useState({ items: cache || [], loading: !cache, refreshing: !!cache && !fresh, error: null });
  useEffect(() => {
    if (fresh && cache) return undefined;
    let alive = true;
    if (!inflight) inflight = listProperties().finally(() => { inflight = null; });
    inflight
      .then((items) => {
        cache = items;
        fresh = true;
        writeStore(items);
        if (alive) setState({ items, loading: false, refreshing: false, error: null });
      })
      .catch((error) => alive && setState((s) => ({ ...s, loading: false, refreshing: false, error: s.items.length ? null : error })));
    return () => { alive = false; };
  }, []);
  return state;
}

/** True once `active` has been true for `ms` — used to explain a slow first load. */
export function useSlow(active, ms = 4000) {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (!active) {
      setSlow(false);
      return undefined;
    }
    const t = setTimeout(() => setSlow(true), ms);
    return () => clearTimeout(t);
  }, [active, ms]);
  return slow;
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
