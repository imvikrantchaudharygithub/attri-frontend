import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/utils/animations";

export default function WhyAttri({ gallery, productname }: any) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="bg-[#F3E8FF] py-12 md:py-16">
      <div className="container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D3C3C] font-heading italic">
            Why {productname}?
          </h2>
          <div className="mt-1.5 h-0.5 w-16 bg-[#D4A847] rounded-full" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {gallery.map((item: any, index: number) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="flex items-start gap-4 bg-white border border-[#E5E7EB] rounded-2xl p-4 md:p-5 hover:border-[#D8B4FE] hover:shadow-[0_4px_12px_rgba(139,53,184,0.08)] transition-all duration-200"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 bg-[#E9D5FF]">
                <Image
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  src={item?.image}
                  alt={item?.title || ""}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#1A1A1A] font-bold text-sm md:text-base mb-1">{item?.title}</h3>
                <p className="text-[#6B7280] text-xs md:text-sm leading-relaxed">{item?.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
