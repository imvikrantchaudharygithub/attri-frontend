"use client";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";

export default function HomeBanner({ bannerdata }: any) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "ease-in-out",
  };

  const sorted = bannerdata
    ? [...bannerdata].sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  return (
    <section className="relative overflow-hidden bg-[#FAF9FF]" style={{ lineHeight: 0 }}>
      <Slider className="homebannerslider" {...settings}>
        {sorted.map((item: any, index: number) => (
          <div className="item" key={index}>
            <Link href="/" className="block">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={item.mob_image || "/assets/images/home-banner.jpg"}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={item.image || "/assets/images/home-banner.jpg"}
                />
                <Image
                  className="w-full object-cover"
                  width={1920}
                  height={500}
                  src={item.image || "/assets/images/home-banner.jpg"}
                  alt={item.title || "Attri Industries banner"}
                  priority={index === 0}
                  style={{ display: "block" }}
                />
              </picture>
            </Link>
          </div>
        ))}
        {sorted.length === 0 && (
          <div className="item">
            <div className="w-full h-[360px] md:h-[500px] bg-gradient-to-br from-[#8B35B8] to-[#5C1F82] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center px-6"
              >
                <h1 className="text-white text-3xl md:text-5xl font-bold font-heading mb-4">
                  Natural. Pure. Premium.
                </h1>
                <p className="text-white/75 text-lg mb-6">
                  Discover Attri Industries — crafted with Indian heritage
                </p>
                <Link
                  href="/category"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#8B35B8] text-white rounded-full font-semibold text-sm hover:bg-[#5C1F82] transition-all duration-200 shadow-[0_4px_20px_rgba(139,53,184,0.35)]"
                >
                  Shop Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </Slider>
    </section>
  );
}
