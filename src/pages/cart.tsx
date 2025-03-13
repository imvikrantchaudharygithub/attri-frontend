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

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const token = useSelector((state: RootState) => state.token.token);
  const user = useSelector((state: RootState) => state.user);
 
  const [usercartItems, setUserCartItems] = useState<any[]>([]);
  const [useraddress, setUseraddress] = useState<any>({});
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
        items: cartItems.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
          price: item.product.price
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
    return getData(`get-cart/${user?.id}`)
      .then((res: any) => {
        dispatch(clearCart());
      
        setUserCartItems(res?.data?.cart?.items);
        dispatch(setCartCount(res?.data?.cart?.items?.length));
        console.log("cart items",cartItems)
        console.log("user cart items",res?.data?.cart?.items)

      })
      
      .catch((err: any) => {
        console.log(err);
      });
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
    if(!token){
        setUserCartItems(cartItems);
        console.log("cart items",cartItems)
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
const handlePayment = async () => {
    if(!token){
    dispatch(openLoginPopup())
    }
    if(token){
    try {
        // Step 1: Create our database order first
        const orderResponse = await postData('/create-order', {
            user: user?.id,
            address: useraddress?._id,
            products: usercartItems,
            paymentMethod: "online"
        });
        
        if (!orderResponse?.data?._id) {
            throw new Error("Failed to create order");
        }
        console.log("orderResponse",orderResponse)
        
        const orderId = orderResponse.data._id;
        
        // Step 2: Create Razorpay order using our order ID
        const razorpayResponse = await postData('/create-razorpay-order', {
            orderId: orderId
        });
        console.log("razorpayResponse",razorpayResponse)
        
        if (!razorpayResponse?.data?.order?.id) {
            throw new Error("Failed to create Razorpay order");
        }
        
        const { order: razorpayOrder, key } = razorpayResponse.data;
        
        // Step 3: Initialize Razorpay with response data
        const options = {
            key: key,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: "Your Store",
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
                        // Add navigation to success page
                        router.push(`/thankyou/${orderId}`);
                    
                } catch (err) {
                    toast.error("Payment verification failed");
                }
            },
            theme: {
                color: "#3399cc"
            }
        };
        
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        
    } catch (error) {
        console.error('Payment failed:', error);
        toast.error('Payment initialization failed');
    }
}
};
const orderdetails ={
    ordermrptotal:usercartItems?.reduce((acc:any,item:any)=>acc+item?.product?.mrp*item?.quantity,0),
    ordertotal:usercartItems?.reduce((acc:any,item:any)=>acc+item?.product?.price*item?.quantity,0),
    discount:usercartItems?.reduce((acc:any,item:any)=>acc+item?.product?.mrp*item?.quantity,0),
    tax:usercartItems?.reduce((acc:any,item:any)=>acc+item?.product?.tax*item?.quantity,0),
    shipping:0,
    grandtotal:usercartItems?.reduce((acc:any,item:any)=>acc+item?.product?.price*item?.quantity,0),
}
  const checkout = () => {
    const data = {
     orderId: "67cfb1142c04dac20465c290",
    }
     postData('/create-razorpay-order',data)
    .then((res:any)=>{
      console.log(res)
    })
}
  return (
    <>
            {/* <ToastContainer position="top-right" autoClose={3000} /> */}

        <section className="cart-box">
            <div className="container">
                <h1 className="attriheading">Cart</h1>
                <div className="cart-main d-flex">
                    <div className="cart-left">
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
                                        ₹{item?.product?.price}<span>₹{item?.product?.mrp}</span>
                                    </div>
                                    <div className="product-bottom-right">
                                        ({item?.product?.discount}%off)
                                    </div>
                                </div>
                                <p className="tax-text">Inclusive of all Taxes</p>
                                <div className="quantity-box">
                                    <div className="attrixxsheading">Quantity :</div>
                                    <div className="wrap d-flex">
                                        <button type="button" id="sub" className="sub quantity-btn" onClick={() => dispatch(decrementQuantity(item?.product?._id))}>
                                            <Image width={16} height={16} src={'/assets/images/icon/minus-icon.png'} alt=""></Image>
                                        </button>
                                        <input className="count" type="text" id="1" value={item?.quantity} min="1" max="100"/>
                                        <button type="button" id="add" className="add quantity-btn" onClick={() => dispatch(incrementQuantity(item?.product?._id))}>
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
                    </div>
                    <div className="cart-right">
                       {token && useraddress !== null && ( <div className="cart-right-card">
                            <div className="attrixxsheading">Select Address</div>
                            <div className="address-details">
                                <div className="attrixxsheading"> {useraddress?.name}</div>
                                <p>{useraddress?.street}, {useraddress?.city}, {useraddress?.state} - {useraddress?.pincode}</p>
                                <div className="address-number">Mobile Number : <span>+91{useraddress?.contact}</span></div>
                            </div>
                            <Link href={'/myaddress'} className="anchor-button hovertime">Change Address</Link>
                        </div>
                       )}
                        <div className="cart-right-card">
                            <div className="attrixxsheading">Price Details <span>( {usercartItems?.length} items)</span></div>
                            <div className="cart-order-box">
                                <div className="order-item d-flex">
                                    <div className="order-name">Order Total</div>
                                    <div className="order-price">₹{orderdetails?.ordermrptotal}</div>
                                </div>
                                <div className="order-item order-blue d-flex">
                                    <div className="order-name">Discount on MRP</div>
                                    <div className="order-price">-₹{orderdetails?.discount - orderdetails?.ordertotal}</div>
                                </div>
                                <div className="order-item d-flex">
                                    <div className="order-name">Tax</div>
                                    <div className="order-price">₹{orderdetails?.tax}</div>
                                </div>
                                <div className="order-item order-red d-flex">
                                    <div className="order-name">Coupon Discount</div>
                                    <div className="order-price">Apply Coupon</div>
                                </div>
                                <div className="order-item order-red d-flex">
                                    <div className="order-name">Shipping</div>
                                    <div className="order-price">FREE</div>
                                </div>
                                <div className="order-item d-flex">
                                    <div className="order-name">Grand Total</div>
                                    <div className="order-price">₹{orderdetails?.grandtotal}</div>
                                </div>
                            </div>
                            <button onClick={()=>handlePayment()} type="button" className="anchor-button hovertime">CHECKOUT</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <About></About>
    </>
  );
}