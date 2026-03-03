"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/rootReduces";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { openLoginPopup } from "@/slices/popupSlice";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { clearUser } from "@/slices/userSlice";
import { clearToken } from "@/slices/tokenSlice";
import { resetCartCount } from "@/slices/loginUserSlice";
import { clearCart } from "@/slices/cartSlice";
import { accountNavLinks, AccountNavIcon } from "@/utils/accountNav";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={active ? "currentColor" : "none"} fillOpacity={active ? 0.15 : 0} />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/category",
    label: "Categories",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" fill={active ? "currentColor" : "none"} fillOpacity={active ? 0.15 : 0} />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" fill={active ? "currentColor" : "none"} fillOpacity={active ? 0.15 : 0} />
      </svg>
    ),
  },
  {
    href: "/cart",
    label: "Cart",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill={active ? "currentColor" : "none"} fillOpacity={active ? 0.12 : 0} />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    href: "/myaccount",
    labelLoggedIn: "Account",
    labelLoggedOut: "Login",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" fill={active ? "currentColor" : "none"} fillOpacity={active ? 0.15 : 0} />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: any) => state.token.token);
  const cartCount = useSelector((state: RootState) => state?.cartCount?.count);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const totalCartCount = token ? cartCount : (cartItems?.length || 0);

  const isActive = (href: string) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  const isLoginItem = (item: (typeof navItems)[number]) => "labelLoggedOut" in item;

  const logout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    dispatch(resetCartCount());
    dispatch(clearCart());
    toast.success("Logged out successfully");
    setAccountMenuOpen(false);
    router.push("/");
  };

  const closeMenu = () => setAccountMenuOpen(false);

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] md:hidden bg-white border-t border-[#E5E7EB] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          zIndex: "var(--z-sticky)",
        }}
      >
        <div className="flex items-stretch">
          {navItems.map((item) => {
            const isAccountOrLogin = isLoginItem(item);
            const label = isAccountOrLogin
              ? (token ? item.labelLoggedIn : item.labelLoggedOut)
              : item.label;
            const active = isAccountOrLogin
              ? (token ? isActive(item.href) : false)
              : isActive(item.href);

            const content = (
              <>
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 flex justify-center">
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="h-0.5 w-8 bg-[#8B35B8] rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  </div>
                )}
                <div className="relative">
                  {item.icon(active)}
                  {item.href === "/cart" && totalCartCount > 0 && (
                    <motion.span
                      key={totalCartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#F4821A] text-white text-[8px] font-bold flex items-center justify-center leading-none"
                    >
                      {totalCartCount}
                    </motion.span>
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 font-medium leading-none ${active ? "text-[#8B35B8]" : "text-[#9CA3AF]"}`}>
                  {label}
                </span>
              </>
            );

            if (isAccountOrLogin && !token) {
              return (
                <button
                  key="login"
                  type="button"
                  onClick={() => dispatch(openLoginPopup())}
                  className={`relative flex-1 flex flex-col items-center justify-center py-2 min-h-[60px] transition-colors duration-200 cursor-pointer ${
                    active ? "text-[#8B35B8]" : "text-[#9CA3AF]"
                  }`}
                  aria-label="Login"
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex-1 flex flex-col items-center justify-center py-2 min-h-[60px] transition-colors duration-200 ${
                  active ? "text-[#8B35B8]" : "text-[#9CA3AF]"
                }`}
                aria-label={label}
              >
                {content}
              </Link>
            );
          })}
          {token && (
            <button
              type="button"
              onClick={() => setAccountMenuOpen(true)}
              className="relative flex-1 flex flex-col items-center justify-center py-2 min-h-[60px] transition-colors duration-200 text-[#9CA3AF] hover:text-[#8B35B8] cursor-pointer"
              aria-label="Account menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span className="text-[10px] mt-0.5 font-medium leading-none">Menu</span>
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {accountMenuOpen && (
          <React.Fragment key="accountMenu">
            <motion.div
              role="presentation"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[calc(var(--z-sticky)+10)] bg-black/50 md:hidden"
              onClick={closeMenu}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Account menu"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[calc(var(--z-sticky)+11)] md:hidden max-h-[85vh] flex flex-col rounded-t-2xl bg-white shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
              style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            >
              <div className="flex items-center justify-between shrink-0 px-4 py-3 border-b border-[#E5E7EB]">
                <h2 className="text-base font-semibold text-[#1A1A1A]">Account</h2>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-2 -m-2 rounded-full text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1A1A] transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto overscroll-contain flex-1 min-h-0">
                <ul className="py-2">
                  {accountNavLinks.map((item) => {
                    const active = router.pathname === item.href;
                    return (
                      <li key={item.href + item.label}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`flex min-h-[48px] items-center gap-3 px-4 py-3 transition-colors duration-200 active:bg-[#F3F4F6] ${
                            active ? "bg-[#F3E8FF] text-[#8B35B8] font-medium" : "text-[#374151]"
                          }`}
                          aria-current={active ? "page" : undefined}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                              active ? "bg-[#EDE9FE]" : "bg-[#F3F4F6]"
                            }`}
                          >
                            <AccountNavIcon label={item.label} />
                          </span>
                          <span className="text-sm">{item.label}</span>
                          <svg width="12" height="12" className="ml-auto opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-[#E5E7EB] pt-2 pb-4">
                  <button
                    type="button"
                    onClick={logout}
                    className="flex min-h-[48px] w-full cursor-pointer items-center gap-3 px-4 py-3 text-red-600 transition-colors duration-200 active:bg-red-50"
                    aria-label="Sign out"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium">Sign out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
