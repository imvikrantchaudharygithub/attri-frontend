import Head from "next/head";
import {
  BRAND,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  absUrl,
} from "@/lib/seo/siteConfig";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string; // route path, e.g. "/aboutus" or "/product/onion-shampoo"
  image?: string;
  type?: "website" | "product" | "article";
  noindex?: boolean;
}

export default function Seo({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noindex = false,
}: SeoProps) {
  const fullTitle = title ? `${title} | ${BRAND}` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const canonical = absUrl(path);
  const ogImage = image ? absUrl(image) : DEFAULT_OG_IMAGE;

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
    </Head>
  );
}
