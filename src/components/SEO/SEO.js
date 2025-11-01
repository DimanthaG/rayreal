import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  image = 'https://server-realty.vercel.app/api/proxy?url=YOUR_DEFAULT_IMAGE_URL',
  url = 'https://rayrealty.lk',
  type = 'website'
}) => {
  const siteTitle = 'RayRealty - Your Dream Property Awaits';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph meta tags for social sharing */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="RayRealty" />

      {/* Structured Data for Rich Results */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "RayRealty",
          "description": "Your one-stop destination for finding your dream property in Sri Lanka",
          "url": "https://rayrealty.lk",
          "logo": "YOUR_LOGO_URL",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "86, Old Kottawa Road",
            "addressLocality": "Mirihana, Nugegoda",
            "addressRegion": "Western Province",
            "addressCountry": "LK"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 