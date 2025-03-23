import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
// import "@/styles/orderdetails.css";
export default function OrderCard() {
  return (
    <div className="ordercard">
        <Link href={''} className="dflex">
            <div className="ordercard-product dflex">
                <div className="order-product-thumb">
                    <Image width={600} height={600} className="w-full hovertime" src={'/assets/images/product.jpg'} alt=""></Image>
                </div>
                <div className="ordercard-text">
                    <div className="attrixxsheading">HOPPUP Predator Xo3 Gaming Earbuds with</div>
                    <div className="order-price-txt">
                        ₹3,000
                    </div>
                    <ul>
                        <li><span>Color:</span><span>Black</span></li>
                    </ul>
                </div>
            </div>
        </Link>
    </div>
    
  );
}