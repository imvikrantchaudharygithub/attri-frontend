import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
// import "@/styles/thankyou.css";
import { useRouter } from "next/router";
import { getData } from "@/services/apiServices";
export default function OrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  console.log("orderId",orderId)
  const [orderData,setOrderData] = useState<any>(null)
  const getOrder = async () => {
    await getData(`/get-order/${orderId}`).then((response)=>{
      console.log("orderResponse",response)
      setOrderData(response?.data)
    }).catch((error)=>{
      console.log("error",error)
    })
  }
  useEffect(()=>{
    getOrder()
  },[orderId])
  return (
    <section className="thankyou-main padding-tb">
        <div className="container">
            <div className="thankyou-box text-center">
              <div className="right-check">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                  <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
                </svg>
              </div>
              <div className="attrilgheading">Thank you for your purchase</div>
              <p className="thank-pra">We've received your order will ship in 5-7 business days. Your order number is #B6CT3</p>
              <button className="anchor-button hovertime copy-btn">
                {orderData?.user?.referral_code}
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                    <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="copy">
                    <path fill="#212121" d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z"></path>
                  </svg>
                </div>
              </button>
              <div className="order-summary">
                <div className="attrixsheading">Order Summary</div>
                {orderData?.products?.map((item:any,index:number)=>(
                  <div className="order-summary-item dflex">
                    <div className="order-summary-thumb" key={index}>
                      <Image width={100} height={100} className="w-full" src={item?.product?.images[0]} alt=""></Image>
                    </div>
                  <div className="attrixxsheading">{item?.product?.name}</div>
                  <div className="attrixxsheading">Quantity : {item?.quantity}</div>
                  <p>₹{item?.product?.price}</p>
                </div>
                ))}
                <div className="order-total">
                  <div className="attrixxsheading">Total</div>
                  <div className="attrixxsheading total-price">₹{orderData?.totalAmount}</div>
                </div>
              </div>
              <Link href={'/'} className="anchor-button hovertime">
                Back To Home
              </Link>
              <div className="thank-video">
                <iframe width="1022" height="380" 
                    src="https://www.youtube.com/embed/9ao4FEaDGhQ?rel=0&autoplay=1&mute=1" 
                    title="Bella Ciao - La Casa de Papel"  
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                </iframe>
              </div>
            </div>
        </div>
    </section>
  );
}