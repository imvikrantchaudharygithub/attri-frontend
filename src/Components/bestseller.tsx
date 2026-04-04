"use client";
import Link from "next/link";
import { SetStateAction, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/utils/animations";

export default function BestSeller({ data }: any) {
  const [toggleState, setToggleState] = useState<any>(null);
  const [activeProducts, setActiveProducts] = useState([]);
  const [activeCategoryName, setActiveCategoryName] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (data && data.length > 0) {
      const initial = data[0];
      setToggleState(initial._id);
      setActiveCategoryName(initial.name || "");
      setActiveProducts(initial.products || []);
    }
  }, [data]);

  // Scroll active tab into view within the tabs container
  const scrollActiveTabIntoView = (categoryId: string) => {
    const button = tabRefs.current.get(categoryId);
    const container = tabsContainerRef.current;
    if (!button || !container) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Check if button is outside visible area of the container
    if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
      button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  // Auto-cycle categories every 4 seconds
  useEffect(() => {
    if (!data || data.length <= 1 || isPaused) return;

    intervalRef.current = setInterval(() => {
      setToggleState((current: any) => {
        const currentIndex = data.findIndex((item: any) => item._id === current);
        const nextIndex = (currentIndex + 1) % data.length;
        const next = data[nextIndex];
        setActiveCategoryName(next.name || "");
        setActiveProducts(next.products || []);
        scrollActiveTabIntoView(next._id);
        return next._id;
      });
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data, isPaused]);

  const toggleTab = (index: SetStateAction<any>) => {
    setIsPaused(true);
    setToggleState(index);
    const selected = data.find((item: any) => item._id === index);
    setActiveCategoryName(selected?.name || "");
    setActiveProducts(selected?.products || []);
  };

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 4, arrows: true } },
      { breakpoint: 991, settings: { slidesToShow: 3, arrows: true } },
      { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true } },
      { breakpoint: 479, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
    ],
  };

  if (!data || data.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF9FF] py-12 md:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      <div className="container">
        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex items-end justify-between mb-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D3C3C] font-heading italic">
              All Products
            </h2>
            <div className="mt-1 h-0.5 w-16 bg-[#D4A847] rounded-full" />
          </div>
          <Link
            href="/category"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#8B35B8] hover:text-[#D4A847] transition-colors duration-200"
          >
            Shop All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          ref={tabsContainerRef}
          className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data?.map((item: any) => (
            <button
              key={item?._id}
              ref={(el) => {
                if (el) tabRefs.current.set(item._id, el);
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                toggleState === item?._id
                  ? "bg-[#8B35B8] text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                  : "bg-white text-[#3D3C3C] border border-[#E5E7EB] hover:border-[#D8B4FE] hover:text-[#8B35B8]"
              }`}
              onClick={() => toggleTab(item?._id)}
            >
              {item?.name}
            </button>
          ))}
        </motion.div>

        {/* Product slider */}
        <div className="slider-btn slider-height slider-rl">
          <Slider className="bestsellerslider" {...sliderSettings}>
            {activeProducts && activeProducts.length > 0 ? (
              activeProducts.map((product: any) => (
                <div className="item" key={product?._id || Math.random()}>
                  <ProductCard product={product} category={activeCategoryName} />
                </div>
              ))
            ) : (
              <div className="item py-8 text-center text-[#9CA3AF] text-sm">
                No products available in this category
              </div>
            )}
          </Slider>
        </div>

        {/* Mobile shop all link */}
        <div className="mt-6 flex md:hidden justify-center">
          <Link
            href="/category"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#8B35B8] border border-[#8B35B8] px-6 py-2.5 rounded-full hover:bg-[#8B35B8] hover:text-white transition-all duration-200"
          >
            Shop All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
