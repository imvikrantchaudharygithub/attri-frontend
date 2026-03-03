import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/utils/animations";

export default function ProductInfo({ ProductDetails, handleAddToCart, isAdding = false }: any) {
  const discount = ProductDetails?.discount;
  const rating = ProductDetails?.rating || 5;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="pdp-info space-y-5 pb-6"
    >
      {/* Product name — dark text on light, no card background */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] font-heading leading-snug">
        {ProductDetails?.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "#D4A847" : "none"} stroke={i < rating ? "#D4A847" : "#D6D3D1"} strokeWidth="1.5">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-[#1A1A1A]">{rating}</span>
        <span className="text-sm text-[#6B7280]">/ 5.0</span>
      </div>

      {/* Feature tags — light background, dark text */}
      {ProductDetails?.tags && ProductDetails.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ProductDetails.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5C1F82] bg-[#F5EEFA] border border-[#EADCF5] px-3 py-1.5 rounded-full"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path fill="#8B35B8" d="M7 14A7 7 0 107 0a7 7 0 000 14z" />
                <path stroke="#fff" strokeWidth="1.4" d="M3.01 6.694l1.92 2.398 5.642-4.422" />
              </svg>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Price block — light surface, accent for price */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-sm">
        <div className="flex items-baseline gap-3 mb-1 flex-wrap">
          <span className="text-3xl font-bold text-[#D4A847]">
            ₹{ProductDetails?.price?.toFixed(0)}
          </span>
          {ProductDetails?.mrp > ProductDetails?.price && (
            <span className="text-lg text-[#6B7280] line-through">
              ₹{ProductDetails?.mrp?.toFixed(0)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-sm font-bold text-white bg-[#F4821A] px-2.5 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>
        <p className="text-xs text-[#6B7280]">Inclusive of all taxes</p>
      </div>

      {/* Single Add to Bag — one button for mobile and desktop (class ensures no duplicate on PDP) */}
      <button
        type="button"
        className="pdp-add-to-bag-only w-full flex items-center justify-center gap-2 py-4 bg-[#8B35B8] text-white rounded-xl font-semibold text-sm hover:bg-[#5C1F82] transition-all duration-200 active:scale-[0.98] shadow-[0_4px_16px_rgba(139,53,184,0.35)] cursor-pointer disabled:opacity-60"
        onClick={() => handleAddToCart(ProductDetails)}
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
            </svg>
            Adding...
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
              <path d="M2.4375 4.0625H5.6875L8.125 17.875H21.125" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.125 14.625H20.7919C21.1905 14.6251 21.4721 14.4013 21.544 14.0138L22.6 6.5H6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8.9375" cy="21.125" r="1.625" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="20.3125" cy="21.125" r="1.625" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            Add To Bag
          </>
        )}
      </button>

      {/* Description */}
      {ProductDetails?.description && (
        <div className="pt-2 border-t border-[#E5E7EB]">
          <h2 className="text-lg font-bold text-[#1A1A1A] font-heading mb-2">Product Description</h2>
          <p className="text-[#6B7280] text-sm leading-relaxed">{ProductDetails?.description}</p>
        </div>
      )}
    </motion.div>
  );
}
