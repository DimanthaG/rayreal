import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { BedDouble, Bath, MapPin, Maximize2 } from 'lucide-react';
import { Img, StatusBadge } from './ui';
import { formatExtent, locationLabel, priceParts, propertyPath } from '../lib/format';

export default function PropertyCard({ p, eager = false, className }) {
  const price = priceParts(p);
  const cover = p.images?.[0]?.url;
  return (
    <Link
      to={propertyPath(p)}
      className={clsx('group block rounded-4xl bg-white p-2 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift', className)}
    >
      <div className="relative">
        <Img
          src={cover}
          alt={p.title}
          eager={eager}
          w={800}
          sizes="(min-width:1024px) 420px, (min-width:640px) 50vw, 100vw"
          className="aspect-[4/3] rounded-[1.5rem]"
          imgClassName={clsx('transition-transform duration-700 group-hover:scale-[1.04]', p.status === 'sold' && 'grayscale-[60%]')}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <StatusBadge status={p.status} />
          {p.featured && p.status !== 'sold' && <span className="chip bg-navy text-white">Featured</span>}
        </div>
        {p.images?.length > 1 && (
          <span className="chip absolute bottom-3 right-3 bg-black/45 text-white backdrop-blur">{p.images.length} photos</span>
        )}
      </div>

      <div className="px-3 pb-3 pt-4">
        <div className="flex items-center gap-1.5 text-[13px] text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{locationLabel(p) || 'Sri Lanka'}</span>
        </div>
        <h3 className="mt-1.5 line-clamp-2 min-h-[2.6em] text-[17px] font-normal leading-snug tracking-tight text-ink">{p.title.replace(/^[^\w(]+/u, '')}</h3>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-4">
          <div className="min-w-0">
            <div className={clsx('truncate text-lg font-medium tracking-tight', price.onRequest ? 'text-muted' : 'text-navy')}>
              {price.main}
              {price.unit && <span className="ml-1 text-xs font-normal text-muted">/ perch</span>}
            </div>
            {(price.sub || price.negotiable) && (
              <div className="truncate text-xs text-muted">
                {price.sub}
                {price.negotiable && <span className="ml-1 text-brand-red">· Negotiable</span>}
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3 text-[13px] text-muted">
            {p.extentPerches != null && (
              <span className="flex items-center gap-1" title="Land extent"><Maximize2 className="h-3.5 w-3.5" />{formatExtent(p.extentPerches).replace(' perches', 'P').replace(' perch', 'P')}</span>
            )}
            {p.bedrooms ? <span className="flex items-center gap-1" title="Bedrooms"><BedDouble className="h-3.5 w-3.5" />{p.bedrooms}</span> : null}
            {p.bathrooms ? <span className="hidden items-center gap-1 sm:flex" title="Bathrooms"><Bath className="h-3.5 w-3.5" />{p.bathrooms}</span> : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-4xl bg-white p-2 shadow-soft">
      <div className="aspect-[4/3] animate-pulse rounded-[1.5rem] bg-ice" />
      <div className="space-y-3 px-3 pb-3 pt-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-ice" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-ice" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-ice" />
      </div>
    </div>
  );
}
