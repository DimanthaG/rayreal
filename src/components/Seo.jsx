import { Helmet } from 'react-helmet-async';
import { config } from '../config';

const DEFAULT_DESC =
  'Buy land, houses and commercial property across Sri Lanka with Ray Realty, a Raytronics Group company. Prices in LKR, extent in perches, clear deeds and instant WhatsApp enquiries.';

const abs = (u) => (!u ? `${config.siteUrl}/og-image.jpg` : /^https?:\/\//.test(u) ? u : `${config.siteUrl}${u.startsWith('/') ? '' : '/'}${u}`);

/** Breadcrumb JSON-LD helper: crumbs = [['Home','/'], ['Properties','/listings'], ...] */
export function breadcrumbLd(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${config.siteUrl}${path}` })),
  };
}

/**
 * Per-page SEO: title, description, canonical, Open Graph / Twitter cards and JSON-LD.
 * @param {string}   title       page title (without the brand)
 * @param {string}   description up to ~160 characters
 * @param {string}   path        canonical path, e.g. "/listings?type=Land"
 * @param {string}   image       absolute or site-relative image URL (1200×630 ideal)
 * @param {object|object[]} jsonLd structured data
 */
export default function Seo({ title, description, image, path = '/', type = 'website', jsonLd, noindex }) {
  const fullTitle = title ? `${title} | Ray Realty` : 'Ray Realty — Land & Property for Sale in Sri Lanka';
  const desc = (description || DEFAULT_DESC).replace(/\s+/g, ' ').trim().slice(0, 160);
  const url = `${config.siteUrl}${path}`;
  const img = abs(image);
  const ld = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content="Ray Realty" />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_LK" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
}
