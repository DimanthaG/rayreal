import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { AlertTriangle, CheckCircle2, ChevronDown, Clock, ExternalLink, Home, Pencil, Plus, Search, Star, Trash2, XCircle } from 'lucide-react';
import { admin } from '../../lib/api';
import { invalidatePropertyCache } from '../../hooks/useProperties';
import { formatExtent, formatLKRShort, priceParts, propertyPath } from '../../lib/format';
import { STATUSES } from '../../lib/options';
import { Img } from '../../components/ui';

const STATUS_STYLE = {
  available: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  reserved: 'bg-amber-50 text-amber-700 ring-amber-200',
  sold: 'bg-brand-redSoft text-brand-red ring-red-200',
};

export function useToast() {
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  const node = toast && (
    <div className={clsx('fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 animate-rise items-center gap-2 rounded-full px-5 py-3 text-sm text-white shadow-lift', toast.error ? 'bg-brand-red' : 'bg-navy-900')} role="status">
      {toast.error ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
      {toast.text}
    </div>
  );
  return [node, (text, error = false) => setToast({ text, error })];
}

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('all');
  const [busy, setBusy] = useState({});
  const [confirm, setConfirm] = useState(null);
  const [toastNode, toast] = useToast();

  const load = async () => {
    setLoading(true);
    try {
      setItems(await admin.list());
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const stats = useMemo(() => ({
    total: items.length,
    available: items.filter((p) => p.status === 'available').length,
    reserved: items.filter((p) => p.status === 'reserved').length,
    sold: items.filter((p) => p.status === 'sold').length,
    featured: items.filter((p) => p.featured).length,
  }), [items]);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((p) => {
      if (tab === 'featured' && !p.featured) return false;
      if (['available', 'reserved', 'sold'].includes(tab) && p.status !== tab) return false;
      if (!term) return true;
      return `${p.title} ${p.refId} ${p.city} ${p.district}`.toLowerCase().includes(term);
    });
  }, [items, q, tab]);

  const patch = async (p, changes, msg) => {
    const before = { ...p };
    setBusy((b) => ({ ...b, [p.refId]: true }));
    setItems((list) => list.map((x) => (x.refId === p.refId ? { ...x, ...changes } : x))); // optimistic
    try {
      await admin.patch(p.refId, changes);
      invalidatePropertyCache();
      toast(msg);
    } catch (e) {
      setItems((list) => list.map((x) => (x.refId === p.refId ? before : x)));
      toast(e.message, true);
    } finally {
      setBusy((b) => ({ ...b, [p.refId]: false }));
    }
  };

  const remove = async (p) => {
    setConfirm(null);
    setBusy((b) => ({ ...b, [p.refId]: true }));
    try {
      await admin.remove(p.refId); // the API also deletes the listing's photos from Cloudinary
      setItems((list) => list.filter((x) => x.refId !== p.refId));
      invalidatePropertyCache();
      toast(`${p.refId} deleted`);
    } catch (e) {
      toast(e.message, true);
    } finally {
      setBusy((b) => ({ ...b, [p.refId]: false }));
    }
  };

  const cards = [
    { k: 'all', label: 'Total listings', value: stats.total, icon: Home, tone: 'bg-white' },
    { k: 'available', label: 'Available', value: stats.available, icon: CheckCircle2, tone: 'bg-white' },
    { k: 'sold', label: 'Sold', value: stats.sold, icon: XCircle, tone: 'bg-white' },
    { k: 'featured', label: 'Featured', value: stats.featured, icon: Star, tone: 'bg-powder' },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Listings</h1>
          <p className="mt-1 text-sm text-muted">Manage properties, photos and status. Changes go live immediately.</p>
        </div>
        <Link to="/admin/properties/new" className="flex items-center gap-2 self-start rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-700">
          <Plus className="h-4 w-4" /> Add property
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <button key={c.k} type="button" onClick={() => setTab(c.k)} className={clsx('rounded-3xl p-5 text-left transition', c.tone, tab === c.k ? 'ring-2 ring-navy/70' : 'ring-1 ring-line hover:ring-navy/30')}>
            <div className="flex items-center justify-between text-sm text-muted">{c.label}<c.icon className="h-4 w-4" /></div>
            <div className="mt-6 text-4xl font-light tracking-tight text-ink">{loading ? '–' : c.value}</div>
            {c.k === 'available' && !loading && stats.reserved > 0 && <div className="mt-1 text-xs text-amber-700">+ {stats.reserved} reserved</div>}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl bg-white ring-1 ring-line">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="scrollbar-none flex gap-1 overflow-x-auto">
            {['all', 'available', 'reserved', 'sold', 'featured'].map((t) => (
              <button key={t} type="button" onClick={() => setTab(t)} className={clsx('shrink-0 rounded-full px-4 py-1.5 text-sm capitalize', tab === t ? 'bg-navy text-white' : 'text-muted hover:bg-ice')}>{t}</button>
            ))}
          </div>
          <label className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, Ref ID, city…" className="h-10 w-full rounded-full bg-ice pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-navy/20" />
          </label>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-6 text-sm text-brand-red"><AlertTriangle className="h-4 w-4" />{error}<button type="button" onClick={load} className="underline">Retry</button></div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Extent</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-center font-medium">Featured</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 6 }, (_, i) => (
                <tr key={i} className="border-t border-line"><td colSpan={7} className="px-4 py-4"><div className="h-10 animate-pulse rounded-xl bg-ice" /></td></tr>
              ))}
              {!loading && rows.map((p) => {
                const price = priceParts(p);
                return (
                  <tr key={p.refId} className={clsx('border-t border-line transition hover:bg-ice/50', busy[p.refId] && 'opacity-60')}>
                    <td className="px-4 py-3">
                      <Link to={`/admin/properties/${p.refId}`} className="flex items-center gap-3">
                        <Img src={p.images?.[0]?.url} w={160} className="h-12 w-16 shrink-0 rounded-xl" />
                        <span className="min-w-0">
                          <span className="block max-w-[280px] truncate font-medium text-ink">{p.title}</span>
                          <span className="text-xs text-muted">{p.refId} · {p.propertyType} · {p.images?.length || 0} photo{p.images?.length === 1 ? '' : 's'}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{[p.city, p.district].filter(Boolean).join(', ') || <span className="text-amber-600">Add district</span>}</td>
                    <td className="px-4 py-3">
                      <div className={price.onRequest ? 'text-muted' : 'text-ink'}>{price.unit ? `${formatLKRShort(p.pricePerPerch)}/P` : price.main}</div>
                      {p.priceTotal && price.unit && <div className="text-xs text-muted">≈ {formatLKRShort(p.priceTotal)}</div>}
                    </td>
                    <td className="px-4 py-3 text-muted">{formatExtent(p.extentPerches) || '—'}</td>
                    <td className="px-4 py-3">
                      <label className="relative inline-block">
                        <select
                          value={p.status}
                          disabled={busy[p.refId]}
                          onChange={(e) => patch(p, { status: e.target.value }, `${p.refId} marked ${e.target.value}`)}
                          className={clsx('cursor-pointer appearance-none rounded-full py-1.5 pl-3 pr-8 text-xs font-medium capitalize outline-none ring-1', STATUS_STYLE[p.status])}
                          aria-label={`Status of ${p.refId}`}
                        >
                          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-60" />
                      </label>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={!!p.featured}
                        aria-label={`Feature ${p.refId}`}
                        disabled={busy[p.refId]}
                        onClick={() => patch(p, { featured: !p.featured }, p.featured ? `${p.refId} removed from featured` : `${p.refId} is now featured`)}
                        className={clsx('relative inline-flex h-6 w-11 items-center rounded-full transition', p.featured ? 'bg-navy' : 'bg-line')}
                      >
                        <span className={clsx('inline-block h-5 w-5 rounded-full bg-white shadow transition', p.featured ? 'translate-x-[22px]' : 'translate-x-0.5')} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <a href={propertyPath(p)} target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-ice hover:text-navy" title="View on site"><ExternalLink className="h-4 w-4" /></a>
                        <Link to={`/admin/properties/${p.refId}`} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-ice hover:text-navy" title="Edit"><Pencil className="h-4 w-4" /></Link>
                        <button type="button" onClick={() => setConfirm(p)} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-brand-redSoft hover:text-brand-red" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && !rows.length && (
                <tr><td colSpan={7} className="px-4 py-16 text-center text-muted">No listings here yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-2 border-t border-line px-4 py-3 text-xs text-muted"><Clock className="h-3.5 w-3.5" /> Showing {rows.length} of {items.length}</div>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 grid animate-fade place-items-center bg-navy-900/40 p-4 backdrop-blur-sm" onClick={() => setConfirm(null)}>
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lift" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-redSoft text-brand-red"><Trash2 className="h-5 w-5" /></div>
            <h2 className="mt-4 text-xl font-normal">Delete {confirm.refId}?</h2>
            <p className="mt-2 text-sm text-muted">"{confirm.title}" and its {confirm.images?.length || 0} photos will be permanently removed. This can't be undone. To hide it instead, mark it as Sold.</p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setConfirm(null)} className="btn-plain bg-ice text-ink">Cancel</button>
              <button type="button" onClick={() => remove(confirm)} className="btn-plain bg-brand-red text-white">Delete permanently</button>
            </div>
          </div>
        </div>
      )}
      {toastNode}
    </>
  );
}
