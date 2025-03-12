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
import { getData } from "@/services/apiServices";

export default function ProductDetails() {
    const router = useRouter();
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

    useEffect(() => {
        console.log(productslug);
        if (Array.isArray(productslug) && productslug.length > 0) {
            fetchProductData();
        }
    }, [productslug]);

    if(isLoading){
        return <div className="flex justify-center items-center h-screen">
            <div className="loader">
              <span className="loader-text">loading</span>
              <span className="load"></span>
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
                        <ProductInfo ProductDetails={productData}></ProductInfo>
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
