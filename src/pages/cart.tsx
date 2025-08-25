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
import { toast, ToastContainer } from 'react-toastify';
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
  const [cashbackInput, setCashbackInput] = useState<number>(0);
  const [appliedCashback, setAppliedCashback] = useState<number>(0);
  const [userCashbackBalance,setUserCashbackBalance] = useState<number>(0); // TODO: replace with real balance
  const [userData, setUserData] = useState<any>(null);
  
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
            cashback: appliedCashback
        }).catch((err:any)=>{
        toast.error(err?.response?.data?.message);
        })
        
        if (!orderResponse?.data?._id) {
            throw new Error("Failed to create order");
            
        }
        console.log("orderResponse",orderResponse)
        
        const orderId = orderResponse.data._id;
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
        grandtotal: (newOrdertotal-appliedCashback) + newShipping
    }));
}, [usercartItems,appliedCashback]);

// Keep cashbackInput as user's balance but clamped to max applicable value
useEffect(() => {
  if (!isCashbackModalOpen) return;
  const maxApplicable = Math.max(0, Math.min(userCashbackBalance, (orderdetails?.grandtotal || 0) / 2));
  setCashbackInput(maxApplicable);
}, [isCashbackModalOpen, userCashbackBalance, orderdetails?.grandtotal]);

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
  const text = `🚀 I’m using *Attri Products* and *Earning Money* from it — and I’m LOVING it! 💸✨ \n\nWanna try it too? Use my referral code 👉 *“${userData?.referral_code}”* \n\n  Join here 🔗 https://www.attriindustries.com/signup/${userData?.referral_code}   \n\n  -Let’s grow & earn together! 💼💰🔥`;
  window.open(`https://wa.me/?text=${text}`, '_blank');
}
if(isPaymentLoading){
    return <div className="flex justify-center items-center h-screen">
      
<div className="loader">
  <p className="text">
    loading...
  </p>
</div>

  
    </div>
}
  return (
    <>
            {/* <ToastContainer position="top-right" autoClose={3000} /> */}

        <section className="cart-box">
            <div className="container">
                <h1 className="attriheading">Cart</h1>
                <div className="cart-main d-flex">
                    <div className="cart-left">
                        {isCartLoading ? (
                          
                            <div className="cart-order-item d-flex align relative">
                              <div className="cart-order-left relative animate-pulse 
                                            md:w-[230px] md:h-[230px] 
                                            w-full h-auto aspect-square">
                                <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                              </div>
                              <div className="cart-order-right md:pl-4 md:w-[55%] w-full mt-4 md:mt-0">
                                <div className="attrixxsheading bg-gray-200 w-1/2 h-4 mb-2 rounded md:w-20"></div>
                                <h3 className="attrixsheading bg-gray-200 w-full h-6 mb-4 rounded md:w-3/4"></h3>
                                <div className="product-price d-flex align flex-col md:flex-row">
                                  <div className="product-bottom-left attrixxsheading bg-gray-200 w-32 h-6 rounded mb-2 md:mb-0 md:mr-4"></div>
                                  <div className="product-bottom-right bg-gray-200 w-24 h-4 rounded"></div>
                                </div>
                                <p className="tax-text bg-gray-200 w-40 h-4 mt-2 rounded md:w-32"></p>
                                <div className="quantity-box mt-4">
                                  <div className="attrixxsheading bg-gray-200 w-24 h-4 mb-2 rounded md:w-16"></div>
                                  <div className="wrap d-flex animate-pulse w-full md:w-48">
                                    <div className="bg-gray-200 w-10 h-10 rounded md:w-8 md:h-8"></div>
                                    <div className="bg-gray-200 w-20 h-10 mx-2 rounded md:w-16 md:h-8"></div>
                                    <div className="bg-gray-200 w-10 h-10 rounded md:w-8 md:h-8"></div>
                                  </div>
                                </div>
                              </div>
                              <div className="cart-close bg-gray-200 animate-pulse md:top-4 md:right-4 top-2 right-2">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" 
                                        stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                              </div>
                            </div>
                        ) : (
                     <>
                          {usercartItems?.length > 0 ? usercartItems?.map((item: any) => (  
                          <div className="cart-order-item d-flex align relative" key={item?.product?._id}>
                            <div className="cart-order-left relative">
                              <Image width={600} height={600} className="w-full hovertime" src={item?.product?.images[0]} alt=""></Image>
                            </div>
                            <div className="cart-order-right">
                              <div className="attrixxsheading">category</div>
                              <h3 className="attrixsheading">{item?.product?.name}</h3>
                              <div className="product-price d-flex align">
                                <div className="product-bottom-left attrixxsheading">
                                  ₹{item?.product?.price?.toFixed(2)}<span>₹{item?.product?.mrp?.toFixed(2)}</span>
                                </div>
                                <div className="product-bottom-right">
                                  ({item?.product?.discount}%off)
                                </div>
                              </div>
                              <p className="tax-text">Inclusive of all Taxes</p>
                              <div className="quantity-box">
                                <div className="attrixxsheading">Quantity :</div>
                                <div className="wrap d-flex">
                                  <button type="button" id="sub" className="sub quantity-btn" onClick={() => decrementproductQuantity(item?.product?._id)}>
                                    <Image width={16} height={16} src={'/assets/images/icon/minus-icon.png'} alt=""></Image>
                                  </button>
                                  <input className="count" type="text" id="1" value={item?.quantity} min="1" max="100"/>
                                  <button type="button" id="add" className="add quantity-btn" onClick={() => incrementproductQuantity(item?.product?._id)}>
                                    <Image width={16} height={16} src={'/assets/images/icon/plus-icon.png'} alt=""></Image>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <button className="cart-close" onClick={() => handleRemoveFromCart(item)}><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg></button>
                          </div>
                          )
                        ):(
                          <div className="cart-order-item cart-empty text-center">
                            <div className="cart-empty-left relative">
                                <Image width={600} height={600} className="w-full hovertime" src={'/assets/images/empty-cart.jpg'} alt=""></Image>
                                <h4 className="attrixsheading">Cart is empty</h4>
                            </div>
                                <Link href={'/'} className="anchor-button hovertime">Add Items</Link>
                          </div>
                        )} 
                        </>
                        )}
                    </div>
                    {usercartItems?.length > 0 && (
                    <div className="cart-right">
                       {token && useraddress !== null && ( 
                        <div className="cart-right-card">
                            <div className="attrixxsheading">Select Address</div>
                            <div className="address-details">
                                <div className="attrixxsheading"> {useraddress?.name}</div>
                                <p>{useraddress?.street}, {useraddress?.city}, {useraddress?.state} - {useraddress?.pincode}</p>
                                <div className="address-number">Mobile Number : <span>+91{useraddress?.contact}</span></div>
                            </div>
                            <Link href={'/myaddress'} className="anchor-button hovertime">{useraddress !== null ? "Change Address" : "Add Address"}</Link>
                            </div>
                        )}
                          
                      
                        <div className="cart-right-card">
                            <div className="attrixxsheading">Price Details <span>( {usercartItems?.length ? usercartItems?.length : 0} items)</span></div>
                            <div className="cart-order-box">
                                <div className="order-item d-flex">
                                    <div className="order-name">Order Total</div>
                                    <div className="order-price">₹{orderdetails?.ordermrptotal}</div>
                                </div>
                                <div className="order-item order-blue d-flex">
                                    <div className="order-name">Discount on MRP</div>
                                    <div className="order-price">-₹{(orderdetails?.discount - orderdetails?.ordertotal).toFixed(2)}</div>
                                </div>
                                {/* <div className="order-item d-flex">
                                    <div className="order-name">Tax</div>
                                    <div className="order-price">₹{orderdetails?.tax}</div>
                                </div> */}
                                {token && ( <>
                                {appliedCashback > 0 ? (
                                  <div className="order-item d-flex">
                                    <div className="order-name">Cashback Applied</div>
                                    <div className="order-price">-₹{appliedCashback.toFixed(2)}</div>
                                  </div>
                                ) :( <div className="order-item d-flex align">
                                  <div className="order-name">Cashback</div>
                                  <div className="order-price" onClick={() => setIsCashbackModalOpen(true)}> Apply
                                 
                                  </div>
                              </div>) }
                              </>)}
                                <div className="order-item order-red d-flex">
                                    <div className="order-name">Shipping</div>
                                    <div className="order-price"> {orderdetails?.shipping === 0 ? "FREE" : `₹${orderdetails?.shipping}`}</div>
                                </div>
                                <div className="order-item d-flex">
                                    <div className="order-name">Grand Total</div>
                                    <div className="order-price">₹{orderdetails?.grandtotal?.toFixed(2)}</div>
                                </div>
                            </div>
                            <button onClick={()=>handlePayment()} type="button" className="anchor-button hovertime" disabled={ischeckoutLoading}>{ischeckoutLoading ? "CHECKING OUT..." : "CHECKOUT"}</button>
                        </div>
                    </div>
                    )}
                    
                </div>
            </div>
        </section>
        <About></About>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-700 to-green-500 p-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Apply Cashback</h3>
                  <button
                    aria-label="Close"
                    className="rounded-full p-1 hover:bg-white/20 transition-colors"
                    onClick={() => setIsCashbackModalOpen(false)}
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
                          onClick={() => setIsCashbackModalOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-green-700 to-green-500 hover:from-green-700 hover:to-green-600 transition-colors"
                          onClick={() => { setAppliedCashback(Number(cashbackInput.toFixed(2))); setIsCashbackModalOpen(false); }}
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
                        onClick={() => setIsCashbackModalOpen(false)}
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