import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Seo, { breadcrumbLd } from '../components/Seo';
import { propertyPath } from '../lib/format';
import { config } from '../config';
import { cld } from '../lib/image';
import FilterBar from '../components/FilterBar';
import PropertyCard, { PropertyCardSkeleton } from '../components/PropertyCard';
import { EmptyState } from '../components/ui';
import { filterProperties, useProperties } from '../hooks/useProperties';
import { SORTS } from '../lib/options';
import clsx from 'clsx';

// Quick type tabs (Land / Houses …) — moved here from the main navigation.
const TYPE_TABS = [
  { value: null, label: 'All' },
  { value: 'Land', label: 'Land' },
  { value: 'House', label: 'Houses' },
  { value: 'Villa', label: 'Villas' },
  { value: 'Apartment', label: 'Apartments' },
  { value: 'Commercial Building', label: 'Commercial' },
  { value: 'Estate', label: 'Estates' },
  { value: 'Hotel', label: 'Hotels' },
];

const NUM_KEYS = ['minPrice', 'maxPrice', 'minSize', 'maxSize'];
const KEYS = ['q', 'district', 'type', 'landUse', 'sort', 'status', ...NUM_KEYS];
const PAGE = 12;

function readFilters(sp) {
  const f = {};
  KEYS.forEach((k) => {
    const v = sp.get(k);
    if (v == null || v === '') return;
    f[k] = NUM_KEYS.includes(k) ? Number(v) : v;
  });
  return f;
}

export default function ListingsPage() {
  const [sp, setSp] = useSearchParams();
  const filters = useMemo(() => readFilters(sp), [sp]);
  const { items, loading, error } = useProperties();
  const [shown, setShown] = useState(PAGE);

  const setFilters = (f) => {
    const next = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => v != null && v !== '' && next.set(k, v));
    setSp(next, { replace: true });
    setShown(PAGE);
  };

  const districts = useMemo(() => {
    const m = new Map();
    items.forEach((p) => p.district && m.set(p.district, (m.get(p.district) || 0) + 1));
    return [...m].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [items]);

  const results = useMemo(() => filterProperties(items, filters), [items, filters]);
  // Counts per type, respecting every other active filter
  const typeCounts = useMemo(() => {
    const base = filterProperties(items, { ...filters, type: null });
    const c = { all: base.length };
    base.forEach((p) => { c[p.propertyType] = (c[p.propertyType] || 0) + 1; });
    return c;
  }, [items, filters]);
  // Always show All, Land and Houses; show other types only when they have listings.
  const tabs = TYPE_TABS.filter((t) => !t.value || ['Land', 'House'].includes(t.value) || typeCounts[t.value] || filters.type === t.value);

  // Canonical URL keeps only the meaningful filters (type / district / land use), not sort or price ranges.
  const canonicalPath = (() => {
    const c = new URLSearchParams();
    ['type', 'district', 'landUse'].forEach((k) => filters[k] && c.set(k, filters[k]));
    return `/listings${c.toString() ? `?${c}` : ''}`;
  })();

  const heading = [filters.type || (filters.landUse ? `${filters.landUse} property` : 'Land & property'), 'for sale', filters.district ? `in ${filters.district}` : 'in Sri Lanka'].join(' ');

  return (
    <>
      <Seo
        title={heading}
        path={canonicalPath}
        image={cld(results[0]?.images?.[0]?.url, 1200)}
        description={`${loading ? 'Browse' : `Browse ${results.length}`} ${heading.toLowerCase()} with Ray Realty — prices in LKR, extent in perches, clear deeds. Enquire instantly on WhatsApp.`}
        jsonLd={[
          breadcrumbLd([['Home', '/'], ['Properties', '/listings'], ...(filters.type || filters.district ? [[heading, canonicalPath]] : [])]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: heading,
            numberOfItems: results.length,
            itemListElement: results.slice(0, 30).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${config.siteUrl}${propertyPath(p)}`, name: p.title })),
          },
        ]}
      />
      <section className="bg-gradient-to-b from-ice to-white">
        <div className="container-x pb-10 pt-12 sm:pt-16">
          <span className="eyebrow">Properties</span>
          <h1 className="display mt-3 text-[34px] leading-[1.05] sm:text-6xl">{heading}</h1>
          <nav aria-label="Property type" className="scrollbar-none -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {tabs.map((t) => {
              const active = (filters.type || null) === t.value;
              const count = t.value ? typeCounts[t.value] || 0 : typeCounts.all;
              return (
                <button
                  key={t.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilters({ ...filters, type: t.value })}
                  className={clsx('flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm transition', active ? 'bg-navy text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-navy/30')}
                >
                  {t.label}
                  {!loading && <span className={clsx('rounded-full px-1.5 text-xs', active ? 'bg-white/20' : 'bg-ice text-muted')}>{count}</span>}
                </button>
              );
            })}
          </nav>
          <div className="mt-5">
            <FilterBar filters={filters} onChange={setFilters} districts={districts} />
          </div>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted">
            {loading ? 'Loading properties…' : <><span className="font-medium text-ink">{results.length}</span> {results.length === 1 ? 'property' : 'properties'}</>}
          </p>
          <div className="flex items-center gap-3">
            <label className="hidden items-center gap-2 text-sm text-muted sm:flex">
              <input type="checkbox" className="h-4 w-4 rounded accent-navy" checked={filters.status === 'available'} onChange={(e) => setFilters({ ...filters, status: e.target.checked ? 'available' : null })} />
              Available only
            </label>
            <label className="relative">
              <select value={filters.sort || 'newest'} onChange={(e) => setFilters({ ...filters, sort: e.target.value === 'newest' ? null : e.target.value })} className="appearance-none rounded-full bg-ice py-2.5 pl-4 pr-9 text-sm outline-none" aria-label="Sort properties">
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </label>
          </div>
        </div>

        {error && <EmptyState title="We couldn't load properties">{error.message}</EmptyState>}

        {!error && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loading && Array.from({ length: 6 }, (_, i) => <PropertyCardSkeleton key={i} />)}
            {!loading && results.slice(0, shown).map((p, i) => <PropertyCard key={p.refId} p={p} eager={i < 3} className="animate-rise" />)}
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <EmptyState
            title="No properties match these filters"
            action={<button type="button" className="btn-plain bg-navy text-white" onClick={() => setFilters({})}>Clear filters</button>}
          >
            Try a wider price range or a nearby district — or WhatsApp us and we will look for you.
          </EmptyState>
        )}

        {results.length > shown && (
          <div className="mt-12 text-center">
            <button type="button" onClick={() => setShown((s) => s + PAGE)} className="btn-plain bg-ice text-navy hover:bg-powder">
              Show more ({results.length - shown} left)
            </button>
          </div>
        )}
      </section>
    </>
  );
}
