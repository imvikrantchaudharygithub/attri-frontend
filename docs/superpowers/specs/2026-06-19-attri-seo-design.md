# Attri Industries — SEO Foundation (Pages Router)

**Date:** 2026-06-19
**Project:** `attri-frontend` (Next.js 15.1.6, **Pages Router**, React 19, Tailwind, Redux, Vercel)
**Domain:** `https://attriindustries.com` · **API:** `https://api.attriindustries.com/api`
**Business:** Natural/Ayurvedic personal care & wellness (Hair, Skin, Wellness, Kitchen Masale) with a direct-selling / referral ("Opportunity Awaits", referral signup, withdraw, miles) model.

> **Guiding constraint (user):** *"Nothing should break, don't make any mistake."* Every change is additive and verified. The one structural change (product page → SSR) preserves all existing client behavior (cart, redux, add-to-cart).

---

## 1. Context & why this is not a copy of the crypto-mining SEO work

The crypto-mining project was **App Router**. Its entire SEO playbook — `app/layout.tsx` `metadata` exports, `generateMetadata`, `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, JSON-LD in server components — is **App-Router-only API**. `attri-frontend` is **Pages Router**, so each technique is re-implemented the Pages-Router way:

| Crypto (App Router) | Attri (Pages Router) equivalent |
|---|---|
| `metadata` export in `layout.tsx` | `<Seo>` component using `next/head` |
| `generateMetadata` per page | data-fetch (`getServerSideProps`/`getStaticProps`) + `<Seo>` |
| `app/sitemap.ts` | `src/pages/sitemap.xml.tsx` (`getServerSideProps`) |
| `app/robots.ts` | `public/robots.txt` (static) |
| `app/manifest.ts` | `public/manifest.json` (already exists) |
| JSON-LD in server component | `<JsonLd>` → `<script type="application/ld+json">` in `next/head` |

## 2. Current state (audited)

- **Zero SEO today:** no `next/head` usage anywhere, no JSON-LD, no `robots.txt`, no `sitemap.xml`. `_document.tsx` has only favicons + a generic `theme-color`.
- **Render strategy:** Home (`getStaticProps` ISR ✓), Category (`getStaticProps` + `getStaticPaths` ✓) are server-rendered. **Product detail (`product/[[...productslug]].tsx`) fetches client-side via `useEffect`** → ships an empty shell to crawlers, social scrapers, and AI bots. **This is the #1 problem.**
- **Product API fields available:** `name, slug, sku, description, mrp, price, discount, distributionamount, images[], gallery[], stock, rating (mostly 0, no reviews array), tags[], ingredients[], info[], faqs[], category{name}`.
- `next.config.ts` has `images.unoptimized: true` (CWV/LCP concern — out of scope, flagged as follow-up).
- Favicons + `manifest.json` already present in `public/`.

## 3. Scope (agreed)

**In:** Core on-page SEO + GEO/AI layer.
**Out:** Off-site work (GSC/Merchant Center/GBP/Bing) — a short "after deploy" note only, not a full guide.
**Positioning:** Ayurvedic product/shopping intent **plus** the direct-selling/opportunity angle surfaced in Organization schema + copy.

## 4. Architecture — 4 primitives, then wire pages

### 4.1 `src/lib/seo/siteConfig.ts` — single source of truth
Exports a typed config: `SITE_URL` (`https://attriindustries.com`), brand name + alias, default title/description, `DEFAULT_OG_IMAGE`, social URLs (`sameAs`), Organization facts (legal name, slogan, direct-selling description, contact), and helper `absUrl(path)`. Every other file reads from here — no hard-coded domains.

### 4.2 `src/Components/Seo.tsx` — meta via `next/head`
Props: `title?`, `description?`, `path` (→ absolute canonical), `image?`, `type?` (`website`|`product`|`article`), `noindex?`.
Renders: `<title>` (template `"%s | Attri Industries"`, bare brand string on home), `meta description`, `link rel=canonical`, full OpenGraph (`og:title/description/url/image/type/site_name/locale=en_IN`), Twitter `summary_large_image`, and `robots` (`index,follow` or `noindex,nofollow`).

### 4.3 JSON-LD — `src/lib/seo/schema.ts` (builders) + `src/Components/seo/JsonLd.tsx` (renderer)
`JsonLd` renders `<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />` inside `next/head`. Builders (pure functions, return plain objects):

- **`organizationSchema()`** + **`websiteSchema()`** — global, rendered once on every page via `_app.tsx`. Organization includes `name`, `alternateName`, `url`, `logo`, `sameAs[]`, `slogan`, `description` (with the direct-selling/opportunity framing). WebSite includes `potentialAction` → `SearchAction` pointing at `/search/{query}`.
- **`productSchema(product)`** — `@type: Product`, `name`, `image` (from `images[]`/`gallery[]`, absolute URLs), `description`, `sku`, `brand: {@type: Brand, name: "Attri"}`, `offers: {@type: Offer, price (>0, from price||mrp), priceCurrency: "INR", availability: stock>0 ? schema.org/InStock : schema.org/OutOfStock, url, itemCondition: NewCondition}`. **`aggregateRating` included ONLY when `rating > 0` AND a real review count exists** (else omitted — Google requires genuine ratings; faking violates policy).
- **`breadcrumbSchema(items)`** — `BreadcrumbList`: Home › Category › Product.
- **`faqSchema(faqs)`** — `FAQPage` from `product.faqs` (each `{question, answer}` → `Question`/`acceptedAnswer`). Rendered only when `faqs.length > 0`.

### 4.4 Generators
- **`src/pages/sitemap.xml.tsx`** — `getServerSideProps`: fetch categories + products from the live API, build XML (static routes + category routes + product routes with `lastmod`), `res.setHeader('Content-Type','text/xml')`, write, return `{props:{}}`. Wrapped in try/catch → on API failure, emit at least the static routes (never 500). Component returns `null`.
- **`public/robots.txt`** — static: `User-agent: *`, `Allow: /`, `Disallow:` the utility paths (see §5), `Sitemap: https://attriindustries.com/sitemap.xml`.
- **`public/llms.txt`** — `text/plain` Markdown: H1 `# Attri Industries`, blockquote summary, H2 sections (`## Shop by category`, `## About & opportunity`, `## Policies`) linking category/hub pages (NOT every product — must not duplicate sitemap). Served statically by Vercel.

## 5. Per-page wiring

| Page | Action |
|---|---|
| `product/[[...productslug]].tsx` | **Convert `useEffect` fetch → `getServerSideProps`** (fetch `/get-product/{slug}`); pass `product` as prop; `notFound: true` when missing → real 404. Component keeps all redux/cart logic but reads initial data from props. Add `<Seo type="product">` (title `product.name`, description from `product.description`, canonical, image) + Product + Breadcrumb + FAQPage JSON-LD. |
| `category/[[...category]].tsx` | Add `<Seo>` per-category (title `"{Category} — Ayurvedic …"`, canonical) + BreadcrumbList. Already SSG — no fetch change. |
| `index.tsx` | Add `<Seo>` home (already SSG). Global Org/WebSite covers Knowledge Panel + SearchAction. |
| `aboutus`, `vision`, `teams`, `offers`, `privacypolicy` | Tailored `<Seo>` each (unique title + description + canonical). |
| `cart`, `myaccount`, `myaddress`, `order`, `orderdetail`, `thankyou`, `withdraw`, `signup`, `search` | `<Seo noindex>` — keep private/utility pages out of the index. (Also `Disallow`ed in robots.txt.) |

## 6. Assets / housekeeping
- Verify favicons are **square** (crypto lesson: non-square → Google shows a globe fallback). Current set are standard square sizes — confirm, no change expected.
- Create branded **`public/og-image.png` (1200×630)** — none exists today (needed for social/link previews). Generate from brand colors + logo via PIL, or reuse an existing banner if suitable.
- `_document.tsx`: add default `og:site_name`/locale defaults only if not better handled by `<Seo>`; keep all existing icon links untouched.

## 7. GEO / AI-search layer
- **FAQPage schema** from real `product.faqs` (already in data) → eligible for AI Overview citation + FAQ rich results.
- **`llms.txt`** for ChatGPT/Perplexity/Claude crawlers.
- **Self-contained answers:** ensure FAQ answers read as standalone 40–60-word blocks (content already exists per product; no fabrication).
- **Conditional AggregateRating** — wired to switch on automatically when real ratings/reviews land (graceful, like crypto's "when data lands" approach).
- **No keyword stuffing** (harmful per 2026 guidance) — natural, descriptive copy.

## 8. Risks & mitigations
| Risk | Mitigation |
|---|---|
| SSR conversion breaks cart/add-to-cart/redux | Keep the entire existing component body; only swap the data source (props instead of `useEffect`). Manually diff behavior; `next build` + live HTML curl. |
| API down at request time (product GSSP / sitemap GSSP) | try/catch everywhere: product → graceful fallback or `notFound`; sitemap → emit static routes, never 500. |
| Wrong/relative image URLs in schema | `absUrl()` helper forces absolute `https://attriindustries.com/...` or passes through Cloudinary absolute URLs. |
| Fake ratings → Google manual action | `aggregateRating` omitted unless real `rating>0` + review count. |
| `noindex` on a page that should rank | Explicit allow/deny table in §5; verified against robots.txt. |
| Touching `images.unoptimized` breaks live images | Out of scope — flagged only. |

## 9. Verification plan (before claiming done)
1. `npm run build` passes clean (no type/lint break; lint already `ignoreDuringBuilds`).
2. `curl` rendered product-page HTML → assert `<title>`, `meta description`, `canonical`, OG tags, and Product + FAQ JSON-LD are present **in server HTML** (the point of the SSR conversion).
3. Paste Product/Organization JSON-LD into Google Rich Results Test (or validate structure against §4.3 / Google merchant-listing requirements).
4. `GET /sitemap.xml` returns valid XML with real product + category URLs; `GET /robots.txt` and `GET /llms.txt` resolve with correct content.
5. Spot-check 2–3 indexable pages + 1 noindex page for correct robots meta.

## 10. Out of scope (noted, not done)
- Google Search Console / Merchant Center / Google Business Profile / Bing setup (off-site, user-driven) — 4-line "after deploy" note only.
- Core Web Vitals / `images.unoptimized` — follow-up.
- Backlinks, content hub / `/learn`, reviews engine.

---
*Canonical host decision:* `https://attriindustries.com` (non-www).
*Currency:* ₹ INR throughout schema (`priceCurrency: "INR"`).
