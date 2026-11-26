import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { AlertTriangle, ArrowLeft, Calculator, ExternalLink, Loader2, MapPin, Save } from 'lucide-react';
import { admin } from '../../lib/api';
import { invalidatePropertyCache } from '../../hooks/useProperties';
import { DEED_STATUSES, DISTRICTS, EMPTY_PROPERTY, LAND_USES, PROPERTY_TYPES, STATUSES } from '../../lib/options';
import { formatExtent, formatLKR, formatLKRShort, PERCHES_PER_ACRE, propertyPath } from '../../lib/format';
import { discardImages } from '../../lib/upload';
import { coordsFromMapUrl } from '../../components/MapEmbed';
import ImageUploader from '../../components/admin/ImageUploader';
import Spinner from '../../components/Spinner';
import { useToast } from './AdminDashboard';

const num = (v) => (v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v));

function Section({ title, hint, children }) {
  return (
    <section className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-7">
      <h2 className="text-lg font-normal tracking-tight">{title}</h2>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, error, hint, children, className }) {
  return (
    <label className={clsx('block', className)}>
      <span className="label">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-brand-red">{error}</span> : hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function Toggle({ checked, onChange, label, sub }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="flex w-full items-center justify-between gap-4 rounded-2xl bg-ice px-4 py-3 text-left">
      <span>
        <span className="block text-sm text-ink">{label}</span>
        {sub && <span className="block text-xs text-muted">{sub}</span>}
      </span>
      <span className={clsx('relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition', checked ? 'bg-navy' : 'bg-line')}>
        <span className={clsx('inline-block h-5 w-5 rounded-full bg-white shadow transition', checked ? 'translate-x-[22px]' : 'translate-x-0.5')} />
      </span>
    </button>
  );
}

export default function PropertyEditor() {
  const { refId } = useParams();
  const isNew = !refId;
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_PROPERTY);
  const [loading, setLoading] = useState(!isNew);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dirty, setDirty] = useState(false);
  const [extentUnit, setExtentUnit] = useState('perches');
  // Photos already saved on this listing. Removing one of those is handled by the API on save
  // (it deletes them from Cloudinary); removing a photo uploaded in this session discards it right away.
  const savedIds = useRef(new Set());
  const unsavedUploads = useRef(new Set());
  const [toastNode, toast] = useToast();

  useEffect(() => {
    if (isNew) return;
    admin.get(refId)
      .then((p) => {
        savedIds.current = new Set((p.images || []).map((i) => i.publicId).filter(Boolean));
        setForm({ ...EMPTY_PROPERTY, ...p, utilities: { ...EMPTY_PROPERTY.utilities, ...p.utilities } });
      })
      .catch((e) => setLoadError(e.message))
      .finally(() => setLoading(false));
  }, [refId, isNew]);

  // Leaving the editor without saving: delete photos uploaded in this session so they don't pile up in Cloudinary.
  useEffect(() => () => {
    if (unsavedUploads.current.size) discardImages([...unsavedUploads.current]);
  }, []);

  useEffect(() => {
    const warn = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const set = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setDirty(true);
  };
  const bind = (k, transform = (v) => v) => ({ value: form[k] ?? '', onChange: (e) => set({ [k]: transform(e.target.value) }) });

  const suggestedTotal = form.pricePerPerch && form.extentPerches ? Math.round(form.pricePerPerch * form.extentPerches) : null;
  const isLand = form.propertyType === 'Land' || form.propertyType === 'Estate';
  const mapCoords = coordsFromMapUrl(form.mapUrl);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Give the listing a title.';
    if (!form.district) e.district = 'Choose a district so buyers can filter by it.';
    if (!form.priceOnRequest && form.priceTotal == null && form.pricePerPerch == null) e.price = 'Add a total price or price per perch, or turn on "Price on request".';
    if (form.whatsapp && form.whatsapp.replace(/\D/g, '').length < 9) e.whatsapp = 'Enter a full phone number, e.g. 077 123 4567.';
    if (form.mapUrl && !/^https?:\/\//.test(form.mapUrl)) e.mapUrl = 'Paste the full Google Maps link (starting with https://).';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async (e) => {
    e?.preventDefault();
    if (!validate()) {
      toast('Please fix the highlighted fields', true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      lat: form.lat ?? mapCoords?.lat ?? null,
      lng: form.lng ?? mapCoords?.lng ?? null,
      priceTotal: form.priceOnRequest ? null : form.priceTotal ?? suggestedTotal,
      pricePerPerch: form.priceOnRequest ? null : form.pricePerPerch,
      bedrooms: isLand ? null : form.bedrooms,
      bathrooms: isLand ? null : form.bathrooms,
      images: form.images.map(({ url, publicId, width, height }) => ({ url, publicId, width, height })),
    };
    ['refId', 'id', 'slug', 'createdAt', 'updatedAt', 'extentLabel', 'priceLabel', 'needsReview'].forEach((k) => delete payload[k]);
    try {
      const saved = isNew ? await admin.create(payload) : await admin.update(refId, payload);
      savedIds.current = new Set((saved.images || []).map((i) => i.publicId).filter(Boolean));
      unsavedUploads.current = new Set();
      invalidatePropertyCache();
      setDirty(false);
      toast(isNew ? `${saved.refId} created` : 'Changes saved');
      if (isNew) navigate(`/admin/properties/${saved.refId}`, { replace: true });
      else setForm((f) => ({ ...f, ...saved }));
    } catch (err) {
      toast(err.message, true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner full label="Loading listing" />;
  if (loadError) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center ring-1 ring-line">
        <p className="text-brand-red">{loadError}</p>
        <Link to="/admin" className="btn-plain mt-6 bg-navy text-white">Back to listings</Link>
      </div>
    );
  }

  const extentInput = extentUnit === 'acres'
    ? { value: form.extentPerches != null ? +(form.extentPerches / PERCHES_PER_ACRE).toFixed(4) : '', onChange: (e) => set({ extentPerches: num(e.target.value) != null ? Math.round(num(e.target.value) * PERCHES_PER_ACRE * 100) / 100 : null }) }
    : { value: form.extentPerches ?? '', onChange: (e) => set({ extentPerches: num(e.target.value) }) };

  return (
    <form onSubmit={save} noValidate>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-navy"><ArrowLeft className="h-4 w-4" /> Listings</Link>
          <h1 className="mt-2 text-3xl font-light tracking-tight">{isNew ? 'Add property' : `Edit ${refId}`}</h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
            <a href={propertyPath(form)} target="_blank" rel="noreferrer" className="btn-plain bg-white text-ink ring-1 ring-line">
              View <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <button type="submit" disabled={saving || uploading} className="btn-plain bg-navy text-white hover:bg-navy-700 disabled:opacity-60">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {uploading ? 'Uploading photos…' : isNew ? 'Publish listing' : 'Save changes'}
          </button>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-redSoft p-4 text-sm text-brand-red" role="alert">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <ul className="space-y-0.5">{Object.values(errors).map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
      )}

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <Section title="Photos" hint="Up to 5 photos. Choose one as the cover — it is shown first on the website and in WhatsApp shares.">
            <ImageUploader
              value={form.images}
              onChange={(images) => {
                images.forEach((i) => i.publicId && !savedIds.current.has(i.publicId) && unsavedUploads.current.add(i.publicId));
                set({ images });
              }}
              onBusyChange={setUploading}
              onRemove={(img) => {
                if (img.publicId && unsavedUploads.current.has(img.publicId)) {
                  unsavedUploads.current.delete(img.publicId);
                  discardImages([img.publicId]);
                }
              }}
            />
          </Section>

          <Section title="Basics">
            <Field label="Title" error={errors.title}>
              <input className="field" placeholder="e.g. 20 Perch residential land in Malabe – 5 min to town" {...bind('title')} />
            </Field>
            <Field label="Description" hint="Plain text. New lines are kept.">
              <textarea className="field min-h-[180px]" placeholder="Describe the land, access, neighbourhood, nearby schools and town…" {...bind('description')} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Property type">
                <select className="field" {...bind('propertyType')}>{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
              </Field>
              <Field label="Land use / category">
                <select className="field" {...bind('landUse')}>{LAND_USES.map((t) => <option key={t}>{t}</option>)}</select>
              </Field>
            </div>
          </Section>

          <Section title="Location">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="District" error={errors.district}>
                <select className="field" {...bind('district')}>
                  <option value="">Choose district</option>
                  {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="City / town">
                <input className="field" placeholder="e.g. Malabe" {...bind('city')} />
              </Field>
            </div>
            <Field label="Address / directions">
              <input className="field" placeholder="e.g. Susilarama Road, 400m from Malabe junction" {...bind('address')} />
            </Field>
            <Field label="Google Maps link" error={errors.mapUrl} hint={mapCoords ? `Pin found: ${mapCoords.lat.toFixed(5)}, ${mapCoords.lng.toFixed(5)}` : 'Open Google Maps → drop a pin → Share → Copy link. Full links with "@lat,lng" give an exact pin.'}>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input className="field pl-11" placeholder="https://www.google.com/maps/place/…" {...bind('mapUrl')} />
              </div>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Latitude (optional)">
                <input className="field" inputMode="decimal" placeholder="6.9147" value={form.lat ?? ''} onChange={(e) => set({ lat: num(e.target.value) })} />
              </Field>
              <Field label="Longitude (optional)">
                <input className="field" inputMode="decimal" placeholder="79.9729" value={form.lng ?? ''} onChange={(e) => set({ lng: num(e.target.value) })} />
              </Field>
            </div>
          </Section>

          <Section title="Land details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Extent" hint={form.extentPerches ? `= ${formatExtent(form.extentPerches)}` : '160 perches = 1 acre'}>
                <div className="flex gap-2">
                  <input className="field" inputMode="decimal" placeholder={extentUnit === 'acres' ? '1.5' : '20'} {...extentInput} />
                  <select className="field w-32" value={extentUnit} onChange={(e) => setExtentUnit(e.target.value)} aria-label="Extent unit">
                    <option value="perches">Perches</option>
                    <option value="acres">Acres</option>
                  </select>
                </div>
              </Field>
              <Field label="Road access width (ft)">
                <input className="field" inputMode="numeric" placeholder="20" value={form.roadAccessFt ?? ''} onChange={(e) => set({ roadAccessFt: num(e.target.value) })} />
              </Field>
            </div>
            <Field label="Deed status">
              <select className="field" {...bind('deedStatus')}>
                <option value="">Not specified</option>
                {DEED_STATUSES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <div>
              <span className="label">Utilities available</span>
              <div className="flex flex-wrap gap-2">
                {[['water', 'Water'], ['electricity', 'Electricity'], ['telephone', 'Telephone / internet']].map(([k, l]) => (
                  <label key={k} className={clsx('flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 transition', form.utilities[k] ? 'bg-powder-soft text-navy ring-navy/30' : 'bg-white text-muted ring-line')}>
                    <input type="checkbox" className="accent-navy" checked={!!form.utilities[k]} onChange={(e) => set({ utilities: { ...form.utilities, [k]: e.target.checked } })} />
                    {l}
                  </label>
                ))}
              </div>
            </div>
            {!isLand && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Bedrooms">
                  <input className="field" inputMode="numeric" value={form.bedrooms ?? ''} onChange={(e) => set({ bedrooms: num(e.target.value) })} />
                </Field>
                <Field label="Bathrooms">
                  <input className="field" inputMode="numeric" value={form.bathrooms ?? ''} onChange={(e) => set({ bathrooms: num(e.target.value) })} />
                </Field>
              </div>
            )}
          </Section>
        </div>

        <div className="space-y-5 xl:sticky xl:top-24 xl:self-start">
          <Section title="Price (LKR)">
            <Toggle checked={form.priceOnRequest} onChange={(v) => set({ priceOnRequest: v })} label="Price on request" sub="Hide the price and ask buyers to call" />
            {!form.priceOnRequest && (
              <>
                <Field label="Price per perch" error={errors.price} hint={form.pricePerPerch ? formatLKR(form.pricePerPerch) : 'Leave empty for houses priced as a whole'}>
                  <input className="field" inputMode="numeric" placeholder="1250000" value={form.pricePerPerch ?? ''} onChange={(e) => set({ pricePerPerch: num(e.target.value.replace(/,/g, '')) })} />
                </Field>
                <Field label="Total price" hint={form.priceTotal ? `${formatLKR(form.priceTotal)} · ${formatLKRShort(form.priceTotal)}` : ''}>
                  <input className="field" inputMode="numeric" placeholder="45500000" value={form.priceTotal ?? ''} onChange={(e) => set({ priceTotal: num(e.target.value.replace(/,/g, '')) })} />
                </Field>
                {suggestedTotal && suggestedTotal !== form.priceTotal && (
                  <button type="button" onClick={() => set({ priceTotal: suggestedTotal })} className="flex w-full items-center gap-2 rounded-2xl bg-powder-soft px-4 py-3 text-left text-sm text-navy">
                    <Calculator className="h-4 w-4 shrink-0" />
                    <span>Use {formatLKRShort(suggestedTotal)} <span className="text-navy/60">({formatLKR(form.pricePerPerch)} × {form.extentPerches} P)</span></span>
                  </button>
                )}
              </>
            )}
            <Toggle checked={form.negotiable} onChange={(v) => set({ negotiable: v })} label="Negotiable" />
          </Section>

          <Section title="Visibility">
            <div>
              <span className="label">Status</span>
              <div className="grid grid-cols-3 gap-1 rounded-2xl bg-ice p-1">
                {STATUSES.map((s) => (
                  <button key={s.value} type="button" onClick={() => set({ status: s.value })} className={clsx('rounded-xl py-2 text-sm transition', form.status === s.value ? 'bg-white text-navy shadow-soft' : 'text-muted')}>{s.label}</button>
                ))}
              </div>
            </div>
            <Toggle checked={form.featured} onChange={(v) => set({ featured: v })} label="Featured" sub="Show on the home page showcase" />
          </Section>

          <Section title="Inquiries">
            <Field label="WhatsApp / call number" error={errors.whatsapp} hint="Leave empty to use the main Ray Realty number.">
              <input className="field" inputMode="tel" placeholder="077 772 7527" {...bind('whatsapp')} />
            </Field>
          </Section>
        </div>
      </div>
      {toastNode}
    </form>
  );
}
