import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import { setCartCount } from "@/slices/loginUserSlice";
import { RootState } from "@/slices/rootReduces";
import { getData, postData } from "@/services/apiServices";
import toast from "react-hot-toast";

export default function CartRecommendations({
  cartItems,
  onAdded,
}: {
  cartItems: any[];
  onAdded: () => void;
}) {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state?.token?.token);
  const user = useSelector((state: any) => state.user);
  const cartCount = useSelector((state: RootState) => state?.cartCount?.count);

  const [products, setProducts] = useState<any[]>([]);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    getData("/recommended-products")
      .then((res: any) => setProducts(res?.data?.products || []))
      .catch(() => setProducts([]));
  }, []);

  const cartIds = new Set((cartItems || []).map((it: any) => it?.product?._id));
  const visible = products.filter((p) => !cartIds.has(p._id));

  if (visible.length === 0) return null;

  const handleAdd = async (product: any) => {
    if (addingId) return;
    setAddingId(product._id);
    try {
      if (!token) {
        dispatch(addToCart({ product, quantity: 1 }));
        dispatch(setCartCount((cartCount || 0) + 1));
        toast.success("Item added to cart");
      } else {
        await postData("add-item", {
          userId: user?.id,
          productId: product?._id,
          quantity: 1,
        });
        dispatch(setCartCount((cartCount || 0) + 1));
        toast.success("Item added to cart");
        onAdded();
      }
    } catch {
      toast.error("Could not add item to cart");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 mb-3 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[#8B35B8] text-sm">You may also like</h3>
        <span className="text-[11px] text-[#9CA3AF]">‹ scroll ›</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
        {visible.map((p) => {
          const isAdding = addingId === p._id;
          return (
            <div
              key={p._id}
              className="flex-shrink-0 w-[300px] max-w-[85%] flex items-center gap-3 border border-[#E5E7EB] rounded-2xl p-2.5 bg-white"
            >
              <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-[#FAF9FF]">
                <Image
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  src={p?.images?.[0] || "/assets/images/product.jpg"}
                  alt={p?.name || "Product"}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-[#1A1A1A] leading-snug overflow-hidden text-twoline">
                  {p?.name}
                </h4>
                <div className="flex items-baseline flex-wrap gap-x-1.5 mt-0.5">
                  <span className="text-sm font-bold text-[#D4A847]">₹{p?.price?.toFixed(0)}</span>
                  {p?.mrp > p?.price && (
                    <span className="text-[10px] text-[#9CA3AF] line-through">₹{p?.mrp?.toFixed(0)}</span>
                  )}
                  {p?.discount > 0 && (
                    <span className="text-[10px] font-semibold text-[#16A34A]">{p.discount}% off</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleAdd(p)}
                disabled={isAdding}
                className="flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#8B35B8] text-white hover:bg-[#5C1F82] transition-colors active:scale-[0.97] disabled:opacity-60 cursor-pointer"
              >
                {isAdding ? "..." : "ADD"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
