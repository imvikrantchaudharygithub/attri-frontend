import QRCode from "react-qr-code";
import { SITE_URL } from "@/lib/seo/siteConfig";
import type { EarnCopy } from "@/lib/earnCopy";

interface StoryPhoneProps {
  /** Product photo shown as the story background. */
  image: string;
  productName: string;
  copy: EarnCopy["phone"];
  /** Sample referral code printed on the sticker. */
  code?: string;
}

/**
 * A phone showing the exact story a creator will post: product in use,
 * a QR sticker with their referral code, and a link sticker to signup.
 * The QR is real — it encodes the public signup URL — so the page itself
 * is scannable in a screenshot.
 */
export default function StoryPhone({ image, productName, copy, code = "ATTRI-YOU" }: StoryPhoneProps) {
  const signupUrl = `${SITE_URL}/signup`;

  return (
    <div className="ei-phone" aria-label={copy.aria} role="img">
      <div className="ei-phone-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ei-phone-img" src={image} alt="" aria-hidden />
        <div className="ei-phone-shade" aria-hidden />

        {/* story progress */}
        <div className="ei-story-bars" aria-hidden>
          <span className="ei-story-bar is-done" />
          <span className="ei-story-bar is-live" />
          <span className="ei-story-bar" />
        </div>

        {/* creator header */}
        <div className="absolute left-3 right-3 top-6 flex items-center gap-2.5 text-white" aria-hidden>
          <span className="ei-ring">
            <span className="flex h-8 w-8 items-center justify-center bg-[#5C1F82] text-[11px] font-bold">
              you
            </span>
          </span>
          <span className="text-[13px] font-semibold drop-shadow">{copy.handle}</span>
          <span className="text-[12px] text-white/70">{copy.time}</span>
        </div>

        {/* QR sticker */}
        <div className="absolute right-4 top-[26%] w-[47%]" aria-hidden>
          <div className="ei-sticker p-2.5">
            <div className="rounded-lg bg-white p-1">
              <QRCode value={signupUrl} size={200} style={{ width: "100%", height: "auto" }} fgColor="#1A1A1A" />
            </div>
            <p className="mt-2 text-center text-[10px] font-semibold leading-tight text-[#3D3C3C]">{copy.scan}</p>
            <p className="ei-code mt-1 rounded-md bg-[#F3E8FF] py-1 text-center text-[11px] font-bold text-[#5C1F82]">
              {code}
            </p>
          </div>
        </div>

        {/* caption + link sticker */}
        <div className="absolute inset-x-3 bottom-14 flex flex-col items-start gap-2" aria-hidden>
          <span className="ei-link-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            attriindustries.com/signup
          </span>
          <p className="max-w-[92%] text-[12.5px] font-medium leading-snug text-white drop-shadow">
            {copy.caption(productName)}
          </p>
        </div>

        {/* reply bar */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2" aria-hidden>
          <span className="flex-1 rounded-full border border-white/50 px-3 py-1.5 text-[11px] text-white/80">
            {copy.sendMessage}
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" aria-hidden>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" aria-hidden>
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22l-4-9-9-4 20-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
