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
import Seo from "@/Components/Seo";
import JsonLd from "@/Components/seo/JsonLd";
import { productSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import type { GetServerSideProps } from "next";
import { setCartCount } from "@/slices/loginUserSlice";
import { addToCart } from "@/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/rootReduces";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";

interface ProductPageProps {
  initialProduct: any | null;
  slug: string;
}

export default function ProductDetails({ initialProduct, slug }: ProductPageProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state?.token?.token);
  const user = useAppSelector((state: any) => state.user);
  const cartCount = useSelector((state: RootState) => state?.cartCount?.count);
  const { productslug } = router.query;
  const [productData, setProductData] = useState<any>(initialProduct || {});
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
    // Server already provided the product (getServerSideProps). Only fetch on the
    // client as a fallback when the server fetch failed.
    if (!initialProduct && Array.isArray(productslug) && productslug.length > 0) {
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
      {productData?.name && (
        <>
          <Seo
            type="product"
            title={productData.name}
            description={(productData?.description || "").toString().slice(0, 300) || undefined}
            path={`/product/${slug}`}
            image={Array.isArray(productData?.images) ? productData.images[0] : undefined}
          />
          <JsonLd data={productSchema(productData, slug)} />
          <JsonLd
            data={breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: productData?.category?.name || "Shop", url: "/category" },
              { name: productData.name, url: `/product/${slug}` },
            ])}
          />
          <JsonLd data={faqSchema(productData?.faqs || [])} />
        </>
      )}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const param = ctx.params?.productslug;
  const slug = Array.isArray(param) ? param[0] : ((param as string) || "");
  if (!slug) return { notFound: true };
  try {
    const res: any = await getData(`/get-product/${slug}`);
    const product = res?.data?.product ?? null;
    if (!product) return { notFound: true };
    return { props: { initialProduct: product, slug } };
  } catch {
    // Never 500 — let the client useEffect retry the fetch.
    return { props: { initialProduct: null, slug } };
  }
};
