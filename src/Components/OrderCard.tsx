import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
// import "@/styles/orderdetails.css";
export default function OrderCard({product,quantity}:{product:any,quantity:any}) {
  return (
    <div className="ordercard">
        <Link href={''} className="dflex">
            <div className="ordercard-product dflex">
                <div className="order-product-thumb">
                    <Image width={600} height={600} className="w-full hovertime" src={product?.images[0]} alt=""></Image>
                </div>
                <div className="ordercard-text">
                    <div className="attrixxsheading">{product?.name}</div>
                    <div className="order-price-txt">
                        ₹{product?.price?.toFixed(2)}
                    </div>
                    <ul>
                        <li><span>Quantity:</span><span>{quantity}</span></li>
                    </ul>
                </div>
            </div>
        </Link>
    </div>
    
  );
}