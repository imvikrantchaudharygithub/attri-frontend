# Category Page Data Plan — Use Home API to Show Categories & Products

## Problem
- **Category page** (`/category` and `/category/[slug]`) shows **no data**.
- It currently calls **`/get-product-category/${slug}`**, which may not exist or return empty.
- **Homepage** already has all needed data via **`/home-pagedata`**: `homeData.data.categories` is an array where each item has `_id`, `name`, `slug`, `image`, `banner?`, and **`products`** (array).

## Goal
- Use the **homepage API** (`/home-pagedata`) so the category page always has data.
- **Two views:**
  1. **Category index** (`/category`) — list all categories; show 2–3 products per category + “View all” to `/category/[slug]`.
  2. **Category detail** (`/category/[slug]`) — show one category (banner, name, all products) using that slug from home data.

---

## Data Shape (from Home API)

```ts
// GET /home-pagedata  →  homeData.data.categories
[
  {
    _id: string,
    name: string,
    slug: string,        // e.g. "oils", "face-wash"
    image?: string,
    banner?: string,
    products: Array<{ _id, name, slug, price, mrp, images, ... }>
  },
  ...
]
```

- **Category index:** use full `categories` array.
- **Category detail:** `categories.find(c => c.slug === params.slug)`.

---

## Implementation Plan

### Step 1: Fetch home data on the category page
- In **`getServerSideProps`** (preferred so data is ready on first paint):
  - Call **`getData("/home-pagedata")`** (same as homepage).
  - Pass **`categories`** (and optionally full `homeData`) to the page as props.
- **Alternative:** If you must keep client-only (e.g. no getServerSideProps), fetch `/home-pagedata` in **`useEffect`** and set state for categories. Prefer **getServerSideProps** for SEO and no empty flash.

### Step 2: Category index route — `/category`
- **When:** `router.query.category` is undefined or empty (e.g. `category === undefined` or `category?.length === 0`).
- **UI:**
  - Optional: small hero or title “Shop by category”.
  - **Grid/list of category cards.** For each category from home data:
    - Category name + image (or first product image).
    - Show **2–3 products** (e.g. `category.products.slice(0, 3)`) using existing **ProductCard**.
    - **“View all” / “See all”** link to **`/category/${category.slug}`**.
  - Reuse existing styles (e.g. `bg-[#FAF9FF]`, container, ProductCard).

### Step 3: Category detail route — `/category/[slug]`
- **When:** `router.query.category` has one segment (e.g. `category[0] === 'oils'`).
- **Resolve category:** From home-data categories:  
  `currentCategory = categories?.find(c => c.slug === category[0])`.
- **If not found:** Show “Category not found” and link back to `/category` or home.
- **If found:**
  - **Banner:** Use `currentCategory.banner` or `currentCategory.image` (same as current category banner block).
  - **Title:** `currentCategory.name`.
  - **Product grid:** Render **all** `currentCategory.products` with **ProductCard** (same grid as now).
  - Keep existing top bar (product count, breadcrumb Home > Category name).

### Step 4: Fallback and loading
- **Loading:** Keep existing skeleton (ProductGridSkeleton) when using client-side fetch; if using getServerSideProps, loading is minimal (only client nav).
- **Fallback:** If home API fails, either:
  - Keep a **fallback** to current API `get-product-category/${slug}` for detail page, or
  - Show a friendly “Categories couldn’t be loaded” and a link to home.
- **Empty products:** If a category has `products.length === 0`, show “No products in this category” (same as current empty state).

### Step 5: No changes to API or other pages
- **Do not** change `apiServices.ts` or homepage.
- **Do not** change ProductCard, footer links, or NewProduct links; they already use `/category/${slug}` and will work once this page uses home data.

---

## File to Change
- **Single file:** `src/pages/category/[[...category]].tsx`
  - Add **getServerSideProps** that fetches **getData("/home-pagedata")** and returns **categories** (and maybe full homeData).
  - In the page component:
    - Receive **categories** (and slug from `router.query.category`).
    - **Index:** when no slug, render list of categories with 2–3 products + “View all”.
    - **Detail:** when slug present, find category by slug, render banner + full product grid.
    - Remove or keep as fallback the existing **getData(`/get-product-category/${category[0]}`)** call (recommend remove if home API is the source of truth).

---

## Summary Checklist
- [ ] getServerSideProps: call getData("/home-pagedata"), pass categories to page.
- [ ] Category index (/category): show all categories; 2–3 products each + “View all” to /category/[slug].
- [ ] Category detail (/category/[slug]): find category by slug in categories; show banner, name, all products.
- [ ] Handle “category not found” and empty products.
- [ ] Keep existing UI (banner, grid, ProductCard, breadcrumb, empty state).
- [ ] No changes to apiServices or homepage.
