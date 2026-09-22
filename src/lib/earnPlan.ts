/**
 * Public facts about the Attri earning plan, in one place so the marketing
 * page and the account pages never drift from each other.
 *
 * Source of truth for the percentages is the backend payout
 * (`services/priceDistribution.ts`: generationPercentages). If that array
 * changes, change LEVEL_PERCENTS too.
 */
export const LEVEL_PERCENTS = [25, 21, 18, 12, 9, 7, 5] as const;

/** ₹ store credit a new member receives when they join with a referral code. */
export const NEW_MEMBER_CASHBACK = 200;
/** ₹ real money the referrer receives when someone joins with their code. */
export const REFERRER_JOIN_REWARD = 10;

export type EarnProduct = {
  name: string;
  slug: string;
  price: number;
  mrp: number;
  image: string;
  /** Distribution value: the ₹ amount split across the 7 levels on a paid order. */
  distribution: number;
  category: string;
};

export function commissionAt(level: number, distribution: number): number {
  const pct = LEVEL_PERCENTS[level - 1] ?? 0;
  return (pct / 100) * distribution;
}

export function formatInr(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  return `₹${rounded.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

/**
 * Snapshot of the live catalogue (2026-09-23) used only when the products API
 * is unreachable at build time, so the page never renders empty. Values are
 * refreshed from the API on every ISR revalidation when it is up.
 */
export const FALLBACK_PRODUCTS: EarnProduct[] = [
  {
    name: "ATTRI 10 Products Mega Combo",
    slug: "attri-10-products-mega-combo",
    price: 2198.7,
    mrp: 3141,
    image: "",
    distribution: 700,
    category: "ATTRI COMBOS",
  },
  {
    name: "ATTRI Immunity Booster Multi Berry Juice – 500 ml",
    slug: "attri-immunity-booster-multi-berry-juice-500-ml",
    price: 549.45,
    mrp: 999,
    image: "",
    distribution: 300,
    category: "Wellness",
  },
  {
    name: "ATTRI Green Energy Green Juice – 500 ml",
    slug: "attri-green-energy-green-juice-500-ml",
    price: 499.5,
    mrp: 999,
    image: "",
    distribution: 260,
    category: "Wellness",
  },
  {
    name: "Glutathione Skin Glowing Cream",
    slug: "glutathione-skin-glowing-cream",
    price: 401.33,
    mrp: 599,
    image: "",
    distribution: 150,
    category: "Skin",
  },
  {
    name: "Onion Shampoo",
    slug: "onion-shampoo",
    price: 299.25,
    mrp: 399,
    image: "",
    distribution: 100,
    category: "Hair",
  },
  {
    name: "Attri Onion Oil",
    slug: "attri-onion-oil",
    price: 295.26,
    mrp: 399,
    image: "",
    distribution: 98,
    category: "Hair",
  },
];
