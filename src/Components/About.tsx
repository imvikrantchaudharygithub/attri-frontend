"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/utils/animations";

const trustBadges = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "100% Natural",
    desc: "No harmful chemicals",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Pan India shipping",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Made with Love",
    desc: "Indian heritage recipes",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Premium Quality",
    desc: "Lab tested & certified",
  },
];

export default function About() {
  const [isReadMore, setIsReadMore] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/aboutus") {
      setIsReadMore(true);
    }
  }, []);

  return (
    <>
      {/* Trust badges */}
      <section className="bg-[#F3E8FF] py-12 md:py-16">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex flex-col items-center text-center gap-3 p-4 md:p-5 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#D8B4FE] hover:shadow-[0_4px_12px_rgba(139,53,184,0.08)] transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-full bg-[#E9D5FF] flex items-center justify-center text-[#8B35B8]">
                  {badge.icon}
                </div>
                <div>
                  <div className="text-[#1A1A1A] font-bold text-sm md:text-base leading-tight">{badge.title}</div>
                  <div className="text-[#6B7280] text-xs mt-0.5">{badge.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About text */}
      <section className="bg-[#FAF9FF] py-12 md:py-16">
        <div className="container">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D3C3C] font-heading italic mb-4">
              About Attri Industries
            </h2>
            <p className="text-[#6B7280] leading-relaxed mb-3">
              Established with a vision to revolutionize the way people earn and thrive, Attri Industries
              is a dynamic and innovative company dedicated to delivering high-quality products and
              unparalleled opportunities for personal and financial growth.
            </p>

            {isReadMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="py-6 border-t border-[#E5E7EB] mt-4">
                  <h3 className="text-xl font-bold text-[#3D3C3C] font-heading mb-3">Our Products</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Discover a diverse range of premium products carefully curated to enhance your
                    well-being and lifestyle. From cutting-edge health supplements to eco-friendly household
                    essentials, our product line is designed to meet the diverse needs and preferences of
                    our customers.
                  </p>
                </div>
                <div className="py-6 border-t border-[#E5E7EB]">
                  <h3 className="text-xl font-bold text-[#3D3C3C] font-heading mb-3">Opportunity Awaits</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Joining Attri Industries isn&apos;t just about selling products — it&apos;s about
                    unlocking your full potential and building a thriving business on your terms. As an
                    independent distributor, you&apos;ll earn generous commissions, bonuses, and incentives
                    while enjoying the flexibility to work on your own schedule.
                  </p>
                </div>
              </motion.div>
            )}

            <button
              onClick={() => setIsReadMore(!isReadMore)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B35B8] hover:text-[#D4A847] transition-colors duration-200 cursor-pointer"
            >
              {isReadMore ? "Read Less" : "Read More"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: isReadMore ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
