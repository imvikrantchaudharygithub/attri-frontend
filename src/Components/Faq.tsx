"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/utils/animations";

export default function Faq({ faqs }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="bg-[#FAF9FF] py-12 md:py-16">
      <div className="container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D3C3C] font-heading italic">
            Frequently Asked Questions
          </h2>
          <div className="mt-1.5 h-0.5 w-16 bg-[#D4A847] rounded-full" />
        </motion.div>

        <div className="max-w-2xl space-y-3">
          {faqs.map((faq: any, index: number) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#8B35B8] shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                    : "border-[#E5E7EB] bg-white"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm md:text-base font-semibold leading-snug ${
                      isOpen ? "text-[#8B35B8]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {faq?.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isOpen ? "bg-[#8B35B8] text-white" : "bg-[#F5EEFA] text-[#8B35B8]"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1">
                        <p className="text-sm text-[#6B7280] leading-relaxed">{faq?.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
