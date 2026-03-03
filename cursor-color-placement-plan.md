# 🎨 Intelligent Color Placement Plan — Cursor Agent Prompt

> **MISSION**: You are a senior UI/UX designer. Your job is NOT to blindly replace all colors with the brand palette. Your job is to **intelligently decide WHERE each color looks beautiful** based on deep analysis of every component, every section, and every element of this website. A color that looks great on a button may look terrible as a background — you must figure this out yourself.

---

## 🚨 THE EXACT PROBLEM YOU ARE SOLVING

The brand palette has been defined (see below), but when colors were applied blindly — just find-and-replace style — the website looked bad. This is because:

- **Primary Purple `#8B35B8`** looks amazing on: buttons, icons, tags, highlights, hover states, borders — but looks SUFFOCATING as a full page/section background
- **Charcoal `#3D3C3C`** looks amazing on: headings, body text, nav bar backgrounds — but looks heavy on card backgrounds
- **Gold Accent `#D4A847`** looks amazing on: price tags, sale badges, star ratings, special highlights — but looks cheap if overused
- **Background `#FAF9FF`** should be used for: page backgrounds, card backgrounds — not text or buttons

**You must fix this by being smart about WHERE each color goes.**

---

## 🎨 THE BRAND COLOR PALETTE (Source of Truth)

```
--color-primary:        #8B35B8   /* Royal Purple — logo color */
--color-primary-dark:   #5C1F82   /* Deep Purple — gradients, hover states */
--color-primary-light:  #E9D5FF   /* Lavender — subtle backgrounds, tags, chips */
--color-primary-glow:   #8B35B820 /* Purple at 12% opacity — glow effects, hover bg */
--color-charcoal:       #3D3C3C   /* Logo Gray — headings, navbar, footer */
--color-accent-gold:    #D4A847   /* Warm Gold — prices, ratings, highlights */
--color-accent-saffron: #F4821A   /* Saffron Orange — food/masala categories, sale badges */
--color-bg:             #FAF9FF   /* Barely-purple white — main page background */
--color-surface:        #FFFFFF   /* Pure White — card backgrounds */
--color-text-primary:   #1A1A1A   /* Near black — body text, paragraphs */
--color-text-secondary: #6B7280   /* Cool Gray — subtext, captions, meta info */
--color-text-muted:     #9CA3AF   /* Light Gray — placeholders, disabled */
--color-success:        #16A34A   /* Green — in stock, success messages */
--color-error:          #DC2626   /* Red — out of stock, errors */
--color-border:         #E5E7EB   /* Light border — card outlines, dividers */
--color-border-purple:  #D8B4FE   /* Purple border — focused inputs, selected states */
```

Add ALL of these to `tailwind.config.js` as custom colors AND as CSS custom properties in `globals.css`.

---

## 📋 STEP 1 — DEEP ANALYSIS (DO THIS BEFORE ANY CHANGES)

### 1A. Read Every File — Build a Component Map

Go through every file in the project and create a mental map:

```
For each page/component, note:
- What is this element? (heading, button, card, nav, footer, badge, etc.)
- What is its current color?
- What color ROLE does it play? (primary action, background, text, accent, border)
- How much visual space does it take up? (large area = light color; small area = bold color)
```

### 1B. Identify Element Categories Across the Whole Site

Find and list every instance of these element types:
- `<h1>`, `<h2>`, `<h3>` tags / heading components
- `<p>` tags / body text
- Primary CTA buttons (main actions like "Add to Cart", "Buy Now", "Shop Now")
- Secondary buttons (like "View Details", "Learn More")
- Navigation bar / header
- Footer
- Product cards (background, title, price, button)
- Category tiles / category chips
- Badges (New, Sale, Out of Stock)
- Input fields / search bars
- Star ratings
- Price displays
- Section backgrounds (hero, features, testimonials, etc.)
- Icons
- Dividers / borders
- Hover states
- Active/selected states

### 1C. Identify "Large Area" vs "Small Area" Elements

**This is the most important analysis step.**

- **Large area elements** = page backgrounds, section backgrounds, hero backgrounds, card backgrounds → must use LIGHT colors (`#FAF9FF`, `#FFFFFF`, `#E9D5FF` at most)
- **Medium area elements** = nav bar, footer, sidebars → can use medium-dark colors (`#3D3C3C`, `#5C1F82`)  
- **Small area elements** = buttons, badges, icons, tags, borders, underlines → can use bold vibrant colors (`#8B35B8`, `#D4A847`, `#F4821A`)
- **Tiny area elements** = highlights, underlines, focus rings, active indicators → can use any brand color

---

## 📋 STEP 2 — THE COLOR PLACEMENT RULEBOOK

Apply this rulebook intelligently to every element you touch. Do NOT deviate from these rules.

---

### 🔵 RULE 1: Primary Purple `#8B35B8` — USE ON SMALL/MEDIUM ELEMENTS ONLY

✅ **USE Primary Purple ON:**
- Primary CTA buttons (background) — "Add to Cart", "Buy Now", "Shop Now"
- Button hover states
- Active navigation link indicator (underline or dot, NOT the whole nav)
- Selected category pill/chip background
- Input field focus border / ring
- Checkbox and radio button checked state
- Progress bars
- Tooltip backgrounds
- Pagination active page number
- Tab active indicator
- Link hover color
- Icon color for primary actions
- Section headings accent — like a colored left border or underline on `<h2>` tags
- Logo purple elements
- Small feature badge backgrounds (like "Premium", "Bestseller")
- Mobile bottom nav active icon

❌ **NEVER USE Primary Purple ON:**
- Full page backgrounds
- Large section backgrounds (hero, features, testimonials)
- Card backgrounds
- Body/paragraph text (unreadable purple text is terrible)
- Footer background (too vibrant — use charcoal instead)
- Large image overlays

---

### 🔵 RULE 2: Primary Light `#E9D5FF` — USE FOR SUBTLE PURPLE SURFACES

✅ **USE Light Purple ON:**
- Category chip/pill backgrounds (unselected state can be white; selected = `#E9D5FF` with purple text)
- Tag backgrounds (e.g., "Natural", "Organic", "New")
- Subtle hero section background tint (with white text sections)
- "Why Choose Us" section background
- Testimonial card backgrounds as a subtle tint
- Input field background on focus (very subtle)
- Notification/info banner background
- Hover background on nav items (very subtle)

❌ **NEVER USE on:** Main page background (it's too colored), buttons (too light to read text on)

---

### ⚫ RULE 3: Charcoal `#3D3C3C` — THE DARK WORKHORSE

✅ **USE Charcoal ON:**
- **Navigation bar background** — charcoal nav with white text looks premium
- **Footer background** — standard for e-commerce
- `<h1>` main page headings (on white/light backgrounds)
- `<h2>` section headings
- `<h3>` card titles / product names
- Dark overlay on hero images
- Icon fills for non-primary icons (cart, search, menu)
- Border of outlined buttons (secondary buttons)
- Dark badge backgrounds ("Limited Edition", "Exclusive")

❌ **NEVER USE on:** 
- Page backgrounds (too dark, suffocating)
- Body paragraph text (use `#1A1A1A` instead — slightly softer)
- Card backgrounds
- Large section backgrounds

---

### 🟡 RULE 4: Gold `#D4A847` — PREMIUM ACCENT, USE SPARINGLY

✅ **USE Gold ON:**
- **Price display** — product prices look premium in gold/dark gold
- **Star rating icons** — filled stars in gold
- "Best Seller" badge background or border
- Special offer / featured product border or ribbon
- "Premium" or "Top Pick" labels
- Section heading accent decorations (small gold underline under `<h2>`)
- Discount percentage highlight ("20% OFF" in gold)
- Award/quality icons
- VIP or membership tier indicators

❌ **NEVER USE on:**
- Body text (hard to read)
- Buttons (primary purple should be buttons)
- Large backgrounds
- Navigation

---

### 🟠 RULE 5: Saffron `#F4821A` — FOR FOOD/SPICE CATEGORIES & URGENCY

✅ **USE Saffron ON:**
- "SALE" badge backgrounds
- "Limited Stock" warning badge
- Food/Masala category tile accent color
- "Hot Deal" or "Flash Sale" banners
- Notification dot on cart icon
- Countdown timer text
- "Trending" badge
- Spice/Food section decorative accents

❌ **NEVER USE on:** General UI (only food categories and urgency/sale elements)

---

### ⚪ RULE 6: Backgrounds — KEEP THEM CALM

| Surface | Color | Hex |
|---|---|---|
| Page background | Barely-purple white | `#FAF9FF` |
| Card background | Pure white | `#FFFFFF` |
| Input background | White | `#FFFFFF` |
| Modal/drawer background | White | `#FFFFFF` |
| Hover background on nav items | Very light purple | `#F3E8FF` |
| Section alternating (e.g. features) | Light lavender | `#E9D5FF` at 30% opacity |
| Hero section | White OR charcoal dark gradient | `#FAF9FF` or `#3D3C3C→#1A1A1A` |

---

### ✍️ RULE 7: Typography Hierarchy — COLOR BY IMPORTANCE

| Text Type | Color | Hex |
|---|---|---|
| Page `<h1>` | Charcoal | `#3D3C3C` |
| Section `<h2>` | Charcoal | `#3D3C3C` |
| Card `<h3>` Product title | Near black | `#1A1A1A` |
| Body paragraph text | Near black | `#1A1A1A` |
| Subheading / tagline | Cool gray | `#6B7280` |
| Caption / meta text | Muted gray | `#9CA3AF` |
| Price | Gold OR Charcoal | `#D4A847` or `#3D3C3C` |
| Strikethrough original price | Muted gray | `#9CA3AF` |
| CTA button text | White | `#FFFFFF` |
| Link text | Primary purple | `#8B35B8` |
| Link hover | Deep purple | `#5C1F82` |
| Placeholder text | Muted gray | `#9CA3AF` |
| Success text | Green | `#16A34A` |
| Error text | Red | `#DC2626` |

---

### 🔘 RULE 8: Button Hierarchy

| Button Type | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary (Add to Cart, Buy Now) | `#8B35B8` | White | None | `#5C1F82` |
| Secondary (View Details) | White | `#8B35B8` | `#8B35B8` | `#F3E8FF` bg |
| Destructive (Remove) | White | `#DC2626` | `#DC2626` | `#FEE2E2` bg |
| Ghost / subtle | Transparent | `#3D3C3C` | None | `#F3F4F6` bg |
| Disabled | `#E5E7EB` | `#9CA3AF` | None | No change |

---

## 📋 STEP 3 — GO THROUGH EVERY COMPONENT AND APPLY THE RULEBOOK

Now take each component and file, apply the rules above. For every color you assign, ask yourself:

> *"Is this a large area or small area? Is this text or background? Is this a primary action or secondary? Does this follow the rulebook?"*

### Component-by-Component Checklist:

#### 🔲 Navbar / Header
- [ ] Background → Charcoal `#3D3C3C` OR White with charcoal text
- [ ] Logo → keep original (uses brand colors already)
- [ ] Nav links → White (if dark nav) OR Charcoal (if white nav)
- [ ] Active nav link → Purple underline/dot indicator `#8B35B8`
- [ ] Cart icon → White or Charcoal; notification dot → Saffron `#F4821A`
- [ ] Search bar → White background, `#E5E7EB` border, purple focus ring
- [ ] On scroll → backdrop blur + slight shadow

#### 🔲 Hero Section
- [ ] Background → `#FAF9FF` with subtle purple gradient OR dark charcoal with purple glow
- [ ] `<h1>` heading → Charcoal `#3D3C3C` (on light bg) OR White (on dark bg)
- [ ] Tagline/subheading → `#6B7280` (on light bg) OR `#E9D5FF` (on dark bg)
- [ ] CTA Button → Primary Purple `#8B35B8` background, white text
- [ ] Secondary CTA → White background, purple border, purple text
- [ ] Decorative accents → Gold `#D4A847` or light purple shapes

#### 🔲 Category Section
- [ ] Section `<h2>` → Charcoal with small purple underline accent
- [ ] Category tile background → White card
- [ ] Category tile border → `#E5E7EB`, hover → `#D8B4FE` (purple border)
- [ ] Category tile icon/emoji → Primary purple or saffron for food categories
- [ ] Category label text → Charcoal `#3D3C3C`
- [ ] Active/selected category chip → Purple bg `#8B35B8` white text
- [ ] Unselected category chip → White bg, `#6B7280` text, `#E5E7EB` border

#### 🔲 Product Cards
- [ ] Card background → Pure White `#FFFFFF`
- [ ] Card border → `#E5E7EB`, on hover → `#D8B4FE`
- [ ] Card shadow → very subtle on default; larger on hover
- [ ] Product name `<h3>` → `#1A1A1A`
- [ ] Product description → `#6B7280`
- [ ] Price → Gold `#D4A847` OR strong Charcoal `#3D3C3C` (pick one and be consistent)
- [ ] Original/strikethrough price → `#9CA3AF` with line-through
- [ ] "Add to Cart" button → Purple `#8B35B8` background, white text
- [ ] "New" badge → Purple `#8B35B8` background, white text, top-left corner
- [ ] "Sale" badge → Saffron `#F4821A` background, white text
- [ ] "Best Seller" badge → Gold `#D4A847` background, charcoal text
- [ ] Star ratings → Gold `#D4A847` filled, `#E5E7EB` empty
- [ ] Stock label ("In Stock") → Success green `#16A34A`
- [ ] "Out of Stock" → Error red `#DC2626`

#### 🔲 Section Headings (Sitewide Rule)
- [ ] `<h2>` main section title → Charcoal `#3D3C3C`
- [ ] Decorative element under `<h2>` (line/underline) → Purple `#8B35B8` or Gold gradient
- [ ] Section subtitle/description → `#6B7280`

#### 🔲 Features / "Why Choose Us" Section
- [ ] Section background → `#F3E8FF` (light purple tint) or `#FAF9FF`
- [ ] Feature icon container → Purple `#8B35B8` background OR `#E9D5FF` background with purple icon
- [ ] Feature title → Charcoal `#3D3C3C`
- [ ] Feature description → `#6B7280`

#### 🔲 Footer
- [ ] Background → Charcoal `#3D3C3C` (premium dark footer)
- [ ] Heading text → White `#FFFFFF`
- [ ] Body text / links → `#D1D5DB` (light gray)
- [ ] Link hover → Purple `#A78BFA` (lighter purple shows well on dark bg)
- [ ] Divider line → `#4B5563`
- [ ] Social icons → White, hover → Purple `#8B35B8`
- [ ] Bottom bar (copyright) → Slightly darker charcoal `#2D2C2C`

#### 🔲 Forms & Inputs
- [ ] Input background → White
- [ ] Input border (default) → `#E5E7EB`
- [ ] Input border (focus) → Purple `#8B35B8`
- [ ] Input focus ring → `#8B35B820` (purple glow)
- [ ] Label text → Charcoal `#3D3C3C`
- [ ] Placeholder → `#9CA3AF`
- [ ] Submit button → Primary purple
- [ ] Error state border → `#DC2626`
- [ ] Error message text → `#DC2626`
- [ ] Success state → `#16A34A`

#### 🔲 Navigation — Mobile Bottom Bar
- [ ] Background → White with top border `#E5E7EB`
- [ ] Inactive icon + label → `#9CA3AF`
- [ ] Active icon + label → Purple `#8B35B8`
- [ ] Active indicator dot/pill → Purple `#8B35B8`

---

## 📋 STEP 4 — GRADIENT USAGE GUIDE

Gradients make the site look premium. Use these specific gradients:

```css
/* Hero section dark option */
.hero-dark { background: linear-gradient(135deg, #3D3C3C 0%, #1A1A1A 100%); }

/* Purple CTA section background */
.section-purple { background: linear-gradient(135deg, #8B35B8 0%, #5C1F82 100%); }

/* Subtle purple tint for alternating sections */
.section-light-purple { background: linear-gradient(180deg, #FAF9FF 0%, #F3E8FF 100%); }

/* Gold shimmer for price/premium elements */
.text-gold-gradient { background: linear-gradient(90deg, #D4A847, #F0C060); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* Purple button gradient */
.btn-primary { background: linear-gradient(135deg, #8B35B8 0%, #5C1F82 100%); }
.btn-primary:hover { background: linear-gradient(135deg, #5C1F82 0%, #3D1060 100%); }
```

---

## 📋 STEP 5 — SELF-CHECK SYSTEM (MANDATORY BEFORE FINISHING)

After applying ALL color changes, you must **self-audit every page** using this checklist:

### Visual Contrast Test
For every text-on-background combination, verify:
- [ ] White text on Purple `#8B35B8` → ✅ Passes contrast (ratio ~7:1)
- [ ] White text on Charcoal `#3D3C3C` → ✅ Passes contrast
- [ ] Charcoal text on White `#FFFFFF` → ✅ Passes contrast
- [ ] Charcoal text on `#FAF9FF` → ✅ Passes contrast
- [ ] Gold `#D4A847` on White → ⚠️ Borderline — only use for large text (prices) not small body text
- [ ] Purple `#8B35B8` on White → ✅ Passes for links and labels
- [ ] `#6B7280` on White → ✅ Passes for secondary text

### The "Does It Look Beautiful?" Self-Audit

After making changes to each page, ask yourself these questions HONESTLY:

**Q1: Is there too much purple?**
- If more than 20% of any page area is purple → reduce it
- Purple should be: buttons, small accents, borders, icons — NOT backgrounds

**Q2: Does the page feel balanced?**  
- The "visual weight" should be: 60% neutrals (white, cream, light gray) + 30% charcoal + 10% purple/gold accents
- If it looks too dark → lighten section backgrounds
- If it looks washed out → add more purple accents on buttons and headings

**Q3: Is the typography readable?**
- Body text must ALWAYS be `#1A1A1A` or `#3D3C3C` — never purple, never gold
- Small text (`<12px`) must NEVER be light gray on white

**Q4: Does the color palette feel consistent?**
- Every page should feel like the same brand
- Check: homepage, product listing, product detail, cart, auth pages
- If one page looks very different from others → fix consistency

**Q5: Do CTAs (buttons) stand out?**
- "Add to Cart" and "Buy Now" must be the most visually prominent elements on product pages
- They should be Purple `#8B35B8` and impossible to miss
- If they blend in → increase contrast or add shadow

**Q6: Does it look like a premium e-commerce brand?**
- Compare mentally to: Nykaa, Mamaearth, The Body Shop websites
- If it looks like a generic/default website → you haven't applied enough character
- Add: subtle shadows, purple hover effects, gold price styling, charcoal nav

### Page-by-Page Visual Review

For each page, after changes:
1. **Imagine scrolling through it on mobile** — does every section feel app-like?
2. **Imagine viewing on desktop** — does the wider layout look rich and premium?
3. **Check the "above the fold" (first visible section)** — this is most important — does it make a strong first impression?
4. **Check the product cards** — these are the most critical UI element — do they look beautiful and clickable?

---

## 📋 STEP 6 — COMMON MISTAKES TO AVOID

❌ **DON'T** use purple `#8B35B8` as a section background — it'll feel like a toy website  
❌ **DON'T** put purple text on white background for body copy — use charcoal instead  
❌ **DON'T** mix saffron and gold together carelessly — pick one per element  
❌ **DON'T** use gold for buttons — it looks cheap; gold is only for prices/ratings  
❌ **DON'T** leave the footer white — charcoal footer is non-negotiable for premium feel  
❌ **DON'T** use the same font color for headings and body — they must be differentiated  
❌ **DON'T** apply colors without checking contrast — unreadable text ruins UX  
❌ **DON'T** forget hover states — every interactive element needs a color change on hover  
❌ **DON'T** make every badge the same color — use the badge color system (New=purple, Sale=saffron, Best Seller=gold)  
❌ **DON'T** finish without the self-audit in Step 5 — this step is mandatory  

---

## ✅ FINAL DELIVERABLE CHECKLIST

Before you say you're done, confirm:
- [ ] `tailwind.config.js` has all custom colors added
- [ ] `globals.css` has all CSS custom properties defined
- [ ] Navbar is charcoal dark with white text and purple active indicators
- [ ] Hero section has strong visual impact — not flat or boring
- [ ] Product cards look premium — beautiful shadow, clean typography, purple CTA button
- [ ] All `<h2>` section headings have charcoal color with small purple accent
- [ ] All body text is `#1A1A1A` — never purple/gold for paragraphs
- [ ] Prices are styled in gold or bold charcoal — not plain default
- [ ] All badges follow the color system (New, Sale, Best Seller)
- [ ] Footer is charcoal dark with light text
- [ ] Buttons follow the hierarchy (primary purple, secondary outlined, ghost)
- [ ] Forms have purple focus rings
- [ ] Mobile bottom nav has purple active state
- [ ] Self-audit from Step 5 is COMPLETE — all 6 questions answered YES
- [ ] The website looks like it belongs next to Nykaa or Mamaearth in terms of polish

---

*This plan ensures every color from the brand palette lands in exactly the right place — making the website look intentional, premium, and beautiful rather than just "colored".*
