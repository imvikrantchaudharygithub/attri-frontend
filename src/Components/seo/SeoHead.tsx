import Head from "next/head";
import {
  BRAND,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  absUrl,
} from "@/lib/seo/siteConfig";

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: any[];
}

// All SEO output goes through ONE <Head>. Multiple sibling next/head <Head>
// elements get partially dropped during getStaticProps static generation
// (only the first couple survive), so everything — meta tags AND every
// JSON-LD script — must live in a single Head to render reliably across
// static (○), SSG/ISR (●) and server-rendered (ƒ) pages.
export default function SeoHead({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noindex = false,
  jsonLd = [],
}: SeoHeadProps) {
  const fullTitle = title ? `${title} | ${BRAND}` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const canonical = absUrl(path);
  const ogImage = image ? absUrl(image) : DEFAULT_OG_IMAGE;
  const schemas = (jsonLd || []).filter(Boolean);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      {/* OpenGraph */}
      <meta property="og:site_name" content={BRAND} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {schemas.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </Head>
  );
}
