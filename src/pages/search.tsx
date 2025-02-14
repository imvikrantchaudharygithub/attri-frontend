import Image from "next/image";
import "@/styles/plp.css";
import ProductCard from "@/Components/ProductCard";
export default function Search() {
  return (
    <>
        <div className="plp-box search-box padding-tb">
            <div className="container">
                <div className="plp-main d-flex">
                    <div className="plp-left"></div>
                    <div className="plp-right">
                        <div className="heading-top d-flex">
                            <h1 className="attriheading">Search</h1>
                        </div>
                        <p>2 results for <strong>'little cooler'</strong></p>
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
    </>
  );
}