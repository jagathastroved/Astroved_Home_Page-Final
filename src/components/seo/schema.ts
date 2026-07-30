/**
 * JSON-LD schema builders. Import the ones you need per page
 * and pass them into <SEOHead schema={[...]} />
 */

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AstroVed",
  url: "https://qa.astroved.com",
  logo: "https://qa.astroved.com/assets/logo.png",
  sameAs: [
    "https://www.facebook.com/astroved",
    "https://twitter.com/astroved",
    "https://www.instagram.com/astroved",
  ],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AstroVed",
  url: "https://qa.astroved.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://qa.astroved.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const serviceSchema = ({ name, description, url, priceCurrency = "INR", price }: { name: string, description: string, url: string, priceCurrency?: string, price?: number }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  name,
  description,
  url,
  provider: {
    "@type": "Organization",
    name: "AstroVed",
  },
  ...(price && {
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
    },
  }),
});
