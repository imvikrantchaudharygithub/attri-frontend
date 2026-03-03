import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/utils/animations";

export default function TakeCare({ data }: any) {
  if (!data) return null;

  return (
    <section className="bg-[#F3E8FF] py-14 md:py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Left content */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="md:w-[380px] flex-shrink-0 flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#3D3C3C] font-heading italic leading-tight mb-4">
              {data?.title}
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed mb-7">
              {data?.description}
            </p>
            <Link
              href="/aboutus"
              className="inline-flex items-center gap-2 w-fit px-7 py-3 bg-[#8B35B8] text-white rounded-full font-semibold text-sm hover:bg-[#5C1F82] transition-all duration-200 shadow-[0_4px_20px_rgba(139,53,184,0.35)] active:scale-[0.97]"
            >
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Right: feature cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex-1 grid grid-cols-2 gap-4 md:gap-6 content-center"
          >
            {data?.gallery?.map((item: any, index: number) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-center gap-3 md:gap-4 bg-white rounded-2xl p-4 md:p-5 border border-[#E5E7EB] hover:border-[#D8B4FE] hover:shadow-[0_4px_12px_rgba(139,53,184,0.08)] transition-all duration-200"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#E9D5FF] flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <Image
                    width={50}
                    height={50}
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="text-sm md:text-base font-semibold text-[#1A1A1A] leading-snug">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
