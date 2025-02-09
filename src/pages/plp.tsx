import Image from "next/image";
import "@/styles/plp.css";
import PlpProductSlider from "@/Components/PlpProductSlider";
import ProductInfo from "@/Components/ProductInfo";
import HaveFun from "@/Components/HaveFun";
import FasterResults from "@/Components/FasterResults";
import WhyAttri from "@/Components/WhyAttri";
import Faq from "@/Components/Faq";
import ProductDescription from "@/Components/ProductDescription";
export default function ProductDetails() {
  return (
    <>
        <div className="pdp-top padding-tb">
            <div className="container">
                <div className="pdp-main d-flex">
                    <div className="pdp-left">
                        <PlpProductSlider></PlpProductSlider>
                    </div>
                    <div className="pdp-right">
                        <ProductInfo></ProductInfo>
                    </div>
                </div>
            </div>
        </div>
        <WhyAttri></WhyAttri>
        <ProductDescription></ProductDescription>
        <FasterResults></FasterResults>
        <Faq></Faq>
        <HaveFun></HaveFun>
    </>
  );
}
