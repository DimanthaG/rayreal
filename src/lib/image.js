/**
 * Cloudinary delivery URLs. Listings store the plain secure_url
 *   https://res.cloudinary.com/<cloud>/image/upload/v123/rayreality/properties/rr-0001-01.jpg
 * and we insert a transformation when displaying it:
 *   …/image/upload/f_auto,q_auto,c_limit,w_800/v123/…
 * f_auto serves WebP/AVIF where supported, q_auto picks the quality, w_ limits the width.
 * Non-Cloudinary URLs (demo data, data: URLs) are returned unchanged.
 */
export function cld(url, width = 1200) {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com/') || !url.includes('/image/upload/')) return url;
  const [head, tail] = url.split('/image/upload/');
  // Already transformed (first segment has commas or known params) → leave as is.
  if (/^[a-z]{1,3}_[^/]*\//.test(tail) && !/^v\d+\//.test(tail)) return url;
  const w = Math.round(Math.min(Math.max(width, 64), 2400));
  return `${head}/image/upload/f_auto,q_auto,c_limit,w_${w}/${tail}`;
}

/** srcset for responsive images (Cloudinary only). */
export function cldSrcSet(url, widths = [480, 800, 1200, 1600]) {
  if (!url || !url.includes('res.cloudinary.com/')) return undefined;
  return widths.map((w) => `${cld(url, w)} ${w}w`).join(', ');
}
