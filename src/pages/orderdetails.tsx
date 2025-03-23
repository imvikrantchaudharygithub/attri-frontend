import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
// import "@/styles/orderdetails.css";
import OrderFilter from "@/Components/OrderFilter";
import OrderCard from "@/Components/OrderCard";
export default function OrderDetails() {
  return (
    <section className="orderdetails padding-tb">
        <div className="container">
            <h1 className="attriheading">Order Detail</h1>
            <div className="order-main">
                <div className="order-top d-flex align">
                    <div className="order-top-left">
                        <p>Order ID</p>
                        <div className="attrixsheading">#8981786</div>
                    </div>
                    <div className="order-tag">
                        On Deliver
                    </div>
                </div>
                <div className="order-deliver d-flex">
                    <div className="item w50">
                        <div className="order-deliver-card">
                            <div className="deliver-icon">
                                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                                    width="800px" height="800px" viewBox="0 0 612 612">
                                    <g>
                                        <g>
                                            <path d="M226.764,375.35c-28.249,0-51.078,22.91-51.078,51.16c0,28.166,22.829,51.078,51.078,51.078s51.078-22.912,51.078-51.078
                                                C277.841,398.26,255.013,375.35,226.764,375.35z M226.764,452.049c-14.125,0-25.54-11.498-25.54-25.541
                                                c0-14.123,11.415-25.539,25.54-25.539c14.124,0,25.539,11.416,25.539,25.539C252.302,440.551,240.888,452.049,226.764,452.049z
                                                M612,337.561v54.541c0,13.605-11.029,24.635-24.636,24.635h-26.36c-4.763-32.684-32.929-57.812-66.927-57.812
                                                c-33.914,0-62.082,25.129-66.845,57.812H293.625c-4.763-32.684-32.93-57.812-66.845-57.812c-33.915,0-62.082,25.129-66.844,57.812
                                                h-33.012c-13.606,0-24.635-11.029-24.635-24.635v-54.541H612L612,337.561z M494.143,375.35c-28.249,0-51.16,22.91-51.16,51.16
                                                c0,28.166,22.912,51.078,51.16,51.078c28.166,0,51.077-22.912,51.077-51.078C545.22,398.26,522.309,375.35,494.143,375.35z
                                                M494.143,452.049c-14.125,0-25.539-11.498-25.539-25.541c0-14.123,11.414-25.539,25.539-25.539
                                                c14.042,0,25.539,11.416,25.539,25.539C519.682,440.551,508.185,452.049,494.143,452.049z M602.293,282.637l-96.817-95.751
                                                c-6.159-6.077-14.453-9.526-23.076-9.526h-48.86v-18.313c0-13.631-11.004-24.635-24.635-24.635H126.907
                                                c-13.55,0-24.635,11.005-24.635,24.635v3.86L2.3,174.429l177.146,23.068L0,215.323l178.814,25.423L0,256.25l102.278,19.29
                                                l-0.007,48.403h509.712v-17.985C611.983,297.171,608.452,288.796,602.293,282.637z M560.084,285.839h-93.697
                                                c-2.135,0-3.86-1.724-3.86-3.859v-72.347c0-2.135,1.725-3.86,3.86-3.86h17.82c0.985,0,1.971,0.411,2.71,1.068l75.796,72.347
                                                C565.257,281.569,563.532,285.839,560.084,285.839z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="attrixsheading">Be patient, package on deliver!</div>
                            <div className="progress">
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="order-deliver-card">
                            <div className="deliver-icon">
                                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                                    width="800px" height="800px" viewBox="0 0 612 612">
                                    <g>
                                        <g>
                                            <path d="M226.764,375.35c-28.249,0-51.078,22.91-51.078,51.16c0,28.166,22.829,51.078,51.078,51.078s51.078-22.912,51.078-51.078
                                                C277.841,398.26,255.013,375.35,226.764,375.35z M226.764,452.049c-14.125,0-25.54-11.498-25.54-25.541
                                                c0-14.123,11.415-25.539,25.54-25.539c14.124,0,25.539,11.416,25.539,25.539C252.302,440.551,240.888,452.049,226.764,452.049z
                                                M612,337.561v54.541c0,13.605-11.029,24.635-24.636,24.635h-26.36c-4.763-32.684-32.929-57.812-66.927-57.812
                                                c-33.914,0-62.082,25.129-66.845,57.812H293.625c-4.763-32.684-32.93-57.812-66.845-57.812c-33.915,0-62.082,25.129-66.844,57.812
                                                h-33.012c-13.606,0-24.635-11.029-24.635-24.635v-54.541H612L612,337.561z M494.143,375.35c-28.249,0-51.16,22.91-51.16,51.16
                                                c0,28.166,22.912,51.078,51.16,51.078c28.166,0,51.077-22.912,51.077-51.078C545.22,398.26,522.309,375.35,494.143,375.35z
                                                M494.143,452.049c-14.125,0-25.539-11.498-25.539-25.541c0-14.123,11.414-25.539,25.539-25.539
                                                c14.042,0,25.539,11.416,25.539,25.539C519.682,440.551,508.185,452.049,494.143,452.049z M602.293,282.637l-96.817-95.751
                                                c-6.159-6.077-14.453-9.526-23.076-9.526h-48.86v-18.313c0-13.631-11.004-24.635-24.635-24.635H126.907
                                                c-13.55,0-24.635,11.005-24.635,24.635v3.86L2.3,174.429l177.146,23.068L0,215.323l178.814,25.423L0,256.25l102.278,19.29
                                                l-0.007,48.403h509.712v-17.985C611.983,297.171,608.452,288.796,602.293,282.637z M560.084,285.839h-93.697
                                                c-2.135,0-3.86-1.724-3.86-3.859v-72.347c0-2.135,1.725-3.86,3.86-3.86h17.82c0.985,0,1.971,0.411,2.71,1.068l75.796,72.347
                                                C565.257,281.569,563.532,285.839,560.084,285.839z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="deliver-content">
                                <p>Estimated Arrival</p>
                                <div className="attrixsheading">9 July 2024</div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="order-deliver-card">
                            <div className="deliver-icon">
                                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                                    width="800px" height="800px" viewBox="0 0 612 612">
                                    <g>
                                        <g>
                                            <path d="M226.764,375.35c-28.249,0-51.078,22.91-51.078,51.16c0,28.166,22.829,51.078,51.078,51.078s51.078-22.912,51.078-51.078
                                                C277.841,398.26,255.013,375.35,226.764,375.35z M226.764,452.049c-14.125,0-25.54-11.498-25.54-25.541
                                                c0-14.123,11.415-25.539,25.54-25.539c14.124,0,25.539,11.416,25.539,25.539C252.302,440.551,240.888,452.049,226.764,452.049z
                                                M612,337.561v54.541c0,13.605-11.029,24.635-24.636,24.635h-26.36c-4.763-32.684-32.929-57.812-66.927-57.812
                                                c-33.914,0-62.082,25.129-66.845,57.812H293.625c-4.763-32.684-32.93-57.812-66.845-57.812c-33.915,0-62.082,25.129-66.844,57.812
                                                h-33.012c-13.606,0-24.635-11.029-24.635-24.635v-54.541H612L612,337.561z M494.143,375.35c-28.249,0-51.16,22.91-51.16,51.16
                                                c0,28.166,22.912,51.078,51.16,51.078c28.166,0,51.077-22.912,51.077-51.078C545.22,398.26,522.309,375.35,494.143,375.35z
                                                M494.143,452.049c-14.125,0-25.539-11.498-25.539-25.541c0-14.123,11.414-25.539,25.539-25.539
                                                c14.042,0,25.539,11.416,25.539,25.539C519.682,440.551,508.185,452.049,494.143,452.049z M602.293,282.637l-96.817-95.751
                                                c-6.159-6.077-14.453-9.526-23.076-9.526h-48.86v-18.313c0-13.631-11.004-24.635-24.635-24.635H126.907
                                                c-13.55,0-24.635,11.005-24.635,24.635v3.86L2.3,174.429l177.146,23.068L0,215.323l178.814,25.423L0,256.25l102.278,19.29
                                                l-0.007,48.403h509.712v-17.985C611.983,297.171,608.452,288.796,602.293,282.637z M560.084,285.839h-93.697
                                                c-2.135,0-3.86-1.724-3.86-3.859v-72.347c0-2.135,1.725-3.86,3.86-3.86h17.82c0.985,0,1.971,0.411,2.71,1.068l75.796,72.347
                                                C565.257,281.569,563.532,285.839,560.084,285.839z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="deliver-content">
                                <p>Delivered in</p>
                                <div className="attrixsheading">5 Days</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-timeline d-flex">
                    <div className="item">
                        <div className="timeline-card">
                            <p>Timeline</p>
                            <div className="timeline-details d-flex">
                                <div className="timeline-left">4 Jul (Now) 06:00</div>
                                <div className="attrixxsheading">
                                    Your package is packed by the courier
                                    <span>Malang, East Java, Indonesia</span>
                                </div>
                            </div>
                            <div className="timeline-details d-flex">
                                <div className="timeline-left">2 Jul 06:00</div>
                                <div className="attrixxsheading">
                                    Shipment has been created
                                    <span>Malang, Indonesia</span>
                                </div>
                            </div>
                            <div className="timeline-details d-flex">
                                <div className="timeline-left">1 Jul 06:00</div>
                                <div className="attrixxsheading">
                                    Order placed
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="item">
                        <div className="timeline-card">
                            <p>Shipment</p>
                            <div className="shipment-top d-flex justify-content">
                                <div className="shipment-left-icon">

                                </div>
                                <div className="shipment-right-text">
                                    <div className="attrixxsheading">Doordash Indonesia</div>
                                    <p>Surabaya, Lorkidul, East Java, Indonesia</p>
                                </div>
                            </div>
                            <div className="shipment-mid d-flex">
                                <div className="shipment-emir">
                                    <p>Recipient</p>
                                    <div className="attrixxsheading">Emir</div>
                                </div>
                                <div className="shipment-emir">
                                    <p>Delivery address</p>
                                    <div className="attrixxsheading">Malang, East Java, Indonesia</div>
                                </div>
                            </div>
                            <div className="trackingno">
                                <p>Tracking NO.</p>
                                <div className="tracking-btn">
                                    871291892812
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="copy"><path fill="#212121" d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-items">
                    <div className="attrixxsheading">Items <span>4</span></div>
                    <div className="order-list d-grid">
                        <div className="item">
                            <OrderCard></OrderCard>
                        </div>
                        <div className="item">
                            <OrderCard></OrderCard>
                        </div>
                    </div>
                </div>
                <div className="order-summarys">
                    <div className="order-summary-top d-flex">
                        <div className="order-summary-left">
                            <div className="attrixsheading">Order Summary</div>
                            <p>Here yours summary for the stuff you bought.</p>
                        </div>
                        <div className="order-tag">Payment Success</div>
                    </div>
                    <div className="order-summary-text">
                        <p>Nike Air Max SYSTM <span>1,459,000</span></p>
                        <p>Nike Air Max SYSTM <span>1,459,000</span></p>
                        <p className="total-price">Total <span>1,459,000</span></p>
                    </div>
                    <div className="order-summarys-bottom d-flex align">
                        <div className="attrixxsheading">1,459,000</div>
                        <div className="order-summarys-btn d-flex">
                            <button className="anchor-button hovertime">Contact Seller</button>
                            <button className="anchor-button hovertime">Invoice</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="orderdetails-left">
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
            </div> */}
        </div>
    </section>
  );
}