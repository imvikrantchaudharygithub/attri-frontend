"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hooks";
import StickyBar from "./stickybar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { getData } from "@/services/apiServices";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "./BottomNav";

export default function Footer() {
  const router = useRouter();
  const isCartPage = router.pathname === "/cart";

  const [accordionState, setAccordionState] = useState(0);
  const accordion = (index: number) => {
    setAccordionState((prev) => (prev === index ? 0 : index));
  };

  const token = useAppSelector((state: any) => state.token.token);
  const cartCount = useSelector((state: RootState) => state?.cartCount?.count);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [categories, setCategories] = useState<any[]>([]);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const getCategories = async () => {
    const res = await getData("/get-product-categories");
    setCategories(res?.data?.categories || []);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setShowStickyBar(url !== "/cart");
    };
    handleRouteChange(router.pathname);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [cartCount]);

  const footerLinks = [
    { href: "/aboutus", label: "About Us" },
    { href: "/vision", label: "Our Vision" },
    { href: "/privacypolicy", label: "Privacy Policy" },
  ];

  const accountLinks = token
    ? [
        { href: "/myaccount", label: "My Profile" },
        { href: "/order", label: "Order History" },
        { href: "/myaddress", label: "Saved Addresses" },
        { href: "/withdraw", label: "Withdraw" },
      ]
    : [
        { href: "/signup", label: "Sign Up" },
        { href: "#login", label: "Login" },
      ];

  return (
    <>
      {/* ─── Footer (hidden on cart page; menu bar always shown) ─── */}
      {!isCartPage && (
      <footer className="bg-[#3D3C3C] text-white">
        {/* Main footer content */}
        <div className="container py-12 md:py-16">
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="col-span-1 ">
              <Link href="/" className="block mb-5">
                <Image
                  width={120}
                  height={40}
                  src="/assets/images/logo.png"
                  alt="Attri Industries"
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-[#D1D5DB] text-sm leading-relaxed mb-5">
                Premium natural products crafted with Indian heritage — oils, face wash, shampoos, and masalas.
              </p>
              {!token && (
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4A847] text-[#1A1A1A] rounded-lg text-sm font-semibold hover:bg-[#E8C56A] transition-colors duration-200"
                >
                  Sign Up Free
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              )}
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categories</h3>
              <ul className="space-y-2.5">
                {categories.slice(0, 6).map((item: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={`/category/${item?.slug}`}
                      className="text-[#D1D5DB] hover:text-[#A78BFA] text-sm transition-colors duration-150"
                    >
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#D1D5DB] hover:text-[#A78BFA] text-sm transition-colors duration-150">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Account</h3>
              <ul className="space-y-2.5">
                {accountLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#D1D5DB] hover:text-[#A78BFA] text-sm transition-colors duration-150">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden">
            {/* Brand */}
            <div className="mb-6 pb-6 border-b border-white/10">
              <Link href="/" className="block mb-3">
                <Image
                  width={100}
                  height={33}
                  src="/assets/images/logo.png"
                  alt="Attri Industries"
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-white/55 text-sm leading-relaxed">
                Premium natural products crafted with Indian heritage.
              </p>
            </div>

            {/* Accordion sections */}
            {[
              { id: 1, title: "Categories", links: categories.slice(0, 6).map((c: any) => ({ href: `/category/${c?.slug}`, label: c?.name })) },
              { id: 2, title: "Company", links: footerLinks },
              { id: 3, title: "Account", links: accountLinks },
            ].map((section) => (
              <div key={section.id} className="border-b border-white/10">
                <button
                  className="w-full flex items-center justify-between py-4 text-sm font-semibold text-white cursor-pointer"
                  onClick={() => accordion(section.id)}
                >
                  {section.title}
                  <motion.svg
                    animate={{ rotate: accordionState === section.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 10"
                    fill="none"
                  >
                    <path d="M8 9.5L0.5 2l1.05-1.05L8 7.4l6.45-6.45L15.5 2 8 9.5Z" fill="rgba(255,255,255,0.7)" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {accordionState === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-4 space-y-3">
                        {section.links.map((link: any) => (
                          <li key={link.href}>
                            <Link href={link.href} className="text-[#D1D5DB] hover:text-[#A78BFA] text-sm transition-colors duration-150 block">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar — darker charcoal */}
        <div className="bg-[#2D2C2C] border-t border-[#4B5563]">
          <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#9CA3AF]">
            <p>© {new Date().getFullYear()} Attri Industries. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacypolicy" className="hover:text-[#A78BFA] transition-colors">Privacy Policy</Link>
              <span>·</span>
              <Link href="/aboutus" className="hover:text-[#A78BFA] transition-colors">About Us</Link>
            </div>
          </div>
        </div>

        {/* Bottom nav padding on mobile */}
        <div className="h-16 md:hidden" />
      </footer>
      )}

      {/* Sticky cart bar — hidden per design */}
      {/* {showStickyBar && (cartCount > 0 || cartItems?.length > 0) && (
        <StickyBar cartData={token ? cartCount : cartItems?.length} />
      )} */}

      {/* Mobile bottom navigation */}
      <BottomNav />
    </>
  );
}
