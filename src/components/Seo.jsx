import { Helmet } from 'react-helmet-async';
import { config } from '../config';

export default function Seo({ title, description, image, path = '', type = 'website', jsonLd, noindex }) {
  const fullTitle = title ? `${title} | Ray Realty` : 'Ray Realty — Land & property for sale in Sri Lanka';
  const desc = (description || 'Verified land, houses and commercial property across Sri Lanka. Prices in LKR, extent in perches, one-tap WhatsApp enquiries.').slice(0, 160);
  const url = `${config.siteUrl}${path}`;
  const img = image && image.startsWith('http') ? image : `${config.siteUrl}${image || '/logo.png'}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:site_name" content="Ray Realty" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
