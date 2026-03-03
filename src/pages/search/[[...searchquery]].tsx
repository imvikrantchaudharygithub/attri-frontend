import ProductCard from "@/Components/ProductCard";
import { useRouter } from "next/router";
import { getData, postData } from "@/services/apiServices";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/utils/animations";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden">
          <div className="skeleton aspect-square" />
          <div className="p-4 space-y-2">
            <div className="skeleton h-4 rounded-lg" />
            <div className="skeleton h-4 w-2/3 rounded-lg" />
            <div className="skeleton h-5 w-1/2 rounded-lg mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Search() {
  const router = useRouter();
  const { searchquery } = router.query;
  const [searchData, setSearchData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const getSearchData = () => {
    setIsLoading(true);
    postData("/search-products", { searchTerm: searchquery })
      .then((res: any) => setSearchData(res?.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (searchquery) getSearchData();
  }, [searchquery]);

  return (
    <section className="bg-[#FAF9FF] min-h-screen py-8 md:py-12">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#3D3C3C] font-heading italic mb-1">
            Search Results
          </h1>
          <p className="text-[#6B7280] text-sm">
            {isLoading ? (
              "Searching..."
            ) : searchData?.count !== undefined ? (
              <>
                <span className="font-semibold text-[#1A1A1A]">{searchData.count}</span> results for{" "}
                <span className="font-semibold text-[#8B35B8]">&ldquo;{searchquery}&rdquo;</span>
              </>
            ) : null}
          </p>
        </motion.div>

        {/* Results */}
        {isLoading ? (
          <ProductGridSkeleton />
        ) : searchData?.data && searchData.data.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {searchData.data.map((item: any) => (
              <motion.div key={item?._id || item?.id} variants={staggerItem}>
                <ProductCard product={item} category={item?.category?.name} />
              </motion.div>
            ))}
          </motion.div>
        ) : searchData?.count === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-[#F3E8FF] flex items-center justify-center mb-5 border border-[#E9D5FF]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B35B8" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#3D3C3C] font-heading mb-2">No Results Found</h3>
            <p className="text-[#6B7280] text-sm max-w-xs mb-6">
              We couldn&apos;t find products matching &ldquo;{searchquery}&rdquo;. Try different keywords.
            </p>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 px-6 py-3 bg-[#8B35B8] text-white rounded-xl text-sm font-semibold hover:bg-[#5C1F82] transition-colors duration-200 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Browse All Products
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
