import PlpProductSlider from "@/Components/PlpProductSlider";
import ProductInfo from "@/Components/ProductInfo";
import HaveFun from "@/Components/HaveFun";
import WhyAttri from "@/Components/WhyAttri";
import Faq from "@/Components/Faq";
import ProductDescription from "@/Components/ProductDescription";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getData, postData } from "@/services/apiServices";
import toast from "react-hot-toast";
import { setCartCount } from "@/slices/loginUserSlice";
import { addToCart } from "@/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/rootReduces";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";

export default function ProductDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state?.token?.token);
  const user = useAppSelector((state: any) => state.user);
  const cartCount = useSelector((state: RootState) => state?.cartCount?.count);
  const { productslug } = router.query;
  const [productData, setProductData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const fetchProductData = async () => {
    setIsLoading(true);
    if (Array.isArray(productslug) && productslug.length > 0) {
      getData(`/get-product/${productslug[0]}`)
        .then((res: any) => {
          setProductData(res?.data?.product);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  };

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
    } catch {
      toast.error("Could not add item to cart");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(productslug) && productslug.length > 0) {
      fetchProductData();
    }
  }, [productslug]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 container py-10">
        {/* Skeleton */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 aspect-square skeleton rounded-2xl" />
          <div className="md:w-1/2 space-y-4">
            <div className="skeleton h-8 w-3/4 rounded-lg" />
            <div className="skeleton h-4 w-1/4 rounded-lg" />
            <div className="skeleton h-20 rounded-xl" />
            <div className="skeleton h-12 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Product main — single Add to Bag only (no duplicate on mobile) */}
      <section className="pdp-product-main bg-[#FAF9FF] py-6 md:py-10" data-page="product-detail">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="md:w-[45%] flex-shrink-0">
              <PlpProductSlider productimages={productData?.images} />
            </div>
            <div className="md:w-[55%]">
              <ProductInfo
                ProductDetails={productData}
                handleAddToCart={handleAddToCart}
                isAdding={isAdding}
              />
            </div>
          </div>
        </div>
      </section>

      {productData?.gallery && productData.gallery.length > 0 && (
        <WhyAttri gallery={productData.gallery} productname={productData.name} />
      )}

      {productData?.ingredients && productData.ingredients.length > 0 && (
        <ProductDescription
          ingredients={productData.ingredients}
          productinfo={productData.info}
        />
      )}

      {productData?.faqs && productData.faqs.length > 0 && (
        <Faq faqs={productData.faqs} />
      )}

      <HaveFun />
    </>
  );
}
