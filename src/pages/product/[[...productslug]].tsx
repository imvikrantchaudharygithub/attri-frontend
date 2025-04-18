import Image from "next/image";
// import "@/styles/plp.css";  
import PlpProductSlider from "@/Components/PlpProductSlider";
import ProductInfo from "@/Components/ProductInfo";
import HaveFun from "@/Components/HaveFun";
import FasterResults from "@/Components/FasterResults";
import WhyAttri from "@/Components/WhyAttri";
import Faq from "@/Components/Faq";
import ProductDescription from "@/Components/ProductDescription";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getData, postData } from "@/services/apiServices";
import { toast } from "react-toastify";
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
    const fetchProductData = async () => {
        setIsLoading(true);
        if (Array.isArray(productslug) && productslug.length > 0) {
            getData(`/get-product/${productslug[0]}`).then((res: any) => {
                setProductData(res?.data?.product);
                console.log(res);
                setIsLoading(false);
            }).catch((err: any) => {
                console.log(err);
                setIsLoading(false);
            });
        }
    };
    const handleAddToCart = (productitem: any) => {
        if(!token){
        dispatch(addToCart({ 
            product: productitem, 
            quantity: 1 
        }));
        toast.success('Item added to cart');
    }else{
       const data = {
        userId: user?.id,
        productId: productitem?._id,
        quantity: 1
       }
       postData('add-item',data)
       .then((res:any)=>{
        dispatch(setCartCount(cartCount + 1));
        toast.success('Item added to cart');
       })
       .catch((err:any)=>{
        toast.error('Item not added to cart');
       })
    }
    };          

    useEffect(() => {
        console.log(productslug);
        if (Array.isArray(productslug) && productslug.length > 0) {
            fetchProductData();
        }
    }, [productslug]);

    if(isLoading){
        return <div className="flex justify-center items-center h-screen">
            <div className="line-loader">
              <span className="line-loader-text">loading</span>
              <span className="line-load"></span>
            </div>
          </div>
    }

  return (
    <>
        <div className="pdp-top padding-tb">
            <div className="container">
                <div className="pdp-main d-flex">
                    <div className="pdp-left">
                        <PlpProductSlider productimages={productData?.images}/>
                    </div>
                    <div className="pdp-right">
                        <ProductInfo ProductDetails={productData} handleAddToCart={handleAddToCart}></ProductInfo>
                    </div>
                </div>
            </div>
        </div>
        {productData?.gallery && productData?.gallery?.length > 0 && (
            <WhyAttri gallery={productData?.gallery} productname={productData?.name}/>
        )}
        {productData?.ingredients && productData?.ingredients?.length > 0 && (  
            <ProductDescription ingredients={productData?.ingredients} productinfo={productData?.info}/>
        )}
        {/* <FasterResults></FasterResults> */}
        {productData?.faqs && productData?.faqs?.length > 0 && (
            <Faq faqs={productData?.faqs}/>
        )}
        <HaveFun></HaveFun>
    </>
  );
}
