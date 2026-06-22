import { CASHBACK_THRESHOLD, CASHBACK_PERCENT, FREE_DELIVERY_THRESHOLD } from "@/lib/cartConfig";

export default function RewardsBar({ orderTotal }: { orderTotal: number }) {
  const total = orderTotal || 0;
  const max = FREE_DELIVERY_THRESHOLD;
  const pct = Math.min(100, Math.round((total / max) * 100));
  const cashbackPos = Math.min(100, Math.round((CASHBACK_THRESHOLD / max) * 100));

  const cashbackUnlocked = total >= CASHBACK_THRESHOLD;
  const shippingUnlocked = total >= FREE_DELIVERY_THRESHOLD;
  const toCashback = Math.max(0, Math.round(CASHBACK_THRESHOLD - total));
  const toShipping = Math.max(0, Math.round(FREE_DELIVERY_THRESHOLD - total));
  const estCashback = Math.round((CASHBACK_PERCENT / 100) * total);

  let message: React.ReactNode;
  if (!cashbackUnlocked) {
    message = (
      <>Add <span className="font-bold text-[#8B35B8]">₹{toCashback}</span> more to unlock{" "}
        <span className="font-semibold text-[#16A34A]">{CASHBACK_PERCENT}% cashback</span></>
    );
  } else if (!shippingUnlocked) {
    message = (
      <>🎁 Earning <span className="font-semibold text-[#16A34A]">{CASHBACK_PERCENT}% cashback</span> (≈₹{estCashback})! Add{" "}
        <span className="font-bold text-[#8B35B8]">₹{toShipping}</span> more for{" "}
        <span className="font-semibold text-[#16A34A]">FREE delivery</span></>
    );
  } else {
    message = (
      <span className="text-[#16A34A] font-semibold">🎉 {CASHBACK_PERCENT}% cashback + FREE delivery unlocked!</span>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 mb-3 shadow-card">
      <p className="text-sm text-[#1A1A1A] mb-3 leading-snug">{message}</p>

      {/* progress track with a notch at the cashback milestone */}
      <div className="relative h-2.5 w-full rounded-full bg-[#F0E9F7] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            shippingUnlocked ? "bg-[#16A34A]" : "bg-gradient-to-r from-[#8B35B8] to-[#D4A847]"
          }`}
          style={{ width: `${pct}%` }}
        />
        <div className="absolute top-0 bottom-0 w-0.5 bg-white/80" style={{ left: `${cashbackPos}%` }} aria-hidden />
      </div>

      {/* milestone legend */}
      <div className="mt-2 flex items-center justify-between text-[11px]">
        <span className={cashbackUnlocked ? "text-[#16A34A] font-semibold" : "text-[#9CA3AF]"}>
          {cashbackUnlocked ? "✓" : "🎁"} ₹{CASHBACK_THRESHOLD} · {CASHBACK_PERCENT}% cashback
        </span>
        <span className={shippingUnlocked ? "text-[#16A34A] font-semibold" : "text-[#9CA3AF]"}>
          {shippingUnlocked ? "✓" : "🚚"} ₹{FREE_DELIVERY_THRESHOLD} · Free delivery
        </span>
      </div>
    </div>
  );
}
