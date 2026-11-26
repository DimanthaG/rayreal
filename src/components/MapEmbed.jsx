import { ExternalLink, MapPin } from 'lucide-react';
import { config } from '../config';

/** Extracts "lat,lng" from Google Maps URLs like .../@6.84,79.92,17z or ?q=6.84,79.92 */
export function coordsFromMapUrl(url) {
  if (!url) return null;
  const m = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || url.match(/[?&](?:q|query|ll)=(-?\d+\.\d+),\s*(-?\d+\.\d+)/) || url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  return m ? { lat: Number(m[1]), lng: Number(m[2]) } : null;
}

export function mapQuery(p) {
  const c = p.lat != null && p.lng != null ? { lat: p.lat, lng: p.lng } : coordsFromMapUrl(p.mapUrl);
  if (c) return { q: `${c.lat},${c.lng}`, exact: true };
  const text = [p.address, p.city, p.district, 'Sri Lanka'].filter(Boolean).join(', ');
  return { q: text, exact: false };
}

export function directionsUrl(p) {
  if (p.mapUrl && /^https?:\/\//.test(p.mapUrl)) return p.mapUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery(p).q)}`;
}

export default function MapEmbed({ p, className = '' }) {
  const { q, exact } = mapQuery(p);
  const src = config.mapsKey
    ? `https://www.google.com/maps/embed/v1/place?key=${config.mapsKey}&q=${encodeURIComponent(q)}&zoom=${exact ? 16 : 13}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${exact ? 16 : 13}&output=embed`;
  return (
    <div className={`relative overflow-hidden rounded-4xl bg-ice ${className}`}>
      <iframe title={`Map of ${p.title}`} src={src} className="h-full min-h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
        <span className="chip pointer-events-auto bg-white text-ink shadow-soft">
          <MapPin className="h-3.5 w-3.5 text-brand-red" />
          {exact ? 'Exact location' : 'Approximate area'}
        </span>
        <a href={directionsUrl(p)} target="_blank" rel="noreferrer" className="chip pointer-events-auto bg-navy text-white shadow-soft">
          Open in Google Maps <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
