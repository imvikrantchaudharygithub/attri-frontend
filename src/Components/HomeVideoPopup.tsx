import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_SRC =
  "https://res.cloudinary.com/doz4dnf0h/video/upload/v1775299462/attri-referral-influencer_dmxvsq.mp4";
const IDLE_DELAY_MS = 4000;
const ACTIVITY_THROTTLE_MS = 400;
const STORAGE_KEY = "attri_video_popup_dismissed";

export default function HomeVideoPopup() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActivityAtRef = useRef(0);
  const hasShownRef = useRef(false);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "true");
    }
  }, []);

  const goToSignup = useCallback(() => {
    dismiss();
    router.push("/signup");
  }, [dismiss, router]);

  // Home only: show popup after 4s of no activity. Hide when leaving home.
  useEffect(() => {
    if (typeof window === "undefined" || router.pathname !== "/") {
      setIsVisible(false);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      hasShownRef.current = false;
      return;
    }

    const startIdleTimer = () => {
      if (hasShownRef.current) return;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        hasShownRef.current = true;
        idleTimerRef.current = null;
        setIsVisible(true);
      }, IDLE_DELAY_MS);
    };

    const onActivity = () => {
      if (hasShownRef.current) return;
      const now = Date.now();
      if (now - lastActivityAtRef.current < ACTIVITY_THROTTLE_MS) return;
      lastActivityAtRef.current = now;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        hasShownRef.current = true;
        idleTimerRef.current = null;
        setIsVisible(true);
      }, IDLE_DELAY_MS);
    };

    startIdleTimer();

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "touchmove",
    ];
    const opts = { passive: true, capture: false };

    events.forEach((ev) => window.addEventListener(ev, onActivity, opts));

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, onActivity, opts));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    };
  }, [router.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && dismiss()}
        >
          {/* Backdrop: homepage visible around the popup */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            aria-hidden
          />

          {/* Reel-style card: smaller so homepage shows around it */}
          <motion.div
            className="relative flex flex-col w-full max-w-[340px] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video (reel aspect) */}
            <div className="relative w-full aspect-[9/16] min-h-0 bg-black">
              <video
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src={VIDEO_SRC}
                aria-label="Attri Industries"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

              {/* Close */}
              <button
                type="button"
                onClick={dismiss}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer border border-white/30 z-10"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Unmute */}
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="absolute top-3 right-14 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer border border-white/30 z-10"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Copy + CTA */}
            <div className="p-4 flex-shrink-0 bg-black">
              <h3 className="text-white text-lg font-bold font-heading italic leading-tight">
                Join the Attri Family
              </h3>
              <p className="text-white/80 text-xs mt-0.5 mb-3">Natural products. Real earnings.</p>
              <button
                type="button"
                onClick={goToSignup}
                className="w-full h-11 rounded-xl bg-[#8B35B8] text-white font-semibold text-sm hover:bg-[#5C1F82] transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
