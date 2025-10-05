import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
// import "@/styles/thankyou.css";
import { useRouter } from "next/router";
import { getData } from "@/services/apiServices";
import { toast } from "react-toastify";

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center ">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
          <Link href="/order" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-lg">🎉</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase, <span className="font-semibold text-gray-800">{orderData?.user?.name}</span>
          </p>
          <p className="text-gray-500 mb-6">
            Your order will be shipped within 2-3 business days
          </p>
          
          {/* Order Number */}
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md border border-gray-200">
            <span className="text-gray-600 mr-2">Order #</span>
            <span className="font-mono font-bold text-lg text-gray-800">{orderData?.tracking_number}</span>
            <button 
              onClick={() => navigator.clipboard.writeText(orderData?.tracking_number)}
              className="ml-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Summary
                </h2>
              </div>
              
              <div className="p-6">
                {/* Products */}
                <div className="space-y-4 mb-6">
                  {orderData?.products?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex-shrink-0 w-20 h-20 relative">
                        <Image
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                          src={item?.product?.images[0]}
                          alt={item?.product?.name}
                        />
                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item?.quantity}
                        </div>
                      </div>
                      <div className="flex-1 ml-4 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item?.product?.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          ₹{item?.product?.price?.toFixed(2)} {item?.quantity > 1 ? "each" : ""}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {item?.product?.discount}% OFF
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{(item?.product?.price * item?.quantity)?.toFixed(2)}
                        </div>
                        {item?.product?.mrp > item?.product?.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{(item?.product?.mrp * item?.quantity)?.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-3">
                    {/* Subtotal */}
                    {/* <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{orderData?.subtotal?.toFixed(2) || '0.00'}</span>
                    </div> */}

                    {/* Coupon Discount */}
                    {orderData?.coupon?.code && (
                      <div className="flex justify-between items-center py-2 bg-green-50 rounded-lg px-4">
                        <div className="flex items-center">
                          <span className="text-green-600 font-medium">🎟️ Coupon Applied</span>
                          <span className="ml-2 text-sm text-gray-600">({orderData?.coupon?.code})</span>
                        </div>
                        <span className="text-green-600 font-bold">
                          -₹{orderData?.coupon?.discountAmount?.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Cashback */}
                    {orderData?.cashback > 0 && (
                      <div className="flex justify-between items-center py-2 bg-blue-50 rounded-lg px-4">
                        <div className="flex items-center">
                          <span className="text-blue-600 font-medium">💰 Cashback Applied</span>
                        </div>
                        <span className="text-blue-600 font-bold">
                          -₹{orderData?.cashback?.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Shipping */}
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                      {/* orderData?.totalAmount > 699 ? 0 : 55; */}
                        {orderData?.totalAmount > 699 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹ 55`
                        )}
                      </span>
                    </div>

                    {/* Tax */}
                    {orderData?.tax > 0 && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-semibold">₹{orderData?.tax?.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Total */}
                    <div className="flex justify-between items-center py-4 border-t-2 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-4">
                      <span className="text-xl font-bold text-gray-800">Total Amount</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{(orderData?.totalAmount + (orderData?.totalAmount > 699 ? 0 : 55)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Referral Code Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Your Referral Code
                </h3>
              </div>
              <div className="p-6">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-4">
                    <div className="text-2xl font-bold text-gray-800 font-mono">
                      {orderData?.user?.referral_code}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={shareWhatsapp}
                    className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-800 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Share
                  </button>

                  <button
                    onClick={copyReferralCode}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      copiedReferral
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-800'
                    }`}
                  >
                    {copiedReferral ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </span>
                    )}
                  </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Share this code with friends and earn cashback!
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  <Link 
                    href="/order" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    View All Orders
                  </Link>
                  
                  <Link 
                    href="/" 
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Status */}
            {/* <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h3 className="text-lg font-bold text-white">Order Status</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">Order Confirmed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">Processing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-gray-500">Shipped</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-gray-500">Delivered</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}