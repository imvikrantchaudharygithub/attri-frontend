import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/Components/ProductCard";
import HaveFun from "@/Components/HaveFun";
import { useRouter } from "next/router";
import { getData } from "@/services/apiServices";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/utils/animations";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden">
          <div className="skeleton aspect-square" />
          <div className="p-4 space-y-2">
            <div className="skeleton h-4 rounded-lg" />
            <div className="skeleton h-4 w-2/3 rounded-lg" />
            <div className="skeleton h-5 w-1/2 rounded-lg mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

const PRODUCTS_PREVIEW_COUNT = 3;

export default function ProductListing({
  categories: initialCategories,
  initialSlug = null,
}: {
  categories: any[];
  initialSlug?: string | null;
}) {
  const router = useRouter();
  const { category: categoryFromQuery } = router.query;
  // Slug from server (reliable on first paint) or from client router
  const slug =
    initialSlug ??
    (Array.isArray(categoryFromQuery) && categoryFromQuery.length > 0 ? categoryFromQuery[0] : null);
  const categories = initialCategories || [];

  // Only detail view when we have exactly one segment (e.g. /category/hair, not /category)
  const isDetailView = !!slug;
  const currentCategory = isDetailView
    ? categories.find(
        (c: any) =>
          (c?.slug && String(c.slug).toLowerCase() === String(slug).toLowerCase()) ||
          c?._id === slug
      )
    : null;

  // —— Category index: /category ———
  if (!isDetailView) {
    return (
      <>
        <div className="relative overflow-hidden bg-[#FAF9FF] border-b border-[#E5E7EB]">
          <div className="container pt-10 pb-8 sm:pt-12 sm:pb-10 md:pt-16 md:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center sm:text-left"
            >
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#3D3C3C] leading-tight"
                style={{ fontFamily: "var(--font-heading)", paddingTop: "20px" }}
              >
                Shop by category
              </h1>
              <p className="mt-3 text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-xl mx-auto sm:mx-0">
                Browse our categories and find what you need
              </p>
            </motion.div>
          </div>
        </div>

        <section className="bg-[#FAF9FF] py-8 md:py-12">
          <div className="container">
            {!categories || categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F3E8FF] flex items-center justify-center mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B35B8" strokeWidth="1.5">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#3D3C3C] mb-1">No categories yet</h3>
                <p className="text-[#6B7280] text-sm mb-4">Check back soon.</p>
                <Link href="/" className="text-[#8B35B8] font-semibold hover:underline">
                  Back to home
                </Link>
              </div>
            ) : (
              <div className="space-y-12 md:space-y-16">
                {categories.map((cat: any, index: number) => {
                  const products = cat?.products || [];
                  const previewProducts = products.slice(0, PRODUCTS_PREVIEW_COUNT);
                  const hasMore = products.length > PRODUCTS_PREVIEW_COUNT;

                  return (
                    <motion.div
                      key={cat._id || index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="flex items-end justify-between mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-[#3D3C3C] font-heading">
                          {cat.name}
                        </h2>
                        <Link
                          href={`/category/${cat.slug}`}
                          className="text-sm font-semibold text-[#8B35B8] hover:text-[#5C1F82] transition-colors flex items-center gap-1"
                        >
                          View all
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>

                      {previewProducts.length === 0 ? (
                        <p className="text-[#6B7280] text-sm py-4">No products in this category.</p>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                          {previewProducts.map((product: any) => (
                            <ProductCard
                              key={product._id}
                              product={product}
                              category={cat.name}
                            />
                          ))}
                        </div>
                      )}
                      {hasMore && (
                        <div className="mt-6 flex justify-center md:justify-end">
                          <Link
                            href={`/category/${cat.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#8B35B8] border border-[#8B35B8] hover:bg-[#8B35B8] hover:text-white transition-all"
                          >
                            View all {products.length} products
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <HaveFun />
      </>
    );
  }

  // —— Category detail: /category/[slug] ———
  if (!currentCategory) {
    return (
      <>
        <div className="relative overflow-hidden bg-[#3D3C3C] h-40 md:h-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D3C3C]/90 to-[#3D3C3C]/50" />
          <div className="container relative text-center py-12">
            <h1 className="text-2xl md:text-4xl font-bold text-white font-heading mb-4">
              Category not found
            </h1>
            <p className="text-white/80 text-sm mb-6">
              We couldn&apos;t find that category.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/category"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#3D3C3C] rounded-xl font-semibold text-sm hover:bg-[#FAF9FF] transition-colors"
              >
                All categories
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B35B8] text-white rounded-xl font-semibold text-sm hover:bg-[#5C1F82] transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
        <section className="bg-[#FAF9FF] py-12">
          <div className="container" />
        </section>
        <HaveFun />
      </>
    );
  }

  const categoryData = currentCategory;
  const products = categoryData?.products || [];

  return (
    <>
      {/* Category banner */}
      <div className="relative overflow-hidden bg-[#3D3C3C] h-40 md:h-60">
        {categoryData?.banner || categoryData?.image ? (
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={categoryData?.image || "/assets/images/inner-banner.jpg"}
            />
            <source
              media="(min-width: 768px)"
              srcSet={categoryData?.banner || categoryData?.image || "/assets/images/inner-banner.jpg"}
            />
            <Image
              className="w-full h-full object-cover"
              width={1920}
              height={240}
              src={categoryData?.banner || categoryData?.image || "/assets/images/inner-banner.jpg"}
              alt={categoryData?.name || "Category"}
            />
          </picture>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D3C3C]/90 to-[#3D3C3C]/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-bold text-white font-heading"
            >
              {categoryData?.name || "Products"}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="bg-[#FAF9FF] py-8 md:py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-[#6B7280] font-medium">
              {products.length} product{products.length !== 1 ? "s" : ""}
            </span>
            <nav className="flex items-center gap-1 text-xs text-[#9CA3AF]">
              <Link href="/" className="hover:text-[#8B35B8] transition-colors">
                Home
              </Link>
              <svg width="12" height="12" viewBox="0 0 6 10" fill="none">
                <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="text-[#1A1A1A] font-medium">{categoryData?.name}</span>
            </nav>
          </div>

          {products.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {products.map((product: any) => (
                <motion.div key={product._id} variants={staggerItem}>
                  <ProductCard product={product} category={categoryData?.name} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F3E8FF] flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B35B8" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#3D3C3C] mb-1">No products in this category</h3>
              <p className="text-[#6B7280] text-sm mb-4">Check back soon for new arrivals.</p>
              <Link href="/category" className="text-[#8B35B8] font-semibold hover:underline">
                View all categories
              </Link>
            </div>
          )}
        </div>
      </section>

      <HaveFun />
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const res = await getData("/get-product-categories");
    const categories = res?.data?.categories ?? [];
    const paramCategory = context.params?.category;
    const initialSlug =
      Array.isArray(paramCategory) && paramCategory.length === 1 ? paramCategory[0] : null;
    return {
      props: {
        categories,
        initialSlug,
      },
    };
  } catch (error) {
    console.error("Error fetching categories for category page:", error);
    return {
      props: {
        categories: [],
        initialSlug: null,
      },
    };
  }
}
