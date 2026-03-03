# Footer Account Menu (Bottom Sheet) — Plan

## 1. Goal

- When the user is **logged in**, show a **Menu** item in the **mobile bottom navigation** (BottomNav).
- Tapping **Menu** opens a **bottom sheet** (panel sliding up from the bottom) that lists the same links as the **account sidebar**, so users can jump to Profile, Orders, Withdrawal, Teams, Addresses, Offers & Coupons, Help Center, or Sign out without going to the myaccount page first.
- The sheet should feel **attached to the footer**, use **smooth open/close animation**, and follow **senior UI/UX** practices (clear hierarchy, touch targets, accessibility).

---

## 2. Where it lives

- **Component:** `src/Components/BottomNav.tsx` (mobile bottom nav; already has Home, Categories, Cart, Account/Login).
- **Visibility:** Menu item is shown **only when `token` is present** (same as footer account section).
- **Placement:** Add **Menu** as a 5th item when logged in, **or** make the 4th item “Menu” when logged in (instead of “Account” linking to `/myaccount`). Recommended: **5th item “Menu”** when logged in so we keep “Account” as quick link to profile and add “Menu” for full account nav.

---

## 3. Account links (single source of truth)

Match the **account sidebar** exactly (same order, same hrefs, same Sign out behavior):

| Label              | href       | Notes                    |
|--------------------|------------|--------------------------|
| Profile            | /myaccount |                          |
| Orders             | /order     |                          |
| Withdrawal         | /withdraw  |                          |
| Teams              | /teams     |                          |
| Addresses          | /myaddress |                          |
| Offers & Coupons   | /offers    |                          |
| Help Center       | /          |                          |
| —                  | —          | Divider then Sign out    |
| Sign out           | /          | onClick: logout + go home |

**Logout:** Same as sidebar: `clearUser`, `clearToken`, `resetCartCount`, `clearCart`, toast, then navigate to `/` (or use `router.push('/')`).

---

## 4. Bottom sheet design

### 4.1 Behaviour

- **Open:** Tap “Menu” → overlay fades in, sheet slides up from bottom (e.g. `translateY(100%)` → `0`).
- **Close:** Tap overlay, or tap a link (navigate and close), or add a “Close” control in the sheet header. **Sign out** closes sheet and runs logout.
- **Animation:** ~250–300ms, ease-out for enter; same duration for exit. Use Framer Motion (`AnimatePresence` + `motion.div`) or CSS transitions so it feels smooth and not laggy.

### 4.2 Layout (mobile-first)

- **Overlay:** Full screen, `bg-black/50` (or similar), below the sheet in z-order. Tap to close. Optional: slight blur for depth.
- **Sheet panel:**
  - Anchored to **bottom** of viewport (e.g. `fixed bottom-0 left-0 right-0`).
  - **Rounded top corners** (e.g. `rounded-t-2xl`) so it reads as a card/drawer.
  - **Max height:** e.g. 70–85vh with internal scroll so the list doesn’t overflow on small screens.
  - **Safe area:** Respect `env(safe-area-inset-bottom)` so the sheet sits above the bottom nav (which is already above the safe area). If the sheet is *above* the bottom nav, no need to add bottom inset to the sheet; if it ever overlaps the nav, we can add padding.

### 4.3 Content structure

- **Header (optional but recommended):**
  - Title: e.g. “Account” or “Menu”.
  - Close button (X or “Close”) for accessibility and discoverability.
- **List:** One row per link (same as sidebar):
  - **Icon** (left) — reuse the same icons as in `accountsidebar.tsx` (Profile, Orders, Withdrawal, Teams, Addresses, Offers & Coupons, Help Center; Sign out with a different style).
  - **Label** (e.g. “Profile”, “Orders”, …).
  - **Chevron or arrow** (right) to suggest navigation.
- **Active state:** If current route matches the link, show a subtle highlight (e.g. primary background or left border) so users see where they are.
- **Sign out:** Separate block below a divider; red or destructive style; same `onClick` as sidebar (logout + redirect).

### 4.4 UX details

- **Touch targets:** Min height per row ~48px so taps are easy on mobile.
- **Feedback:** Slight hover/active state on rows (e.g. background change). No long press required.
- **Close on navigate:** When user taps a link, navigate (e.g. `router.push(href)`) and close the sheet so the next page isn’t shown behind the sheet.
- **Accessibility:** `role="dialog"`, `aria-modal="true"`, `aria-label` for the sheet; focus trap optional for v1; Escape key to close is a nice addition.

---

## 5. Implementation outline

### 5.1 BottomNav.tsx

- **State:** e.g. `const [accountMenuOpen, setAccountMenuOpen] = useState(false)`.
- **When `token` is true:** Render an extra nav item “Menu” (e.g. hamburger or list icon) that does **not** link to a page; instead `onClick={() => setAccountMenuOpen(true)}`.
- **When `token` is false:** Do not render “Menu” (keep existing 4 items including Login).
- **Sheet:** Rendered in the same file (or in a small sub-component) when `accountMenuOpen` is true:
  - Overlay + sheet panel (both animated).
  - List of links (same as sidebar); each `Link` with `onClick={() => setAccountMenuOpen(false)}`.
  - Sign out: `onClick` that runs logout and `setAccountMenuOpen(false)` then `router.push('/')`.
  - Close button and overlay `onClick` set `accountMenuOpen` to false.

### 5.2 Reuse / consistency

- **Links and logout:** Either import the same `navItems` + logout logic from a small shared module (e.g. `accountNavConfig.ts` or from `accountsidebar.tsx`), or duplicate the array and logout in BottomNav so the sheet and sidebar never get out of sync. Prefer **one shared list** (e.g. export `accountNavItems` and use in both sidebar and BottomNav sheet).
- **Icons:** Reuse the same SVG icons as in the account sidebar for each label so the experience is consistent.

### 5.3 Animation (Framer Motion already in project)

- **Overlay:** `motion.div` with `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `exit={{ opacity: 0 }}`, `transition={{ duration: 0.25 }}`.
- **Sheet:** `motion.div` with `initial={{ y: "100%" }}`, `animate={{ y: 0 }}`, `exit={{ y: "100%" }}`, `transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}` (or similar ease-out).
- Wrap overlay + sheet in `AnimatePresence` and only render when `accountMenuOpen` is true; use a key so exit animation runs when closing.

---

## 6. Files to touch

| File | Changes |
|------|--------|
| `src/Components/BottomNav.tsx` | Add “Menu” item when `token`; state for sheet; overlay + bottom sheet with account links and Sign out; open/close and animation. |
| Optional: `src/utils/accountNav.ts` (or similar) | Export shared `accountNavItems` (and maybe icons) so `accountsidebar.tsx` and BottomNav both use it. |

If we don’t add a shared module, we can define the same list and logout inside BottomNav and keep the sidebar as-is.

---

## 7. Summary

- **What:** “Menu” in mobile bottom nav when logged in; opens a bottom sheet with account sidebar links + Sign out.
- **Where:** BottomNav; sheet anchored to bottom, overlay above.
- **Animation:** Smooth slide-up and fade (e.g. 250–300ms); close on overlay, close button, or navigation.
- **Content:** Same links and order as account sidebar; same logout behaviour; clear hierarchy and 48px touch targets.
- **Result:** Logged-in users can open account menu from the footer and jump to any account page or sign out without visiting the myaccount page first.
