import { SITE_URL, BRAND, BRAND_ALT, ORG, SOCIAL_LINKS, absUrl, DEFAULT_OG_IMAGE } from "./siteConfig";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    alternateName: BRAND_ALT,
    legalName: ORG.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/android-icon-192x192.png`,
    image: DEFAULT_OG_IMAGE,
    slogan: ORG.slogan,
    description: ORG.description,
    email: ORG.email,
    areaServed: ORG.areaServed,
    sameAs: SOCIAL_LINKS,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

type AnyProduct = Record<string, any>;

export function productSchema(p: AnyProduct, slug: string) {
  if (!p || !p.name) return null;
  const images: string[] = [];
  if (Array.isArray(p.images))
    images.push(...p.images.map((i: any) => absUrl(typeof i === "string" ? i : i?.image)).filter(Boolean));
  if (!images.length && Array.isArray(p.gallery))
    images.push(...p.gallery.map((g: any) => absUrl(g?.image)).filter(Boolean));

  const price = Number(p.price ?? p.mrp ?? 0);
  const inStock = Number(p.stock ?? 0) > 0;

  const schema: AnyProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description || undefined,
    sku: p.sku || undefined,
    image: images.length ? images : [DEFAULT_OG_IMAGE],
    brand: { "@type": "Brand", name: BRAND_ALT },
    offers: {
      "@type": "Offer",
      price: price > 0 ? price : undefined,
      priceCurrency: "INR",
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `${SITE_URL}/product/${slug}`,
    },
  };

  // Only include ratings when REAL data exists (never fabricate).
  const rating = Number(p.rating ?? 0);
  const reviewCount = Number(p.reviewCount ?? p.ratingCount ?? 0);
  if (rating > 0 && reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount,
    };
  }
  return schema;
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  if (!items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: absUrl(it.url),
    })),
  };
}

export function faqSchema(faqs: { question?: string; answer?: string }[]) {
  const valid = (faqs || []).filter((f) => f?.question && f?.answer);
  if (!valid.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
