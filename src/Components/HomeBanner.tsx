"use client";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useAppSelector } from "@/hooks/hooks";
import { SITE_URL } from "@/lib/seo/siteConfig";

type Banner = {
  _id?: string;
  title?: string;
  image?: string;
  mob_image?: string;
  link?: string;
  priority?: number;
  createdAt?: string;
};

/** Admin-set order: higher priority first; banners without a numeric priority sort after
 *  every numbered one; ties (and legacy banners) fall back to newest upload first. */
function compareBanners(a: Banner, b: Banner): number {
  const pa = typeof a?.priority === "number" && Number.isFinite(a.priority) ? a.priority : null;
  const pb = typeof b?.priority === "number" && Number.isFinite(b.priority) ? b.priority : null;
  if (pa !== null && pb !== null && pa !== pb) return pb - pa;
  if (pa !== null && pb === null) return -1;
  if (pa === null && pb !== null) return 1;
  const ta = new Date(a.createdAt ?? 0).getTime() || 0;
  const tb = new Date(b.createdAt ?? 0).getTime() || 0;
  return tb - ta;
}

/** Banner destinations that only make sense for visitors without an account. A banner
 *  linking here is hidden once the visitor is logged in (the offer no longer applies). */
const GUEST_ONLY_PATHS = ["/signup"];

/** True when the banner link points at one of GUEST_ONLY_PATHS on this site, whether written
 *  as a path ("/signup", "/signup/CODE?x=1") or as a full https URL to attriindustries.com. */
export function isGuestOnlyLink(link: unknown): boolean {
  if (typeof link !== "string" || !link.trim()) return false;
  try {
    const url = new URL(link.trim(), SITE_URL);
    const siteHost = new URL(SITE_URL).host.replace(/^www\./, "");
    if (/^https?:/i.test(link.trim()) && url.host.replace(/^www\./, "") !== siteHost) return false;
    const path = url.pathname.replace(/\/+$/, "") || "/";
    return GUEST_ONLY_PATHS.some((p) => path === p || path.startsWith(p + "/"));
  } catch {
    return false;
  }
}

export default function HomeBanner({ bannerdata }: { bannerdata?: Banner[] }) {
  // Logged-in visitors never see sign-up banners. The home body only renders after the
  // persisted store has rehydrated (PersistGate), so the token is known on first render.
  const token = useAppSelector((s) => s.token.token);
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "ease-in-out",
  };

  // The backend already returns banners in admin order (priority desc, then newest first).
  // The client re-sorts with the same key so the page is correct whichever of backend/frontend deploys first.
  const sorted = bannerdata ? [...bannerdata].sort(compareBanners) : [];
  const visible = token ? sorted.filter((item) => !isGuestOnlyLink(item.link)) : sorted;

  return (
    <section className="relative overflow-hidden bg-[#FAF9FF]" style={{ lineHeight: 0 }}>
      <Slider className="homebannerslider" {...settings}>
        {visible.map((item, index) => (
          <div className="item" key={index}>
            <Link href={item.link || "/"} className="block">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={item.mob_image || "/assets/images/home-banner.jpg"}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={item.image || "/assets/images/home-banner.jpg"}
                />
                {/* The width/height attrs below only supply a *fallback* ratio:
                    once a <source> loads, the browser uses that file's natural
                    ratio instead — and the uploads vary (1.50 / 1.75 / 1.77 on
                    desktop, 1.00 on mobile), so the banner height used to swing
                    with whichever slide was showing. The explicit aspect-ratio
                    below pins it, and object-cover finally has something to crop
                    to. 40% anchors the crop slightly high, which keeps every
                    slide's logo and headline in frame. */}
                <Image
                  className="block w-full aspect-[6/5] max-h-[440px] object-cover object-[center_40%] md:aspect-[12/5] md:min-h-[360px] md:max-h-[640px]"
                  width={1920}
                  height={800}
                  src={item.image || "/assets/images/home-banner.jpg"}
                  alt={item.title || "Attri Industries banner"}
                  priority={index === 0}
                />
              </picture>
            </Link>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="item">
            <div className="w-full aspect-[6/5] max-h-[440px] md:aspect-[12/5] md:min-h-[360px] md:max-h-[640px] bg-gradient-to-br from-[#8B35B8] to-[#5C1F82] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center px-6"
              >
                <h1 className="text-white text-3xl md:text-5xl font-bold font-heading mb-4">
                  Natural. Pure. Premium.
                </h1>
                <p className="text-white/75 text-lg mb-6">
                  Discover Attri Industries — crafted with Indian heritage
                </p>
                <Link
                  href="/category"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#8B35B8] text-white rounded-full font-semibold text-sm hover:bg-[#5C1F82] transition-all duration-200 shadow-[0_4px_20px_rgba(139,53,184,0.35)]"
                >
                  Shop Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </Slider>
    </section>
  );
}
