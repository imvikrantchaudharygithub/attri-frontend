# Cart Page: Sticky Checkout Bar (Above Bottom Nav)

## Goal
Add a **sticky bar** on the cart page that:
1. Shows the **grand total** amount.
2. Has a **Checkout** button that proceeds to payment.
3. Appears **only on mobile** (where the bottom nav is visible).
4. Sits **visually above the bottom nav** (not behind it), so users always see total + checkout without scrolling.

---

## Current Behavior
- **Desktop / tablet:** Order summary (Price Details + Grand Total + “Proceed to Checkout”) is in a right sidebar; no change needed.
- **Mobile:** Same summary is below the cart list. Users must scroll down to see grand total and checkout. The **BottomNav** is fixed at `bottom: 0` with `z-index: var(--z-sticky)` (20) and height ~64px + safe area. Main content uses `.has-bottom-nav` with `padding-bottom: calc(64px + env(safe-area-inset-bottom))`.

---

## Implementation Plan

### 1. Sticky bar placement and visibility
- **Where:** Inside the cart page (`src/pages/cart.tsx`), only when `usercartItems?.length > 0`.
- **Visibility:** Only on mobile. Use the same breakpoint as BottomNav: e.g. `md:hidden` (show when `max-width: 767px` or your `md` breakpoint).
- **Position:**
  - `position: fixed`
  - `left: 0`, `right: 0`
  - `bottom: calc(64px + env(safe-area-inset-bottom, 0px))` so the bar sits **just above** the bottom nav (same as `.has-bottom-nav` padding).
- **Z-index:** Higher than BottomNav so the bar is never covered. Use e.g. `z-[var(--z-overlay)]` (30) or a new token like `--z-sticky-bar: 25` in `globals.css` and use that.

### 2. Content of the bar
- **Left (or center-left):** Label + grand total, e.g. **“Grand Total: ₹{orderdetails?.grandtotal?.toFixed(0)}”** (reuse existing `orderdetails` from cart state).
- **Right:** One primary button: **“Proceed to Checkout”** (or “Checkout”) that calls the same handler as the sidebar button: **`handlePayment`**.
- Reuse existing loading state: disable button and show “Processing...” when `ischeckoutLoading` is true.

### 3. Layout and styling
- Full-width bar; internal padding (e.g. `px-4 py-3`) for touch targets.
- Background: e.g. solid white or same as your app background, with a top shadow so it reads as “above” the nav.
- Match existing cart UI: e.g. purple primary button (`#8B35B8`), same typography as the sidebar “Proceed to Checkout” block.
- Optional: subtle top border or `border-t` to separate from content above.

### 4. Spacing so content isn’t hidden
- The main cart content already has `.has-bottom-nav` padding. The sticky bar adds extra height above the nav.
- Add **extra bottom padding** on the cart page **only on mobile** when the sticky bar is visible, so the last cart item isn’t hidden behind the bar. For example, add a wrapper or section with `pb-20` (or `pb-[...]` using bar height + nav height) on small screens when `usercartItems?.length > 0`. Exact value: e.g. `64px (nav) + ~56px (bar) + 16px (gap)` → ~136px, or use a CSS variable for “sticky bar height” and do `padding-bottom: calc(var(--sticky-bar-height) + 64px + env(safe-area-inset-bottom))` on mobile.

### 5. Edge cases
- **Empty cart:** Do not render the sticky bar when `usercartItems?.length === 0`.
- **Guest users:** Same as sidebar: show “Proceed to Checkout”; you can keep the existing “You’ll be prompted to login” in the sidebar only (or add a tiny hint in the bar if desired).
- **Loading:** Use existing `ischeckoutLoading` so the bar button stays in sync with the sidebar button.

### 6. Optional enhancements
- **Animation:** Fade/slide up when the bar mounts (e.g. Framer Motion or CSS) so it doesn’t pop in abruptly.
- **Accessibility:** Ensure the button has a clear label (“Proceed to Checkout”) and that focus isn’t trapped; keep focus management consistent with existing modals.

---

## Files to touch
| File | Change |
|------|--------|
| `src/pages/cart.tsx` | Add sticky bar component (grand total + checkout button), conditional on `usercartItems?.length > 0` and mobile; add mobile-only bottom padding when bar is visible; wire button to `handlePayment`. |
| `src/styles/globals.css` | Optional: add `--z-sticky-bar` and/or `--sticky-bar-height` if you want consistent spacing and z-index. |

---

## Summary
- **Sticky bar:** Mobile-only, fixed above the bottom nav, shows grand total + “Proceed to Checkout”.
- **Position:** `bottom: calc(64px + env(safe-area-inset-bottom))`, z-index above nav.
- **Behavior:** Same as sidebar (same total, same `handlePayment`, same loading state).
- **Layout:** Extra bottom padding on cart page on mobile when bar is visible so content doesn’t sit under the bar.

This gives a single, clear “sticky bar on the cart page with grand total and checkout button, above the bottom nav” on mobile.
