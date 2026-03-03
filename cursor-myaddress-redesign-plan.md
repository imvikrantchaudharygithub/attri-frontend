# My Address Page & Popups — Redesign Plan

## 1. Current state (deep analysis)

### 1.1 Page: `/myaddress` (`src/pages/myaddress.tsx`)

**Layout & structure**
- Section: `account-box` → `container` → title "My Address" → `account-main d-flex padding-tb`.
- Left: `account-left` (green background from account.css) with `AccountSideBar`.
- Right: `account-right` with:
  - **Top bar:** "Saved Address" (h2) + **ADD NEW ADDRESS** button (opens add-address popup).
  - **List:** For each address, `<SaveAddress>` card.
  - **Empty state:** Icon, "No Addresses Found", "You haven't added any delivery addresses yet.", **Add Your First Address** button (opens same popup).

**Data & API**
- **State:** `showAddAddressPopup`, `addressData` (array), `isLoading`, `user` (from Redux).
- **Fetch:** `getaddressData()` — `GET users/${user?.id}/addresses` → `setAddressData(res?.data?.addresses)`. Runs on mount and when `showAddAddressPopup` changes (refetch after add).
- **Make default:** `makeDefaultAddress(addressId)` — `POST addresses/${addressId}/default` body `{ userId }` → then `getaddressData()`.
- **Delete:** `deleteAddress(addressId)` — `POST delete-address` body `{ id: addressId }` → then `getaddressData()`.

**Loading**
- When `isLoading`: full-screen loader (line-loader + "loading" text). No sidebar or layout.

**Popups**
- `showAddAddressPopup && <NewAddressPopUp closePopup={()=>setShowAddAddressPopup(false)} />`
- `<EditAddressPopUp />` always mounted; **hidden via CSS** (`display: none` in popup.css).

**Keep**
- All API endpoints, request bodies, and refetch behavior.
- Open/close only for Add popup; Edit remains hidden until we wire it.
- All address fields and actions (default, delete).

---

### 1.2 Address card: `SaveAddress` (`src/Components/saveaddress.tsx`)

**Props**
- `address`: `{ _id?, id?, name, street, city, state, pincode, contact, type, isDefault }`
- `defaultAddress(addressId: string)`: set as default.
- `deleteAddress(addressId: string)`: delete address.

**UI**
- Wrapper: `address-item` + `active` when `address?.isDefault`.
- **Radio:** `checked={address?.isDefault}`, `onChange={() => defaultAddress(address?._id)}` — selecting sets default.
- **Details:** `address?.name`; one line: `street, city, state - pincode`; "Mobile Number : +91{contact}".
- **Tag:** Top-right pill "Home" or "Office" from `address?.type`.
- **Bottom:** REMOVE button; onClick calls `deleteAddressHandler(address?._id)` (with loading state "Removing...").

**Behavior to keep**
- Radio for default; delete with loading; use `address?._id` for API calls (and ensure backend accepts it; if API expects `id`, keep payload as-is).

---

### 1.3 Add-address popup: `NewAddressPopUp` (`src/Components/newaddresspopup.tsx`)

**Props**
- `closePopup: () => void`.

**Form (Formik + Yup)**
- **Fields:** name, mobileNumber (initial `user?.phone`), pincode, state (select), city, streetAddress, addressType (radio home | office).
- **Validation:** Name ≥3; mobile Indian 10-digit; pincode 6-digit; state/city/street required; street ≥3; addressType home|office.
- **Submit:** `POST add-address` with `{ contact, name, street, city, state, pincode, type, userId }`. On 200: close popup, reset form, toast success. On error: toast error, keep form open.

**Layout**
- Popup: overlay + wrapper (60% width; 95% on small screens) + close button (top-right) + body.
- Body: title "Add New Address", form with 2-column grid (50% per group), full-width Save at end.
- Close: only via button (overlay not wired to close in current code; can add in redesign).

**Indian states**
- Full list in component; keep as-is.

**Keep**
- All form fields, validation, submit payload, and API.
- closePopup on success; optional: close on overlay click and Escape.

---

### 1.4 Edit-address popup: `EditAddressPopUp` (`src/Components/editaddresspopup.tsx`)

**Current**
- Always rendered; **hidden with CSS** (`.attri-popup.editaddress-popup { display: none }`).
- Stub form: Name, Last Name, Mobile Number, Email, Save — not connected to any state or API.
- Close button has no `onClick`.

**Redesign**
- Option A: Keep as hidden stub; restyle when we later add edit flow (open by address id, PATCH/PUT API, prefill form).
- Option B: Add minimal wiring: open/close state from parent or context, close button, same visual system as Add popup; form/API can come in a follow-up.

Plan assumes **restyle only** for Edit popup (so it matches Add popup visually when we enable it) and **no removal** of the component.

---

### 1.5 Popup styles (`src/styles/popup.css`)

- `.attri-popup`: fixed full-screen, z-index 123.
- `.attri-popup-overlay`: full-screen, `rgba(0,0,0,.5)`.
- `.attri-popup-wrapper`: centered, white, border-radius 20px; newaddress/edit: 60% width, 95% on ≤767px.
- `.attri-popup-close`: absolute top-right, green circle, white X.
- Form: form-row with -15px margin; form-group 50% padding 15px; form-radio full width; radio styling with green when checked.

Redesign will use **CSS variables** (e.g. primary, border, surface) and optionally Tailwind in the new markup; can keep or replace these classes.

---

## 2. Redesign direction

### 2.1 Page: `/myaddress`

- **Layout:** Same structure as myaccount/order: `account-box` with `var(--color-bg)`; `account-left` transparent; sidebar unchanged.
- **Header:** Hero-style block (like myaccount/order): "My Address" + subtitle e.g. "Manage your delivery addresses" — same gradient strip and typography.
- **Top bar:** "Saved addresses" (section heading) + primary CTA button "Add new address" (opens Add popup). Button: min height 44px, primary color, icon + text.
- **Address list:** Each address in a **card**: border, shadow (var(--shadow-card)), rounded-2xl. Content:
  - **Default:** Radio or "Default" badge; selecting sets default (same API).
  - **Tag:** Home/Office pill (top-right or near title).
  - **Lines:** Name; one line address (street, city, state - pincode); mobile +91 contact.
  - **Actions:** Remove (and later Edit) with clear buttons; Remove keeps loading state.
- **Empty state:** Single card with icon, "No addresses yet", short copy, one button "Add your first address" (opens Add popup). On-brand colors (e.g. primary-light icon bg).
- **Loading:** Keep full-screen loader or replace with skeleton cards (e.g. 2–3 placeholder cards) so layout doesn’t jump; same data refetch behavior.

### 2.2 Add-address popup (NewAddressPopUp)

- **Overlay:** Backdrop (e.g. rgba(0,0,0,0.5)); **click to close** (and close button, Escape if desired).
- **Panel:** Centered, max-width (e.g. 520px), white surface, rounded-2xl, shadow. Scroll inside body if needed on small screens.
- **Header:** "Add new address" + close button (icon only, 44px target). Close and overlay use same `closePopup`.
- **Form:** Same fields and validation. Layout:
  - Single column on mobile; two columns for name+mobile, pincode+state, city+street where it fits.
  - Labels above inputs; error messages below; inputs with border (var(--color-border)), focus ring (primary).
  - Home/Office as radio group or segmented control; accent primary when selected.
  - Submit: full-width primary button "Save address", disabled while submitting, loading text "Saving...".
- **Styling:** Use CSS variables (primary, charcoal, border, error, surface). No green; use brand primary for primary actions and focus.

### 2.3 Edit-address popup (EditAddressPopUp)

- **Visual parity with Add:** Same overlay, panel size, header (title "Edit address", close button), form layout and field styling.
- **Behavior:** Keep hidden until edit is wired. When implemented: open with address id, prefill form, submit to update API, close and refetch list.
- **Stub:** Close button can call a no-op or future `closeEditPopup` so markup is ready.

### 2.4 SaveAddress component

- Becomes a presentational card that receives the same props and callbacks.
- No change to **logic**: defaultAddress(addressId), deleteAddress(addressId), loading on delete.
- **Display:** Use same data (name, street, city, state, pincode, contact, type, isDefault); ensure `_id` is used consistently for API (or align with backend if it expects `id`).

---

## 3. Data & functionality checklist (do not remove)

| Item | Where | Keep |
|------|--------|------|
| GET users/:id/addresses | myaddress | ✓ |
| POST addresses/:id/default { userId } | makeDefaultAddress | ✓ |
| POST delete-address { id } | deleteAddress | ✓ |
| POST add-address { contact, name, street, city, state, pincode, type, userId } | NewAddressPopUp | ✓ |
| Form validation (name, mobile, pincode, state, city, street, type) | NewAddressPopUp | ✓ |
| Refetch after add / default / delete | myaddress | ✓ |
| open/close Add popup | myaddress + NewAddressPopUp | ✓ |
| Edit popup hidden | EditAddressPopUp + CSS | ✓ (until edit is wired) |
| Address fields displayed | SaveAddress | name, street, city, state, pincode, contact, type, isDefault |
| Default selection (radio) | SaveAddress | ✓ |
| Delete with loading state | SaveAddress | ✓ |

---

## 4. Files to change

1. **`src/pages/myaddress.tsx`**
   - Same layout shell as myaccount/order (account-box, account-left transparent, account-right).
   - Hero header "My Address" + subtitle.
   - Section "Saved addresses" + "Add new address" button.
   - Optional: skeleton loaders instead of full-screen loader.
   - Empty state: one card, on-brand, single CTA.
   - Pass same props to SaveAddress; no API/state logic change.

2. **`src/Components/saveaddress.tsx`**
   - Restyle as card: border, shadow, rounded-2xl.
   - Same props and callbacks; same radio (default) and REMOVE button behavior.
   - Optional: ensure `_id` vs `id` is consistent with backend (use one for display and API).

3. **`src/Components/newaddresspopup.tsx`**
   - New structure: overlay (click to close) + centered panel.
   - Header: title + close button; both use existing Formik submit/close logic.
   - Form: same fields and validation; style with CSS variables; 2-col where appropriate; primary submit button.
   - Keep Formik, Yup, postData, toast, closePopup, resetForm.

4. **`src/Components/editaddresspopup.tsx`**
   - Restyle to match Add popup (overlay, panel, header, form container).
   - Add close button handler (e.g. no-op or prop `closeEditPopup` if passed).
   - Keep hidden (via conditional render or class) until edit flow is implemented.

5. **Styles**
   - Prefer Tailwind + CSS variables in components so address page and popups don’t depend on green or old popup form grid; popup.css can remain for other popups (e.g. login) or be overridden only for newaddress/edit by scoped classes.

---

## 5. Out of scope for this plan

- Implementing Edit address API and open/close state (only restyle + optional close handler).
- Adding new fields or validations.
- Changing API contracts or backend.
- Changing sidebar or global layout beyond using transparent account-left and same content width.

---

## 6. Summary

- **Page:** Hero + "Saved addresses" + Add button; address cards with default radio and Remove; empty state card; same APIs and refetch.
- **Add popup:** Overlay (click close) + panel; same form and submit; styling with design system; primary actions.
- **Edit popup:** Same look as Add, stay hidden; ready for future edit wiring.
- **SaveAddress:** Card UI only; same data and actions (default, delete).
- **No data or functionality removed.**
