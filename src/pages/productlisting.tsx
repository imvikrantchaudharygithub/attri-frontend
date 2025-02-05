import Image from "next/image";
import "@/styles/plp.css";
import ProductCard from "@/Components/ProductCard";
import HaveFun from "@/Components/HaveFun";
import About from "@/Components/About";
export default function ProductListing() {
  return (
    <>
        <div className="inner-banner relative">
            <picture className="picture">
                <source media="(max-width: 767px)"  srcSet={'/assets/images/inner-banner.jpg'}/>
                <source media="(min-width: 768px)"srcSet={'/assets/images/inner-banner.jpg'}/>
                <Image className="w-full" width={1920} height={340} src={'/assets/images/inner-banner.jpg'} alt="Kurlon Hula Hula"/>
            </picture>
            <h1 className="attrilgheading">Weight Supplements & Products</h1>
        </div>
        <div className="plp-box padding-tb">
            <div className="container">
                <div className="plp-main d-flex">
                    <div className="plp-left"></div>
                    <div className="plp-right">
                        <div className="plp-top d-flex align justify-content">
                            <span className="product-count">{100}Products</span>
                            <ul className="d-flex align justify-content">
                                <li>
                                    Weight
                                    <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.51562 6.98438C7.82031 7.26562 7.82031 7.75781 7.51562 8.03906C7.375 8.17969 7.1875 8.25 7 8.25C6.78906 8.25 6.60156 8.17969 6.46094 8.03906L4 5.57812L1.51562 8.03906C1.375 8.17969 1.1875 8.25 1 8.25C0.789062 8.25 0.601562 8.17969 0.460938 8.03906C0.15625 7.75781 0.15625 7.26562 0.460938 6.98438L2.92188 4.5L0.460938 2.03906C0.15625 1.75781 0.15625 1.26562 0.460938 0.984375C0.742188 0.679688 1.23438 0.679688 1.51562 0.984375L4 3.44531L6.46094 0.984375C6.74219 0.679688 7.23438 0.679688 7.51562 0.984375C7.82031 1.26562 7.82031 1.75781 7.51562 2.03906L5.05469 4.52344L7.51562 6.98438Z" fill="#BEBEBE"></path></svg>
                                </li>
                                <li>
                                    Weight
                                    <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.51562 6.98438C7.82031 7.26562 7.82031 7.75781 7.51562 8.03906C7.375 8.17969 7.1875 8.25 7 8.25C6.78906 8.25 6.60156 8.17969 6.46094 8.03906L4 5.57812L1.51562 8.03906C1.375 8.17969 1.1875 8.25 1 8.25C0.789062 8.25 0.601562 8.17969 0.460938 8.03906C0.15625 7.75781 0.15625 7.26562 0.460938 6.98438L2.92188 4.5L0.460938 2.03906C0.15625 1.75781 0.15625 1.26562 0.460938 0.984375C0.742188 0.679688 1.23438 0.679688 1.51562 0.984375L4 3.44531L6.46094 0.984375C6.74219 0.679688 7.23438 0.679688 7.51562 0.984375C7.82031 1.26562 7.82031 1.75781 7.51562 2.03906L5.05469 4.52344L7.51562 6.98438Z" fill="#BEBEBE"></path></svg>
                                </li>
                            </ul>
                        </div>
                        <div className="plp-list d-grid padding-tb">
                            <ProductCard></ProductCard>
                            <ProductCard></ProductCard>
                            <ProductCard></ProductCard>
                            <ProductCard></ProductCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <HaveFun></HaveFun>
        <About></About>
    </>
  );
}
