import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import "@/styles/account.css";
import "@/styles/cart.css";
import About from "@/Components/About";
import OfferSection from "@/Components/OfferSection";
import SaveAddress from "@/Components/saveaddress";
import NewAddressPopUp from "@/Components/newaddresspopup";
import EditAddressPopUp from "@/Components/editaddresspopup";
export default function Cart() {
  return (
    <>
        <section className="cart-box">
            <div className="container">
                <h1 className="attriheading">Cart</h1>
                <div className="cart-main d-flex">
                    <div className="cart-left">
                        <div className="cart-order-item d-flex align relative">
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
                                <p className="tax-text">Inclusive of all Taxes</p>
                                <div className="quantity-box">
                                    <div className="attrixxsheading">Quantity :</div>
                                    <div className="wrap d-flex">
                                        <button type="button" id="sub" className="sub quantity-btn">
                                            <Image width={16} height={16} src={'/assets/images/icon/minus-icon.png'} alt=""></Image>
                                        </button>
                                        <input className="count" type="text" id="1" value="1" min="1" max="100"/>
                                        <button type="button" id="add" className="add quantity-btn">
                                            <Image width={16} height={16} src={'/assets/images/icon/plus-icon.png'} alt=""></Image>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="cart-close"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg></button>
                        </div>
                    </div>
                    <div className="cart-right">
                        <div className="cart-right-card">
                            <div className="attrixxsheading">Select Address</div>
                            <div className="address-details">
                                <div className="attrixxsheading">Shakeel Shah</div>
                                <p>Delhi Technological University, Shahbad Daulatpur Village Main Bawana Delhi Road - 110044</p>
                                <div className="address-number">Mobile Number : <span>+91 7289819440</span></div>
                            </div>
                            <Link href={''} className="anchor-button hovertime">Change Address</Link>
                        </div>
                        <div className="cart-right-card">
                            <div className="attrixxsheading">Price Details <span>(3 items)</span></div>
                            <div className="cart-order-box">
                                <div className="order-item d-flex">
                                    <div className="order-name">Order Total</div>
                                    <div className="order-price">₹6,500</div>
                                </div>
                                <div className="order-item order-blue d-flex">
                                    <div className="order-name">Discount on MRP</div>
                                    <div className="order-price">-₹1,500</div>
                                </div>
                                <div className="order-item d-flex">
                                    <div className="order-name">Tax</div>
                                    <div className="order-price">₹150</div>
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
                                    <div className="order-price">₹6,500</div>
                                </div>
                            </div>
                            <button type="button" className="anchor-button hovertime">CHECKOUT</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <About></About>
    </>
  );
}