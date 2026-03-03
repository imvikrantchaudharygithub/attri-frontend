# Header redesign plan — White vs light purple

## Current state (from screenshot)
- **Header background:** Dark charcoal `#3D3C3C`
- **Logo:** Dark (with possible invert for contrast)
- **Icons:** White (search, cart, profile)
- **Cart badge:** Saffron `#F4821A` with white number
- **Search bar (inline / mobile):** Semi-transparent white on dark, white placeholder and icon

## Options considered

### Option A — White background + black icons
- **Header:** `#FFFFFF`, subtle bottom border `#E5E7EB`
- **Logo:** Black/dark (no invert)
- **Icons:** Charcoal `#3D3C3C`, hover charcoal + light gray bg
- **Cart badge:** Keep saffron for urgency
- **Search:** White/light gray input, dark text, charcoal icon
- **Pros:** Clean, minimal, very readable, “premium marketplace” feel
- **Cons:** Can look generic; less brand personality

### Option B — Light purple background + dark icons (recommended)
- **Header:** Light purple `#F3E8FF` (or `#FAF5FF`), optional subtle border `#E9D5FF`
- **Logo:** Charcoal/black (no invert)
- **Icons:** Charcoal `#3D3C3C`, hover primary purple `#8B35B8` + light purple bg
- **Cart badge:** Keep saffron `#F4821A`
- **Search:** White or very light purple input, charcoal text, charcoal icon; focus ring purple
- **Pros:** On-brand, distinctive, matches site’s light purple sections; not heavy; still professional
- **Cons:** Slightly less “neutral” than pure white

### Option C — White background + purple icons
- **Header:** `#FFFFFF`
- **Logo:** Black
- **Icons:** Primary purple `#8B35B8`, hover darker purple
- **Cart badge:** Saffron
- **Search:** Light gray input, purple focus and icon
- **Pros:** Clean base + strong brand accent; icons pop
- **Cons:** Purple-on-white can feel a bit “loud” if overdone

## Recommendation: **Option B — Light purple header + charcoal icons**

1. **Brand alignment** — Site already uses `#F3E8FF` / `#FAF9FF` for sections; header in the same family feels cohesive.
2. **Contrast & accessibility** — Charcoal `#3D3C3C` on `#F3E8FF` passes WCAG AA; no need for white icons.
3. **Personality** — More memorable than plain white, without the weight of the current dark header.
4. **Hover** — Icons can turn primary purple on hover for a clear, on-brand interaction.
5. **Logo** — Use dark logo (no invert); reads well on light purple.

**Fallback:** If you prefer a cleaner, more “white” look later, we can switch to Option A (white + black icons) with a single change.

## Implementation checklist
- [ ] Header `bg-[#3D3C3C]` → `bg-[#F3E8FF]` (and scroll state: `bg-[#F3E8FF]/95` + border)
- [ ] Logo: remove any invert; ensure dark asset or use dark color
- [ ] Hamburger, search, cart, profile: stroke/fill white → `#3D3C3C`; hover icon `#8B35B8`, hover bg `#E9D5FF` or `#8B35B820`
- [ ] Desktop search input: bg white or `#FFFFFF`, border `#E5E7EB`, text `#1A1A1A`, placeholder `#9CA3AF`, icon `#3D3C3C`; focus border/ring `#8B35B8`
- [ ] Mobile search bar: same treatment; border-t `#E9D5FF`
- [ ] Cart badge: keep saffron `#F4821A`
- [ ] Dropdown (user menu): already white; keep as is
