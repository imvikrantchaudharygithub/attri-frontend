import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
// import "@/styles/account.css";
// import "@/styles/cart.css";
import About from "@/Components/About";
// import OfferSection from "@/Components/OfferSection";
// import SaveAddress from "@/Components/saveaddress";
// import NewAddressPopUp from "@/Components/newaddresspopup";
// import EditAddressPopUp from "@/Components/editaddresspopup";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/slices/rootReduces';
import { removeFromCart, clearCart, addToCart, decrementQuantity, incrementQuantity } from '@/slices/cartSlice';
import toast from 'react-hot-toast';
import { getData, postData } from "@/services/apiServices";
import { setCartCount } from "@/slices/loginUserSlice";
import router from "next/router";
import { openLoginPopup } from "@/slices/popupSlice";
import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_LIVE_KEY_ID,
//   key_secret: process.env.RAZORPAY_LIVE_KEY_SECRET
// });

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const token = useSelector((state: RootState) => state.token.token);
  const user = useSelector((state: RootState) => state.user);
 
  const [usercartItems, setUserCartItems] = useState<any[]>([]);
  const [useraddress, setUseraddress] = useState<any>({});
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [ischeckoutLoading, setIscheckoutLoading] = useState(false);
  const [showFreeDelivery, setShowFreeDelivery] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [isCashbackModalOpen, setIsCashbackModalOpen] = useState(false);
  const [isCashbackClosing, setIsCashbackClosing] = useState(false);
  const [cashbackEntered, setCashbackEntered] = useState(false);
  const [cashbackInput, setCashbackInput] = useState<number>(0);
  const [appliedCashback, setAppliedCashback] = useState<number>(0);
  const [userCashbackBalance,setUserCashbackBalance] = useState<number>(0); // TODO: replace with real balance
  const [userData, setUserData] = useState<any>(null);
  
  // Coupon states
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isCouponClosing, setIsCouponClosing] = useState(false);
  const [couponEntered, setCouponEntered] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string>('');
  const [cart, setCart] = useState<any>(null);
  const [couponList, setCouponList] = useState<any>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<string>('');

  const [freeCartItem, setFreeCartItem] = useState<string | null>(null);
  const handleRemoveFromCart = async(item: any) => {
    if(!token){
      dispatch(removeFromCart(item));
      toast.success('Item removed from cart');
    }
    if(token){
    const data = {
        userId: user?.id,
        productId: item?.product?._id,
    }
   await postData('/remove-item',data)
    .then((res:any)=>{
        getusercart()
      toast.success('Item removed from cart');
      setFreeCartItem(null);
      setAppliedCoupon(null);
    })
    .catch((err:any)=>{
      toast.error('Item not removed from cart');
    })
}}
  const [isLoading, setIsLoading] = useState(false);

  const syncCartWithAccount = () => {
    if (token && cartItems.length > 0 && !isLoading) {
      setIsLoading(true);
      
      return postData('add-bulk-items', {
        userId: user?.id,
        items: cartItems?.map((item:any) => ({
          productId: item?.product?._id,
          quantity: item?.quantity,
          price: item?.product?.price
        }))
      })
        .then(() => {
          // Clear local cart after successful sync
          dispatch(clearCart());
          toast.success('Cart items synced with account');
        })
        .catch(error => {
          console.error('Error syncing cart:', error);
          toast.error('Failed to sync cart with account');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return Promise.resolve();
  };

  const getusercart = () => {
    setIsCartLoading(true);
    return getData(`get-cart/${user?.id}`)
      .then((res: any) => {
        dispatch(clearCart());
        setCart(res?.data?.cart);
        console.log("cart",res?.data?.cart)
        setUserCartItems(res?.data?.cart?.items);
        dispatch(setCartCount(res?.data?.cart?.items?.length));
        setUserData(res?.data?.userDetails);
        setUserCashbackBalance(res?.data?.userDetails?.cashback);
        // console.log("cart items",cartItems)
        // console.log("user cart items",res?.data?.cart?.items)
        console.log("user cashback balance",res?.data?.userDetails?.cashback)

      })
      
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => setIsCartLoading(false));
  };

  useEffect(() => {
    if (token) {
      // Chain the operations
      getUseraddress()
      syncCartWithAccount()
        .then(getusercart)
        .catch(error => {
          console.error('Error in cart operations:', error);
        });
        getCouponList()
    }
    if(!token){
      setUserCartItems(cartItems);
      console.log("cart items",cartItems)
    }
   
  }, [token]);
  useEffect(() => {
    if(!token ){
        setUserCartItems(cartItems);
        console.log("cart items",cartItems)
        setIsCartLoading(false)
        dispatch(setCartCount(cartItems.reduce((acc:any, item:any) => acc + item?.quantity, 0)))
      }
    console.log("cart items",cartItems)
  }, [cartItems])


  const getUseraddress = async() => {
    await getData(`/users/${user?.id}/addresses`)
    .then((res:any)=>{
      console.log("user address",res)
      const address = res?.data?.addresses?.find((item:any)=>item?.isDefault === true)
      console.log("default address",address)
      setUseraddress(address)    
    })
    .catch((err:any)=>{
      console.log(err)
      setUseraddress(null)
    })
  }
  const incrementproductQuantity = async(productId: string) => {
    if(!token){
      dispatch(incrementQuantity(productId));     
    }
    if(token){
      const data = {
        userId: user?.id,
        productId: productId,
      }
      await postData('/cart/increase-quantity',data)
      .then((res:any)=>{
        console.log(res)
        getusercart()
      })
      .catch((err:any)=>{
        console.log(err)
      })
    }
 
  };

  const decrementproductQuantity = async(productId: string) => {
    if(!token){
      dispatch(decrementQuantity(productId));
    }
    if(token){
      const data = {
        userId: user?.id,
        productId: productId,
      }
      await postData('/cart/decrease-quantity',data)
      .then((res:any)=>{
        console.log(res)
        getusercart()
        setFreeCartItem(null);
        setAppliedCoupon(null);
      })
      .catch((err:any)=>{
        console.log(err)
      })
    }
  };
//   const createOrder = () => {
//     const data = {
//       user: user?.id,
//       address: useraddress?._id,
//       products: usercartItems,
//       paymentMethod: "online",
//     }
//      postData('/create-order',data)
//     .then((res:any)=>{
//       console.log(res)
//     })
//     .catch((err:any)=>{
//       console.log(err)
//     })
//   }
const handleEmptyCart = async() => {
  await postData('/empty-cart',{
    userId: user?.id
  })
  .then((res:any)=>{
    console.log(res)
    getusercart()
  })
  .catch((err:any)=>{
    console.log(err)
  })
}

const handlePayment = async () => {
    if(!token){
    dispatch(openLoginPopup())
    }
    if(token){
    try {
        setIscheckoutLoading(true)
        
        // Step 1: Create our database order first
        const orderResponse = await postData('/create-order', {
            user: user?.id,
            address: useraddress?._id,
            products: usercartItems,
            paymentMethod: "online",
            cashback: appliedCashback,
            couponCode: appliedCoupon?.code || null,
           
        }).catch((err:any)=>{
        toast.error(err?.response?.data?.message);
        })
        
        if (!orderResponse?.data?.order?._id) {
          console.log("orderResponse",orderResponse)
            throw new Error("Failed to create order");

        }
        console.log("orderResponse",orderResponse)
        
        const orderId = orderResponse.data.order._id;
        window.scrollTo(0, 0);  // Scroll to top of page when payment process starts
        // Step 2: Create Razorpay order using our order ID
        const razorpayResponse = await postData('/create-razorpay-order', {
            orderId: orderId
        });
        console.log("razorpayResponse",razorpayResponse)
        
        if (!razorpayResponse?.data?.id) {
            toast.error("Failed to create Razorpay order");
            throw new Error("Failed to create Razorpay order");
        }
        
        const razorpayOrder= razorpayResponse.data;
        console.log("razorpayOrder",razorpayOrder)
        setIsPaymentLoading(false)
        setIscheckoutLoading(false)
        // Step 3: Initialize Razorpay with response data
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: "ATTRI INDUSTRIES",
            description: `Order #${orderId}`,
            order_id: razorpayOrder.id,
            prefill: {
                name: user?.name || "",
                email:  "",
                contact: useraddress?.contact || ""
            },
            handler: async function(response:any) {
                try {
                   const verifyPayment = await postData('/verify-payment', {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        orderId: orderId
                    });
                    console.log("verifyPayment",verifyPayment)
                    
                        toast.success("Payment successful!");
                        dispatch(clearCart());
                        dispatch(setCartCount(0))
                        handleEmptyCart()
                        // Add navigation to success page
                        setIsPaymentLoading(false)
                        setIscheckoutLoading(false)
                        router.push(`/thankyou/${orderId}`);
                    
                } catch (err) {
                    toast.error("Payment verification failed");
                    setIsPaymentLoading(false)  
                    setIscheckoutLoading(false)
                    handleEmptyCart()
                }
            },
            theme: {
                color: "#3399cc"
            }
        };
        
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        
    } catch (error:any) {
        console.error('Payment failed:', error);
        toast.error('Payment initialization failed');
        setIsPaymentLoading(false)
        setIscheckoutLoading(false)
    }
}
// setIsPaymentLoading(false)
// setIscheckoutLoading(false)
};
const [orderdetails, setOrderDetails] = useState(() => ({
    ordermrptotal: usercartItems?.reduce((acc:any, item:any) => acc + item?.product?.mrp * item?.quantity, 0) || 0,
    ordertotal: usercartItems?.reduce((acc:any, item:any) => acc + item?.product?.price * item?.quantity, 0) || 0,
    discount: usercartItems?.reduce((acc:any, item:any) => acc + item?.product?.mrp * item?.quantity, 0) || 0,
    tax: usercartItems?.reduce((acc:any, item:any) => acc + item?.product?.tax * item?.quantity, 0) || 0,
    shipping: (usercartItems?.reduce((acc:any, item:any) => acc + item?.product?.price * item?.quantity, 0) || 0) > 699 ? 0 : 55,
    cashback: 0,
    couponDiscount: 0,
    grandtotal: 0
}));

// Update whenever usercartItems changes
useEffect(() => {
    const newOrdertotal = usercartItems?.reduce((acc:any, item:any) => acc + item?.product?.price * item?.quantity, 0) || 0;
    const newShipping = newOrdertotal > 699 ? 0 : 55;
    
    setOrderDetails(prev => ({
       cashback: appliedCashback,
        ordermrptotal: usercartItems?.reduce((acc:any, item:any) => acc + item?.product?.mrp * item?.quantity, 0) || 0,
        ordertotal: newOrdertotal,
        discount: usercartItems?.reduce((acc:any, item:any) => acc + item?.product?.mrp * item?.quantity, 0) || 0,
        tax: usercartItems?.reduce((acc:any, item:any) => acc + item?.product?.tax * item?.quantity, 0) || 0,
        shipping: newShipping,
        couponDiscount: couponDiscount,
        grandtotal: (newOrdertotal - appliedCashback - couponDiscount) + newShipping
    }));
}, [usercartItems, appliedCashback, couponDiscount]);

// Keep cashbackInput as user's balance but clamped to max applicable value
useEffect(() => {
  if (!isCashbackModalOpen) return;
  const maxApplicable = Math.max(0, Math.min(userCashbackBalance, (orderdetails?.grandtotal || 0) / 2));
  setCashbackInput(maxApplicable);
}, [isCashbackModalOpen, userCashbackBalance, orderdetails?.grandtotal]);

// Cashback modal: enter animation + exit delay
useEffect(() => {
  if (isCashbackModalOpen) {
    setCashbackEntered(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setCashbackEntered(true));
    });
    return () => cancelAnimationFrame(t);
  } else {
    setCashbackEntered(false);
  }
}, [isCashbackModalOpen]);
useEffect(() => {
  if (!isCashbackClosing) return;
  const t = setTimeout(() => {
    setIsCashbackModalOpen(false);
    setIsCashbackClosing(false);
    setCashbackEntered(false);
  }, 200);
  return () => clearTimeout(t);
}, [isCashbackClosing]);

// Coupon modal: enter animation + exit delay
useEffect(() => {
  if (isCouponModalOpen) {
    setCouponEntered(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setCouponEntered(true));
    });
    return () => cancelAnimationFrame(t);
  } else {
    setCouponEntered(false);
  }
}, [isCouponModalOpen]);
useEffect(() => {
  if (!isCouponClosing) return;
  const t = setTimeout(() => {
    setIsCouponModalOpen(false);
    setIsCouponClosing(false);
    setCouponEntered(false);
    setCouponError("");
    setCouponCode("");
    setSelectedCoupon("");
  }, 200);
  return () => clearTimeout(t);
}, [isCouponClosing]);

// Add this useEffect to handle GIF display
// useEffect(() => {
//   if (orderdetails.shipping === 0) {
//     setShowFreeDelivery(true);
//     const timer = setTimeout(() => {
//       setShowFreeDelivery(false);
//     }, 6000);
//     return () => clearTimeout(timer);
//   }
// }, [orderdetails.shipping]);

  const checkout = () => {
    const data = {
     orderId: "67cfb1142c04dac20465c290",
    }
     postData('/create-razorpay-order',data)
    .then((res:any)=>{
      console.log(res)
    })
}
const shareWhatsapp = () => {
  const text = `🚀 I'm using *Attri Products* and *Earning Money* from it — and I'm LOVING it! 💸✨ \n\nWanna try it too? Use my referral code 👉 *"${userData?.referral_code}"* \n\n  Join here 🔗 https://www.attriindustries.com/signup/${userData?.referral_code}   \n\n  -Let's grow & earn together! 💼💰🔥`;
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

const getCouponList = async () => {
    await getData('/admin/get-coupons')
  .then((res:any)=>{
    console.log("response",res)
    // Filter coupons to only show active ones
    const activeCoupons = res?.data?.coupons?.filter((coupon: any) => coupon.status === 'active') || [];
    setCouponList(activeCoupons)
  })
  .catch((err:any)=>{
    console.log("err",err)
  })
}

// Coupon functions
const validateCoupon = async (code: string) => {
  if (!code.trim()) {
    setCouponError('Please enter a coupon code');
    return false;
  }
  
  setIsCouponLoading(true);
  setCouponError('');
  
  try {
    // Mock API call - replace with actual endpoint
    const response = await postData('/apply-coupon', {
      code: code,
      cartId : cart?._id
    });
    
    if (response?.data?.success === true) {
      const discount = response.data.discount;
      setAppliedCoupon(response.data.coupon);
      setCouponDiscount(discount);
      setCouponError('');

      // Clear cashback when coupon is applied
      setAppliedCashback(0);
      toast.success(`Coupon applied! You saved ₹${discount}`);
      setIsCouponClosing(true);
      if(response.data.lowestPricedItem ){
        setFreeCartItem(response.data.lowestPricedItem.product._id);
      }else{
        setFreeCartItem(null);
      }
      return true;
    } else {
      setCouponError(response?.data?.message || 'Invalid coupon code');
      return false;
    }
  } catch (error: any) {
    setCouponError(error?.response?.data?.message || 'Failed to validate coupon');
    toast.error(error?.response?.data?.message);
    console.log("error",error)

    return false;
  } finally {
    setIsCouponLoading(false);
  }
};

const removeCoupon = () => {
  setAppliedCoupon(null);
  setCouponDiscount(0);
  setCouponCode('');
  setCouponError('');
  setSelectedCoupon(''); // Clear selection
  toast.success('Coupon removed');
};

const handleCouponSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await validateCoupon(couponCode);
};
if(isPaymentLoading){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF9FF] gap-6">
        <div className="w-16 h-16 rounded-full border-4 border-[#8B35B8] border-t-transparent animate-spin" />
        <p className="text-[#8B35B8] font-semibold text-lg font-heading">Processing Payment...</p>
      </div>
    );
}
  return (
    <>
        <section className={`bg-[#FAF9FF] py-8 md:py-12 ${usercartItems?.length ? "pb-28 md:pb-12" : ""}`}>
            <div className="container">
                <h1 className="text-2xl md:text-3xl font-bold text-[#8B35B8] font-heading italic mb-6">My Cart</h1>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 min-w-0">
                        {isCartLoading ? (
                          <div className="space-y-4">
                            {[1,2].map(i => (
                              <div key={i} className="bg-white rounded-2xl p-4 flex gap-4">
                                <div className="skeleton w-24 h-24 md:w-28 md:h-28 rounded-xl flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                  <div className="skeleton h-4 w-3/4 rounded-lg" />
                                  <div className="skeleton h-4 w-1/3 rounded-lg" />
                                  <div className="skeleton h-8 w-28 rounded-xl mt-4" />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                          {usercartItems?.length > 0 ? usercartItems.map((item: any) => (  
                          <div key={item?.product?._id} className={`bg-white rounded-2xl p-4 mb-3 flex gap-4 relative transition-all duration-200 ${freeCartItem === item?.product?._id ? 'ring-2 ring-[#16A34A] shadow-[0_0_0_2px_rgba(22,163,74,0.2)]' : 'shadow-card'}`}>
                            {freeCartItem === item?.product?._id && (
                              <div className="absolute -top-2 left-4 bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">FREE ITEM</div>
                            )}
                            <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#FAF9FF]">
                              <Image width={112} height={112} className="w-full h-full object-cover" src={item?.product?.images?.[0] || '/assets/images/product.jpg'} alt={item?.product?.name} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-[#1A1A1A] text-sm md:text-base leading-snug mb-1 pr-6">{item?.product?.name}</h3>
                              {freeCartItem === item?.product?._id && item.quantity === 1 ? (
                                <div className="text-[#16A34A] font-bold text-lg">FREE</div>
                              ) : (
                                <div className="flex items-baseline gap-2 mb-0.5">
                                  <span className="font-bold text-[#8B35B8] text-base">₹{item?.product?.price?.toFixed(0)}</span>
                                  {item?.product?.mrp > item?.product?.price && <span className="text-xs text-[#9CA3AF] line-through">₹{item?.product?.mrp?.toFixed(0)}</span>}
                                  <span className="text-xs text-[#D4A847] font-semibold">{item?.product?.discount}% off</span>
                                  {freeCartItem === item?.product?._id && item.quantity > 1 && <span className="text-xs text-[#16A34A] font-bold border border-[#16A34A] rounded-full px-1.5 py-0.5">1 FREE</span>}
                                </div>
                              )}
                              <p className="text-xs text-[#9CA3AF] mb-3">Incl. all taxes</p>
                              <div className="flex items-center gap-1">
                                <button type="button" className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center hover:border-[#8B35B8] transition-colors cursor-pointer active:scale-95" onClick={() => decrementproductQuantity(item?.product?._id)}>
                                  <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M1 1h8" stroke="#8B35B8" strokeWidth="2" strokeLinecap="round"/></svg>
                                </button>
                                <span className="w-8 text-center font-semibold text-sm">{item?.quantity}</span>
                                <button type="button" className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center hover:border-[#8B35B8] transition-colors cursor-pointer active:scale-95" onClick={() => incrementproductQuantity(item?.product?._id)}>
                                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="#8B35B8" strokeWidth="2" strokeLinecap="round"/></svg>
                                </button>
                              </div>
                            </div>
                            <button className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer" onClick={() => handleRemoveFromCart(item)} aria-label="Remove item">
                              <svg width="14" height="14" viewBox="0 0 26 26" fill="none"><path d="M21.665 4.334L4.332 21.667M21.665 21.667L4.332 4.334" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            </button>
                          </div>
                          )) : (
                          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl shadow-card">
                            <div className="w-20 h-20 rounded-full bg-[#f0fdf4] flex items-center justify-center mb-4">
                              <svg width="36" height="36" viewBox="0 0 26 26" fill="none" stroke="#8B35B8" strokeWidth="1.5">
                                <path d="M2.4375 4.0625H5.6875L8.125 17.875H21.125" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.125 14.625H20.7919L22.6 6.5H6.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="8.9375" cy="21.125" r="1.625"/>
                                <circle cx="20.3125" cy="21.125" r="1.625"/>
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold text-[#8B35B8] font-heading mb-2">Cart is Empty</h3>
                            <p className="text-[#6B7280] text-sm mb-5">Add some products to get started</p>
                            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B35B8] text-white rounded-xl text-sm font-semibold hover:bg-[#5C1F82] transition-colors duration-200 cursor-pointer">
                              Browse Products
                            </Link>
                          </div>
                        )} 
                          </>
                        )}
                    </div>
                    {usercartItems?.length > 0 && (
                    <div className="lg:w-80 xl:w-96 flex-shrink-0 space-y-4">
                       {token && useraddress !== null && ( 
                        <div className="bg-white rounded-2xl p-4 shadow-card">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-[#8B35B8] text-sm">Delivery Address</h3>
                            <Link href="/myaddress" className="text-xs text-[#D4A847] font-semibold hover:text-[#A07810] transition-colors">Change</Link>
                          </div>
                          <div className="bg-[#FAF9FF] rounded-xl p-3 border border-[#E5E7EB]">
                            <div className="font-semibold text-sm text-[#1A1A1A] mb-1">{useraddress?.name}</div>
                            <p className="text-xs text-[#6B7280] leading-relaxed">{useraddress?.street}, {useraddress?.city}, {useraddress?.state} - {useraddress?.pincode}</p>
                            <p className="text-xs text-[#6B7280] mt-1">+91 {useraddress?.contact}</p>
                          </div>
                        </div>
                        )}
                      
                        <div className="bg-white rounded-2xl p-4 shadow-card">
                          <h3 className="font-semibold text-[#8B35B8] text-sm mb-4">
                            Price Details <span className="text-[#9CA3AF] font-normal">({usercartItems?.length || 0} items)</span>
                          </h3>
                          <div className="space-y-2.5 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#6B7280]">Order Total</span>
                              <span className="font-medium text-[#1A1A1A]">₹{orderdetails?.ordermrptotal?.toFixed(0)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#6B7280]">Discount on MRP</span>
                              <span className="font-semibold text-[#16A34A]">-₹{(orderdetails?.discount - orderdetails?.ordertotal).toFixed(0)}</span>
                            </div>
                            {token && (<>
                              {appliedCashback > 0 ? (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-[#6B7280]">Cashback Applied</span>
                                  <span className="font-semibold text-[#16A34A]">-₹{appliedCashback.toFixed(0)}</span>
                                </div>
                              ) : !appliedCoupon && (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-[#6B7280]">Cashback</span>
                                  <button onClick={() => setIsCashbackModalOpen(true)} className="text-[#D4A847] font-semibold hover:text-[#A07810] transition-colors cursor-pointer text-xs">Apply</button>
                                </div>
                              )}
                              {appliedCoupon ? (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="flex items-center gap-1 text-[#6B7280]">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                                    <span className="text-[#16A34A] font-semibold">{appliedCoupon.code}</span>
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-[#16A34A]">-₹{couponDiscount.toFixed(0)}</span>
                                    <button onClick={removeCoupon} className="text-xs text-red-400 hover:text-red-600 cursor-pointer">Remove</button>
                                  </div>
                                </div>
                              ) : appliedCashback === 0 && (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-[#6B7280]">Coupon</span>
                                  <button onClick={() => setIsCouponModalOpen(true)} className="text-[#D4A847] font-semibold hover:text-[#A07810] transition-colors cursor-pointer text-xs">Apply</button>
                                </div>
                              )}
                            </>)}
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#6B7280]">Shipping</span>
                              <span className={`font-semibold ${orderdetails?.shipping === 0 ? 'text-[#16A34A]' : 'text-[#1A1A1A]'}`}>
                                {orderdetails?.shipping === 0 ? 'FREE' : `₹${orderdetails?.shipping}`}
                              </span>
                            </div>
                          </div>
                          <div className="border-t border-[#E5E7EB] pt-3 mb-4">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#1A1A1A]">Grand Total</span>
                              <span className="font-bold text-xl text-[#8B35B8]">₹{orderdetails?.grandtotal?.toFixed(0)}</span>
                            </div>
                          </div>
                          <button
                            onClick={handlePayment}
                            type="button"
                            disabled={ischeckoutLoading}
                            className="w-full py-4 bg-[#8B35B8] text-white rounded-xl font-semibold text-sm hover:bg-[#5C1F82] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 shadow-[0_4px_16px_rgba(0,0,0,0.25)] cursor-pointer flex items-center justify-center gap-2"
                          >
                            {ischeckoutLoading ? (
                              <>
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70"/>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                                Proceed to Checkout
                              </>
                            )}
                          </button>
                          {!token && <p className="text-xs text-[#9CA3AF] text-center mt-2">You&apos;ll be prompted to login</p>}
                        </div>
                    </div>
                    )}
                    
                </div>
            </div>
        </section>

        {/* Sticky checkout CTA (mobile only, above bottom nav) */}
        {usercartItems?.length > 0 && (
          <div
            className="fixed inset-x-0 md:hidden"
            style={{
              bottom: "calc(64px + 10px + env(safe-area-inset-bottom, 0px))",
              zIndex: "var(--z-overlay)",
            }}
          >
            <div className="mx-auto w-full max-w-[480px]">
              <div className="rounded-2xl p-2 bg-white/92 backdrop-blur-md shadow-[0_10px_28px_rgba(139,53,184,0.16)]">
              <button
                type="button"
                onClick={handlePayment}
                disabled={ischeckoutLoading}
                className="w-full min-h-[56px] px-5 rounded-[14px] font-semibold text-[16px] leading-none text-white bg-gradient-to-r from-[#8B35B8] via-[#7A2FA3] to-[#5C1F82] hover:from-[#7A2FA3] hover:via-[#6D2A8F] hover:to-[#4F1A70] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-[0_10px_24px_rgba(139,53,184,0.34)] cursor-pointer flex items-center justify-center gap-2.5"
              >
                {ischeckoutLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    <span className="tracking-[0.01em]">Pay ₹{orderdetails?.grandtotal?.toFixed(0)}</span>
                  </>
                )}
              </button>
            </div>
            </div>
          </div>
        )}

        {showFreeDelivery && (
          <div className="fixed inset-0 bg-gradient-to-br from-black/60 to-purple-900/30 flex items-center justify-center z-50 backdrop-blur-md">
            {/* Confetti elements with enhanced animation */}
            {[...Array(100)].map((_, i) => (
              <div 
                key={i}
                className="confetti absolute w-2 h-2 opacity-80"
                style={{
                  left: `${Math.random() * 100}%`,
                  animation: `
                    confetti ${3 + Math.random() * 2}s cubic-bezier(0.4, 0, 0.6, 1) infinite,
                    fadeOut 1s ease-out ${Math.random() * 2 + 1}s forwards
                  `,
                  background: `hsl(${Math.random() * 360}deg, 100%, 70%)`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0'
                }}
              >
                {Math.random() > 0.7 && '🎉'}
              </div>
            ))}
            
            {/* Modern celebration card */}
            <div className="relative z-[101] animate-scaleUp">
              <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-3xl shadow-2xl border-2 border-white/20 transform perspective-1000">
                <div className="space-y-4">
                  <div className="celebration-text text-5xl md:text-7xl font-bold text-white animate-float">
                    <span className="inline-block">🚚</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400 mx-4">
                      FREE DELIVERY!
                    </span>

                    <span className="inline-block animate-truckBounce">🎁</span>
                  </div>
                  <p className="text-white/90 mt-4 text-xl animate-smoothBounce">
                    You've unlocked <span className="font-semibold text-yellow-300">₹55 savings!</span> 💰
                  </p>
                  <div className="mt-6 animate-pulse-slow">
                    <button 
                      onClick={() => setShowFreeDelivery(false)}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-lg px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Continue Shopping →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isCashbackModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            style={{ zIndex: "var(--z-modal)" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cashback-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out"
              style={{ opacity: cashbackEntered && !isCashbackClosing ? 1 : 0 }}
              aria-hidden="true"
              onClick={() => setIsCashbackClosing(true)}
            />
            <div
              className="relative mx-0 w-full max-w-lg rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden mb-0 md:mb-0 transition-all duration-200 ease-out md:transition-transform"
              style={{
                opacity: cashbackEntered && !isCashbackClosing ? 1 : 0,
                transform: cashbackEntered && !isCashbackClosing ? "scale(1)" : "scale(0.96)",
                transformOrigin: "center center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#8B35B8] p-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 id="cashback-modal-title" className="text-xl font-semibold">Apply Cashback</h3>
                  <button
                    aria-label="Close"
                    className="rounded-full p-1 hover:bg-white/20 transition-colors"
                    onClick={() => setIsCashbackClosing(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/90 text-sm mt-1">You can apply up to half of your grand total.</p>
              </div>
         {userCashbackBalance > 0  ?(
              <div className="bg-white p-6">
                {(() => {
                  const maxApplicableCashback = Math.max(0, Math.min(userCashbackBalance, (orderdetails?.grandtotal || 0) / 2));
                  return (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-gray-200 p-4">
                          <div className="text-xs text-gray-500">Max Applicable</div>
                          <div className="mt-1 text-lg font-semibold">₹{maxApplicableCashback.toFixed(2)}</div>
                        </div>
                        <div className="rounded-xl border border-gray-200 p-4">
                          <div className="text-xs text-gray-500">Your Cashback</div>
                          <div className="mt-1 text-lg font-semibold">₹{userCashbackBalance.toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 p-4">
                        <div className="text-sm text-gray-600">Selected Cashback</div>
                        <div className="text-lg font-semibold">₹{cashbackInput.toFixed(2)}</div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsCashbackClosing(true)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="px-5 py-2 rounded-xl text-white bg-[#8B35B8] hover:bg-[#5C1F82] transition-colors cursor-pointer"
                          onClick={() => {
                            setAppliedCashback(Number(cashbackInput.toFixed(2)));
                            setAppliedCoupon(null);
                            setCouponDiscount(0);
                            setIsCashbackClosing(true);
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
              ):(
                <div className="bg-white p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-xs font-semibold">Earn ₹10</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-800">No cashback available yet</div>
                    <p className="mt-2 max-w-md text-sm text-gray-600">
                      Refer a friend and get <span className="font-semibold text-green-700">₹10 cashback</span> when they sign up using your referral.
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsCashbackClosing(true)}
                      >
                        Close
                      </button>
                      <button
                        onClick={() => shareWhatsapp()}
                        className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-green-700 to-green-500 hover:from-green-700 hover:to-green-600 transition-colors"
                      >
                        Invite a Friend
                      </button>
                    </div>
                  </div>
                </div>
              ) }
            </div>
          </div>
        )}

        {/* Coupon Modal */}
        {isCouponModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            style={{ zIndex: "var(--z-modal)" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coupon-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out"
              style={{ opacity: couponEntered && !isCouponClosing ? 1 : 0 }}
              aria-hidden="true"
              onClick={() => setIsCouponClosing(true)}
            />
            <div
              className="relative mx-0 w-full max-w-lg rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden mb-0 md:mb-0 transition-all duration-200 ease-out"
              style={{
                opacity: couponEntered && !isCouponClosing ? 1 : 0,
                transform: couponEntered && !isCouponClosing ? "scale(1)" : "scale(0.96)",
                transformOrigin: "center center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#8B35B8] p-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 id="coupon-modal-title" className="text-xl font-semibold">Apply Coupon</h3>
                  <button
                    aria-label="Close"
                    className="rounded-full p-1 hover:bg-white/20 transition-colors"
                    onClick={() => setIsCouponClosing(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/90 text-sm mt-1">Enter your coupon code to get instant discounts!</p>
              </div>
              
              <div className="bg-white p-6">
                <form onSubmit={handleCouponSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
                      Coupon Code
                    </label>
                    <div className="relative">
                      <input
                        id="couponCode"
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setSelectedCoupon(''); // Clear selection when typing manually
                        }}
                        placeholder="Enter coupon code"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-center font-semibold tracking-wider"
                        disabled={isCouponLoading}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-2xl">🎟️</span>
                      </div>
                    </div>
                    {couponError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {couponError}
                      </p>
                    )}
                  </div>

                  {/* Available Coupons Section */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-700">Available Coupons</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {couponList.length} coupons
                      </span>
                    </div>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {couponList.length > 0 ? (
                        couponList.map((coupon: any, index: number) => {
                          // Color array for different coupon cards
                          const colorClasses = [
                            'bg-gradient-to-r from-green-500 to-emerald-500',
                            'bg-gradient-to-r from-blue-500 to-cyan-500',
                            'bg-gradient-to-r from-purple-500 to-violet-500',
                            'bg-gradient-to-r from-orange-500 to-amber-500',
                            'bg-gradient-to-r from-pink-500 to-rose-500',
                            'bg-gradient-to-r from-indigo-500 to-blue-500',
                            'bg-gradient-to-r from-teal-500 to-green-500',
                            'bg-gradient-to-r from-red-500 to-pink-500'
                          ];
                          
                          const gradientClass = colorClasses[index % colorClasses.length];
                          
                          // Format expiry date
                          const formatDate = (dateString: string) => {
                            const date = new Date(dateString);
                            return date.toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            });
                          };
                          
                          // Check if coupon is applicable based on minimum amount
                          const isApplicable = orderdetails?.ordertotal >= (coupon.minPurchaseAmount || 0);
                          const isSelected = selectedCoupon === coupon.code;
                          
                          return (
                            <div
                              key={coupon.code}
                              className={`relative transition-all duration-300 ${
                                isApplicable 
                                  ? 'cursor-pointer hover:scale-[1.02]' 
                                  : 'opacity-60 cursor-not-allowed'
                              }`}
                              onClick={() => {
                                if (isApplicable) {
                                  setSelectedCoupon(coupon.code);
                                  setCouponCode(coupon.code);
                                }
                              }}
                            >
                              {/* Coupon Ticket Design */}
                              <div className={`relative bg-white border-2 rounded-2xl overflow-hidden ${
                                isApplicable 
                                  ? 'border-gray-200 hover:border-gray-300' 
                                  : 'border-gray-100'
                              }`}>
                                {/* Top Section - Discount Value */}
                                <div className={`${gradientClass} p-4 text-white relative`}>
                                  {/* Perforated Edge Effect */}
                                  <div className="absolute -bottom-2 left-0 right-0 h-4 bg-white rounded-full"></div>
                                  <div className="absolute -bottom-2 left-0 right-0 h-4 bg-white rounded-full flex justify-between px-2">
                                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="text-2xl font-bold">
                                        {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                                      </div>
                                      <div className="text-sm opacity-90">OFF</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-bold">{coupon.code}</div>
                                      <div className="text-xs opacity-75">COUPON</div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Bottom Section - Details */}
                                <div className="p-4">
                                  <div className="space-y-3">
                                    {/* Description */}
                                    <div>
                                      <h5 className="font-semibold text-gray-900 text-sm mb-1">
                                        {coupon.description || 'Special Discount Offer'}
                                      </h5>
                                    </div>
                                    
                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                      {coupon.minPurchaseAmount && (
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                            <span className="text-gray-600 font-bold text-sm">₹</span>
                                          </div>
                                          <span className="text-gray-600">Min ₹{coupon.minPurchaseAmount}</span>
                                        </div>
                                      )}
                                      {/* mkmk */}
                                      {coupon.validTo && (
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                                            </svg>
                                          </div>
                                          <span className="text-gray-600">{formatDate(coupon.validTo)}</span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Action Button */}
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                      <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${isApplicable ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                                        <span className="text-xs text-gray-500">
                                          {isApplicable ? 'Available' : 'Not eligible'}
                                        </span>
                                      </div>
                                      
                                      {isApplicable && (
                                        <button
                                          type="button"
                                          className={`px-4 py-1.5 rounded-full text-white text-xs font-semibold ${gradientClass} hover:opacity-90 transition-opacity`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCoupon(coupon.code);
                                            setCouponCode(coupon.code);
                                          }}
                                        >
                                          {isSelected ? 'Selected' : 'Apply'}
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🎟️</span>
                          </div>
                          <h5 className="text-gray-600 font-medium mb-2">No Active Coupons</h5>
                          <p className="text-xs text-gray-500">Check back later for new offers!</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsCouponClosing(true)}
                    >
                      Cancel
                    </button>
                      <button
                        type="submit"
                        disabled={isCouponLoading || !couponCode.trim()}
                        className="px-6 py-2 rounded-xl text-white bg-[#8B35B8] hover:bg-[#5C1F82] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                      >
                      {isCouponLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Applying...
                        </>
                      ) : (
                        'Apply Coupon'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* <style jsx>{`
          @keyframes confetti {
            0% { transform: translateY(-100vh) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(720deg); }
          }
          @keyframes fadeOut {
            to { opacity: 0; transform: translateY(20px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes scaleUp {
            0% { transform: scale(0); opacity: 0; }
            80% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes truckBounce {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(10px); }
          }
          @keyframes smoothBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-scaleUp {
            animation: scaleUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .animate-truckBounce {
            animation: truckBounce 1.5s ease-in-out infinite;
          }
          .animate-smoothBounce {
            animation: smoothBounce 2s ease-in-out infinite;
          }
          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style> */}
    </>
  );
}