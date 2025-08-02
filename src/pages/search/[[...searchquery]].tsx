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
    const [isLoading,setIsLoading] = useState(false);

    const getSearchData = ()=>{
        setIsLoading(true)
        const payload = {
            searchTerm:searchquery
        }
        postData(`/search-products`,payload).then((res:any)=>{
            console.log(res);
            setSearchData(res?.data);
        }).catch((err:any)=>{
            console.log(err);
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        if(searchquery){
            getSearchData();
        }
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
                        {isLoading ? (<p>Searching... for <strong>{searchquery}</strong></p>):
                        ( <p>{searchData?.count} results for <strong>{searchquery}</strong></p>)
}
                       
                        <div className="plp-list d-grid padding-tb">
                        {isLoading ? (
    <>
        {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="product-card relative bg-white rounded-[20px] overflow-hidden h-full">
                {/* Shimmer overlay */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"></div>
                
                {/* Product Image Skeleton */}
                <div className="product-thumb relative pb-[100%] bg-gray-200 animate-pulse"></div>
                
                {/* Discount Badge Skeleton */}
                <div className="product-top absolute w-full top-0 left-0 p-2.5 z-20">
                    <div className="w-16 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
                
                {/* Product Content Skeleton */}
                <div className="product-content p-4 text-center">
                    {/* Product Title Skeleton */}
                    <div className="mb-3">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    </div>
                    
                    {/* Rating and Category Skeleton */}
                    <div className="flex justify-center items-center mb-3 gap-2">
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-3 h-4 bg-gray-200 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
                        </div>
                        <div className="w-px h-4 bg-gray-200 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                    
                    {/* Price Skeleton */}
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <div className="w-16 h-5 bg-gray-200 rounded animate-pulse" style={{animationDelay: '0.6s'}}></div>
                        <div className="w-14 h-4 bg-gray-200 rounded animate-pulse" style={{animationDelay: '0.7s'}}></div>
                    </div>
                    
                    {/* Button Skeleton */}
                    <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse" style={{animationDelay: '0.8s'}}></div>
                </div>
            </div>
        ))}
    </>
):
                            (searchData?.data?.map((item:any)=>(
                                <ProductCard key={item?.id} product={item} category={item?.category?.name}></ProductCard>
                            )))}
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