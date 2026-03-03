# 🎨 E-Commerce UI Upgrade — Cursor Agent Prompt

---

## 🚨 BEFORE YOU START — READ THIS FULLY

You are a **senior UI/UX engineer** and your ONLY job in this task is to **upgrade the visual UI** of this Next.js e-commerce project. You must **NOT**:
- Change any API calls
- Change any business logic or functionality
- Remove or modify any existing data-fetching
- Break any existing routes or page behavior

You **ONLY** touch: components, styles, layout files, CSS/Tailwind classes, and visual structure.

---

## 📋 STEP 1 — DEEPLY ANALYZE THE PROJECT FIRST

Before writing a single line of UI code, do the following:

1. **Read every page** inside `/app` or `/pages` directory — understand what each page does
2. **Read every component** inside `/components` — understand what exists
3. **Identify the brand** — what products are sold (oils, face wash, shampoos, masalas, etc.)
4. **Identify the current color scheme** — note what's already there
5. **Identify the layout structure** — header, footer, sidebar, product grid, etc.
6. **Check `package.json`** — note what UI libraries are already installed (Tailwind, Shadcn, etc.)
7. **Read `tailwind.config.js`** if it exists

After this analysis, **create a brief summary** of:
- What pages exist
- What the brand feels like
- What the current tech stack is
- What needs to be rebuilt visually

**Do NOT skip this step.**

---

## 📋 STEP 2 — GENERATE UI PREVIEWS / MOCKUP DESCRIPTIONS BEFORE CODING

Before making any code changes, present **2–3 UI direction options** to the user, each described as:
- Color palette (with hex codes)
- Overall vibe / mood
- Typography direction
- Key visual elements

**Example format to present options:**

```
Option A — "Earthy Luxury"
- Primary: #2D5016 (deep forest green)
- Accent: #C8A96E (warm gold)
- Background: #FAF7F2 (cream white)
- Vibe: Premium Ayurvedic / organic brand feel
- Typography: Serif headings + clean sans-serif body

Option B — "Bold & Modern"
- Primary: #1A1A2E (deep navy)
- Accent: #FF6B35 (vibrant orange)
- Background: #FFFFFF
- Vibe: Young, energetic, modern FMCG brand
- Typography: Bold geometric sans-serif

Option C — "Warm Spice"
- Primary: #8B1A1A (deep saffron red)  
- Accent: #F4A261 (turmeric orange)
- Background: #FFF8F0 (warm off-white)
- Vibe: Indian heritage, masala & natural products brand
- Typography: Clean modern with cultural warmth
```

**Ask the user which direction they prefer before proceeding.**
> If the user says "you choose" — pick the one that best fits the product catalog (oils, face wash, shampoo, masalas).

---

## 📋 STEP 3 — UI SKILL REQUIREMENT (MANDATORY)

> ⚠️ **This is non-negotiable.** You MUST use advanced, professional UI design principles throughout. Do NOT produce a generic, plain, or "default" looking UI.

Apply these UI skills to every component you touch:

### Visual Design Standards
- Use **layered depth** — cards should have subtle shadows, hover states, and micro-interactions
- Use **gradient backgrounds** tastefully — not garish, but adding richness
- Use **glassmorphism** effects where appropriate (frosted glass cards, nav)
- Use **custom border-radius** — avoid default sharp boxes everywhere
- Use **typography hierarchy** — H1, H2, H3, body, caption must all feel intentional
- Use **whitespace generously** — breathable layouts, not cramped

### Animation & Interaction
- Add **smooth hover transitions** on all interactive elements (0.2s–0.3s ease)
- Product cards should have a **lift effect on hover** (translateY + shadow change)
- Buttons should have **ripple or scale effects**
- Page sections should feel **smooth and fluid**

### Component-Level Standards
- **Hero Section**: Full-width, rich visual, strong CTA, product showcase
- **Product Cards**: Beautiful image area, clean typography, clear price, add-to-cart button with hover state
- **Navigation**: Sticky, with backdrop blur effect on scroll; mobile = bottom tab bar feel
- **Category Section**: Visual category tiles with icons or images, not plain text links
- **Footer**: Rich, multi-column, brand-consistent

---

## 📋 STEP 4 — MOBILE-FIRST APP EXPERIENCE (CRITICAL REQUIREMENT)

> The mobile experience must feel like a **native app**, not a website viewed on phone.

### Mobile UI Rules:
- **Bottom Navigation Bar** — fixed at bottom with icons for: Home, Categories, Cart, Account (like an app)
- **No standard hamburger menu on mobile** — use bottom nav instead
- **Full-width product cards** in a 2-column grid on mobile
- **Hero section** should be swipeable / carousel-style on mobile
- **Category pills** — horizontally scrollable pill/chip row (like Swiggy/Zepto category filters)
- **Sticky top bar** — minimal, just logo + search + cart icon
- **Smooth page transitions** — use Next.js `framer-motion` or CSS transitions
- **Large tap targets** — buttons min 44px height
- **Pull-to-refresh feel** — smooth, native-feeling scrolling
- **Product detail page** — bottom sticky "Add to Cart" button (like an app)
- Use `safe-area-inset` padding for notch/home bar on iPhones

### Desktop UI Rules:
- Traditional top navigation with mega menu or dropdown categories
- Wider product grid (3–4 columns)
- Sidebar filters on category/listing pages
- Rich hero section with split layout or full-width banner

---

## 📋 STEP 5 — PAGE-BY-PAGE UI UPGRADE CHECKLIST

For each page, apply a full UI overhaul. Here's what to aim for:

### 🏠 Homepage
- [ ] Hero section with product showcase, headline, and CTA button
- [ ] Horizontally scrollable category strip (with icons/images for: Oils, Face Wash, Shampoos, Masalas, etc.)
- [ ] "Featured Products" section — beautiful card grid
- [ ] "Why Choose Us" / Trust badges section (100% Natural, Fast Delivery, etc.)
- [ ] "Best Sellers" or "Trending" product row
- [ ] Newsletter / offer banner section
- [ ] Footer

### 🛍️ Product Listing / Category Page
- [ ] Filter chips at top (mobile) / sidebar (desktop)
- [ ] Beautiful product card grid
- [ ] Smooth loading states / skeletons

### 📦 Product Detail Page
- [ ] Large product image (with gallery if multiple images)
- [ ] Clean product info layout
- [ ] Sticky "Add to Cart" button (especially mobile)
- [ ] Related products section

### 🛒 Cart Page
- [ ] Clean cart item list
- [ ] Order summary card
- [ ] Beautiful checkout CTA

### 🔐 Auth Pages (Login/Register)
- [ ] Centered card layout
- [ ] Beautiful form styling
- [ ] Brand-consistent visuals

---

## 📋 STEP 6 — SMOOTH ANIMATIONS (MANDATORY)

> ⚠️ Every page must feel **alive and smooth**. Static, instant-render UIs are not acceptable. Animations should feel natural — not overdone, not flashy — just **polished and fluid**.

### Install / Use These Animation Tools:
- **Framer Motion** — primary animation library (install if not present: `npm install framer-motion`)
- **Tailwind CSS transitions** — for simple hover/focus states
- **CSS keyframes** — for looping/background animations

### Page Load & Entry Animations
- Every page should have a **fade-in + slight slide-up** on load (not just instant pop-in)
- Use `AnimatePresence` from Framer Motion for **page transition animations** between routes
- Section blocks should **stagger-animate into view** as the user scrolls down (one after another, not all at once)
- Use `whileInView` from Framer Motion with `viewport: { once: true }` so elements animate in when they enter the screen

```jsx
// Example stagger animation for product cards
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: index * 0.1 }}
  viewport={{ once: true }}
>
```

### Hero Section Animations
- Hero headline should **type-in or fade-in word by word**
- Hero background can have a **subtle parallax scroll effect**
- CTA button should have a **pulsing glow animation** to draw attention
- If using a hero image carousel, use **smooth crossfade or slide transitions** (not hard cuts)

### Product Card Animations
- Cards: `scale(1.03)` + shadow increase on hover — smooth `0.25s ease`
- Product image: subtle `scale(1.08)` zoom on card hover (overflow hidden on container)
- "Add to Cart" button: slides up from bottom of card on hover (hidden → visible)
- When item is added to cart: **cart icon bounces** and shows a count badge pop-in

### Navigation Animations
- Mobile bottom nav: active tab indicator **slides smoothly** between tabs (not jumps)
- Sticky header: **smooth backdrop-blur fade-in** when user scrolls past hero
- Dropdowns/menus: **slide down + fade in**, not instant appear

### Button & Interaction Animations
- All buttons: `scale(0.97)` on press (active state) — gives tactile "press" feel
- Primary CTA buttons: subtle **shimmer/shine sweep animation** on hover
- Form inputs: smooth **border color transition** + label float on focus
- Checkboxes, toggles: **smooth animated state changes**

### Loading & Skeleton States
- Use **animated skeleton loaders** (shimmer effect) while products/data loads — NOT plain spinners
- Skeleton shimmer should use a CSS gradient animation sweeping left to right

```css
/* Skeleton shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### Scroll & Reveal Animations
- Section headings: **fade in + underline draws from left** when scrolled into view
- "Why Choose Us" / feature badges: **count-up numbers** when section enters viewport
- Category tiles: **staggered pop-in** from left to right
- Testimonials / review cards: **smooth horizontal scroll** snap on mobile

### Cart & Micro-interaction Animations
- Adding to cart: product thumbnail does a **fly-to-cart animation** (floats to cart icon)
- Cart drawer (if used): **slides in from right** with overlay fade
- Quantity change (+ / -): numbers **flip/slide** instead of instant change
- Order success page: **confetti burst** or checkmark drawing animation

### Mobile-specific Animations
- Bottom sheet modals: **slide up from bottom** (like native app sheets)
- Pull-to-refresh: custom **animated spinner** that feels native
- Page transitions on mobile: **horizontal slide** between pages (like a real app)
- Toast notifications: **slide in from top** and auto-dismiss with fade-out

### Performance Rules for Animations
- ONLY animate `transform` and `opacity` — never `width`, `height`, `top`, `left` (these cause layout thrashing)
- Use `will-change: transform` on heavily animated elements
- Respect `prefers-reduced-motion` — wrap all animations in a check:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 📋 STEP 7 — COLOR PALETTE GUIDANCE


Since no color palette has been decided yet, **you must propose and apply** a palette that:
- Feels **premium and trustworthy** for a health/beauty/food product brand
- Is **NOT just black and white** — must have warm, rich tones
- Works well for products like: oils, face wash, shampoo, masalas
- Has at least: primary color, accent/highlight color, background color, text color, success/error colors

Suggested starting palette (customize based on brand analysis):
```
--color-primary: [you choose based on brand]
--color-accent: [warm gold, turmeric, saffron, or earthy green]
--color-bg: [warm off-white or cream]
--color-surface: #FFFFFF
--color-text: #1A1A1A
--color-muted: #6B7280
--color-success: #16A34A
--color-error: #DC2626
```

Define these in `tailwind.config.js` as custom colors so they're used consistently everywhere.

> Note to user: After seeing the UI, you can easily swap the color palette by just changing the config — all colors will update globally.

---

## 📋 STEP 8 — TECH & IMPLEMENTATION NOTES

- Use **Tailwind CSS** for all styling (extend config as needed)
- If **Shadcn/UI** is installed, use and customize its components — don't use defaults as-is
- If **Framer Motion** is available, use it for animations — if not, ask before installing
- Use **CSS custom properties** for the color system so palette swapping is easy
- Keep all changes in **git-friendly small commits** per page/component so user can `Ctrl+Z` / `git revert` if needed
- **Do NOT delete any existing code** without first commenting it out — the user may want to undo

---

## 📋 STEP 9 — UNDO / REVERT SAFETY

> The user wants to be able to undo if they don't like the result.

- Before editing any file, note the original content
- Make changes **page by page**, not all at once
- After each major section (Homepage, Product Page, etc.), pause and ask the user: *"How does this look? Should I continue to the next page?"*
- Keep original component logic intact — only wrap/replace visual JSX and classNames

---

## ✅ FINAL CHECKLIST BEFORE YOU START CODING

- [ ] I have read and understood all existing pages and components
- [ ] I have proposed a color palette and UI direction to the user
- [ ] I have NOT touched any API calls or business logic
- [ ] I will apply professional, modern UI design — NOT generic Bootstrap/default Tailwind look
- [ ] Framer Motion is installed and used for page transitions, scroll reveals, and micro-interactions
- [ ] All animations use only `transform` and `opacity` for performance
- [ ] Skeleton loaders with shimmer are used instead of plain spinners
- [ ] `prefers-reduced-motion` is respected
- [ ] Mobile will feel like an app (bottom nav, app-like UX, slide transitions)
- [ ] Desktop will be rich, multi-column, and elegant
- [ ] I will pause after each page for user feedback before proceeding

---

## 🎯 BRAND CONTEXT SUMMARY (for your reference)

- **Product Categories**: Oils, Face Wash, Shampoos, Masalas, and more
- **Brand Feel**: Natural, trustworthy, Indian heritage + modern premium
- **Target Audience**: Health-conscious consumers buying daily essentials online
- **Key Emotions to Evoke**: Trust, purity, natural, premium quality, Indian roots

---

*This plan was prepared to guide a full UI overhaul of a Next.js e-commerce app. Start with analysis, present options, get approval, then execute page by page.*
