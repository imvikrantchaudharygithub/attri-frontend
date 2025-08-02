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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                {/* Enhanced Shimmer overlay */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent z-10"></div>
                
                {/* Product Image Skeleton with gradient */}
                <div className="relative pb-[100%] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                    <div className="absolute inset-4">
                        <div className="w-full h-full bg-gray-300/50 rounded-xl animate-pulse" style={{animationDelay: `${index * 0.1}s`}}></div>
                    </div>
                </div>
                
                {/* Modern Discount Badge */}
                <div className="absolute top-3 left-3 z-20">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse" style={{animationDelay: `${index * 0.15}s`}}>
                        <div className="w-8 h-3 bg-white/30 rounded-full"></div>
                    </div>
                </div>
                
                {/* Product Content with modern spacing */}
                <div className="p-5 space-y-4">
                    {/* Product Title with modern skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse" style={{animationDelay: `${index * 0.2}s`}}></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-3/4 animate-pulse" style={{animationDelay: `${index * 0.25}s`}}></div>
                    </div>
                    
                    {/* Rating and Category with modern design */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 bg-yellow-200 rounded-full animate-pulse" style={{animationDelay: `${index * 0.3}s`}}></div>
                            <div className="w-6 h-3 bg-gray-200 rounded animate-pulse" style={{animationDelay: `${index * 0.35}s`}}></div>
                        </div>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" style={{animationDelay: `${index * 0.4}s`}}></div>
                    </div>
                    
                    {/* Modern Price Section */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-5 bg-gradient-to-r from-gray-800 to-gray-600 rounded animate-pulse" style={{animationDelay: `${index * 0.45}s`}}></div>
                        <div className="w-12 h-4 bg-gray-300 rounded animate-pulse" style={{animationDelay: `${index * 0.5}s`}}></div>
                    </div>
                    
                    {/* Modern Button Skeleton */}
                    <div className="pt-2">
                        <div className="w-full h-11 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-xl animate-pulse shadow-lg" style={{animationDelay: `${index * 0.55}s`}}>
                            <div className="w-20 h-3 bg-white/30 rounded mx-auto mt-4"></div>
                        </div>
                    </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none"></div>
            </div>
        ))}
    </div>
) : searchData?.data && searchData.data.length > 0 ? (
    searchData.data.map((item: any) => (
        <ProductCard key={item?.id} product={item} category={item?.category?.name}></ProductCard>
    ))
) : searchData?.count === 0 ? (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
        {/* Modern No Data Found UI */}
        <div className="relative mb-8">
            {/* Animated search icon background */}
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-10 h-10 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-200 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border border-gray-300 animate-pulse"></div>
        </div>
        
        {/* Modern Typography */}
        <div className="text-center space-y-3 max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 animate-fade-in">No Results Found</h3>
            <p className="text-gray-500 leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
                We couldn't find any products matching <span className="font-semibold text-gray-700">"{searchquery}"</span>
            </p>
            <div className="pt-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <p className="text-sm text-gray-400 mb-4">Try searching with different keywords or browse our categories</p>
                <button 
                    onClick={() => router.push('/')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Browse All Products
                </button>
            </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-30"></div>
            <div className="absolute top-20 right-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40"></div>
            <div className="absolute bottom-16 left-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-30"></div>
        </div>
    </div>
) : null}
</div>
                    </div>
                </div>
            </div>
        </div> 
    </>
  );
}