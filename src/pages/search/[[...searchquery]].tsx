import Image from "next/image";
// import "@/styles/plp.css";
import ProductCard from "@/Components/ProductCard";
import { useRouter } from "next/router";
import { getData,postData } from "@/services/apiServices";
import { useEffect, useState } from "react";
export default function Search() {
    const router = useRouter();
    const {searchquery} = router.query;
    console.log(searchquery);
    const [searchData,setSearchData] = useState<any>();

    const getSearchData = ()=>{
        const payload = {
            searchTerm:searchquery
        }
        postData(`/search-products`,payload).then((res:any)=>{
            console.log(res);
            setSearchData(res?.data);
        }).catch((err:any)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getSearchData();
    },[searchquery]);
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
                        <p>{searchData?.count} results for <strong>{searchquery}</strong></p>
                        <div className="plp-list d-grid padding-tb">
                            {searchData?.data?.map((item:any)=>(
                                <ProductCard key={item?.id} product={item} category={item?.category?.name}></ProductCard>
                            ))}
                            {/* <ProductCard></ProductCard>
                            <ProductCard></ProductCard> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>       
    </>
  );
}