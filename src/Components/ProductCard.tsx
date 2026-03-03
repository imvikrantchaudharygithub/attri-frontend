"use client";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/slices/rootReduces";
import { postData } from "@/services/apiServices";
import { setCartCount } from "@/slices/loginUserSlice";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductCard({ product, category }: any) {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state?.token?.token);
  const user = useAppSelector((state: any) => state.user);
  const cartCount = useSelector((state: RootState) => state?.cartCount?.count);
  const [isAdding, setIsAdding] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = async (productitem: any) => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      if (!token) {
        dispatch(addToCart({ product: productitem, quantity: 1 }));
        dispatch(setCartCount(cartCount + 1));
        toast.success("Item added to cart");
      } else {
        await postData("add-item", {
          userId: user?.id,
          productId: productitem?._id,
          quantity: 1,
        });
        dispatch(setCartCount(cartCount + 1));
        toast.success("Item added to cart");
      }
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 2000);
    } catch {
      toast.error("Could not add item to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const discountPercent = product?.discount;
  const imgSrc = product?.images?.[0] || "/assets/images/product.jpg";

  return (
    <motion.div
      className="product-card group relative bg-white rounded-2xl overflow-hidden cursor-pointer border border-[#E5E7EB]"
      style={{ boxShadow: "0 4px 12px rgba(139, 53, 184, 0.06), 0 1px 3px rgba(0,0,0,0.04)" }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 28px rgba(139, 53, 184, 0.12), 0 4px 12px rgba(0,0,0,0.06)",
        transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Discount badge — accent */}
      {discountPercent > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-[#F4821A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full leading-none">
          {discountPercent}% OFF
        </div>
      )}

      {/* Product image — no dark overlay */}
      <div className="relative aspect-square bg-[#FAF9FF] overflow-hidden">
        <Link href={`/product/${product?.slug}`} tabIndex={-1}>
          <Image
            width={600}
            height={600}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
            src={imgSrc}
            alt={product?.name || "Product"}
          />
        </Link>

        {/* Add to cart overlay — slides up on hover */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            className={`w-full py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer ${
              addedFeedback
                ? "bg-[#16A34A] text-white"
                : "bg-[#8B35B8] text-white hover:bg-[#5C1F82]"
            }`}
            onClick={() => handleAddToCart(product)}
            disabled={isAdding}
            aria-label="Add to cart"
          >
            {isAdding ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                </svg>
                Adding...
              </span>
            ) : addedFeedback ? (
              <span className="flex items-center justify-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Added!
              </span>
            ) : (
              "Add To Bag"
            )}
          </button>
        </div>
      </div>

      {/* Product info — light background, dark text for visibility */}
      <div className="p-3 md:p-4 bg-white">
        {/* Category pill */}
        {category && (
          <span className="inline-block text-[10px] font-semibold text-[#5C1F82] bg-[#F5EEFA] px-2 py-0.5 rounded-full mb-1.5">
            {category}
          </span>
        )}

        {/* Name */}
        <Link href={`/product/${product?.slug}`}>
          <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug overflow-hidden text-twoline mb-1.5 hover:text-[#8B35B8] transition-colors duration-200">
            {product?.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="12" height="12" viewBox="0 0 17 15" fill="#D4A847">
                <path d="M8.5 1.726L10.364 5.504l.127.256.282.041 4.169.606-3.017 2.94-.204.2.048.28.712 4.153-3.729-1.96-.252-.133-.253.133-3.729 1.96.712-4.153.048-.28-.204-.2L2.058 6.407l4.169-.606.282-.041.127-.256L8.5 1.726z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-[#6B7280]">(5.0)</span>
        </div>

        {/* Price — gold accent for visibility */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold text-[#D4A847]">
            ₹{product?.price?.toFixed(0)}
          </span>
          {product?.mrp > product?.price && (
            <span className="text-xs text-[#6B7280] line-through">
              ₹{product?.mrp?.toFixed(0)}
            </span>
          )}
        </div>

        {/* Add to cart — visible on mobile (no hover) */}
        <button
          className={`mt-2.5 w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-[0.97] cursor-pointer md:hidden ${
            addedFeedback
              ? "bg-[#16A34A] text-white"
              : "bg-[#8B35B8] text-white hover:bg-[#5C1F82]"
          }`}
          onClick={() => handleAddToCart(product)}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : addedFeedback ? "✓ Added!" : "Add To Bag"}
        </button>
      </div>
    </motion.div>
  );
}
