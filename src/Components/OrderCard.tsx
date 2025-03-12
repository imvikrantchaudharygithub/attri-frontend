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
                    <ul>
                        <li><span>Color:</span><span>Black</span></li>
                    </ul>
                </div>
            </div>
            <div className="order-price-txt">
                ₹3,000
            </div>
            <div className="order-status-right">
                <div className="attrixxsheading"><span className="red"></span> Delivered on Nov 02, 2024</div>
                <p>Your item has been delivered</p>
            </div>
        </Link>
    </div>
    
  );
}