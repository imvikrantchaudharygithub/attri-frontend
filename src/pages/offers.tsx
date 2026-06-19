import Link from "next/link";
import { useEffect, useState } from "react";
import AccountSideBar from "@/Components/accountsidebar";
import { getData } from "@/services/apiServices";
import toast from "react-hot-toast";
import { useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/router";

const COUPON_GRADIENTS = [
  "bg-gradient-to-r from-green-500 to-emerald-500",
  "bg-gradient-to-r from-blue-500 to-cyan-500",
  "bg-gradient-to-r from-purple-500 to-violet-500",
  "bg-gradient-to-r from-orange-500 to-amber-500",
  "bg-gradient-to-r from-pink-500 to-rose-500",
  "bg-gradient-to-r from-indigo-500 to-blue-500",
  "bg-gradient-to-r from-teal-500 to-green-500",
  "bg-gradient-to-r from-red-500 to-pink-500",
];

function formatCouponDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Offers() {
  const token = useAppSelector((state: any) => state.token.token);
  const router = useRouter();
  const [couponList, setCouponList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
    getCouponList();
  }, [token]);

  const getCouponList = async () => {
    setIsLoading(true);
    await getData("/admin/get-coupons")
      .then((res: any) => {
        const active = (res?.data?.coupons ?? []).filter((c: any) => c?.status === "active");
        setCouponList(active);
      })
      .catch((err: any) => {
        console.log(err);
        setCouponList([]);
      })
      .finally(() => setIsLoading(false));
  };

  const copyCode = async (code: string) => {
    if (!code) return;
    const text = String(code);
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        toast.success("Coupon code copied to clipboard");
        return;
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast.success("Coupon code copied to clipboard");
    } catch {
      toast.error("Could not copy code. Please copy it manually.");
    }
  };

  return (
    <section className="account-box min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <div className="account-main d-flex padding-tb">
          <div className="account-left hidden md:block" style={{ background: "transparent" }}>
            <AccountSideBar />
          </div>
          <div className="account-right flex flex-col gap-8">
            {/* Hero */}
            <header
              className="relative overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-10"
              style={{
                background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 60%)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h1 className="font-bold text-2xl tracking-tight md:text-3xl" style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-heading)" }}>
                Offers & Coupons
              </h1>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                Use these codes on your cart for instant discounts
              </p>
            </header>

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl border p-0 overflow-hidden"
                    style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
                  >
                    <div className="h-24 bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 w-3/4 rounded bg-gray-200" />
                      <div className="flex gap-2">
                        <div className="h-4 w-20 rounded bg-gray-200" />
                        <div className="h-4 w-16 rounded bg-gray-200" />
                      </div>
                      <div className="h-10 w-24 rounded-xl bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : couponList.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center rounded-2xl border px-6 py-12 text-center"
                style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full" style={{ background: "var(--color-primary-light)" }}>
                  <span className="text-4xl">🎟️</span>
                </div>
                <h2 className="text-xl font-bold md:text-2xl" style={{ color: "var(--color-charcoal)" }}>
                  No active coupons right now
                </h2>
                <p className="mt-2 max-w-sm text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  Check back later for new offers, or start shopping and apply coupons at checkout.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                  style={{ background: "var(--color-primary)" }}
                >
                  Shop now
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {couponList.map((coupon: any, index: number) => {
                  const gradientClass = COUPON_GRADIENTS[index % COUPON_GRADIENTS.length];
                  return (
                    <article
                      key={coupon?.code}
                      className="rounded-2xl border overflow-hidden transition-shadow hover:shadow-lg"
                      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
                    >
                      <div className={`${gradientClass} p-4 text-white relative`}>
                        <div className="absolute -bottom-2 left-0 right-0 h-4 bg-white rounded-full flex justify-between px-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-2 h-2 bg-gray-200 rounded-full" />
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">
                              {coupon?.discountType === "percentage" ? `${coupon?.discountValue}%` : `₹${coupon?.discountValue}`}
                            </div>
                            <div className="text-sm opacity-90">OFF</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{coupon?.code}</div>
                            <div className="text-xs opacity-75">COUPON</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--color-charcoal)" }}>
                          {coupon?.description || "Special Discount Offer"}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-xs mb-4" style={{ color: "var(--color-text-secondary)" }}>
                          {coupon?.minPurchaseAmount != null && (
                            <span className="flex items-center gap-1.5">
                              <span className="font-semibold" style={{ color: "var(--color-charcoal)" }}>Min</span> ₹{coupon.minPurchaseAmount}
                            </span>
                          )}
                          {coupon?.validTo && (
                            <span className="flex items-center gap-1.5">
                              Valid till {formatCouponDate(coupon.validTo)}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyCode(coupon?.code)}
                            className="inline-flex min-h-[40px] min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                            style={{ background: "var(--color-primary)" }}
                          >
                            Copy code
                          </button>
                          <Link
                            href="/cart"
                            className="inline-flex min-h-[40px] items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                            style={{ borderColor: "var(--color-border)", color: "var(--color-charcoal)" }}
                          >
                            Use in cart
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
