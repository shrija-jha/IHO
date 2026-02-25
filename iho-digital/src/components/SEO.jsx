import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = "https://ihodigital.com";

const toAbsoluteUrl = (value) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${normalizedPath}`;
};

const SEO = ({ 
  title, 
  description, 
  canonical,
  url,
  image = "https://ihodigital.com/img/logo-bg.png",
  ogType = "website",
  ogTitle,
  ogDescription,
  ogSiteName = "IHO Digital",
  ogLocale = "en_US",
  instagramCard = "summary_large_image",
  instagramTitle,
  instagramDescription,
  instagramSite = "@iho_digital",
  instagramCreator = "@iho_digital",
  instagramImage,
  hreflang = "en-us",
  schemaType,
  schemaName,
  schemaDescription,
  schemaProvider = "IHO Digital",
  schemaOrganization = "IHO Digital",
  robots,
  noindex = false,
  nofollow = false
}) => {
  const location = useLocation();

  // Auto-generate canonical URL if not provided
  const routeCanonical = `${SITE_URL}${location.pathname === '/' ? '' : location.pathname}`;
  const canonicalUrl = toAbsoluteUrl(canonical || url) || routeCanonical;
  const imageUrl = toAbsoluteUrl(image) || image;
  const robotsContent = robots || `${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`;
  
  // Use provided values or fall back to main values
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalInstagramTitle = instagramTitle || title;
  const finalInstagramDescription = instagramDescription || description;
  const finalInstagramImage = toAbsoluteUrl(instagramImage || image) || imageUrl;
  const finalSchemaName = schemaName || title;
  const finalSchemaDescription = schemaDescription || description;

  // Build schema object
  const schemaData = schemaType ? {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": finalSchemaName,
    "description": finalSchemaDescription,
    "url": canonicalUrl,
    "image": imageUrl,
    "provider": {
      "@type": "Organization",
      "name": schemaProvider
    },
    "organization": {
      "@type": "Organization",
      "name": schemaOrganization
    }
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate Hreflang */}
      <link rel="alternate" hrefLang={hreflang} href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={ogLocale} />
      
      {/* Instagram/Twitter Card Tags */}
      <meta name="twitter:card" content={instagramCard} />
      <meta name="twitter:title" content={finalInstagramTitle} />
      <meta name="twitter:description" content={finalInstagramDescription} />
      <meta name="twitter:site" content={instagramSite} />
      <meta name="twitter:creator" content={instagramCreator} />
      <meta name="twitter:image" content={finalInstagramImage} />
      
      {/* Schema.org Markup */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
