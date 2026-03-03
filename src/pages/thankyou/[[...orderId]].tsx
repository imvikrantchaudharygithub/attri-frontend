import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
// import "@/styles/thankyou.css";
import { useRouter } from "next/router";
import { getData } from "@/services/apiServices";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function OrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedReferral, setCopiedReferral] = useState(false);

  const getOrder = async () => {
    try {
      setIsLoading(true);
      const response = await getData(`/get-order/${orderId}`);
      console.log("orderResponse", response);
      setOrderData(response?.data);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to load order details");
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(orderData?.user?.referral_code);
      setCopiedReferral(true);
      toast.success("Referral code copied!");
      setTimeout(() => setCopiedReferral(false), 2000);
    } catch (error) {
      toast.error("Failed to copy referral code");
    }
  };
  const shareWhatsapp = () => {
		const text = `🚀 I’m using *Attri Products* and *Earning Money* from it — and I’m LOVING it! 💸✨ \n\nWanna try it too? Use my referral code 👉 *“${orderData?.user?.referral_code}”* \n\n  Join here 🔗 https://www.attriindustries.com/signup/${orderData?.user?.referral_code}   \n\n  -Let’s grow & earn together! 💼💰🔥`;
		window.open(`https://wa.me/?text=${text}`, '_blank');
	}

  useEffect(() => {
    if (orderId) {
      getOrder();
    }
  }, [orderId]);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full border-4 border-[#8B35B8]/20 border-t-[#8B35B8] animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280] font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] font-heading mb-2">Order Not Found</h2>
          <p className="text-[#6B7280] mb-6">We couldn't find the order you're looking for.</p>
          <Link href="/order" className="bg-[#8B35B8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5C1F82] transition-colors">
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF9FF] py-8">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block mb-6">
            <motion.div
              className="w-24 h-24 bg-[#8B35B8] rounded-full flex items-center justify-center mx-auto shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              <motion.svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
              </motion.svg>
            </motion.div>
            <motion.div
              className="absolute -top-1 -right-1 w-8 h-8 bg-[#D4A847] rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <span className="text-sm">🎉</span>
            </motion.div>
          </div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-[#8B35B8] font-heading italic mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Order Confirmed!
          </motion.h1>
          <p className="text-lg text-[#6B7280] mb-1">
            Thank you, <span className="font-semibold text-[#1A1A1A]">{orderData?.user?.name}</span>
          </p>
          <p className="text-[#6B7280] text-sm mb-6">Your order will be shipped within 2-3 business days</p>

          <div className="inline-flex items-center bg-white rounded-full px-5 py-2.5 shadow-card border border-[#E5E7EB]">
            <span className="text-[#6B7280] text-sm mr-2">Order #</span>
            <span className="font-mono font-bold text-[#1A1A1A]">{orderData?.tracking_number}</span>
            <button
              onClick={() => navigator.clipboard.writeText(orderData?.tracking_number)}
              className="ml-3 p-1 hover:bg-[#FAF9FF] rounded-full transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary Card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-card border border-[#E5E7EB] overflow-hidden">
              <div className="bg-[#8B35B8] px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Summary
                </h2>
              </div>

              <div className="p-5">
                <div className="space-y-3 mb-5">
                  {orderData?.products?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-[#FAF9FF] rounded-xl">
                      <div className="relative flex-shrink-0 w-16 h-16">
                        <Image
                          width={64}
                          height={64}
                          className="w-full h-full object-cover rounded-lg"
                          src={item?.product?.images[0]}
                          alt={item?.product?.name}
                        />
                        <div className="absolute -top-1.5 -right-1.5 bg-[#8B35B8] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item?.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1A1A1A] text-sm truncate">{item?.product?.name}</h3>
                        <p className="text-xs text-[#6B7280] mt-0.5">₹{item?.product?.price?.toFixed(2)} each</p>
                        {item?.product?.discount > 0 && (
                          <span className="text-xs bg-[#f0fdf4] text-[#16A34A] border border-[#bbf7d0] px-2 py-0.5 rounded-full mt-1 inline-block">
                            {item?.product?.discount}% OFF
                          </span>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-[#1A1A1A]">₹{(item?.product?.price * item?.quantity)?.toFixed(2)}</div>
                        {item?.product?.mrp > item?.product?.price && (
                          <div className="text-xs text-[#9CA3AF] line-through">₹{(item?.product?.mrp * item?.quantity)?.toFixed(2)}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 space-y-2.5">
                  {orderData?.coupon?.code && (
                    <div className="flex justify-between items-center py-1.5 bg-[#f0fdf4] rounded-lg px-3">
                      <span className="text-sm text-[#16A34A] font-medium">Coupon: {orderData?.coupon?.code}</span>
                      <span className="text-sm text-[#16A34A] font-bold">-₹{orderData?.coupon?.discountAmount?.toFixed(2)}</span>
                    </div>
                  )}
                  {orderData?.cashback > 0 && (
                    <div className="flex justify-between items-center py-1.5 bg-[#eff6ff] rounded-lg px-3">
                      <span className="text-sm text-blue-600 font-medium">Cashback Applied</span>
                      <span className="text-sm text-blue-600 font-bold">-₹{orderData?.cashback?.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm text-[#6B7280]">
                    <span>Shipping</span>
                    <span className="font-medium">{orderData?.totalAmount > 699 ? <span className="text-[#16A34A]">FREE</span> : "₹55"}</span>
                  </div>
                  {orderData?.tax > 0 && (
                    <div className="flex justify-between items-center text-sm text-[#6B7280]">
                      <span>Tax</span>
                      <span className="font-medium">₹{orderData?.tax?.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3 border-t border-[#E5E7EB] mt-1">
                    <span className="font-bold text-[#1A1A1A]">Total Amount</span>
                    <span className="text-xl font-bold text-[#8B35B8]">
                      ₹{(orderData?.totalAmount + (orderData?.totalAmount > 699 ? 0 : 55)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Referral Code Card */}
            <div className="bg-white rounded-2xl shadow-card border border-[#E5E7EB] overflow-hidden">
              <div className="bg-[#8B35B8] px-5 py-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Your Referral Code
                </h3>
              </div>
              <div className="p-5">
                <div className="bg-[#FAF9FF] border border-[#E5E7EB] rounded-xl p-4 text-center mb-4">
                  <div className="text-xl font-bold text-[#1A1A1A] font-mono tracking-widest">
                    {orderData?.user?.referral_code}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={shareWhatsapp}
                    className="py-2.5 px-3 bg-[#25D366] text-white rounded-xl text-sm font-semibold hover:bg-[#1ebe59] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Share
                  </button>
                  <button
                    onClick={copyReferralCode}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      copiedReferral ? "bg-[#16A34A] text-white" : "bg-[#8B35B8] text-white hover:bg-[#5C1F82]"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {copiedReferral
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      }
                    </svg>
                    {copiedReferral ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-[#9CA3AF] text-center">Share with friends and earn cashback!</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-card border border-[#E5E7EB] p-5 space-y-3">
              <Link
                href="/order"
                className="w-full bg-[#8B35B8] text-white py-3 px-4 rounded-xl font-semibold text-sm hover:bg-[#5C1F82] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                View All Orders
              </Link>
              <Link
                href="/"
                className="w-full bg-[#FAF9FF] text-[#8B35B8] border border-[#E5E7EB] py-3 px-4 rounded-xl font-semibold text-sm hover:bg-[#F3E8FF] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}