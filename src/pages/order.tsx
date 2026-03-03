import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AccountSideBar from "@/Components/accountsidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/rootReduces";
import { getData } from "@/services/apiServices";
import { useRouter } from "next/router";

function OrderCardSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border p-6"
      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex flex-wrap gap-6 border-b pb-4" style={{ borderColor: "var(--color-border)" }}>
        <div className="h-5 w-32 rounded bg-gray-200" />
        <div className="h-5 w-24 rounded bg-gray-200" />
      </div>
      <div className="space-y-4 py-6">
        {[1, 2].map((j) => (
          <div key={j} className="flex gap-4">
            <div className="h-24 w-24 shrink-0 rounded-xl bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
              <div className="flex gap-2">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
        <div className="h-5 w-36 rounded bg-gray-200" />
        <div className="h-5 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = (status || "").toLowerCase();
  const isGreen = s === "confirmed" || s === "delivered";
  const isYellow = s === "pending" || !isGreen;
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
      style={{
        background: isGreen ? "rgba(22, 163, 74, 0.12)" : "rgba(245, 158, 11, 0.12)",
        color: isGreen ? "var(--color-success)" : "var(--color-warning)",
      }}
    >
      {status?.toUpperCase() ?? "PENDING"}
    </span>
  );
}

export default function Order() {
  const user = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.token.token);
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/");
  }, [token, router]);

  const getOrder = async () => {
    setIsLoading(true);
    await getData(`/get-user-orders/${user?.id}`)
      .then((response) => {
        const sortedData = response?.data?.sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrderData(sortedData);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  const totalWithShipping = (item: any) =>
    (item?.totalAmount + (item?.totalAmount > 699 ? 0 : 55)).toFixed(2);

  return (
    <section className="account-box min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <div className="account-main d-flex padding-tb">
          <div className="account-left hidden md:block" style={{ background: "transparent" }}>
            <AccountSideBar />
          </div>
          <div className="account-right flex flex-col gap-8">
            {/* Header */}
            <header
              className="relative overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-10"
              style={{
                background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 60%)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h1 className="font-bold text-2xl tracking-tight md:text-3xl" style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-heading)" }}>
                My Orders
              </h1>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                View and track your orders
              </p>
            </header>

            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <OrderCardSkeleton key={i} />
                ))}
              </div>
            ) : orderData?.length > 0 ? (
              <ul className="space-y-6" aria-label="Order list">
                {orderData.map((item: any) => (
                  <li key={item._id}>
                    <article
                      className="rounded-2xl border p-6 md:p-8"
                      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
                    >
                      {/* Order header: ID + status */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: "var(--color-border)" }}>
                        <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>
                          Order ID:{" "}
                          <span className="font-semibold" style={{ color: "var(--color-charcoal)" }} title={item?._id}>
                            #{typeof item?._id === "string" ? item._id.slice(-10) : item?._id}
                          </span>
                        </p>
                        <StatusBadge status={item?.status} />
                      </div>

                      {/* Product rows: fixed-size image + details */}
                      <div className="space-y-5 py-6">
                        {item?.products?.map((prodetail: any) => (
                          <div
                            key={prodetail?.product?._id ?? prodetail?.product?.name}
                            className="flex gap-4 border-b pb-5 last:border-b-0"
                            style={{ borderColor: "var(--color-border)" }}
                          >
                            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-bg)] md:h-28 md:w-28">
                              {prodetail?.product?.images?.[0] ? (
                                <Image
                                  width={224}
                                  height={224}
                                  className="h-full w-full object-cover"
                                  src={prodetail.product.images[0]}
                                  alt={prodetail?.product?.name ?? "Product"}
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center" style={{ color: "var(--color-text-muted)" }}>
                                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold leading-snug" style={{ color: "var(--color-charcoal)", fontSize: "1rem" }}>
                                {prodetail?.product?.name}
                              </h3>
                              <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                                <span className="font-semibold" style={{ color: "var(--color-charcoal)" }}>
                                  ₹{prodetail?.product?.price?.toFixed(2)}
                                </span>
                                <span className="text-sm line-through" style={{ color: "var(--color-text-muted)" }}>
                                  ₹{prodetail?.product?.mrp?.toFixed(2)}
                                </span>
                                <span className="text-sm font-medium" style={{ color: "var(--color-error)" }}>
                                  ({prodetail?.product?.discount}% off)
                                </span>
                              </div>
                              <div className="mt-3 flex gap-3">
                                <Link
                                  href="/"
                                  className="inline-flex min-h-[40px] items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                                  style={{ borderColor: "var(--color-border)", color: "var(--color-charcoal)" }}
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer: total + order-level actions */}
                      <div className="border-t pt-5" style={{ borderColor: "var(--color-border)" }}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <span className="text-base font-medium" style={{ color: "var(--color-charcoal)" }}>
                            Total order price:{" "}
                            <span className="font-bold">₹{totalWithShipping(item)}</span>
                          </span>
                          <div className="flex flex-wrap items-center gap-3">
                            {(item?.status ?? "").toLowerCase() === "delivered" ? (
                              <Link
                                href={`/orderdetail/${item?._id}`}
                                className="inline-flex min-h-[44px] min-w-[120px] items-center justify-center rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                                style={{ borderColor: "var(--color-border)", color: "var(--color-charcoal)" }}
                              >
                                View order
                              </Link>
                            ) : (
                              <Link
                                href="/"
                                className="inline-flex min-h-[44px] min-w-[140px] items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                                style={{ background: "var(--color-primary)" }}
                              >
                                Track order
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border px-4 py-12 text-center"
                style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full" style={{ background: "var(--color-primary-light)" }}>
                  <svg className="h-12 w-12" style={{ color: "var(--color-primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold md:text-2xl" style={{ color: "var(--color-charcoal)" }}>
                  No orders yet
                </h2>
                <p className="mt-2 max-w-sm text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  You haven’t placed any orders yet. Find something you like and place your first order.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex min-h-[48px] min-w-[160px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                  style={{ background: "var(--color-primary)" }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Start shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
