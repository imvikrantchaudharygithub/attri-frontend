/**
 * Attri's public contact details, in one place. The Help Center page and the
 * Earn from Instagram page both read from here so a number change is one edit.
 */
export const PHONE_DISPLAY = "+91 8433443886";
export const PHONE_TEL = "+918433443886";
/** International format without "+", as wa.me expects. */
export const WHATSAPP = "918433443886";
export const EMAIL = "attrilaboratories@gmail.com";
export const ADDRESS_LINES = [
  "Marketed By: Attri Industries",
  "D-239, F Floor, Flat No.-06, Street-10",
  "Near Metro Gate No. 01, Laxmi Nagar",
  "Delhi - 110092",
];
export const ADDRESS_SHORT = "Laxmi Nagar, Delhi 110092";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}
