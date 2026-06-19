export const SITE_URL = "https://attriindustries.com";
export const BRAND = "Attri Industries";
export const BRAND_ALT = "Attri";

export const DEFAULT_TITLE = "Attri Industries — Natural & Ayurvedic Personal Care";
export const DEFAULT_DESCRIPTION =
  "Attri Industries makes 100% natural, Ayurvedic personal care & wellness products — onion shampoo & hair oil, herbal face wash, glutathione cream, herbal toothpaste, and pure kitchen masale. Paraben-free, made in India.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// Update these to the brand's real profiles when available.
export const SOCIAL_LINKS: string[] = [
  "https://www.instagram.com/attriindustries",
  "https://www.facebook.com/attriindustries",
];

export const ORG = {
  legalName: "Attri Industries",
  slogan: "Pure Ayurveda. Real opportunity.",
  description:
    "Attri Industries is an Indian direct-selling company offering 100% natural, Ayurvedic personal care, wellness and kitchen products, and a referral-based earning opportunity for distributors across India.",
  email: "support@attriindustries.com",
  areaServed: "IN",
};

export function absUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path; // already absolute (e.g. Cloudinary)
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
