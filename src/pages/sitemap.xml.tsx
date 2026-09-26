import type { GetServerSideProps } from "next";
import { getData } from "@/services/apiServices";
import { SITE_URL } from "@/lib/seo/siteConfig";

// Public, indexable routes only. Account/utility routes are excluded (noindex).
const STATIC_PATHS = ["/", "/category", "/aboutus", "/vision", "/earn-from-instagram", "/help-center", "/privacypolicy"];

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function urlTag(loc: string, lastmod?: string, images: string[] = []) {
  const imgs = images.map((src) => `<image:image><image:loc>${esc(src)}</image:loc></image:image>`).join("");
  return `<url><loc>${esc(`${SITE_URL}${loc}`)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}${imgs}</url>`;
}

const isActive = (x: any) => !x?.status || x.status === "active";
const day = (d?: string) => (typeof d === "string" ? d.slice(0, 10) : undefined);

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const parts: string[] = STATIC_PATHS.map((p) => urlTag(p));

  try {
    const cats: any = await getData("/get-product-categories");
    (cats?.data?.categories ?? []).filter(isActive).forEach((c: any) => {
      if (c?.slug) parts.push(urlTag(`/category/${c.slug}`, day(c?.updatedAt)));
    });
  } catch {
    // ignore — still emit static + whatever else succeeds
  }

  try {
    const prods: any = await getData("/get-products");
    const list = prods?.data?.products ?? prods?.data ?? [];
    (Array.isArray(list) ? list : []).filter(isActive).forEach((p: any) => {
      if (!p?.slug) return;
      const images = (Array.isArray(p?.images) ? p.images : []).filter((i: any) => typeof i === "string" && i).slice(0, 5);
      parts.push(urlTag(`/product/${p.slug}`, day(p?.updatedAt), images));
    });
  } catch {
    // ignore
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${parts.join(
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
