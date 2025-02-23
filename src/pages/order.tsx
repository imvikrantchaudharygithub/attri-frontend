import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import "@/styles/account.css";
import AccountSideBar from "@/Components/accountsidebar";
export default function Order() {
  return (
    <>
        <section className="account-box">
		<div className="container">
            <h1 className="attriheading">My Order</h1>
			<div className="account-main d-flex padding-tb">
                <div className="account-left">
					<AccountSideBar/>
				</div>
				<div className="account-right">
					<div className="cart-order-item d-flex">
						<div className="shipped-order-top d-flex align">
							<div className="shipped-tag">Order ID : <span>#HW374915036</span></div>
							<div className="shipped-tag">Order ID : <span>#HW374915036</span></div>
							<div className="shipped-tag">Order ID : <span>#HW374915036</span></div>
						</div>
						<div className="shipped-left d-flex align relative">
							<div className="cart-order-left relative">
								<Image width={600} height={600} className="w-full hovertime" src={'/assets/images/product.jpg'} alt=""></Image>
							</div>
							<div className="cart-order-right">
								<div className="attrixxsheading">Air Cooler</div>
								<h3 className="attrixsheading">Hercules 100 Liters Honeycomb Desert Cooler (White &amp; Black)</h3>
								<div className="product-price d-flex align">
									<div className="product-bottom-left attrixxsheading">
										₹6,500 <span>₹7,999</span>
									</div>
									<div className="product-bottom-right">
										(10%off)
									</div>
								</div>
								<div className="cart-order-btn d-flex">
									<Link href='/' className="anchor-button anchor-button-line hovertime">View Details</Link>
									<Link href='/' className="anchor-button hovertime">TRACK ORDER</Link>
								</div>
							</div>
						</div>
						<div className="shipped-price d-flex align">
							<div className="shipped-price-left">Total Order Price</div>
							<div className="shipped-price-right">₹6,500</div>
						</div>
						<div className="cart-order-btn cart-order-mobile d-flex">
                            <Link href='/' className="anchor-button anchor-button-line hovertime">View Details</Link>
                            <Link href='/' className="anchor-button hovertime">TRACK ORDER</Link>
						</div>
						
					</div>
					
				</div>
			</div>
		</div>
	</section>
    </>
  );
}