import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/utils/animations";

export default function NewProduct({ categoryData }: any) {
  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1399, settings: { slidesToShow: 2, arrows: true } },
      { breakpoint: 991, settings: { slidesToShow: 2, arrows: true } },
      { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true } },
      { breakpoint: 479, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
    ],
  };

  if (!categoryData || !categoryData.products || categoryData.products.length === 0) return null;

  return (
    <section className="newproduct py-10 md:py-14 border-b border-[#E5E7EB] last:border-0 bg-[#FAF9FF]">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Category image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:w-64 flex-shrink-0"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#3D3C3C]">
              <Image
                width={676}
                height={900}
                className="w-full h-full object-cover"
                src={categoryData?.image || "/assets/images/new-banner.jpg"}
                alt={categoryData?.name || "Category"}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D3C3C]/85 via-transparent to-transparent" />
              {/* Category name + CTA */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg font-heading mb-2">
                  {categoryData?.name}
                </h3>
                <Link
                  href={`/category/${categoryData?.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#8B35B8] px-4 py-2 rounded-full hover:bg-[#5C1F82] transition-colors duration-200 active:scale-[0.97]"
                >
                  Shop All
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Products slider */}
          <div className="flex-1 min-w-0">
            <div className="slider-btn slider-height slider-rl">
              <Slider className="newproductslider" {...sliderSettings}>
                {categoryData.products.map((product: any) => (
                  <div className="item" key={product?._id || Math.random()}>
                    <ProductCard product={product} category={categoryData?.name} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
