import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import type { GetStaticProps } from "next";
import { useAppSelector } from "@/hooks/hooks";
import { getData } from "@/services/apiServices";
import { BRAND, SITE_URL, absUrl } from "@/lib/seo/siteConfig";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import {
  EarnProduct,
  FALLBACK_PRODUCTS,
  LEVEL_PERCENTS,
  NEW_MEMBER_CASHBACK,
  commissionAt,
  formatInr,
} from "@/lib/earnPlan";
import { CASHBACK_PERCENT, CASHBACK_THRESHOLD, FREE_DELIVERY_THRESHOLD } from "@/lib/cartConfig";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, mailtoLink, whatsappLink } from "@/lib/contact";
import { COPY, LANG_STORAGE_KEY, Lang, isLang } from "@/lib/earnCopy";
import StoryPhone from "@/Components/earn-instagram/StoryPhone";
import LevelLadder from "@/Components/earn-instagram/LevelLadder";
import EarningsCalculator from "@/Components/earn-instagram/EarningsCalculator";
import LangToggle from "@/Components/earn-instagram/LangToggle";

/* ------------------------------------------------------------------ */
/* Page facts                                                          */
/* ------------------------------------------------------------------ */

const PATH = "/earn-from-instagram";
const OG_IMAGE = "/assets/images/earn-instagram/og.png";
const TITLE = "How to Earn Money from Instagram in India";
const DESCRIPTION =
  "Post a story with your Attri QR code and referral code. Earn 25% on direct sales plus commission on 7 levels. Free to join, no follower minimum.";
const PUBLISHED = "2026-09-23";
const FALLBACK_IMG = "/assets/images/product.jpg";
const MIN_WITHDRAWAL = 100;

/** Backgrounds for the three story templates; the words live in earnCopy. */
const TEMPLATE_BG = [
  "linear-gradient(160deg, #5C1F82 0%, #8B35B8 60%, #D4A847 100%)",
  "linear-gradient(160deg, #1A1A1A 0%, #3D3C3C 100%)",
  "linear-gradient(160deg, #F4821A 0%, #EE2A7B 55%, #6228D7 100%)",
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

interface Props {
  products: EarnProduct[];
  heroProduct: EarnProduct;
}

export default function EarnFromInstagram({ products, heroProduct }: Props) {
  const router = useRouter();
  const token = useAppSelector((s: any) => s?.token?.token);

  // Language. The server always renders English (the indexed version); a
  // saved choice or ?lang=hi switches after mount, so hydration never mismatches.
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];

  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query.lang;
    const fromQuery = Array.isArray(q) ? q[0] : q;
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    } catch {
      /* private mode etc. */
    }
    const next: Lang = isLang(fromQuery) ? fromQuery : isLang(saved) ? saved : "en";
    setLang(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "en";
    };
  }, [lang]);

  const changeLang = (next: Lang) => {
    setLang(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    const query: Record<string, string | string[] | undefined> = { ...router.query };
    if (next === "hi") query.lang = "hi";
    else delete query.lang;
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true, scroll: false });
  };

  const joinHref = token ? "/myaccount" : "/signup";
  const joinLabel = token ? t.hero.openQr : t.hero.join;

  // Sticky mobile CTA: hidden while the hero or the closing section is on screen.
  const heroRef = useRef<HTMLElement | null>(null);
  const endRef = useRef<HTMLElement | null>(null);
  const [ctaHidden, setCtaHidden] = useState(true);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setCtaHidden(visible.size > 0);
    });
    if (heroRef.current) io.observe(heroRef.current);
    if (endRef.current) io.observe(endRef.current);
    return () => io.disconnect();
  }, []);

  const heroImage = heroProduct?.image || FALLBACK_IMG;
  const exampleDistribution = heroProduct?.distribution || 100;
  const exampleName = heroProduct?.name || "Onion Shampoo";
  const gridProducts = products.slice(0, 6);
  const beforeLines = t.before.lines({
    cashback: formatInr(NEW_MEMBER_CASHBACK),
    threshold: formatInr(CASHBACK_THRESHOLD),
    pct: CASHBACK_PERCENT,
    free: formatInr(FREE_DELIVERY_THRESHOLD),
    min: formatInr(MIN_WITHDRAWAL),
  });
  const whatsappHref = whatsappLink(t.contact.whatsappMessage);
  const mailtoHref = mailtoLink(t.contact.emailSubject);

  return (
    <article className="ei-page" lang={lang}>
      {/* ---------------- Hero ---------------- */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#FAF9FF] pb-14 pt-6 md:pb-20 md:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#E9D5FF] opacity-70 blur-3xl"
        />
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 md:mb-8">
            <nav aria-label="Breadcrumb" className="text-sm text-[#6B7280]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-[#8B35B8]">
                    {t.breadcrumb.home}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-[#3D3C3C]">{t.breadcrumb.current}</li>
              </ol>
            </nav>
            <LangToggle lang={lang} onChange={changeLang} ariaLabel={t.toggleAria} />
          </div>

          <div className="grid items-center gap-10 md:grid-cols-[1.15fr,0.85fr] md:gap-8">
            <div>
              <h1 className="ei-h1 text-[#1A1A1A]">{t.hero.h1}</h1>
              <div className="ei-hairline mt-5" aria-hidden />
              <p className="ei-lead mt-5">{t.hero.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={joinHref}
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#8B35B8] px-7 text-base font-semibold text-white shadow-[0_10px_30px_rgba(139,53,184,0.35)] transition-colors duration-200 hover:bg-[#5C1F82]"
                >
                  {joinLabel}
                </Link>
                <a
                  href="#seven-levels"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#D8B4FE] bg-white px-6 text-base font-semibold text-[#5C1F82] transition-colors duration-200 hover:bg-[#F3E8FF]"
                >
                  {t.hero.seeLevels}
                </a>
              </div>
              <ul className="ei-trust mt-7">
                {t.hero.trust.map((item) => (
                  <li key={item}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="12" cy="12" r="10" fill="#DCFCE7" stroke="none" />
                      <path d="m8 12.5 2.5 2.5L16 9.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center md:justify-end">
              <StoryPhone
                image={heroImage}
                productName={lang === "en" ? exampleName.toLowerCase() : exampleName}
                copy={t.phone}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Calculator ---------------- */}
      <section id="calculator" className="bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <h2 className="ei-h2 text-[#1A1A1A]">{t.calc.h2}</h2>
          <p className="ei-measure mt-3 text-[#4B5563]">{t.calc.intro}</p>
          <div className="mt-8">
            <EarningsCalculator products={products} copy={t.calc} />
          </div>
          <p className="mt-5 text-sm text-[#6B7280]">
            {t.calc.newHere}{" "}
            <a href="#seven-levels" className="font-semibold text-[#8B35B8] hover:underline">
              {t.calc.seeSplit}
            </a>{" "}
            {t.calc.and}{" "}
            <a href="#how-it-works" className="font-semibold text-[#8B35B8] hover:underline">
              {t.calc.howToGetCode}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ---------------- Straight answer ---------------- */}
      <section className="bg-[#FAF9FF] py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <div className="grid gap-8 md:grid-cols-[0.9fr,1.1fr] md:gap-14">
            <h2 className="ei-h2 text-[#1A1A1A]">{t.answer.h2}</h2>
            <div>
              <p className="ei-measure text-[17px] leading-[1.7] text-[#1A1A1A]">{t.answer.p1}</p>
              <p className="ei-measure mt-4 text-[#4B5563]">{t.answer.p2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Compare the ways ---------------- */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <h2 className="ei-h2 text-[#1A1A1A]">{t.compare.h2}</h2>
          <p className="ei-measure mt-3 text-[#4B5563]">{t.compare.intro}</p>
          <div className="ei-table-wrap mt-7">
            <table className="ei-table">
              <thead>
                <tr>
                  {t.compare.headers.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.compare.rows.map((m) => (
                  <tr key={m.method} className={m.highlight ? "is-highlight" : undefined}>
                    <td>{m.method}</td>
                    <td>{m.followers}</td>
                    <td>{m.cost}</td>
                    <td>{m.payout}</td>
                    <td>{m.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {t.compare.blurbs.map((b) => (
              <div key={b.h}>
                <h3 className="ei-h3 text-[#1A1A1A]">{b.h}</h3>
                <p className="mt-2 text-[#4B5563]">{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section id="how-it-works" className="bg-[#FAF9FF] py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <h2 className="ei-h2 text-[#1A1A1A]">{t.how.h2}</h2>
          <p className="ei-measure mt-3 text-[#4B5563]">{t.how.intro}</p>
          <ol className="ei-steps mt-8">
            {t.how.steps.map((s) => (
              <li key={s.name} className="ei-step">
                <h3 className="ei-h3 text-[#1A1A1A]">{s.name}</h3>
                <p className="mt-2 text-[15px] text-[#4B5563]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Seven levels ---------------- */}
      <section id="seven-levels" className="bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <div className="grid gap-10 md:grid-cols-[0.95fr,1.05fr] md:gap-14">
            <div>
              <h2 className="ei-h2 text-[#1A1A1A]">{t.levels.h2}</h2>
              <p className="ei-measure mt-4 text-[#4B5563]">{t.levels.p1}</p>
              <p className="ei-measure mt-4 text-[#4B5563]">{t.levels.p2(LEVEL_PERCENTS[0])}</p>
              <p className="ei-measure mt-4 text-[#4B5563]">{t.levels.p3(formatInr(NEW_MEMBER_CASHBACK))}</p>
            </div>
            <div className="rounded-3xl border border-[#E5E7EB] bg-[#FAF9FF] p-5 shadow-card md:p-7">
              <LevelLadder distribution={exampleDistribution} productName={exampleName} copy={t.levels.ladder} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- What to post ---------------- */}
      <section id="what-to-post" className="bg-[#FAF9FF] py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <h2 className="ei-h2 text-[#1A1A1A]">{t.post.h2}</h2>
          <p className="ei-measure mt-3 text-[#4B5563]">{t.post.intro}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.post.templates.map((tp, i) => (
              <div key={tp.title} className="ei-template">
                <div className="ei-template-preview" style={{ background: TEMPLATE_BG[i] }} aria-hidden>
                  <span className="ei-link-chip self-start">attriindustries.com/signup</span>
                  <p className="text-[13px] font-medium leading-snug drop-shadow">{tp.caption}</p>
                </div>
                <div className="p-5">
                  <h3 className="ei-h3 text-[#1A1A1A]">{tp.title}</h3>
                  <dl className="mt-3 grid gap-3 text-[14.5px]">
                    <div>
                      <dt className="font-semibold text-[#3D3C3C]">{t.post.show}</dt>
                      <dd className="text-[#4B5563]">{tp.show}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#3D3C3C]">{t.post.stickers}</dt>
                      <dd className="text-[#4B5563]">{tp.sticker}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="ei-h3 text-[#1A1A1A]">{t.post.whereH3}</h3>
              <ul className="mt-3 grid gap-2 text-[#4B5563]">
                {t.post.where.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="ei-h3 text-[#1A1A1A]">{t.post.discloseH3}</h3>
              <p className="mt-3 text-[#4B5563]">{t.post.disclose}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Products ---------------- */}
      <section id="products" className="bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <h2 className="ei-h2 text-[#1A1A1A]">{t.products.h2}</h2>
          <p className="ei-measure mt-3 text-[#4B5563]">{t.products.intro}</p>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {gridProducts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/product/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-shadow duration-200 hover:shadow-card-hover"
                >
                  <div className="relative aspect-square bg-[#FAF9FF]">
                    <Image
                      src={p.image || FALLBACK_IMG}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3.5 md:p-4">
                    <p className="text-[13.5px] font-semibold leading-snug text-[#1A1A1A] md:text-[15px]" lang="en">
                      {p.name}
                    </p>
                    <p className="mt-1 text-sm text-[#6B7280]">
                      {formatInr(p.price)}
                      {p.mrp > p.price && <s className="ml-2 text-[#9CA3AF]">{formatInr(p.mrp)}</s>}
                    </p>
                    <p className="mt-auto pt-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8E6] px-2.5 py-1 text-[12.5px] font-semibold text-[#A07810]">
                        {t.products.youEarn(formatInr(commissionAt(1, p.distribution)))}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[#6B7280]">
            <Link href="/category" className="font-semibold text-[#8B35B8] hover:underline">
              {t.products.browse}
            </Link>{" "}
            {t.products.browseTail}
          </p>
        </div>
      </section>

      {/* ---------------- Before you start ---------------- */}
      <section id="before-you-start" className="bg-[#FAF9FF] py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <div className="grid gap-8 md:grid-cols-[0.9fr,1.1fr] md:gap-14">
            <div>
              <h2 className="ei-h2 text-[#1A1A1A]">{t.before.h2}</h2>
              <p className="ei-measure mt-3 text-[#4B5563]">{t.before.intro}</p>
            </div>
            <ul className="grid gap-4 text-[15.5px] text-[#1A1A1A]">
              {beforeLines.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <svg className="mt-1 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B35B8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10" fill="#F3E8FF" stroke="none" />
                    <path d="m8 12.5 2.5 2.5L16 9.5" />
                  </svg>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <div className="grid gap-8 md:grid-cols-[0.9fr,1.1fr] md:gap-14">
            <h2 className="ei-h2 text-[#1A1A1A]">{t.faq.h2}</h2>
            <div className="ei-faq border-t border-[#E5E7EB]">
              {t.faq.items.map((f, i) => (
                <details key={`${lang}-${i}`} open={i === 0}>
                  <summary>
                    <h3>{f.question}</h3>
                  </summary>
                  <div>{f.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Talk to us + Closing CTA ---------------- */}
      <section ref={endRef} id="contact" className="bg-[#FAF9FF] py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <div className="grid gap-8 md:grid-cols-[0.9fr,1.1fr] md:gap-14">
            <div>
              <h2 className="ei-h2 text-[#1A1A1A]">{t.contact.h2}</h2>
              <p className="ei-measure mt-3 text-[#4B5563]">{t.contact.p}</p>
              <p className="mt-5 flex items-start gap-2 text-sm text-[#6B7280]">
                <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B35B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {t.contact.address}{" "}
                  <Link href="/help-center" className="font-semibold text-[#8B35B8] hover:underline">
                    {t.contact.mapLink}
                  </Link>
                </span>
              </p>
            </div>

            <div className="ei-contact" aria-label={t.contact.aria}>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="ei-contact-row is-primary">
                <span className="ei-contact-icon" style={{ background: "#E7F9EE", color: "#1FA855" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                <span className="ei-contact-text">
                  <span className="ei-contact-label">{t.contact.whatsappLabel}</span>
                  <span className="ei-contact-value">{PHONE_DISPLAY}</span>
                </span>
                <span className="ei-contact-action">{t.contact.whatsappAction}</span>
              </a>

              <a href={`tel:${PHONE_TEL}`} className="ei-contact-row">
                <span className="ei-contact-icon" style={{ background: "#F5EEFA", color: "#8B35B8" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="ei-contact-text">
                  <span className="ei-contact-label">{t.contact.callLabel}</span>
                  <span className="ei-contact-value">{PHONE_DISPLAY}</span>
                </span>
                <span className="ei-contact-action">{t.contact.callAction}</span>
              </a>

              <a href={mailtoHref} className="ei-contact-row">
                <span className="ei-contact-icon" style={{ background: "#FEF3C7", color: "#A07810" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span className="ei-contact-text">
                  <span className="ei-contact-label">{t.contact.emailLabel}</span>
                  <span className="ei-contact-value" lang="en">
                    {EMAIL}
                  </span>
                </span>
                <span className="ei-contact-action">{t.contact.emailAction}</span>
              </a>
            </div>
          </div>

          <div
            className="relative mt-12 overflow-hidden rounded-3xl px-6 py-10 text-white md:mt-16 md:px-12 md:py-14"
            style={{ background: "linear-gradient(135deg, #8B35B8 0%, #5C1F82 100%)" }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 right-32 h-44 w-44 rounded-full bg-[#D4A847]/25" />
            <div className="relative grid items-center gap-6 md:grid-cols-[1fr,auto]">
              <div>
                <h2 className="ei-h2 text-white">{t.closing.h2}</h2>
                <p className="mt-3 max-w-xl text-white/85">{t.closing.p}</p>
              </div>
              <Link
                href={joinHref}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-[#5C1F82] transition-colors duration-200 hover:bg-[#F3E8FF]"
              >
                {joinLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Sticky mobile CTA ---------------- */}
      <div className="ei-sticky-cta" data-hidden={ctaHidden ? "true" : "false"}>
        <Link
          href={joinHref}
          className="flex min-h-[52px] items-center justify-center rounded-full bg-[#8B35B8] px-6 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(92,31,130,0.45)]"
        >
          {joinLabel}
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Data + SEO (always the English, indexed version)                    */
/* ------------------------------------------------------------------ */

function articleSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    image: absUrl(OG_IMAGE),
    inLanguage: "en-IN",
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: absUrl(PATH),
    author: { "@type": "Organization", name: BRAND, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: BRAND,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/android-icon-192x192.png` },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE_TEL,
        email: EMAIL,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    },
  };
}

function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to earn money from Instagram with the Attri Creator Program",
    description:
      "Join free, get your QR code and referral code, post them in an Instagram story, and earn commission across seven levels when people buy.",
    totalTime: "PT10M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "INR", value: "0" },
    step: COPY.en.how.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE_URL}${PATH}#how-it-works`,
    })),
  };
}

export const getStaticProps: GetStaticProps = async () => {
  let products: EarnProduct[] = [];
  try {
    const res: any = await getData("/get-products");
    const list = res?.data?.products ?? res?.data ?? [];
    products = (Array.isArray(list) ? list : [])
      .filter((p: any) => p?.status !== "inactive" && p?.slug && Number(p?.distributionamount) > 0)
      .map(
        (p: any): EarnProduct => ({
          name: String(p.name ?? "").trim(),
          slug: String(p.slug),
          price: Number(p.price ?? p.mrp ?? 0),
          mrp: Number(p.mrp ?? 0),
          image: Array.isArray(p.images) && p.images[0] ? String(p.images[0]) : "",
          distribution: Number(p.distributionamount),
          category: typeof p.category === "object" ? String(p.category?.name ?? "") : "",
        })
      )
      .sort((a, b) => b.distribution - a.distribution);
  } catch (error) {
    console.error("earn-from-instagram: products fetch failed, using fallback", error);
  }
  if (!products.length) products = FALLBACK_PRODUCTS;

  const heroProduct = products.find((p) => p.slug === "onion-shampoo") ?? products[0];

  return {
    props: {
      products: products.slice(0, 12),
      heroProduct,
      seo: {
        title: TITLE,
        description: DESCRIPTION,
        path: PATH,
        image: OG_IMAGE,
        type: "article",
        jsonLd: [
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Earn from Instagram", url: PATH },
          ]),
          articleSchema(),
          howToSchema(),
          faqSchema(COPY.en.faq.items),
        ],
      },
    },
    revalidate: 3600,
  };
};
