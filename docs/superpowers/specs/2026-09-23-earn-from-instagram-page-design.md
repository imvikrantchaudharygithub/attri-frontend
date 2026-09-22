# Earn from Instagram — landing page, SEO plan and asset brief

**Date:** 2026-09-23
**Route:** `https://attriindustries.com/earn-from-instagram`
**Repos touched:** `attri-frontend` (page + shell), `atrri-backend` and `attri-admin` (optional banner link, additive)
**Status:** Merged to `main` and pushed 2026-09-23; not yet deployed to the droplet.

## 1. What this page is for

A public, indexable guide that ranks for the "how to earn money from Instagram" cluster in India and converts small-account creators into free Attri signups. The offer: post a story with your Attri QR code and referral code; earn 25% of a product's distribution value on direct sales and 21/18/12/9/7/5% on levels 2–7 of your team.

Everything on the page is verified against the code:

| Claim on the page | Source |
|---|---|
| 25/21/18/12/9/7/5% across 7 levels of the **distribution value** | `atrri-backend/src/services/priceDistribution.ts` (`generationPercentages`), called with `order.distributionamountTotal` in `paymentController.ts`. Identical on `origin/main` (deployed). The previous table was `[11, 9, 7, 5, 3, 2, 1]`, replaced 2026-02-27 in commit `ef81da3`. It is the only percentage table in the backend; there is no settings store for it. |
| Distribution value is per product | `Product.distributionamount` (live values: Mega Combo ₹700, Berry Juice ₹300, Green Juice ₹260, Glutathione ₹150, Onion Shampoo ₹100 …) |
| ₹10 to referrer at signup, ₹200 cashback to new member | `userController.ts` constants |
| 10% cashback ≥ ₹299, free delivery ≥ ₹699 | `src/lib/cartConfig.ts` |
| Minimum withdrawal ₹100 | `withdrawalController.ts` |
| Signup works without an invite (suggested codes) | `signup/[[...referralCode]].tsx` `recommendedUsers` |
| Commission credited when the order is **paid** | `verifyPayment` / `razorpayWebhook` |

## 2. Decisions

1. **Slug `/earn-from-instagram`** (not `/how-to-earn-money-from-instagram`). Exact-match slugs are a weak signal; a short slug is speakable in a story ("attriindustries dot com slash earn from instagram") and fits a QR label. Alternatives considered: `/instagram-earning-program`, `/creator-program`.
2. **Programme name: Attri Creator Program.** Uses Instagram's own vocabulary ("Creator account").
3. **Title:** `How to Earn Money from Instagram in India | Attri Industries` (59 chars). **H1:** "How to earn money from Instagram in India, even with a small account". Meta description 143 chars: mechanism, the 25% number, 7 levels, and the two objections (free, no follower minimum). FAQ questions are `<h3>`s inside `<summary>` so each Hinglish/English question is a heading.
4. **Content shape:** hero, then the **calculator directly under the hero** (Vikrant's call, 2026-09-23: let people work out their number before reading), then the short answer, the honest comparison of six methods, and the rest of the offer. Google's helpful-content and E-E-A-T signals reward pages that serve the query, not just the pitch; the comparison table and the "read this first" section are the trust layer.
5. **Structured data:** BreadcrumbList, Article, HowTo, FAQPage. FAQ and HowTo rich results are gone from Google SERPs (HowTo Sept 2023, FAQ restricted Aug 2023 and removed May 2026), so these are for machine understanding and AI answers, not for stars in the SERP. FAQ text in the schema is identical to the visible FAQ.
6. **Body must be in server HTML.** Verified on the live site that `PersistGate` returns null on the server, so every page body is invisible to crawlers (About page: 5 KB, no `<h1>`). `_app.tsx` now renders `SSR_BODY_ROUTES` (this route) outside the gate, and `store.ts` uses `manualPersist` with `persistor.persist()` called after mount so the first client render always matches the server HTML. Other routes are unchanged. **Follow-up with large upside:** add `/`, `/aboutus`, `/vision`, `/category/*`, `/product/*` to `SSR_BODY_ROUTES` after a QC pass.
7. **Design:** Attri palette (purple `#8B35B8`, deep `#5C1F82`, cream `#FAF9FF`, gold `#D4A847` for money) with the Instagram story-ring gradient (`#F9CE34 → #EE2A7B → #6228D7`) as one accent device: the phone frame halo, the avatar ring and the hairline under the H1. The phone mockup is the single bold element; its QR code is real (encodes the signup URL). No card-kit: table, ladder bars, timeline, native `<details>` FAQ, product grid.
8. **Calculator models levels 1 and 2 only**, from live distribution values, with an explicit "illustration, not a promise" line. Levels 3–7 are described, not simulated.
9. **Do not put Tailwind `py-*`/`max-w-*` on an element that also has the global `container` class.** `globals.css` defines `.container { max-width: 95%; padding: 0 15px }` after `@tailwind utilities`, so it silently overrides those utilities. Sections on this page carry their own vertical padding and use `mx-auto w-full max-w-6xl px-5` instead.
10. **Contact block** above the closing CTA: WhatsApp (leads, prefilled message), call, email, short address with a link to the Help Center map. Details come from the new shared `src/lib/contact.ts`, which the Help Center page now imports too, so the number lives in one place. The Article schema's publisher carries a `ContactPoint` (phone, email, en/hi).
11. **Hindi / English toggle** in the breadcrumb row (Vikrant's ask, 2026-09-23). All copy lives in `src/lib/earnCopy.ts` as one typed shape with `en` and `hi` objects, so a string cannot exist in one language only; functions take live numbers. The server always renders English (the indexed version); `?lang=hi` or a saved `localStorage` choice (`attri.earnLang`) switches after mount, so hydration never mismatches. Switching also updates the URL (`?lang=hi`, shallow) so a Hindi link can be shared, and sets `<html lang>` plus `lang` on the article. Hindi mode loads Noto Sans Devanagari (imported at the top of `earn-instagram.css`) and drops the negative letter-spacing and tightens nothing: Devanagari headings get line-height 1.2–1.4. Schema and meta stay English. A separately indexable Hindi URL with `hreflang` remains the SEO follow-up; the toggle is for readers, not for ranking.
12. **Banner link:** `Banner.link` (optional, validated to a relative path or https URL) + admin input + `HomeBanner` honours it. Existing banners keep linking to `/`.

## 3. Files

- `src/pages/earn-from-instagram.tsx` — page, `getStaticProps` (ISR 1 h, `/get-products`, fallback snapshot), SEO props, schemas
- `src/Components/earn-instagram/StoryPhone.tsx`, `LevelLadder.tsx`, `EarningsCalculator.tsx`, `LangToggle.tsx`
- `src/lib/earnCopy.ts` — every string on the page in English and Hindi
- `src/lib/earnPlan.ts` — LEVEL_PERCENTS, reward constants, formatter, fallback products
- `src/lib/contact.ts` — phone, WhatsApp, email, address (shared with `help-center.tsx`)
- `src/styles/earn-instagram.css` — `.ei-*` scoped styles (imported in `_app.tsx`)
- `src/pages/_app.tsx` — `SSR_BODY_ROUTES`, `persistor.persist()` after mount, CSS import
- `src/store/store.ts` — `manualPersist`
- `src/pages/sitemap.xml.tsx`, `public/llms.txt`, `footer.tsx`, `header.tsx` (mobile menu), `myaccount.tsx` (link under Share & earn), `About.tsx` (link in the Opportunity card)
- `src/Components/HomeBanner.tsx` — `href={item.link || "/"}`
- `public/assets/images/earn-instagram/og.png` — placeholder 1200×630, replace with the generated asset (same path)
- Backend: `models/banner.model.ts`, `controllers/bannerController.ts`. Admin: `pages/home-details/*`

## 4. Ranking plan (what to do after deploy)

**Honest expectation.** The head term "how to earn money from Instagram" is owned by Shopify, Hootsuite, Later and large Indian blogs. Page one for it is a 12–18 month, backlink-driven effort. Wins in the first 90 days come from long-tail and Hinglish queries where intent matches the offer and competition is thin.

**Primary targets (weeks 0–12):**
- earn money from instagram story / earn from instagram stories
- instagram referral code earning / referral program instagram india
- how to earn from instagram without followers / with 500 followers / small account
- instagram affiliate program india no followers
- ayurvedic products affiliate program / skincare referral program instagram
- instagram se paise kaise kamaye bina followers ke (Hinglish; huge in India)
- attri creator program / attri referral code (branded; will rank immediately)

**Launch checklist:**
1. Deploy, then in Google Search Console: URL inspection → Request indexing; confirm `/sitemap.xml` includes the route.
2. Upload the home banner with link `/earn-from-instagram` (both sizes).
3. Put the URL in the Attri Instagram bio and in a pinned highlight; every creator's link-in-bio becomes an inbound link.
4. Post 3 Reels from the brand account showing the story templates; caption "link in bio".
5. WhatsApp broadcast to existing members with the page link (they are the first wave of creators).

**Weeks 2–8, content cluster (each links to the hub, hub links back):**
- `/earn-from-instagram/hindi` (or `/instagram-se-paise-kaise-kamaye`): full Hinglish version, `hreflang` en-IN/hi-IN.
- "How to add a QR code to an Instagram story" (step-by-step with screenshots).
- "Instagram story ideas for Ayurvedic products" (10 story scripts).
- "Attri commission plan explained" (deep dive on the 7 levels with worked examples).
- "ASCI disclosure rules for small creators" (practical).

**Ongoing:**
- Watch GSC queries monthly; when a long-tail query shows impressions with position 8–20, add a sentence or FAQ that answers it verbatim.
- Ask creators to link the page from their link-in-bio tools and YouTube descriptions (cheap, relevant backlinks).
- Core Web Vitals: `images.unoptimized: true` is still on; the hero photo is a full-size Cloudinary image. Add Cloudinary `f_auto,q_auto,w_600` transforms to hero and product images when convenient.
- Rich result check: paste the page URL into Google's Rich Results Test after deploy (expect Breadcrumb + Article valid; FAQ/HowTo parsed but not shown).

## 5. Asset brief (prompts)

All prompts share this style block; paste it after each prompt:

> Style: premium Indian Ayurvedic personal-care brand. Palette: deep purple #5C1F82 and violet #8B35B8 base, warm gold #D4A847 accents, soft lavender-cream #FAF9FF highlights; one subtle Instagram-style sunset gradient (yellow → magenta → violet) as a ring or glow only. Clean, modern, editorial photography look, soft studio light, shallow depth of field, no clutter, no text unless specified, no logos of other brands, no Instagram logo. Skin tones and casting: young Indian creators, natural makeup. Leave the specified area empty for text overlay.

**A. Home banner, desktop — 1920×800 (12:5)** — `image` field
> A young Indian woman creator in her early twenties, casual kurti, holding a phone towards the camera showing an Instagram-style story with a large white QR code sticker; on the table beside her a purple bottle of onion shampoo and a face-wash tube with plain unbranded labels. Warm room light, lavender wall. Composition: subject on the RIGHT third; LEFT two-thirds is soft, out-of-focus lavender-cream space reserved for headline text. Wide 12:5 banner crop.

Overlay text you add after generation: "Earn from Instagram with Attri" / "Post your QR code. Earn on 7 levels. Free to join." / button "See how it works". Link: `/earn-from-instagram`.

**B. Home banner, mobile — 1080×900 (6:5)** — `mob_image` field
> Same scene, tighter crop: the creator's hands and phone fill the lower half of the frame, QR sticker clearly visible on the screen; the upper half is soft lavender-cream negative space for a two-line headline. Portrait-leaning 6:5 crop.

**C. Page hero photo (optional, replaces the Cloudinary shampoo photo inside the phone mockup) — 1080×1920 (9:16)**
> Vertical phone-story photo: an onion shampoo bottle and a small bowl of onions on a bathroom shelf, morning light, purple and cream tones, nothing else in frame. Bottom 35% dark and calm so white text is legible. No text.

**D. OG / social share image — 1200×630** → save to `public/assets/images/earn-instagram/og.png`
> Left 60%: deep purple gradient background, empty for text. Right 40%: a phone standing upright showing a QR code sticker with a thin Instagram-style gradient ring glowing behind the phone. Flat, graphic, high contrast. No text.

Overlay: "How to earn money from Instagram in India" (bold, white) / "Post your Attri QR code. Earn on 7 levels." (gold) / "Free to join. No follower minimum." / URL at the bottom.

**E. Instagram story template for creators — 1080×1920** (give this to members)
> A clean vertical story background: soft lavender-to-cream gradient, a large white rounded card in the centre-right (empty, for a QR code), a slim gold ribbon across the top third, and a small purple leaf motif bottom-left. No text, no people.

Overlay: "Scan to join Attri free" above the card, "My code: XXXXX" below, "#partnership" bottom-left.

**F. Reels cover / square post — 1080×1080**
> Overhead flat-lay on a lavender-cream surface: a phone showing a QR sticker, a purple shampoo bottle, an onion cut in half, a small brass bowl of turmeric, a gold pen. Symmetric, generous negative space in the top third for a title. No text.

Overlay: "How I earn from Instagram with a small account".

## 6. Verification performed

- `npx tsc --noEmit` clean.
- `GET /earn-from-instagram` on localhost: 200; `<title>`, description, canonical `https://attriindustries.com/earn-from-instagram`, `robots index,follow`, OG image; JSON-LD Breadcrumb + Article + HowTo + FAQPage (11 Q&A); `<h1>`, `<header>`, `<main>`, `<footer>`, the Hinglish FAQ and six product cards all present **in the server HTML**; ~2,600 words.
- `/`, `/aboutus`, `/help-center` still 200 with the shell change.
- Chrome via DevTools protocol with device emulation (mobile 390 @2x, desktop 1440): no console errors or hydration warnings, `scrollWidth == innerWidth` at 390 (no horizontal overflow). Probe script: `scratchpad/cdp_probe.py` (session-local).

## 7. Open items

- Replace the placeholder OG PNG with asset D.
- Upload banners A and B in admin with link `/earn-from-instagram` (needs backend deploy for the link field).
- Decide whether to extend `SSR_BODY_ROUTES` to the rest of the public site (recommended; QC the header's logged-in flip first).
- Hinglish twin page.
