import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
  schema?: any[];
}

/**
 * SEOHead — drop this into every page/route.
 * Pass page-specific data as props.
 */
export function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogImage = "https://www.astroved.com/assets/og-default.jpg",
  ogType = "website",
  robots = "index, follow",
  schema = [], // array of JSON-LD objects (see schema.ts)
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />
      <meta name="language" content="English" />
      <meta name="author" content="AstroVed" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="AstroVed" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD structured data (one <script> per schema object) */}
      {schema.map((schemaObj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
}
