// Single source of truth for cart delivery economics.
// The progress bar and the checkout shipping calculation BOTH read these,
// so they can never drift apart.
export const FREE_DELIVERY_THRESHOLD = 699; // ₹ — order total at/above which delivery is free
export const FLAT_SHIPPING = 55;            // ₹ — flat shipping charged below the threshold

// Cashback reward: 10% store credit on orders with subtotal at/above the threshold.
export const CASHBACK_THRESHOLD = 299; // ₹ subtotal to unlock 10% cashback
export const CASHBACK_PERCENT = 10;    // % cashback earned on qualifying orders
