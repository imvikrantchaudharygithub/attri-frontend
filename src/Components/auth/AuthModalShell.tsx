import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type AuthModalShellProps = {
  onClose: () => void;
  children: ReactNode;
  sideImageSrc?: string;
  sideImageAlt?: string;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function AuthModalShell({
  onClose,
  children,
  sideImageSrc,
  sideImageAlt = "Authentication visual",
}: AuthModalShellProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusedElementRef.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("scroll");

    const focusFirstInteractive = () => {
      const container = modalRef.current;
      if (!container) return;
      const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length > 0) {
        focusables[0].focus();
      }
    };

    focusFirstInteractive();

    return () => {
      document.body.classList.remove("scroll");
      previousFocusedElementRef.current?.focus();
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const container = modalRef.current;
    if (!container) return;

    const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onKeyDown={handleKeyDown}
        className="relative z-10 w-full max-w-[390px] overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_28px_80px_rgba(26,26,26,0.28)] md:max-w-[880px] md:grid md:grid-cols-[340px_1fr]"
      >
        {sideImageSrc ? (
          <div className="relative hidden md:block">
            <Image src={sideImageSrc} alt={sideImageAlt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B35B8]/25 via-black/20 to-[#D4A847]/20" />
          </div>
        ) : null}

        <div className="relative bg-[linear-gradient(180deg,#FFFFFF_0%,#FCFAFF_100%)] p-6 md:p-8">
          <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[var(--color-primary)]/10 blur-2xl" />
          {children}
        </div>
      </motion.div>
    </div>
  );
}
