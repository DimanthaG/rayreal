export const PERCHES_PER_ACRE = 160;

const lkr = new Intl.NumberFormat('en-LK', { maximumFractionDigits: 0 });

/** 1250000 → "Rs. 1,250,000" */
export function formatLKR(n) {
  if (n == null || !Number.isFinite(Number(n))) return '';
  return `Rs. ${lkr.format(Math.round(n))}`;
}

/** 45500000 → "Rs. 45.5 Million" · 850000 → "Rs. 8.5 Lakhs" · 2.4e9 → "Rs. 2.4 Billion" */
export function formatLKRShort(n) {
  if (n == null || !Number.isFinite(Number(n))) return '';
  const trim = (v) => String(Math.round(v * 100) / 100);
  if (n >= 1e9) return `Rs. ${trim(n / 1e9)} Billion`;
  if (n >= 1e6) return `Rs. ${trim(n / 1e6)} Million`;
  if (n >= 1e5) return `Rs. ${trim(n / 1e5)} Lakhs`;
  return formatLKR(n);
}

/** Compact for chips & cards: "45.5M" / "850K" */
export function formatCompact(n) {
  if (n == null) return '';
  if (n >= 1e9) return `${+(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${+(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${+(n / 1e3).toFixed(0)}K`;
  return String(n);
}

/** Headline price for a listing, with the per-perch line when known. */
export function priceParts(p) {
  if (!p || p.priceOnRequest || (p.priceTotal == null && p.pricePerPerch == null)) {
    return { main: 'Price on request', sub: p?.negotiable ? 'Negotiable' : '', onRequest: true };
  }
  const isPerPerchListing = p.pricePerPerch != null;
  if (isPerPerchListing) {
    return {
      main: `${formatLKR(p.pricePerPerch)}`,
      unit: 'per perch',
      sub: p.priceTotal ? `≈ ${formatLKRShort(p.priceTotal)} total` : '',
      negotiable: p.negotiable,
    };
  }
  return { main: formatLKRShort(p.priceTotal), sub: formatLKR(p.priceTotal), negotiable: p.negotiable };
}

/** 24 → "24 perches" · 480 → "3 acres" · 508 → "3 acres 28 perches" */
export function formatExtent(perches) {
  if (perches == null || !Number.isFinite(Number(perches))) return '';
  const n = Number(perches);
  if (n < PERCHES_PER_ACRE) return `${trimNum(n)} perch${n === 1 ? '' : 'es'}`;
  const acres = Math.floor(n / PERCHES_PER_ACRE);
  const rest = Math.round((n - acres * PERCHES_PER_ACRE) * 100) / 100;
  return `${acres} acre${acres === 1 ? '' : 's'}${rest ? ` ${trimNum(rest)} perches` : ''}`;
}

export function perchesToAcres(perches) {
  return perches == null ? null : Math.round((perches / PERCHES_PER_ACRE) * 100) / 100;
}

function trimNum(n) {
  return String(Math.round(n * 100) / 100);
}

export function propertyPath(p) {
  return `/property/${p.refId}/${p.slug || ''}`.replace(/\/$/, '');
}

export function statusLabel(s) {
  return { available: 'Available', reserved: 'Reserved', sold: 'Sold' }[s] || 'Available';
}

export function locationLabel(p) {
  return [p.city, p.district && p.district !== p.city ? `${p.district} District` : ''].filter(Boolean).join(', ');
}
