# Color Placement — Execution Plan

This plan executes the rules and checklists from **cursor-color-placement-plan.md**. Work in order; mark phases complete before moving on. Do **not** change API calls, Redux, or routes — only styles, classes, and CSS.

---

## Phase 0: Foundation (Design Tokens)

**Goal:** Add all palette tokens so every rule can be applied by name.

### 0.1 Tailwind config
- [ ] Open `tailwind.config.ts`.
- [ ] Add/extend `colors` with:
  - `primary` (DEFAULT `#8B35B8`, dark `#5C1F82`, light `#E9D5FF`)
  - `primary-glow` (e.g. `#8B35B820` for focus/glow)
  - `charcoal` `#3D3C3C`
  - `accent-gold` `#D4A847`
  - `accent-saffron` `#F4821A`
  - `bg` `#FAF9FF`, `surface` `#FFFFFF`
  - `text-primary` `#1A1A1A`, `text-secondary` `#6B7280`, `text-muted` `#9CA3AF`
  - `success` `#16A34A`, `error` `#DC2626`
  - `border` `#E5E7EB`, `border-purple` `#D8B4FE`
- [ ] Add gradient utilities if needed (e.g. `hero-dark`, `section-purple`, `section-light-purple`, `btn-primary`).

### 0.2 CSS variables
- [ ] Open `src/styles/globals.css`.
- [ ] In `:root`, add every variable from the plan’s “Brand Color Palette” section (e.g. `--color-primary`, `--color-primary-dark`, `--color-primary-light`, `--color-charcoal`, etc.).
- [ ] Ensure no conflicts with existing vars; alias legacy names to new ones if required.

**Exit condition:** Tailwind and globals expose the full palette by name/var. No UI changes yet.

---

## Phase 1: Global Layout — Navbar & Footer

**Rulebook:** RULE 3 (Charcoal), RULE 1 (Purple only small/medium), RULE 6 (Backgrounds).

### 1.1 Header (`src/Components/header.tsx`)
- [ ] Nav bar background → Charcoal `#3D3C3C` (or white with charcoal text per plan).
- [ ] Logo: leave as-is or ensure brand colors.
- [ ] Nav links → White on dark nav (or charcoal on white nav).
- [ ] Active nav indicator → Purple `#8B35B8` (underline/dot only, not full background).
- [ ] Cart icon → White or charcoal; notification dot → Saffron `#F4821A`.
- [ ] Search bar → White bg, `#E5E7EB` border, purple focus ring `#8B35B8` / `#8B35B820`.
- [ ] On scroll → backdrop blur + subtle shadow (no large purple areas).
- [ ] User dropdown / menu items: text and hovers per RULE 7 (links purple, hover deep purple); no full purple section backgrounds.
- [ ] Side drawer (if any): surface white/light; accents purple; no big purple panels.

### 1.2 Footer (`src/Components/footer.tsx`)
- [ ] Background → Charcoal `#3D3C3C`.
- [ ] Heading text → White.
- [ ] Body/links → Light gray (e.g. `#D1D5DB`); link hover → lighter purple (e.g. `#A78BFA`) per plan.
- [ ] Dividers → `#4B5563`.
- [ ] CTA button in footer: per RULE 8 (primary or secondary); no gold for main CTA.
- [ ] Bottom bar (copyright) → Darker charcoal (e.g. `#2D2C2C`).

### 1.3 Mobile bottom nav (`src/Components/BottomNav.tsx`)
- [ ] Background → White; top border `#E5E7EB`.
- [ ] Inactive icon + label → `#9CA3AF`.
- [ ] Active icon + label → Purple `#8B35B8`.
- [ ] Active indicator (dot/pill) → `#8B35B8`.

**Exit condition:** Nav and footer match rulebook; no purple used as full-page or large-section background.

---

## Phase 2: Homepage — Hero, Categories, Sections

**Rulebook:** RULE 6 (Backgrounds), RULE 7 (Typography), RULE 1–5 (Purple/Charcoal/Gold/Saffron usage).

### 2.1 Hero (`src/Components/HomeBanner.tsx`)
- [ ] Background → `#FAF9FF` with subtle gradient **or** dark charcoal gradient; never solid purple.
- [ ] `<h1>` → Charcoal on light bg, white on dark bg.
- [ ] Tagline → `#6B7280` (light bg) or `#E9D5FF` (dark bg).
- [ ] Primary CTA → Purple `#8B35B8`, white text, hover `#5C1F82`.
- [ ] Secondary CTA → White bg, purple border + text, hover `#F3E8FF`.
- [ ] Decorative accents → Gold or light purple only (small elements).

### 2.2 Category strip / tiles
- [ ] Section `<h2>` → Charcoal; small purple or gold accent underline.
- [ ] Category tile/card → White surface, border `#E5E7EB`, hover border `#D8B4FE`.
- [ ] Category label → Charcoal.
- [ ] Active/selected chip → Purple bg, white text; unselected → White bg, `#6B7280` text, light border.

### 2.3 Best Sellers / product sections (`src/Components/bestseller.tsx`, etc.)
- [ ] Section `<h2>` → Charcoal with purple/gold accent (line or underline).
- [ ] Section subtitle → `#6B7280`.
- [ ] “Shop All” / secondary links → Purple text, hover deep purple; or secondary button style per RULE 8.

### 2.4 Other homepage sections
- [ ] Nutrition, Takecare, NewProduct, Review, HaveFun, About: apply same rules.
- [ ] Section backgrounds → `#FAF9FF` or `#F3E8FF` / `#E9D5FF` (light only); never solid purple.
- [ ] All `<h2>` → Charcoal + small accent; body/descriptions → `#1A1A1A` / `#6B7280`.
- [ ] CTAs → Primary purple or secondary (white + purple border).
- [ ] “Why Choose Us” / features: light purple tint `#F3E8FF` or `#E9D5FF`; icons purple or on light purple bg; no large purple blocks.

**Exit condition:** Homepage uses only light backgrounds; headings and CTAs follow rulebook; no suffocating purple.

---

## Phase 3: Product Cards & Listings

**Rulebook:** RULE 4 (Gold for price/ratings), RULE 1 (Purple for CTAs/badges), RULE 6 (Card surface white).

### 3.1 Product card (`src/Components/ProductCard.tsx`)
- [ ] Card background → White; border `#E5E7EB`; hover border `#D8B4FE`; subtle shadow, stronger on hover.
- [ ] Product name `<h3>` → `#1A1A1A`.
- [ ] Price → Gold `#D4A847` (or charcoal); strikethrough/original → `#9CA3AF`.
- [ ] “Add to Cart” → Purple `#8B35B8`, white text, hover `#5C1F82`.
- [ ] “New” badge → Purple bg, white text.
- [ ] “Sale” / discount badge → Saffron `#F4821A` bg, white text.
- [ ] “Best Seller” (if any) → Gold bg, charcoal text.
- [ ] Star ratings → Gold filled, light gray empty.
- [ ] In stock → Green `#16A34A`; out of stock → Red `#DC2626`.
- [ ] Category pill: unselected light (white or `#E9D5FF`); selected purple; text contrast always readable.

### 3.2 Category listing page (`src/pages/category/[[...category]].tsx`)
- [ ] Page/section background → `#FAF9FF`.
- [ ] Banner/title → Charcoal or white on dark; no full purple background.
- [ ] Product grid: same product card rules as above.
- [ ] Empty state: text and buttons per typography and button rules.

### 3.3 Search results (`src/pages/search/[[...searchquery]].tsx`)
- [ ] Same as category: light background, charcoal headings, product cards as in 3.1.

**Exit condition:** All product cards share the same token usage; prices/ratings use gold; CTAs and badges use purple/saffron/gold per rulebook.

---

## Phase 4: Product Detail Page (PDP)

**Rulebook:** RULE 1 (Single clear CTA), RULE 4 (Gold price), RULE 6 (No dark card background).

### 4.1 PDP layout (`src/pages/product/[[...productslug]].tsx`)
- [ ] Page/section background → `#FAF9FF`.
- [ ] No duplicate “Add to Bag”; single CTA in product info (already enforced in prior work).

### 4.2 Product info (`src/Components/ProductInfo.tsx`)
- [ ] No dark block behind product details; background light (page or white card).
- [ ] Product name → `#1A1A1A` or charcoal.
- [ ] Rating → Gold stars; label `#6B7280`.
- [ ] Price → Gold `#D4A847`; MRP strikethrough `#9CA3AF`.
- [ ] Discount badge → Purple or saffron per badge rule (e.g. “X% OFF”).
- [ ] Tags/pills → Light purple `#E9D5FF` + purple text, or white + purple border.
- [ ] “Add to Bag” → Primary purple, white text, hover deep purple.
- [ ] Description heading → Charcoal; body → `#6B7280` or `#1A1A1A`.

### 4.3 WhyAttri, FAQ, HaveFun on PDP
- [ ] Section backgrounds light; headings charcoal + accent; CTAs purple; no large purple areas.

**Exit condition:** PDP has one CTA; product block is light with readable text; price and badges follow rulebook.

---

## Phase 5: Cart, Checkout & Modals

**Rulebook:** RULE 8 (Buttons), RULE 6 (Surfaces), RULE 7 (Typography).

### 5.1 Cart page (`src/pages/cart.tsx`)
- [ ] Page background → `#FAF9FF`.
- [ ] Cart item cards → White surface, `#E5E7EB` border.
- [ ] Product name → `#1A1A1A`; price → Gold or charcoal; secondary text `#6B7280`.
- [ ] Quantity controls: border/default per RULE 8; no gold for buttons.
- [ ] “Proceed to Checkout” → Primary purple.
- [ ] Order summary / address cards → White, light borders.
- [ ] Cashback/coupon modals: white surface; primary button purple; focus rings purple.
- [ ] Links (e.g. “Change address”) → Purple, hover deep purple.

### 5.2 Login / Signup (`src/Components/loginpopup.tsx`, `src/pages/signup/[[...referralCode]].tsx`)
- [ ] Modal/surface → White.
- [ ] Inputs: white bg, `#E5E7EB` border, focus border + ring purple.
- [ ] Labels → Charcoal; placeholders → `#9CA3AF`.
- [ ] Submit → Primary purple; secondary → outlined purple.
- [ ] Links → Purple, hover deep purple.
- [ ] Error text/border → `#DC2626`; success → `#16A34A`.

**Exit condition:** Cart and auth UIs use white/light surfaces and purple CTAs; forms have purple focus states.

---

## Phase 6: Static & Secondary Pages

**Rulebook:** Same typography and background rules; no full purple sections.

### 6.1 Thank you, Vision, Privacy, About, Teams
- [ ] Page background → `#FAF9FF`.
- [ ] Headings → Charcoal with optional purple/gold accent.
- [ ] Body → `#1A1A1A` / `#6B7280`.
- [ ] CTAs → Primary purple or secondary.
- [ ] Cards/sections → White or very light tint; footer charcoal.

### 6.2 FAQ (`src/Components/Faq.tsx`)
- [ ] Section heading → Charcoal + accent.
- [ ] Question row: default light (e.g. white or `#F5EEFA`); active/open → purple accent (e.g. border or icon bg), not full purple background.
- [ ] Answer text → `#6B7280` or `#1A1A1A`.

**Exit condition:** All static pages feel consistent with homepage and PDP; no heavy purple backgrounds.

---

## Phase 7: Forms, Inputs & Focus States

**Rulebook:** RULE 1 (Purple focus), RULE 7 (Labels/placeholders).

### 7.1 Global form styling
- [ ] Input/textarea background → White; default border `#E5E7EB`.
- [ ] Focus border → `#8B35B8`; focus ring → `#8B35B820` or equivalent.
- [ ] Label → Charcoal; placeholder → `#9CA3AF`.
- [ ] Error → border and text `#DC2626`; success `#16A34A`.
- [ ] Checkbox/radio checked → Purple (e.g. `#8B35B8`).

### 7.2 Apply everywhere
- [ ] Search bar, login, signup, cart modals, address forms, any other inputs.
- [ ] Ensure no large purple backgrounds; only small focus/hover accents.

**Exit condition:** Every focusable input has a purple focus state; labels and placeholders use correct grays.

---

## Phase 8: Self-Audit (Mandatory)

**Use the “STEP 5 — Self-Check System” and “STEP 6 — Common Mistakes” from cursor-color-placement-plan.md.**

### 8.1 Contrast & readability
- [ ] White on purple and white on charcoal: pass.
- [ ] Charcoal on white and on `#FAF9FF`: pass.
- [ ] Gold only on large text (e.g. price), not long body copy.
- [ ] No purple or gold for paragraph text.

### 8.2 “Does it look beautiful?”
- [ ] No page has >~20% purple area; purple is buttons, accents, borders, icons.
- [ ] Balance: mostly neutrals + charcoal + small purple/gold accents.
- [ ] Typography: headings vs body clearly differentiated.
- [ ] Consistency across: home, category, search, PDP, cart, auth.
- [ ] CTAs (Add to Cart, Buy Now, Shop Now) stand out in purple.
- [ ] Overall feel: premium e-commerce (similar to reference brands in plan).

### 8.3 Page-by-page
- [ ] Mobile and desktop both checked.
- [ ] Above-the-fold strong on key pages.
- [ ] Product cards look premium and clickable.
- [ ] Footer is charcoal; nav is charcoal or white with clear hierarchy.

### 8.4 Final deliverable checklist (from plan)
- [ ] Tailwind and globals have full palette.
- [ ] Navbar charcoal, hero impactful, product cards premium.
- [ ] Section headings charcoal + accent; body text `#1A1A1A`.
- [ ] Prices gold or bold charcoal; badges (New/Sale/Best Seller) per rulebook.
- [ ] Footer charcoal; buttons follow hierarchy; forms purple focus; bottom nav purple active.
- [ ] All self-audit questions answered; no rulebook violations.

---

## Execution order summary

| Phase | Focus | Key files |
|-------|--------|-----------|
| 0 | Design tokens | `tailwind.config.ts`, `globals.css` |
| 1 | Nav + Footer + Bottom nav | `header.tsx`, `footer.tsx`, `BottomNav.tsx` |
| 2 | Homepage | `HomeBanner.tsx`, `bestseller.tsx`, `Nutrition.tsx`, `Takecare.tsx`, `NewProduct.tsx`, `Review.tsx`, `HaveFun.tsx`, `About.tsx` |
| 3 | Product cards & listings | `ProductCard.tsx`, `category/[[...category]].tsx`, `search/[[...searchquery]].tsx` |
| 4 | PDP | `product/[[...productslug]].tsx`, `ProductInfo.tsx`, `WhyAttri.tsx`, `Faq.tsx` |
| 5 | Cart & Auth | `cart.tsx`, `loginpopup.tsx`, `signup/[[...referralCode]].tsx` |
| 6 | Static pages | Thank you, vision, privacy, about, teams, FAQ |
| 7 | Forms & focus | All forms, inputs, modals |
| 8 | Self-audit | Full site pass per plan Step 5 & 6 |

Do **not** change: `apiServices`, Redux slices, auth logic, cart logic, or route structure. Only update styles, Tailwind classes, and CSS variables to match the rulebook.
