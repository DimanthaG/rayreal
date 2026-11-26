import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { ArrowLeft, Bath, BedDouble, Check, Copy, Droplets, FileCheck2, Grid2x2, Landmark, Maximize2, Phone, Route, Share2, Tag, Wifi, Zap } from 'lucide-react';
import Seo, { breadcrumbLd } from '../components/Seo';
import Spinner from '../components/Spinner';
import MapEmbed from '../components/MapEmbed';
import PropertyCard from '../components/PropertyCard';
import { EmptyState, Img, StatusBadge, WhatsAppIcon } from '../components/ui';
import { useProperties, useProperty } from '../hooks/useProperties';
import { formatExtent, formatLKR, formatLKRShort, locationLabel, perchesToAcres, priceParts, propertyPath } from '../lib/format';
import { propertyUrl, telLink, whatsappLink } from '../lib/whatsapp';
import { cld } from '../lib/image';
import { config } from '../config';

/** 1200×630 crop for link previews (Cloudinary photos only). */
function shareImage(url) {
  if (!url || !url.includes('res.cloudinary.com/') || !url.includes('/image/upload/')) return url;
  return url.replace('/image/upload/', '/image/upload/c_fill,g_auto,w_1200,h_630,f_jpg,q_auto/');
}

export default function PropertyPage() {
  const { refId } = useParams();
  const { item: p, loading, error } = useProperty(refId);
  const { items } = useProperties();
  const [lightbox, setLightbox] = useState(-1);
  const [copied, setCopied] = useState(false);

  const similar = useMemo(() => {
    if (!p) return [];
    return items
      .filter((x) => x.refId !== p.refId && x.status !== 'sold')
      .map((x) => ({ x, score: (x.district === p.district ? 2 : 0) + (x.propertyType === p.propertyType ? 1 : 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((s) => s.x);
  }, [items, p]);

  if (loading && !p) return <Spinner full label="Loading property" />;
  if (error || !p) {
    return (
      <div className="container-x py-24">
        <EmptyState title="This property isn't available" action={<Link to="/listings" className="btn-plain bg-navy text-white">Browse all properties</Link>}>
          It may have been sold or the link is incorrect.
        </EmptyState>
      </div>
    );
  }

  const price = priceParts(p);
  const images = p.images || [];
  const title = p.title.replace(/^[^\w(]+/u, '');
  const where = locationLabel(p) || p.address || 'Sri Lanka';
  const acres = p.extentPerches >= 160 ? perchesToAcres(p.extentPerches) : null;

  const highlights = [
    p.extentPerches != null && { icon: Maximize2, k: 'Land extent', v: formatExtent(p.extentPerches), s: acres ? `${acres} acres · ${p.extentPerches} perches` : p.extentLabel && p.extentLabel !== `${p.extentPerches} perches` ? p.extentLabel : '' },
    p.pricePerPerch != null && { icon: Tag, k: 'Price per perch', v: formatLKR(p.pricePerPerch), s: p.negotiable ? 'Negotiable' : '' },
    { icon: Landmark, k: 'Total price', v: p.priceTotal ? formatLKRShort(p.priceTotal) : 'On request', s: p.priceTotal ? formatLKR(p.priceTotal) : '' },
    { icon: Grid2x2, k: 'Category', v: p.landUse, s: p.propertyType },
    p.roadAccessFt && { icon: Route, k: 'Road access', v: `${p.roadAccessFt} ft road` },
    p.deedStatus && { icon: FileCheck2, k: 'Deed', v: p.deedStatus },
    p.bedrooms && { icon: BedDouble, k: 'Bedrooms', v: p.bedrooms },
    p.bathrooms && { icon: Bath, k: 'Bathrooms', v: p.bathrooms },
  ].filter(Boolean);

  const utilities = [
    { on: p.utilities?.water, icon: Droplets, label: 'Water' },
    { on: p.utilities?.electricity, icon: Zap, label: 'Electricity' },
    { on: p.utilities?.telephone, icon: Wifi, label: 'Telephone / internet' },
  ];

  const share = async () => {
    const url = propertyUrl(p);
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* user cancelled */ }
      return;
    }
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: title,
    url: propertyUrl(p),
    image: images.slice(0, 5).map((i) => cld(i.url, 1200)),
    description: p.description?.slice(0, 500),
    identifier: p.refId,
    datePosted: p.createdAt || undefined,
    offers: p.priceTotal
      ? {
        '@type': 'Offer',
        price: p.priceTotal,
        priceCurrency: 'LKR',
        availability: p.status === 'sold' ? 'https://schema.org/SoldOut' : p.status === 'reserved' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
        seller: { '@id': `${config.siteUrl}/#organization` },
      }
      : undefined,
    about: {
      '@type': 'Place',
      name: title,
      address: { '@type': 'PostalAddress', streetAddress: p.address || undefined, addressLocality: p.city || undefined, addressRegion: p.district ? `${p.district} District` : undefined, addressCountry: 'LK' },
      geo: p.lat != null && p.lng != null ? { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng } : undefined,
      additionalProperty: [
        p.extentPerches != null && { '@type': 'PropertyValue', name: 'Land extent', value: p.extentPerches, unitText: 'perches' },
        p.landUse && { '@type': 'PropertyValue', name: 'Land use', value: p.landUse },
        p.deedStatus && { '@type': 'PropertyValue', name: 'Deed', value: p.deedStatus },
      ].filter(Boolean),
    },
  };

  return (
    <>
      <Seo
        title={`${title} — ${price.main}${price.unit ? ' per perch' : ''}`}
        description={`${p.propertyType} for sale in ${where}. ${p.extentPerches ? `${formatExtent(p.extentPerches)}. ` : ''}${p.description?.replace(/\s+/g, ' ')}`}
        image={shareImage(images[0]?.url)}
        path={propertyPath(p)}
        type="article"
        jsonLd={[jsonLd, breadcrumbLd([['Home', '/'], ['Properties', '/listings'], [p.district ? `${p.district}` : 'Sri Lanka', `/listings${p.district ? `?district=${encodeURIComponent(p.district)}` : ''}`], [title, propertyPath(p)]])]}
      />

      <div className="container-x pt-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-muted hover:text-navy"><ArrowLeft className="h-4 w-4" /> All properties</Link>
          <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-full bg-ice px-4 py-2 text-sm text-navy hover:bg-powder">
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copied ? 'Link copied' : 'Share'}
          </button>
        </div>

        {/* Gallery */}
        <div className="mt-5 grid gap-2 sm:gap-3 md:h-[560px] md:grid-cols-4 md:grid-rows-2">
          {(images.length ? images.slice(0, 5) : [{ url: '' }]).map((im, i) => (
            <button
              key={im.url || i}
              type="button"
              onClick={() => images.length && setLightbox(i)}
              className={clsx('group relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]', i === 0 ? 'aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto' : 'hidden md:block', images.length === 1 && 'md:col-span-4', images.length === 2 && i === 1 && 'md:col-span-2 md:row-span-2', images.length === 3 && i > 0 && 'md:col-span-2', images.length === 4 && i === 3 && 'md:col-span-2')}
              aria-label={`Open photo ${i + 1}`}
            >
              <Img src={im.url} alt={`${title} — photo ${i + 1}`} eager={i === 0} w={i === 0 ? 1600 : 800} className="absolute inset-0" imgClassName={clsx('transition-transform duration-700 group-hover:scale-[1.03]', p.status === 'sold' && 'grayscale-[50%]')} />
              {i === 0 && (
                <div className="absolute left-4 top-4 flex gap-2">
                  <StatusBadge status={p.status} />
                  <span className="chip bg-white/95 text-navy">{p.refId}</span>
                </div>
              )}
              {i === Math.min(images.length, 5) - 1 && images.length > 1 && (
                <span className="chip absolute bottom-4 right-4 bg-white text-ink shadow-soft"><Grid2x2 className="h-3.5 w-3.5" />View all {images.length} photos</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightbox >= 0}
        index={Math.max(lightbox, 0)}
        close={() => setLightbox(-1)}
        slides={images.map((im) => ({ src: cld(im.url, 2000), alt: title, width: im.width || undefined, height: im.height || undefined }))}
        plugins={[Zoom, Counter]}
        animation={{ swipe: 320 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: 'rgba(0,5,47,.96)' } }}
      />

      {/* Body */}
      <div className="container-x grid gap-10 pb-24 pt-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
        <div className="min-w-0">
          <span className="eyebrow">{p.propertyType} · {p.landUse}</span>
          <h1 className="display mt-3 text-[32px] leading-[1.08] sm:text-5xl">{title}</h1>
          <p className="mt-3 text-[15px] text-muted">{[p.address, p.address?.toLowerCase().includes((p.district || '#').toLowerCase()) ? '' : p.district && `${p.district} District`].filter(Boolean).join(' · ') || where}</p>

          {/* Mobile price */}
          <div className="mt-6 rounded-3xl bg-ice p-5 lg:hidden">
            <PriceBlock p={p} price={price} />
          </div>

          <h2 className="mt-12 text-xl font-normal tracking-tight">Key highlights</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.k} className="rounded-3xl bg-ice p-5">
                <h.icon className="h-5 w-5 text-navy" strokeWidth={1.6} />
                <div className="mt-4 text-xs text-muted">{h.k}</div>
                <div className="mt-1 text-[17px] font-medium leading-snug tracking-tight text-ink">{h.v}</div>
                {h.s && <div className="mt-0.5 text-xs text-muted">{h.s}</div>}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {utilities.map((u) => (
              <span key={u.label} className={clsx('chip px-3.5 py-2', u.on ? 'bg-powder-soft text-navy' : 'bg-sand text-muted line-through decoration-muted/40')}>
                <u.icon className="h-3.5 w-3.5" /> {u.label}
              </span>
            ))}
          </div>

          <h2 className="mt-12 text-xl font-normal tracking-tight">About this property</h2>
          <div className="mt-4 whitespace-pre-line text-[15.5px] leading-[1.75] text-ink/80">{p.description}</div>

          <h2 className="mt-12 text-xl font-normal tracking-tight">Location</h2>
          <MapEmbed p={p} className="mt-5 h-[380px]" />

          {/* inline CTA */}
          <div className="mt-12 flex flex-col gap-5 rounded-4xl bg-navy p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <div className="text-2xl font-light tracking-tight">Interested in {p.refId}?</div>
              <p className="mt-1 text-sm text-white/60">Message us — your enquiry already includes this property's details.</p>
            </div>
            <a href={whatsappLink(p)} target="_blank" rel="noreferrer" className="btn-wa shrink-0">
              <span className="btn-icon"><WhatsAppIcon /></span> Inquire via WhatsApp
            </a>
          </div>
        </div>

        {/* Sticky sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            <div className="card p-6">
              <PriceBlock p={p} price={price} />
              <div className="mt-6 space-y-2.5">
                <a href={whatsappLink(p)} target="_blank" rel="noreferrer" className="btn-wa w-full">
                  <span className="btn-icon"><WhatsAppIcon /></span> Inquire via WhatsApp
                </a>
                <a href={telLink(p.whatsapp)} className="btn-ghost w-full">
                  <span className="btn-icon"><Phone className="h-3.5 w-3.5" /></span> Call {(p.whatsapp || config.phone).replace(/^\+?94(\d{2})(\d{3})(\d{4})$/, '+94 $1 $2 $3')}
                </a>
              </div>
              <button type="button" onClick={share} className="mt-4 flex w-full items-center justify-center gap-2 text-xs text-muted hover:text-navy">
                <Copy className="h-3.5 w-3.5" /> {copied ? 'Copied!' : `Copy link · Ref ${p.refId}`}
              </button>
            </div>
            <div className="rounded-3xl bg-ice p-5 text-sm text-muted">
              Always inspect the land and have the deeds checked by a lawyer before paying an advance. We help arrange both.
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="container-x pb-24">
          <h2 className="display text-3xl sm:text-4xl">Similar properties</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((x) => <PropertyCard key={x.refId} p={x} />)}
          </div>
        </section>
      )}

      {/* Mobile sticky inquiry bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur lg:hidden" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
        <div className="flex gap-2">
          <a href={telLink(p.whatsapp)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ice text-navy" aria-label="Call"><Phone className="h-5 w-5" /></a>
          <a href={whatsappLink(p)} target="_blank" rel="noreferrer" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[15px] font-medium text-white">
            <WhatsAppIcon className="h-5 w-5" /> Inquire via WhatsApp
          </a>
        </div>
      </div>
      <div className="h-20 lg:hidden" />
    </>
  );
}

function PriceBlock({ p, price }) {
  return (
    <>
      <div className="text-xs text-muted">{price.unit ? 'Price per perch' : 'Asking price'}</div>
      <div className={clsx('mt-1 text-[30px] font-light leading-tight tracking-tight', price.onRequest ? 'text-muted' : 'text-navy')}>{price.main}</div>
      {price.sub && <div className="mt-1 text-sm text-muted">{price.sub}</div>}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.negotiable && <span className="chip bg-brand-redSoft text-brand-red">Negotiable</span>}
        {p.extentPerches != null && <span className="chip bg-ice text-navy">{formatExtent(p.extentPerches)}</span>}
        <StatusBadge status={p.status} className="!bg-ice" />
      </div>
    </>
  );
}
