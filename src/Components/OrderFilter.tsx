import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
// import "@/styles/orderdetails.css";
export default function OrderFilter() {
  return (
    <div className="orderfilter">
        <div className="filter-top d-flex align">
            <div className="attrixxsheading">Filter</div>
            <button className="anchor-button-line hovertime">Clear all</button>
        </div>
        <div className="filter-list d-flex">
            <button className="filter-btn">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg>
                Delivered
            </button>
            <button className="filter-btn">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg>
                Cancelled
            </button>
        </div>
        <div className="order-status">
            <div className="attrixxsheading">Order Status</div>
            <div className="filter-check">
                <input type="checkbox" className="check" id="onway" name="onway" value="onway"/>
                <label htmlFor="onway">On the way</label>
            </div>
            <div className="filter-check">
                <input type="checkbox" className="check" id="delivered" name="delivered" value="delivered"/>
                <label htmlFor="delivered">Delivered</label>
            </div>
        </div>
    </div>
  );
}