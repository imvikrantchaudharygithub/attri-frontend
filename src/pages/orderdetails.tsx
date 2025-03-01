import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import "@/styles/orderdetails.css";
import OrderFilter from "@/Components/OrderFilter";
import OrderCard from "@/Components/OrderCard";
export default function OrderDetails() {
  return (
    <section className="orderdetails padding-tb">
        <div className="container d-flex">
            <div className="orderdetails-left">
                <OrderFilter></OrderFilter>
            </div>
            <div className="orderdetails-right">
                <div className="order-search">
                    <form>
                        <div className="form-group relative">
                            <input className="form-control" placeholder="Search Products" type="text"/>
                            <div className="search-icon">
                                <Image width={32} height={32} className="w-full" src={'/assets/images/icon/search-icon.svg'} alt=""></Image>
                            </div>
                        </div>
                    </form>
                </div>
                <OrderCard></OrderCard>
                <OrderCard></OrderCard>
            </div>
        </div>
    </section>
  );
}