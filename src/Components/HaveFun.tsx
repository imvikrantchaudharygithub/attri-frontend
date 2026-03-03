import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/utils/animations";

export default function HaveFun() {
  return (
    <section className="bg-[#D4A847] py-14 md:py-20 overflow-hidden">
      <div className="container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-[#1A1A1A] font-semibold text-sm uppercase tracking-wider mb-2">
            Hey, you made it to the end!
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] font-heading italic leading-snug mb-6">
            Share with friends &amp; have fun!
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/category"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#8B35B8] text-white rounded-full font-semibold text-sm hover:bg-[#5C1F82] transition-all duration-200 active:scale-[0.97] shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            >
              Shop Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#1A1A1A] rounded-full font-semibold text-sm hover:bg-[#FAF9FF] transition-all duration-200 active:scale-[0.97] border border-[#8B35B8]/20"
            >
              Join & Earn
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
