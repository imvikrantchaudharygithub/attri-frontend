# Attri Login + Signup Popup UI Redesign Plan

## Goal
Transform login and signup into a premium, trustworthy, conversion-focused auth experience that feels modern on mobile and desktop.

## Design Direction (Chosen)
- Style: **Soft Premium Wellness** (minimal + subtle glass, not heavy effects)
- Mood: clean, elegant, reassuring, fast
- Visual language: rounded cards, soft shadows, refined typography, strong contrast
- Principle: keep brand purple/gold identity but reduce visual noise and clutter

## Why This Direction
- Your current popup already has a good base structure, but it feels busy and inconsistent between login popup and signup page.
- Full liquid-glass can hurt readability/performance; we will use **light glass accents only** for a premium feel without accessibility regression.
- Existing brand tokens in `globals.css` are solid; we should standardize usage instead of adding many new colors.

## Scope
- In scope:
  - Redesign login popup UI
  - Redesign signup UI to match popup quality and style
  - Unify auth flow (phone -> OTP -> optional profile completion) with consistent components
  - Accessibility and responsive polish
- Out of scope:
  - Backend auth logic changes
  - New auth methods (Google/Apple login)

## UX Problems to Solve
- Visual mismatch between login popup and signup experience
- Dense layout and weak hierarchy in form sections
- Error handling relies heavily on color and toast only
- OTP UX can be improved for speed, clarity, and keyboard/screen-reader support
- Mobile ergonomics and spacing need refinement for premium feel

## Target Experience
- Single auth container with clear steps and progress context
- Minimal number of fields per step (high conversion)
- Inline guidance + inline validation + clear success/error feedback
- Fast, tactile micro-interactions (150-250ms)
- Looks premium on first impression, especially on mobile

## Information Architecture
1. **Step 1: Phone entry**
   - Headline + one-sentence value proposition
   - Mobile input with country prefix
   - Primary CTA: "Continue"
2. **Step 2: OTP verification**
   - Confirm destination number with "Edit"
   - 4 OTP boxes with auto-advance, paste support, smart backspace
   - Resend timer and clear state text
3. **Step 3: New user quick profile (if required)**
   - Name + optional referral
   - Final CTA: "Create Account"

## Visual System
### Color Tokens (Use Existing Brand Variables)
- Primary: `--color-primary`
- Primary dark (hover): `--color-primary-dark`
- Accent: `--color-accent-gold`
- Surface: `--color-surface`
- Text primary/secondary/muted: existing text tokens
- Borders: `--color-border`, focus ring from global focus-visible style

### Typography
- Heading: Lora (`--font-heading`)
- Body: Raleway (`--font-body`)
- Scale:
  - Modal title: 28/32 desktop, 24/30 mobile
  - Body/help text: 14-15px with 1.5 line-height
  - Labels: 12px semibold uppercase is optional; prefer sentence case for calmer tone

### Shape + Elevation
- Modal radius: 20-24px
- Inputs/Buttons radius: 12-14px
- Shadow: use one strong card shadow + one subtle inner/border layer
- Border contrast: always visible in light mode

## Component Blueprint
### Auth Modal Shell
- Backdrop: dark overlay + blur
- Card layout:
  - Desktop: split view (visual panel + form panel)
  - Mobile: single-column form-first layout
- Sticky close button with strong hover/focus state

### Reusable Auth Components
- `AuthModalShell`
- `AuthHeader` (title, subtitle, step indicator)
- `PhoneInputField`
- `OtpInputGroup`
- `AuthPrimaryButton`
- `AuthInlineMessage` (error/success/info with icon and aria-live)
- `AuthFooterSwitch` (Login <-> Signup link)

### Motion Rules
- Enter/exit: opacity + translateY + small scale only
- Duration: 180-260ms
- Easing: smooth, no bounce
- Respect `prefers-reduced-motion`

## Accessibility Requirements (Must-Have)
- Label every input explicitly (no placeholder-only fields)
- Error text announced with `role="alert"` or `aria-live="polite"`
- Maintain 4.5:1 contrast minimum for text
- Keyboard flow:
  - logical tab order
  - Escape closes modal
  - focus trap inside modal
  - return focus to trigger button on close
- Touch targets >= 44x44

## Content + Microcopy
- Tone: clear, short, trustworthy
- Replace vague text with direct guidance:
  - "Enter your mobile number to continue securely"
  - "We sent a 4-digit code to +91 XXXXXXX123"
  - "Wrong number? Edit"
- Error copy:
  - specific + actionable, not generic

## Implementation Plan (Code-Level)
1. **Create auth UI foundation**
   - Build reusable auth primitives under `src/Components/auth/`
   - Move hardcoded colors in auth UI to CSS variables/tailwind token classes
2. **Refactor current login popup**
   - Replace `src/Components/loginpopup.tsx` internals with new shell + primitives
   - Keep existing API calls and Redux behavior unchanged initially
3. **Unify signup styling**
   - Align `src/pages/signup/[[...referralCode]].tsx` with same visual system/components
   - Reuse OTP component and button/input variants
4. **Interaction polish**
   - Inline validation states, disabled/loading states, resend state UX
   - Improve OTP keyboard + paste behavior and error visibility
5. **Accessibility pass**
   - Focus trap, aria attributes, error announcements, keyboard escape flow
6. **Responsive + QA pass**
   - Test at 375, 768, 1024, 1440 widths
   - Verify no horizontal scroll and no clipped controls

## Suggested File Changes
- Update: `src/Components/loginpopup.tsx`
- Update: `src/pages/signup/[[...referralCode]].tsx`
- Add: `src/Components/auth/AuthModalShell.tsx`
- Add: `src/Components/auth/AuthHeader.tsx`
- Add: `src/Components/auth/OtpInputGroup.tsx`
- Add: `src/Components/auth/AuthField.tsx`
- Optional update: `src/styles/globals.css` (only if new auth utility classes are needed)

## QA Checklist
- Visual consistency between login and signup
- Inline errors visible and announced to screen readers
- Button loading states prevent double submit
- OTP flow works with typing, backspace, and paste
- Modal fully usable via keyboard only
- Mobile safe-area and thumb reach feel good
- Motion disabled correctly with reduced-motion preference

## Rollout Strategy
- Phase 1: UI-only refactor behind same auth logic
- Phase 2: Signup alignment and shared components
- Phase 3: Final polish + accessibility audit
- Phase 4: Optional A/B test for conversion uplift

## Success Metrics
- Lower auth drop-off before OTP verification
- Faster completion time for login/signup
- Reduced auth-related support complaints
- Better Lighthouse accessibility score on auth flows

## Anti-Patterns to Avoid
- Over-transparent glass backgrounds that reduce readability
- Placeholder-only fields without labels
- Excessive animation or bouncy transitions
- Multiple competing CTA colors
- Form error feedback only through toast
