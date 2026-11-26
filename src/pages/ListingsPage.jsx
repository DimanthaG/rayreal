import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Seo from '../components/Seo';
import FilterBar from '../components/FilterBar';
import PropertyCard, { PropertyCardSkeleton } from '../components/PropertyCard';
import { EmptyState } from '../components/ui';
import { filterProperties, useProperties } from '../hooks/useProperties';
import { SORTS } from '../lib/options';

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

  const heading = [filters.type || (filters.landUse ? `${filters.landUse} property` : 'Land & property'), 'for sale', filters.district ? `in ${filters.district}` : 'in Sri Lanka'].join(' ');

  return (
    <>
      <Seo title={heading} path={`/listings${sp.toString() ? `?${sp}` : ''}`} description={`Browse ${results.length} ${heading.toLowerCase()} with prices in LKR and extent in perches. Enquire instantly on WhatsApp.`} />
      <section className="bg-gradient-to-b from-ice to-white">
        <div className="container-x pb-10 pt-12 sm:pt-16">
          <span className="eyebrow">Properties</span>
          <h1 className="display mt-3 text-[38px] leading-[1.05] sm:text-6xl">{heading}</h1>
          <div className="mt-8">
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
