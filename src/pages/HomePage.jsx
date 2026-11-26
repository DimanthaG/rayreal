import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import FilterBar from '../components/FilterBar';
import PropertyCard, { PropertyCardSkeleton } from '../components/PropertyCard';
import ContactBlock from '../components/ContactBlock';
import { ArrowLink, EmptyState, Img, Reveal, SectionHead, WhatsAppIcon } from '../components/ui';
import BrandArt from '../components/BrandArt';
import { filterProperties, useProperties } from '../hooks/useProperties';
import { formatExtent, formatLKR, locationLabel, priceParts, propertyPath } from '../lib/format';
import { telLink, whatsappLink } from '../lib/whatsapp';
import { config } from '../config';

function toQuery(f) {
  const qs = new URLSearchParams();
  Object.entries(f).forEach(([k, v]) => v != null && v !== '' && qs.set(k, v));
  return qs.toString();
}

export default function HomePage() {
  const { items, loading } = useProperties();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});

  const live = useMemo(() => items.filter((p) => p.status !== 'sold'), [items]);
  const featured = useMemo(() => {
    const f = live.filter((p) => p.featured && p.images?.length);
    return f.length ? f : live.filter((p) => p.images?.length > 3).slice(0, 4);
  }, [live]);
  const latest = useMemo(() => filterProperties(live, { sort: 'newest' }).slice(0, 6), [live]);
  const districts = useMemo(() => {
    const map = new Map();
    items.forEach((p) => {
      if (!p.district) return;
      const d = map.get(p.district) || { name: p.district, count: 0, cover: null, minPpp: null };
      d.count += 1;
      if (!d.cover && p.images?.[0]?.url) d.cover = p.images[0].url;
      if (p.pricePerPerch && (d.minPpp == null || p.pricePerPerch < d.minPpp)) d.minPpp = p.pricePerPerch;
      map.set(p.district, d);
    });
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [items]);
  const hero = featured[0];

  const go = (f) => navigate(`/listings?${toQuery(f)}`);

  return (
    <>
      <Seo
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Ray Realty',
          url: `${config.siteUrl}/`,
          publisher: { '@id': `${config.siteUrl}/#organization` },
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: `${config.siteUrl}/listings?q={search_term_string}` },
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      {/* ───────── Hero (logo blue) ───────── */}
      <section className="container-x pt-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <BrandArt variant="contours" className="rounded-4xl lg:min-h-[620px]">
            <div className="flex h-full flex-col justify-between gap-12 px-6 pb-8 pt-10 sm:px-10 lg:py-12">
              <span className="inline-flex animate-rise items-center gap-2 text-[13px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />A Raytronics Group company · since 1993
              </span>
              <div>
                <h1 className="max-w-[13ch] animate-rise text-[44px] font-light leading-[1.02] tracking-tightest sm:text-6xl xl:text-[70px]" style={{ animationDelay: '80ms' }}>
                  Buy land in Sri&nbsp;Lanka with clear deeds, <span className="text-powder/80">not guesswork.</span>
                </h1>
                <p className="mt-6 max-w-md animate-rise text-[16px] leading-relaxed text-white/70" style={{ animationDelay: '160ms' }}>
                  Every listing shows the price in LKR, the extent in perches, road access and deed status — and a real person who answers on WhatsApp.
                </p>
              </div>
              <div className="flex animate-rise flex-wrap items-center gap-3" style={{ animationDelay: '240ms' }}>
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn bg-white text-navy hover:bg-powder-soft">
                  <span className="btn-icon bg-navy text-white"><Phone className="h-3.5 w-3.5" /></span>
                  Speak with an advisor
                </a>
                <Link to="/listings" className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15">
                  <span className="btn-icon bg-white text-navy"><ArrowUpRight className="h-3.5 w-3.5" /></span>
                  {items.length ? `View ${items.length} properties` : 'View properties'}
                </Link>
              </div>
            </div>
          </BrandArt>

          <div className="relative min-h-[380px] animate-fade overflow-hidden rounded-4xl lg:min-h-[620px]">
            {hero ? (
              <Link to={propertyPath(hero)} className="group absolute inset-0 block">
                <Img src={hero.images[0].url} alt={hero.title} eager w={1600} className="absolute inset-0" imgClassName="transition-transform duration-[1.5s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div className="rounded-2xl bg-white/90 px-4 py-3 backdrop-blur">
                    <div className="text-[11px] font-medium uppercase tracking-wide text-muted">Featured · {hero.refId}</div>
                    <div className="mt-0.5 line-clamp-1 max-w-[16rem] text-sm text-ink">{hero.title}</div>
                    <div className="mt-1 text-sm font-medium text-navy">{priceParts(hero).main}{priceParts(hero).unit && <span className="font-normal text-muted"> / perch</span>}</div>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </Link>
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between bg-powder p-6 sm:p-10">
                <div>
                  <span className="chip bg-white text-navy">{loading ? 'Loading…' : 'New listings coming soon'}</span>
                  <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                    {[['30+', 'years'], ['5+', 'group companies'], ['10K+', 'clients']].map(([v, k]) => (
                      <div key={k} className="min-w-0">
                        <div className="whitespace-nowrap text-4xl font-light tracking-tight text-navy xl:text-5xl">{v}</div>
                        <div className="mt-1 whitespace-nowrap text-xs text-navy/60 sm:text-sm">{k}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Selling land or a house?', 'List it with Ray Realty — we photograph, price and promote it for you.'],
                    ['Looking to buy?', 'Tell us your area and budget. We send a shortlist the same day.'],
                  ].map(([t, d]) => (
                    <a key={t} href={whatsappLink()} target="_blank" rel="noreferrer" className="group rounded-[1.5rem] bg-white p-6 transition hover:shadow-lift">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xl font-light leading-snug tracking-tight text-ink">{t}</span>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-navy transition group-hover:rotate-45" />
                      </div>
                      <p className="mt-6 text-sm leading-relaxed text-muted">{d}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── Search ───────── */}
      <section className="container-x relative z-10 -mt-2 sm:mt-6">
        <FilterBar filters={filters} onChange={setFilters} districts={districts} compact onSubmit={go} />
        <div className="mt-4 flex flex-wrap gap-2">
          {['Colombo', 'Gampaha', 'Kandy', 'Galle', 'Kurunegala', 'Kalutara'].map((d) => (
            <button key={d} type="button" onClick={() => go({ district: d })} className="rounded-full bg-ice px-4 py-2 text-[13px] text-ink transition hover:bg-powder">
              Land in {d}
            </button>
          ))}
        </div>
      </section>

      {/* ───────── Featured ───────── */}
      {featured.length > 0 && <FeaturedShowcase list={featured} />}

      {/* ───────── Latest ───────── */}
      <section className="container-x py-20 sm:py-28">
        <SectionHead eyebrow="Latest listings" title="New on Ray Realty," soft="checked before they go live." action={<ArrowLink to="/listings">See all properties</ArrowLink>} />
        {!loading && latest.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              title="Our first listings are on their way"
              action={<a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-navy"><span className="btn-icon"><WhatsAppIcon className="h-3.5 w-3.5" /></span>Tell us what you're looking for</a>}
            >
              We're preparing verified land and homes across Sri Lanka. Message us and we'll let you know as soon as something fits.
            </EmptyState>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }, (_, i) => <PropertyCardSkeleton key={i} />)
              : latest.map((p, i) => (
                <Reveal key={p.refId} delay={(i % 3) * 80}>
                  <PropertyCard p={p} />
                </Reveal>
              ))}
          </div>
        )}
      </section>

      {/* ───────── Why ───────── */}
      <section className="container-x">
        <div className="rounded-4xl bg-powder p-6 sm:p-10 lg:p-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="text-[13px] font-medium text-navy/60">Why Ray Realty</span>
              <h2 className="display mt-3 max-w-2xl text-[32px] leading-[1.08] sm:text-[44px]">Honest numbers, clear titles and a team that picks up the phone.</h2>
            </div>
            <a href={telLink()} className="btn-navy shrink-0 self-start">
              <span className="btn-icon"><Phone className="h-3.5 w-3.5" /></span>
              Get a free consultation
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Reveal className="flex min-h-[220px] flex-col justify-between rounded-[1.75rem] bg-white p-6">
              <div className="text-6xl font-light tracking-tightest text-navy">{items.length >= 10 ? items.length : '30+'}</div>
              <div>
                <div className="text-sm font-medium">{items.length >= 10 ? 'Live listings' : 'Years behind us'}</div>
                <div className="mt-1 text-sm text-muted">{items.length >= 10 ? `Land, houses and commercial property in ${districts.length} districts.` : 'Part of the Raytronics Group, trusted in Sri Lanka since 1993.'}</div>
              </div>
            </Reveal>
            <Reveal delay={80} className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 text-white">
              {featured[1]?.images?.[0]?.url || hero?.images?.[0]?.url ? (
                <>
                  <Img src={featured[1]?.images?.[0]?.url || hero?.images?.[0]?.url} w={800} className="absolute inset-0" />
                  <div className="absolute inset-0 bg-navy/60" />
                </>
              ) : (
                <BrandArt className="absolute inset-0" />
              )}
              <div className="relative text-6xl font-light tracking-tightest">LKR</div>
              <div className="relative">
                <div className="text-sm font-medium">Prices you can compare</div>
                <div className="mt-1 text-sm text-white/75">Total price and price per perch on every listing.</div>
              </div>
            </Reveal>
            <Reveal delay={160} className="flex min-h-[220px] flex-col justify-between rounded-[1.75rem] bg-navy p-6 text-white">
              <div className="text-6xl font-light tracking-tightest">Deeds</div>
              <div>
                <div className="text-sm font-medium">Title checked first</div>
                <div className="mt-1 text-sm text-white/60">Sinnakkara / clear title, road access and utilities stated up front.</div>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <h3 className="text-2xl font-light tracking-tight">Who we help</h3>
              <p className="mt-3 max-w-md text-[15px] text-navy/70">Families building a first home, investors buying land around growing towns, and businesses looking for main-road frontage.</p>
            </div>
            <div className="space-y-2.5">
              {[
                { t: 'Build your home', s: 'Residential land and houses near schools and town', f: { landUse: 'Residential' } },
                { t: 'Invest in land', s: 'Larger plots, estates and agricultural land', f: { minSize: 40 } },
                { t: 'Commercial & business', s: 'Main-road frontage, buildings and hotels', f: { landUse: 'Commercial' } },
              ].map((x) => (
                <button key={x.t} type="button" onClick={() => go(x.f)} className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 text-left transition hover:shadow-soft">
                  <span>
                    <span className="block text-[15px] font-medium text-ink">{x.t}</span>
                    <span className="block text-[13px] text-muted">{x.s}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-navy transition group-hover:rotate-45" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Districts ───────── */}
      {districts.length > 0 && <DistrictExplorer districts={districts.slice(0, 8)} onPick={(d) => go({ district: d })} />}

      {/* ───────── Process ───────── */}
      <section className="container-x pb-20 sm:pb-28">
        <SectionHead eyebrow="How it works" title="From first call to keys," soft="in four clear steps." />
        <div className="relative mt-14">
          <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-line md:left-0 md:top-[19px] md:h-px md:w-full" />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {[
              { t: 'Tell us what you need', s: 'Call or WhatsApp with your budget, area and plan. We send a shortlist the same day.' },
              { t: 'Visit the property', s: 'We arrange site visits and walk the boundaries, road access and neighbourhood with you.' },
              { t: 'Check the deeds', s: 'Title, survey plan and approvals are checked with your lawyer before any advance.' },
              { t: 'Transfer & handover', s: 'Agreement, payment and deed transfer handled in order, with every fee clear up front.' },
            ].map((step, i) => (
              <Reveal as="li" key={step.t} delay={i * 100} className="flex gap-5 md:flex-col">
                <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-powder text-sm font-medium text-navy ring-8 ring-white">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-lg font-normal tracking-tight">{step.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{step.s}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ContactBlock image={featured[2]?.images?.[0]?.url || hero?.images?.[0]?.url} />
    </>
  );
}

/* Dark showcase card: one featured listing at a time with its gallery — like the reference's "Featured project". */
function FeaturedShowcase({ list }) {
  const [i, setI] = useState(0);
  const [img, setImg] = useState(0);
  const p = list[i % list.length];
  const price = priceParts(p);
  const step = (d) => {
    setI((v) => (v + d + list.length) % list.length);
    setImg(0);
  };
  return (
    <section className="container-x pt-20 sm:pt-28">
      <div className="rounded-4xl bg-navy p-4 text-white sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 px-2 pb-6 pt-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 text-[13px] text-white/60"><span className="h-1.5 w-1.5 rounded-full bg-brand-red" />Featured property</span>
            <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">Hand-picked this month</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">{String(i + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => step(-1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20" aria-label="Previous featured property"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => step(1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20" aria-label="Next featured property"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div key={p.refId} className="grid animate-fade gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="relative">
              <Img src={p.images[img]?.url} alt={p.title} w={1400} className="aspect-[16/10] rounded-[1.5rem]" />
              <span className="chip absolute left-4 top-4 bg-white text-ink"><MapPin className="h-3.5 w-3.5 text-brand-red" />{locationLabel(p) || 'Sri Lanka'}</span>
              <span className="chip absolute right-4 top-4 bg-black/40 text-white backdrop-blur">{String(img + 1).padStart(2, '0')} / {String(p.images.length).padStart(2, '0')}</span>
            </div>
            <div className="scrollbar-none mt-3 flex gap-3 overflow-x-auto">
              {p.images.slice(0, 8).map((im, k) => (
                <button key={im.url} type="button" onClick={() => setImg(k)} className={clsx('shrink-0 overflow-hidden rounded-xl ring-2 transition', k === img ? 'ring-powder' : 'opacity-60 ring-transparent hover:opacity-100')}>
                  <Img src={im.url} w={320} className="h-16 w-24 sm:h-20 sm:w-32" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[1.5rem] bg-white/[0.06] p-6 sm:p-8">
            <div>
              <div className="text-xs uppercase tracking-wide text-white/40">{p.refId} · {p.propertyType}</div>
              <h3 className="mt-3 text-2xl font-light leading-snug tracking-tight sm:text-[28px]">{p.title.replace(/^[^\w(]+/u, '')}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">{p.description.replace(/\n+/g, ' ')}</p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 border-t border-white/10">
              {[
                ['Price', `${price.main}${price.unit ? ' / perch' : ''}`],
                ['Extent', formatExtent(p.extentPerches) || '—'],
                ['Land use', p.landUse],
                p.pricePerPerch && p.priceTotal ? ['Total', `≈ ${formatLKR(p.priceTotal)}`] : ['Type', p.propertyType],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-white/10 py-4">
                  <dt className="text-xs text-white/40">{k}</dt>
                  <dd className="mt-1 text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappLink(p)} target="_blank" rel="noreferrer" className="btn-powder">
                <span className="btn-icon"><WhatsAppIcon className="h-3.5 w-3.5" /></span>
                Request details
              </a>
              <Link to={propertyPath(p)} className="btn bg-white text-ink hover:bg-ice">
                <span className="btn-icon bg-navy text-white"><ArrowUpRight className="h-3.5 w-3.5" /></span>
                View property
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* District list with a photo that follows the hovered district — the reference's "where to invest" block. */
function DistrictExplorer({ districts, onPick }) {
  const [active, setActive] = useState(0);
  const d = districts[active];
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="grid gap-4 overflow-hidden rounded-4xl bg-ice p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:p-8">
        <div className="flex flex-col p-2 sm:p-4">
          <span className="eyebrow">Where to buy</span>
          <h2 className="display mt-3 text-[32px] leading-[1.08] sm:text-[42px]">Districts with the most choice right now</h2>
          <p className="mt-4 max-w-md text-[15px] text-muted">Counts update live from our listings. Tap a district to see everything available there.</p>
          <ul className="mt-8 space-y-2">
            {districts.map((x, k) => (
              <li key={x.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(k)}
                  onFocus={() => setActive(k)}
                  onClick={() => onPick(x.name)}
                  className={clsx('flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition', k === active ? 'bg-powder' : 'bg-white hover:bg-white/70')}
                >
                  <span className="w-6 text-xs text-muted">{String(k + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-[16px] text-ink">{x.name}</span>
                  {x.minPpp && <span className="hidden text-xs text-muted sm:inline">from {formatLKR(x.minPpp)}/P</span>}
                  <span className="chip bg-white text-navy">{x.count} {x.count === 1 ? 'listing' : 'listings'}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" onClick={() => onPick(d.name)} className="group relative min-h-[360px] overflow-hidden rounded-[1.75rem] text-left">
          <Img key={d.name} src={d.cover} alt={`Property in ${d.name}`} className="absolute inset-0 animate-fade" imgClassName="transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
            <div>
              <div className="text-sm text-white/70">{d.count} properties</div>
              <div className="text-4xl font-light tracking-tight">{d.name}</div>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
          </div>
        </button>
      </div>
    </section>
  );
}
