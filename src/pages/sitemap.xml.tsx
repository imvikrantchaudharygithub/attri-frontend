import type { GetServerSideProps } from "next";
import { getData } from "@/services/apiServices";
import { SITE_URL } from "@/lib/seo/siteConfig";

// Public, indexable routes only. Account/utility routes are excluded (noindex).
const STATIC_PATHS = ["/", "/category", "/aboutus", "/vision", "/privacypolicy"];

function urlTag(loc: string, lastmod?: string) {
  return `<url><loc>${SITE_URL}${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const parts: string[] = STATIC_PATHS.map((p) => urlTag(p));

  try {
    const cats: any = await getData("/get-product-categories");
    (cats?.data?.categories ?? []).forEach((c: any) => {
      if (c?.slug) parts.push(urlTag(`/category/${c.slug}`));
    });
  } catch {
    // ignore — still emit static + whatever else succeeds
  }

  try {
    const prods: any = await getData("/get-products");
    const list = prods?.data?.products ?? prods?.data ?? [];
    (Array.isArray(list) ? list : []).forEach((p: any) => {
      if (p?.slug) parts.push(urlTag(`/product/${p.slug}`, p?.updatedAt?.slice(0, 10)));
    });
  } catch {
    // ignore
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${parts.join(
    ""
  )}</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function SiteMap() {
  return null;
}
