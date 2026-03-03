import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/utils/animations";

export default function Nutrition({ data }: any) {
  if (!data) return null;

  return (
    <section className="bg-[#FAF9FF] py-10 md:py-12 border-b border-[#E5E7EB]">
      <div className="container">
        {data?.title && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#3D3C3C] font-heading italic">
              {data.title}
            </h2>
          </motion.div>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {data?.gallery?.map((item: any, index: number) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="flex flex-col items-center gap-3 w-[calc(33%-8px)] md:w-auto group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#E9D5FF] flex items-center justify-center overflow-hidden shadow-[0_4px_16px_rgba(139,53,184,0.15)] group-hover:shadow-[0_8px_24px_rgba(139,53,184,0.25)] transition-shadow duration-300">
                <Image
                  width={48}
                  height={48}
                  className="w-9 h-9 object-contain"
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div className="text-center text-xs md:text-sm font-semibold text-[#3D3C3C] max-w-[80px] leading-tight">
                {item.title}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
