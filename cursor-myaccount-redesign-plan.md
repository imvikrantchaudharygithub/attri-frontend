# My Account Page Redesign Plan

## Current data & functionality (keep all)
- **Auth:** Redirect to `/` if no token; `getUserData()` from `user/profile`, dispatch `setUser`.
- **Profile block:** Avatar (initial), username, phone.
- **Wallet:** Total Balance (link to `/withdraw`), Total Cashback (toast on click).
- **Referral:** Code display, Copy button, Share (WhatsApp) button.
- **QR:** Referral QR code, signup URL, "Scan to share your referral code".
- **Team:** "View Team" link to `/teams`.
- **Sidebar:** Profile (active), Orders, Withdrawal, Teams, Addresses, Offers & Coupons, Help Center, Signout (logout + go home). Same hrefs and onClick for logout.

## Design direction (modern, on-brand)
- **Layout:** Same structure: sidebar left, main content right; responsive (stack on mobile).
- **Sidebar:** Card-style nav, light bg, purple active/hover; icons + labels; no green, use brand purple/charcoal.
- **Main content:** Card-based sections with subtle shadows and borders; light purple tint (`#FAF9FF`), white cards.
- **Profile:** Prominent avatar, name, phone in a single header card.
- **Wallet:** Two cards side-by-side (Balance clickable to /withdraw, Cashback with toast).
- **Referral:** One card with code + copy/share actions; second card for QR.
- **Team:** Single CTA button to /teams.
- **Typography:** Charcoal headings, muted secondary text; Plus Jakarta Sans.
- **No removal:** All data and links stay; no change to API calls or redirects.

## Files to change
1. `src/pages/myaccount.tsx` — Restyle main content (profile, wallet, referral, QR, team CTA) with Tailwind; keep all state, effects, and handlers.
2. `src/Components/accountsidebar.tsx` — Restyle nav items with Tailwind; keep all `Link` hrefs and logout `onClick`.
