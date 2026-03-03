# Offers & Coupons Page — Plan

## 1. Goal

- Add a dedicated **Offers & Coupons** page.
- Use the **same coupon API** as the cart page (the one used in the “Apply Coupon” popup).
- Point the **Offers & Coupons** link in the account sidebar (Profile, Withdrawal, etc.) to this new page instead of `/`.

---

## 2. API (from cart page)

- **Endpoint:** `GET /admin/get-coupons`
- **Usage on cart:** `getData('/admin/get-coupons')` → `res?.data?.coupons`
- **Filter:** Show only `coupon.status === 'active'`.
- **Coupon object shape (from cart modal):**
  - `code` – coupon code (string)
  - `discountType` – `'percentage'` or fixed
  - `discountValue` – number (% or ₹)
  - `description` – string (e.g. "Special Discount Offer")
  - `minPurchaseAmount` – optional number (min order value)
  - `validTo` – optional date string (expiry)
  - `status` – e.g. `'active'`

No change to this API or payload; reuse as-is on the new page.

---

## 3. Route & layout

- **Route:** `/offers` (or `/offers-coupons` if you prefer).
- **Layout:** Same account layout as myaccount, order, withdraw, myaddress:
  - `account-box`, `container`, `account-main`, `account-left` (transparent) with **AccountSideBar**, `account-right` for content.
- **Auth:** If the app expects logged-in users for account section, optionally redirect when no token (same as other account pages); otherwise allow public if coupons are public.

---

## 4. Page content

- **Hero:** “Offers & Coupons” + short subtitle (e.g. “Use these codes on your cart for instant discounts”).
- **Coupon list:**
  - Fetch on mount: `GET /admin/get-coupons` → filter `status === 'active'`.
  - Show loading skeleton or spinner while loading.
  - Empty state: “No active coupons right now” + optional CTA (e.g. “Shop now” → `/` or cart).
  - Each item: **coupon card** (reuse the same structure as in the cart modal):
    - Top: discount (e.g. `X% OFF` or `₹Y OFF`) + coupon code.
    - Bottom: description, min purchase (Min ₹Z), expiry (Valid till …).
  - **Actions on card:** “Copy code” (copy to clipboard + toast). Optional: “Use in cart” link to `/cart` (or open cart and scroll to coupon section if you add that later).

Design can mirror the cart modal’s coupon cards (gradient top, white bottom, same fields) so the experience is consistent; use CSS variables / existing design system for colours and typography.

---

## 5. Sidebar link

- **File:** `src/Components/accountsidebar.tsx`
- **Change:** Update the “Offers & Coupons” nav item from `href: "/"` to `href: "/offers"` (or the chosen path).
- **Rest:** Keep label “Offers & Coupons”, icon, and position in the list unchanged.

---

## 6. Files to add/change

| Action | File | Description |
|--------|------|-------------|
| **Create** | `src/pages/offers.tsx` | New page: account layout, hero, fetch `/admin/get-coupons`, filter active, list coupon cards, copy-code + optional “Use in cart”. |
| **Edit** | `src/Components/accountsidebar.tsx` | Set “Offers & Coupons” link to `/offers` (or chosen route). |

---

## 7. Behaviour summary

- **API:** Same as cart: `GET /admin/get-coupons`, use `res?.data?.coupons`, filter `status === 'active'`.
- **UI:** Account shell + hero + list of coupon cards (same data as cart modal); copy code; optional link to cart.
- **Navigation:** “Offers & Coupons” in my account sidebar goes to the new page; no change to Profile, Withdrawal, Orders, etc., except this one href.

---

## 8. Optional later

- Separate “Offers” section (e.g. banner/promo offers) if you add an offers API later.
- Deep link to cart with coupon pre-filled (e.g. `/cart?coupon=CODE`) if you implement that on the cart page.
