"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/slices/rootReduces';
import { useAppSelector } from "@/hooks/hooks";
import LoginPopup from "./loginpopup";
import { useAppDispatch } from "@/hooks/hooks";
import { openLoginPopup } from '@/slices/popupSlice';
import toast from "react-hot-toast";
import { clearUser } from '@/slices/userSlice';
import { clearToken } from '@/slices/tokenSlice';
import { resetCartCount } from '@/slices/loginUserSlice';
import { clearCart } from '@/slices/cartSlice';
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isUserDropDown, setIsUserDropDown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const userDropdownRef = useRef<HTMLLIElement>(null);

  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const token = useAppSelector((state: any) => state.token.token);
  const user = useAppSelector((state: any) => state.user);
  const cartCount = useSelector((state: RootState) => state?.cartCount?.count);
  const { isLoginPopupOpen } = useAppSelector((state: any) => state.popup);

  // Scroll detection for backdrop blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropDown(false);
      }
    };
    if (isUserDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserDropDown]);

  const logout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    dispatch(resetCartCount());
    dispatch(clearCart());
    toast.success('Logged out successfully');
  };

  const totalCartCount = token ? cartCount : (cartItems?.length || 0);

  return (
    <>
      {/* ─── Main Header ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F3E8FF]/95 backdrop-blur-md border-b border-[#E9D5FF] shadow-[0_2px_20px_rgba(139,53,184,0.08)]'
            : 'bg-[#F3E8FF] border-b border-[#E9D5FF]/60'
        }`}
        style={{ zIndex: 'var(--z-sticky)' }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-4">
              {/* Hamburger — visible on desktop (bottom nav handles mobile) */}
              <button
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full text-[#3D3C3C] hover:text-[#8B35B8] hover:bg-[#E9D5FF]/60 transition-colors duration-200 cursor-pointer"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <svg width="20" height="16" viewBox="0 0 21 18" fill="none">
                  <path d="M20.4375 2.625H0.5625C0.375 2.625 0 2.25 0 2.0625V0.5625C0 0.375 0.375 0 0.5625 0H20.4375C20.625 0 21 0.375 21 0.5625V2.0625C21 2.25 20.625 2.625 20.4375 2.625ZM21 9.5625C21 9.75 20.625 10.125 20.4375 10.125H0.5625C0.375 10.125 0 9.75 0 9.5625V8.0625C0 7.875 0.375 7.5 0.5625 7.5H20.4375C20.625 7.5 21 7.875 21 8.0625V9.5625ZM21 17.0625C21 17.25 20.625 17.625 20.4375 17.625H0.5625C0.375 17.625 0 17.25 0 17.0625V15.5625C0 15.375 0.375 15 0.5625 15H20.4375C20.625 15 21 15.375 21 15.5625V17.0625Z" fill="currentColor" />
                </svg>
              </button>

              {/* Logo — dark on light purple */}
              <Link href="/" className="flex items-center">
                <Image
                  width={86}
                  height={28}
                  src="/assets/images/logo.png"
                  alt="Attri Industries"
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Center: Search bar (desktop) — comfortable height, clear focus */}
            <div className="hidden md:flex flex-1 max-w-sm">
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) window.location.href = `/search/${searchQuery}`;
                }}
              >
                <div className="relative group">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    aria-label="Search products"
                    className="w-full h-12 pl-5 pr-12 rounded-2xl text-[15px] bg-[#FAF9FF] border border-[#E5E7EB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#8B35B8] focus:ring-2 focus:ring-[#8B35B8]/20 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)] focus:shadow-[0_0_0_3px_rgba(139,53,184,0.12)]"
                  />
                  <button
                    type="submit"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-xl text-[#3D3C3C] hover:text-[#8B35B8] hover:bg-[#F3E8FF] transition-colors"
                    aria-label="Search"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search icon (mobile) — black on light purple header */}
              <button
                className="flex md:hidden items-center justify-center w-10 h-10 rounded-full text-[#3D3C3C] hover:text-[#8B35B8] hover:bg-[#E9D5FF]/60 transition-colors duration-200 cursor-pointer"
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full text-[#3D3C3C] hover:text-[#8B35B8] hover:bg-[#E9D5FF]/60 transition-colors duration-200" aria-label="Cart">
                <svg width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.4375 4.0625H5.6875L8.125 17.875H21.125" />
                  <path d="M8.125 14.625H20.7919C21.1905 14.6251 21.4721 14.4013 21.544 14.0138L22.6 6.5H6.5" />
                  <circle cx="8.9375" cy="21.125" r="1.625" />
                  <circle cx="20.3125" cy="21.125" r="1.625" />
                </svg>
                {totalCartCount > 0 && (
                  <motion.span
                    key={totalCartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F4821A] text-white text-[9px] font-bold flex items-center justify-center leading-none"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </Link>

              {/* User dropdown */}
              <li
                ref={userDropdownRef}
                className="relative list-none flex items-center justify-center w-10 h-10 rounded-full text-[#3D3C3C] hover:text-[#8B35B8] hover:bg-[#E9D5FF]/60 transition-colors duration-200 cursor-pointer"
                onClick={() => setIsUserDropDown(!isUserDropDown)}
              >
                <svg width="22" height="22" viewBox="0 0 25 25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12.5 2.082C6.747 2.082 2.083 6.746 2.083 12.499C2.083 18.252 6.747 22.915 12.5 22.915C18.253 22.915 22.917 18.252 22.917 12.499C22.917 6.746 18.253 2.082 12.5 2.082Z" />
                  <path d="M4.449 19.109S6.771 16.145 12.5 16.145C18.229 16.145 20.552 19.109 20.552 19.109" />
                  <path d="M12.5 12.5C14.157 12.5 15.625 11.033 15.625 9.375C15.625 7.717 14.157 6.25 12.5 6.25C10.843 6.25 9.375 7.717 9.375 9.375C9.375 11.033 10.843 12.5 12.5 12.5Z" />
                </svg>

                <AnimatePresence>
                  {isUserDropDown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-[#E5E7EB] overflow-hidden"
                      style={{ zIndex: 'var(--z-dropdown)' }}
                    >
                      {token ? (
                        <>
                          <Link href="/myaccount" onClick={() => setIsUserDropDown(false)}>
                            <div className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#1A1A1A] hover:bg-[#FAF9FF] hover:text-[#8B35B8] transition-colors duration-150 border-b border-[#E5E7EB] font-medium">
                              <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path fill="currentColor" d="M1 12s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6z" /></svg>
                              Profile
                            </div>
                          </Link>
                          <Link href="/order" onClick={() => setIsUserDropDown(false)}>
                            <div className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#1A1A1A] hover:bg-[#FAF9FF] hover:text-[#8B35B8] transition-colors duration-150 border-b border-[#E5E7EB] font-medium">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 3 3 5-5" /></svg>
                              Order History
                            </div>
                          </Link>
                          <button
                            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 font-medium cursor-pointer"
                            onClick={logout}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-[#1A1A1A] hover:bg-[#FAF9FF] hover:text-[#8B35B8] transition-colors duration-150 border-b border-[#E5E7EB] font-medium cursor-pointer"
                            onClick={() => { dispatch(openLoginPopup()); setIsUserDropDown(false); }}
                          >
                            <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path fill="currentColor" d="M1 12s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6z" /></svg>
                            Login
                          </button>
                          <Link href="/signup" onClick={() => setIsUserDropDown(false)}>
                            <div className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#1A1A1A] hover:bg-[#FAF9FF] hover:text-[#8B35B8] transition-colors duration-150 font-medium">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M20 8v6M23 11h-6"/><circle cx="9" cy="7" r="4"/></svg>
                              Register
                            </div>
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar — pro style: tall touch target, soft default, purple focus glow */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-t border-[#E9D5FF] bg-[#FAF9FF]"
            >
              <div className="container py-5 px-1">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = `/search/${searchQuery}`;
                      setShowSearch(false);
                    }
                  }}
                >
                  <div className="relative">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      autoFocus
                      aria-label="Search products"
                      className="w-full h-14 py-4 pl-5 pr-[4.25rem] rounded-2xl text-base bg-white border border-[#E5E7EB] text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#8B35B8] focus:ring-2 focus:ring-[#8B35B8]/15 transition-all duration-200 shadow-[0_2px_6px_rgba(0,0,0,0.04)] focus:shadow-[0_0_0_3px_rgba(139,53,184,0.12)]"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl text-[#3D3C3C] hover:text-[#8B35B8] hover:bg-[#F3E8FF] active:scale-95 transition-all"
                      aria-label="Submit search"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Spacer to push content below fixed header ─── */}
      <div className="h-16" />

      {/* ─── Side Drawer Menu ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[var(--z-overlay)]"
              style={{ zIndex: 'var(--z-overlay)' }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 bg-white z-[var(--z-modal)] shadow-2xl flex flex-col"
              style={{ zIndex: 'var(--z-modal)' }}
            >
              {/* Drawer header */}
              <div className="flex items-center gap-4 p-4 bg-[#8B35B8]">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
                  <Image
                    src="https://res.cloudinary.com/doz4dnf0h/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1744734631/WhatsApp_Image_2025-04-06_at_6.43.54_PM_b6bdxm.jpg"
                    alt="Profile"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-base truncate font-heading">{token ? user?.name : 'Welcome!'}</div>
                  {!token ? (
                    <Link href="/signup" onClick={() => setIsOpen(false)} className="text-[#D4A847] text-sm underline">Sign up</Link>
                  ) : (
                    <Link href="/myaccount" onClick={() => setIsOpen(false)} className="text-white/70 text-sm">View Profile →</Link>
                  )}
                </div>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2">
                    <path d="M2 2l12 12M14 2L2 14" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-2">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/aboutus', label: 'About Us' },
                  { href: '/vision', label: 'Our Vision' },
                  { href: '/privacypolicy', label: 'Privacy Policy' },
                ].map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                    <div className="flex items-center justify-between px-5 py-4 text-[#1A1A1A] hover:text-[#8B35B8] hover:bg-[#FAF9FF] border-b border-[#E5E7EB] transition-colors duration-150 font-medium text-sm">
                      {item.label}
                      <svg width="14" height="14" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* Drawer footer */}
              {token && (
                <div className="p-4 border-t border-[#E5E7EB]">
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                    onClick={() => { logout(); setIsOpen(false); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {isLoginPopupOpen && <LoginPopup />}
    </>
  );
}
