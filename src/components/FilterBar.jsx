import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { LAND_USES, PRICE_RANGES, PROPERTY_TYPES, SIZE_RANGES } from '../lib/options';

function Select({ label, value, onChange, children, className }) {
  return (
    <label className={clsx('relative block', className)}>
      <span className="pointer-events-none absolute left-4 top-2.5 text-[11px] font-medium uppercase tracking-wide text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[60px] w-full cursor-pointer appearance-none rounded-2xl border-0 bg-ice pb-2 pl-4 pr-9 pt-6 text-[15px] text-ink outline-none ring-1 ring-transparent transition hover:bg-powder-soft focus:bg-white focus:ring-navy/30"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </label>
  );
}

const rangeIndex = (ranges, min, max) => Math.max(0, ranges.findIndex((r) => r.min === min && r.max === max));

/**
 * Controlled filter bar. `filters` = { q, district, type, landUse, minPrice, maxPrice, minSize, maxSize }.
 * `districts` = [{ name, count }] built from the live listings so empty districts never show.
 */
export default function FilterBar({ filters, onChange, districts = [], compact = false, onSubmit }) {
  const [q, setQ] = useState(filters.q || '');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setQ(filters.q || '');
  }, [filters.q]);

  const set = (patch) => onChange({ ...filters, ...patch });
  const priceIdx = rangeIndex(PRICE_RANGES, filters.minPrice ?? null, filters.maxPrice ?? null);
  const sizeIdx = rangeIndex(SIZE_RANGES, filters.minSize ?? null, filters.maxSize ?? null);
  const activeCount = ['district', 'type', 'landUse', 'minPrice', 'maxPrice', 'minSize', 'maxSize'].filter((k) => filters[k] != null && filters[k] !== '').length;

  const submit = (e) => {
    e?.preventDefault();
    set({ q });
    onSubmit?.({ ...filters, q });
  };

  const fields = (
    <>
      <Select label="District" value={filters.district || ''} onChange={(v) => set({ district: v || null })}>
        <option value="">All districts</option>
        {districts.map((d) => (
          <option key={d.name} value={d.name}>{d.name} ({d.count})</option>
        ))}
      </Select>
      <Select label="Property type" value={filters.type || ''} onChange={(v) => set({ type: v || null })}>
        <option value="">Any type</option>
        {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
      </Select>
      {!compact && (
        <Select label="Land use" value={filters.landUse || ''} onChange={(v) => set({ landUse: v || null })}>
          <option value="">Any use</option>
          {LAND_USES.map((t) => <option key={t}>{t}</option>)}
        </Select>
      )}
      <Select label="Price (LKR)" value={priceIdx} onChange={(v) => { const r = PRICE_RANGES[v]; set({ minPrice: r.min, maxPrice: r.max }); }}>
        {PRICE_RANGES.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
      </Select>
      <Select label="Land size" value={sizeIdx} onChange={(v) => { const r = SIZE_RANGES[v]; set({ minSize: r.min, maxSize: r.max }); }}>
        {SIZE_RANGES.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
      </Select>
    </>
  );

  return (
    <form onSubmit={submit} className="rounded-[1.75rem] bg-white p-2 shadow-lift ring-1 ring-line/60">
      <div className="flex gap-2">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={() => q !== (filters.q || '') && set({ q })}
            placeholder="Search a town, road or Ref ID — e.g. Malabe, RR-0012"
            className="h-[60px] w-full rounded-2xl border-0 bg-ice pl-11 pr-4 text-[15px] outline-none ring-1 ring-transparent placeholder:text-[#9AA0B8] focus:bg-white focus:ring-navy/30"
            aria-label="Search properties"
          />
        </label>
        <button type="button" onClick={() => setOpen((v) => !v)} className="relative grid h-[60px] w-[60px] place-items-center rounded-2xl bg-ice text-navy md:hidden" aria-label="Filters">
          <SlidersHorizontal className="h-5 w-5" />
          {activeCount > 0 && <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-brand-red text-[11px] text-white">{activeCount}</span>}
        </button>
        <button type="submit" className="hidden h-[60px] items-center gap-2 rounded-2xl bg-navy px-6 text-sm font-medium text-white transition hover:bg-navy-700 md:flex">
          <Search className="h-4 w-4" /> Search
        </button>
      </div>

      <div className={clsx('mt-2 gap-2 md:grid', compact ? 'md:grid-cols-4' : 'md:grid-cols-5', open ? 'grid grid-cols-1' : 'hidden')}>
        {fields}
        <button type="submit" className="h-[52px] rounded-2xl bg-navy text-sm font-medium text-white md:hidden">Show properties</button>
      </div>

      {activeCount > 0 && !compact && (
        <div className="flex flex-wrap items-center gap-2 px-2 pb-1 pt-3">
          <span className="text-xs text-muted">Active:</span>
          {filters.district && <Chip onClear={() => set({ district: null })}>{filters.district}</Chip>}
          {filters.type && <Chip onClear={() => set({ type: null })}>{filters.type}</Chip>}
          {filters.landUse && <Chip onClear={() => set({ landUse: null })}>{filters.landUse}</Chip>}
          {priceIdx > 0 && <Chip onClear={() => set({ minPrice: null, maxPrice: null })}>{PRICE_RANGES[priceIdx].label}</Chip>}
          {sizeIdx > 0 && <Chip onClear={() => set({ minSize: null, maxSize: null })}>{SIZE_RANGES[sizeIdx].label}</Chip>}
          <button type="button" className="text-xs text-navy underline-offset-2 hover:underline" onClick={() => onChange({ q: filters.q })}>Clear all</button>
        </div>
      )}
    </form>
  );
}

function Chip({ children, onClear }) {
  return (
    <span className="chip bg-powder-soft text-navy">
      {children}
      <button type="button" onClick={onClear} aria-label={`Remove ${children}`} className="-my-1 -mr-1.5 rounded-full p-1.5 hover:bg-white">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
