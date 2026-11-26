/**
 * Vercel Routing Middleware — link previews for property pages.
 *
 * WhatsApp, Facebook, LinkedIn and X don't run JavaScript, so they would only ever see the
 * default site title. For /property/RR-xxxx/... this fetches the listing from the API and writes
 * its title, description, price and cover photo into the HTML <head> before it is sent.
 * Browsers get exactly the same page; React takes over as usual.
 *
 * If anything fails (API asleep, listing missing), the normal page is served unchanged.
 */
export const config = { matcher: ['/property/:path*'] };

const API = (process.env.API_BASE_URL || process.env.VITE_API_BASE_URL || 'https://rayreal-backend.onrender.com').replace(/\/$/, '');
const SITE = (process.env.VITE_SITE_URL || 'https://www.rayrealtysl.com').replace(/\/$/, '');

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lkr = (n) => `Rs. ${Math.round(n).toLocaleString('en-US')}`;
const short = (n) => (n >= 1e6 ? `Rs. ${Math.round((n / 1e6) * 100) / 100} Million` : lkr(n));

export function priceText(p) {
  if (p.priceOnRequest || (p.priceTotal == null && p.pricePerPerch == null)) return 'Price on request';
  if (p.pricePerPerch != null) return `${lkr(p.pricePerPerch)} per perch`;
  return short(p.priceTotal);
}

export function shareImage(url) {
  if (!url) return `${SITE}/og-image.jpg`;
  if (!url.includes('res.cloudinary.com/') || !url.includes('/image/upload/')) return url;
  return url.replace('/image/upload/', '/image/upload/c_fill,g_auto,w_1200,h_630,f_jpg,q_auto/');
}

/** Returns the page HTML with this listing's tags in <head>. Exported for tests. */
export function injectMeta(html, p, pageUrl) {
  const title = `${String(p.title || 'Property').replace(/^[^\w(]+/u, '')} — ${priceText(p)} | Ray Realty`;
  const where = [p.city, p.district && `${p.district} District`].filter(Boolean).join(', ') || 'Sri Lanka';
  const extent = p.extentPerches ? `${p.extentPerches} perches · ` : '';
  const desc = `${p.propertyType || 'Property'} for sale in ${where}. ${extent}${String(p.description || '').replace(/\s+/g, ' ')}`.slice(0, 160);
  const img = shareImage(p.images?.[0]?.url);
  const tags = [
    `<meta data-rh="true" name="description" content="${esc(desc)}" />`,
    `<link data-rh="true" rel="canonical" href="${esc(pageUrl)}" />`,
    `<meta data-rh="true" property="og:type" content="article" />`,
    `<meta data-rh="true" property="og:title" content="${esc(title)}" />`,
    `<meta data-rh="true" property="og:description" content="${esc(desc)}" />`,
    `<meta data-rh="true" property="og:url" content="${esc(pageUrl)}" />`,
    `<meta data-rh="true" property="og:image" content="${esc(img)}" />`,
    `<meta data-rh="true" property="og:image:width" content="1200" />`,
    `<meta data-rh="true" property="og:image:height" content="630" />`,
    `<meta data-rh="true" name="twitter:title" content="${esc(title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${esc(desc)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${esc(img)}" />`,
  ].join('\n    ');
  // Drop the defaults these replace, then insert ours.
  const replaced = /(name="(description|twitter:title|twitter:description|twitter:image)"|property="og:(type|title|description|url|image|image:width|image:height)"|rel="canonical")/;
  const cleaned = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .split('\n')
    .filter((line) => !(/<(meta|link) data-rh="true"/.test(line) && replaced.test(line)))
    .join('\n');
  return cleaned.replace('</head>', `    ${tags}\n  </head>`);
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const m = url.pathname.match(/^\/property\/(RR-\d{4,})/i);
  if (!m) return undefined;
  try {
    const [pageRes, apiRes] = await Promise.all([
      fetch(new URL('/index.html', url)),
      fetch(`${API}/api/properties/${m[1].toUpperCase()}`, { signal: AbortSignal.timeout(4000) }),
    ]);
    if (!pageRes.ok || !apiRes.ok) return undefined;
    const [html, property] = await Promise.all([pageRes.text(), apiRes.json()]);
    const pageUrl = `${SITE}${url.pathname}`;
    return new Response(injectMeta(html, property, pageUrl), {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch {
    return undefined; // serve the normal page
  }
}
