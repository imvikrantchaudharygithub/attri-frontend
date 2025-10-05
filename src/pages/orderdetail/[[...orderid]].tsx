import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
// import "@/styles/orderdetails.css";
import OrderFilter from "@/Components/OrderFilter";
import OrderCard from "@/Components/OrderCard";
import { useRouter } from "next/router";
import { getData,postData } from "@/services/apiServices";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function OrderDetails() {
    const router = useRouter();
    const { orderid } = router.query;
    console.log("orderId",orderid)
    const [orderData,setOrderData] = useState<any>(null)
    const [trackingData,setTrackingData] = useState<any>(null)
    const [trackingLoading,setTrackingLoading] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true);
    // const token = useSelector((state:any)=>state.auth.token)

    // useEffect(()=>{
    //     if(!token){
    //         router.push("/")
    //     }
    // },[token])
    const getOrder = async () => {
        await getData(`/get-order/${orderid? orderid[0] : ""}`).then((response)=>{
            // console.log("orderResponse",response)
            setOrderData(response?.data)
           
        }).catch((error)=>{
            console.log("error",error)
        })
    }
    const getTracking = async () => {
        setTrackingLoading(true)
        const payload = {
            orderId: orderid? orderid[0] : "",
            channelId: ""
        }
        await postData(`/track-order-by-order-id`,payload).then((response)=>{
            console.log("trackingResponse",response)
            setTrackingData(response?.data?.data[0]?.tracking_data)
        }).catch((error)=>{
            console.log("error",error)
        }).finally(()=>{
            setTrackingLoading(false)
        })
    }
 
    const handleCopyTrackingId = async (trackingId: string) => {
        try {
            await navigator.clipboard.writeText(trackingId);
            console.log('Tracking ID copied to clipboard');
            toast.success('Tracking ID copied to clipboard');
            // Optional: Add toast notification here
        } catch (err) {
            console.error('Failed to copy tracking ID:', err);
            // Optional: Add error toast here
        }
    };

    useEffect(()=>{
        if(orderid){
            console.log("orderid",orderid)
            getOrder()
            getTracking()
        }
    },[orderid])
  return (
    <section className="orderdetails padding-tb">
        <div className="container">
            <h1 className="attriheading">Order Detail</h1>
            <div className="order-main">
            <div className="order-top d-flex align">
                            <div className="order-top-left">
                                <p>Order ID</p>
                                <div className="attrixsheading">#{orderid}</div>
                            </div>
                            <div className="refresh-button ml-auto">
                                <button 
                                    onClick={() => { getOrder(); getTracking(); }}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                    aria-label="Refresh data"
                                    disabled={trackingLoading}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                                        strokeLinejoin="round" className="w-5 h-5 text-gray-700">
                                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                                        <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                                        <path d="M21 19v-5h-5"/>
                                    </svg>
                                </button>
                            </div>
                            {/* <div className="order-tag">
                                {orderData?.status}
                            </div> */}
                        </div>
                {trackingLoading ? (
                    <div className="animate-pulse space-y-8">
                     
                        {/* Delivery Progress Skeleton */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                <div className="flex-1">
                                    <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-200 rounded-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>

                        {/* Shipment Progress & Status Overview Skeleton */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Timeline Skeleton */}
                                <div className="flex-1 space-y-8">
                                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="relative pl-10">
                                            <div className="absolute left-0 w-9 h-9">
                                                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Status Overview Skeleton */}
                                <div className="md:w-80 space-y-6">
                                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                    <div className="space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                                    <div className="flex-1">
                                                        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Skeleton */}
                        <div className="order-items">
                            <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="order-list d-grid">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="item">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary Skeleton */}
                        <div className="order-summarys mb-4">
                            <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i}>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
                                        <div className="h-px bg-gray-200 my-4"></div>
                                    </div>
                                ))}
                                <div className="h-5 bg-gray-200 rounded w-1/4 mt-4"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // <div className="order-main">
                    <>
                     
                        <div className="order-deliver d-flex">
                            <div className="item w50">
                                <div className="order-deliver-card bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-3 bg-blue-600 rounded-lg text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                                className="lucide lucide-truck">
                                                <path d="M14 18V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
                                                <path d="M15 18H9"/>
                                                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
                                                <circle cx="17" cy="18" r="2"/>
                                                <circle cx="7" cy="18" r="2"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Delivery Progress</h3>
                                            <p className="text-sm text-blue-600">
                                                {trackingData?.shipment_track[0]?.current_status === 'Delivered' 
                                                    ? "Delivered successfully!" 
                                                    : "Package is on the way!"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 text-sm font-medium text-gray-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
                                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                                                        strokeLinejoin="round" className="lucide lucide-map-pin text-green-600">
                                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                                        <circle cx="12" cy="10" r="3"/>
                                                    </svg>
                                                    {trackingData?.shipment_track[0]?.origin || "Loading origin..."}
                                                    <span className="text-gray-400 mx-2">|</span>
                                                    <span className="text-xs text-gray-500">Pickup Location</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative pt-4">
                                            <div className="absolute left-4 top-6 h-0.5 w-[calc(100%-2rem)] bg-gray-200">
                                                <div className="h-full bg-blue-600 transition-all duration-500" 
                                                    style={{ width: `${(() => {
                                                        const orderDate = new Date(orderData?.createdAt);
                                                        const deliveryDate = new Date(trackingData?.etd);
                                                        const currentDate = new Date();
                                                        
                                                        if (!orderDate || !deliveryDate) return 30;
                                                        
                                                        const totalDuration = deliveryDate.getTime() - orderDate.getTime();
                                                        const elapsed = currentDate.getTime() - orderDate.getTime();
                                                        
                                                        if (totalDuration <= 0) return 100; // If ETD has passed
                                                        
                                                        const progress = Math.min(100, (elapsed / totalDuration) * 100);
                                                        return progress || 0;
                                                    })()}%` }}></div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="h-4 w-4 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                                                <div className={`h-4 w-4 rounded-full ${trackingData?.shipment_track[0]?.current_status === 'Delivered' ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-blue-100 ring-4 ring-blue-50'}`}></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 text-sm font-medium text-gray-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
                                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                                                        strokeLinejoin="round" className="lucide lucide-package-check text-blue-600">
                                                        <path d="M16 16h6m-6 0 2 2c.6-.6 1.2-1.8 1.7-2.8.2-.4.3-.8.3-1.2"/>
                                                        <path d="M12 21V3"/>
                                                        <path d="m3 7 3 3 3-3"/>
                                                        <path d="M6 10V3"/>
                                                        <path d="m18 7-3 3-3-3"/>
                                                        <path d="M21 10h-6"/>
                                                        <path d="M14 14l-2 2 2 2"/>
                                                    </svg>
                                                    {trackingData?.shipment_track[0]?.destination || "Loading destination..."}
                                                    <span className="text-gray-400 mx-2">|</span>
                                                    <span className="text-xs text-gray-500">Delivery Location</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                                            strokeLinejoin="round" className="lucide lucide-clock">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12 6 12 12 16 14"/>
                                        </svg>
                                        Estimated arrival: {new Date(trackingData?.etd).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="item">
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
                                        <div className="attrixsheading">  {new Date(trackingData?.etd).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                             
                                             <p className="text-sm text-gray-500">
                                            {new Date(trackingData?.etd).toLocaleTimeString([], { 
                                                hour: '2-digit', 
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                          
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mt-2">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1 md:border-r md:pr-8 space-y-8">
                                    <h2 className="text-xl font-semibold mb-6">Shipment Progress</h2>
                                    <ul className="space-y-8 relative before:absolute before:left-[18px] before:h-full before:w-0.5 before:bg-gray-200">
                                        {trackingData?.shipment_track_activities
                                            ?.slice()
                                            .reverse()
                                            .map((activity: any, index: number) => (
                                            <li key={index} className="relative pl-10 group hover:bg-gray-50 rounded-lg p-4 transition-colors">
                                                {/* Timeline dot */}
                                                <div className="absolute left-0 w-9 h-9 flex items-center justify-center">
                                                    <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-50 group-hover:ring-blue-100 transition-colors"></div>
                                                </div>
                                                
                                                {/* Content */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {new Date(activity.date).toLocaleDateString('en-GB', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                        <span className="text-gray-500 text-sm">
                                                            {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:true})}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-medium text-gray-900">{activity.activity}</h3>
                                                    <p className="text-sm text-gray-500">{activity.location}</p>
                                                    <div className="mt-2">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                                            ${activity['sr-status-label'] === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                                activity['sr-status-label'] === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                                'bg-gray-100 text-gray-800'}`}>
                                                            {activity['sr-status-label']}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Status Overview */}
                                <div className="md:w-80 space-y-6">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                        </svg>
                                        Status Overview
                                    </h2>
                                    
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 space-y-4 shadow-sm border border-blue-100">
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Current Status */}
                                            <div className="col-span-2 p-4 rounded-lg bg-white shadow-xs">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${
                                                        trackingData?.shipment_track[0]?.current_status === 'DELIVERED' ? 'bg-green-100 text-green-600' :
                                                        trackingData?.shipment_track[0]?.current_status === 'SHIPPED' ? 'bg-blue-100 text-blue-600' :
                                                        'bg-gray-100 text-gray-600'
                                                    }`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                                            {trackingData?.shipment_track[0]?.current_status === 'DELIVERED' ? (
                                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                            ) : (
                                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                            )}
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 mb-1">Current Status</p>
                                                        <p className="font-semibold text-gray-900">
                                                            {trackingData?.shipment_track[0]?.current_status}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Last Update */}
                                            <div className="col-span-2 p-4 rounded-lg bg-white shadow-xs">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 mb-1">Last Update</p>
                                                        <p className="font-medium text-gray-900">
                                                            {new Date(trackingData?.shipment_track_activities?.[0]?.date).toLocaleDateString('en-GB', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(trackingData?.shipment_track_activities?.[0]?.date).toLocaleTimeString([], { 
                                                                hour: '2-digit', 
                                                                minute: '2-digit',
                                                                hour12: true
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Number */}
                                <div className="p-4 rounded-lg bg-white shadow-xs">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                                                    <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v3.75a.75.75 0 001.5 0V7.5a.75.75 0 00-.75-.75z" />
                                                    <path fillRule="evenodd" d="M19.5 6.75a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0zM18 6.75a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                                                <p className="font-mono font-semibold text-gray-900">
                                                    {trackingData?.shipment_track[0]?.awb_code}
                                                </p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleCopyTrackingId(trackingData?.shipment_track[0]?.awb_code)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                    </>
                )}
            </div>

            <div className="order-items">
                <div className="attrixxsheading">Items <span>{orderData?.products?.length}</span></div>
                <div className="order-list d-grid">
                    {orderData?.products?.map((item:any,index:number)=>(
                    <div className="item" key={index}>
                        <OrderCard product={item?.product} quantity={item?.quantity} />
                    </div>
                    ))}
                </div>
            </div>
            <div className="order-summarys mb-4">
                <div className="order-summary-top d-flex">
                    <div className="order-summary-left">
                        <div className="attrixsheading">Order Summary</div>
                        {/* <p>Here yours summary for the stuff you bought.</p> */}
                    </div>
                    {/* <div className="order-tag">Payment Success</div> */}
                </div>
                <div className="order-summary-text mb-4">
                    {orderData?.products?.map((item:any,index:number)=>(
                        <div className="order-summary-text-item" key={index}>
                            <p>{item?.product?.name} <span>₹{item?.priceAtPurchase?.toFixed(2) *item?.quantity}</span></p>
                            <p>Quantity: {item?.quantity}</p>
                            <hr className="my-4"/>
                        </div>
                    ))}

                    <div>
                    {orderData?.coupon?.code && (
                      <div className="flex justify-between items-center py-2 bg-green-50 rounded-lg px-4">
                        <div className="flex items-center">
                          <span className="text-green-600 font-medium">🎟️ Coupon Applied</span>
                          <span className="ml-2 text-sm text-gray-600">({orderData?.coupon?.code})</span>
                        </div>
                        <span className="text-green-600 font-bold">
                          -₹{orderData?.coupon?.discountAmount?.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Cashback */}
                    {orderData?.cashback > 0 && (
                      <div className="flex justify-between items-center py-2 bg-blue-50 rounded-lg px-4">
                        <div className="flex items-center">
                          <span className="text-blue-600 font-medium">💰 Cashback Applied</span>
                        </div>
                        <span className="text-blue-600 font-bold">
                          -₹{orderData?.cashback?.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Shipping */}
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                      {/* orderData?.totalAmount > 699 ? 0 : 55; */}
                        {orderData?.totalAmount > 699 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹ 55`
                        )}
                      </span>
                    </div>
                    </div>
                    <p className="total-price font-semibold text-lg mt-4 mb-3">
                        Total <span className="ml-2 text-xl text-gray-900">
                            ₹{(orderData?.totalAmount + (orderData?.totalAmount > 699 ? 0 : 55)).toFixed(2)}
                        </span>
                    </p>
                </div>
                {/* <div className="order-summarys-bottom d-flex align">
                    <div className="attrixxsheading">{orderData?.products?.reduce((acc: number, item: any) => acc + (+item.priceAtPurchase), 0)?.toFixed(2)}</div>
                    <div className="order-summarys-btn d-flex">
                        <button className="anchor-button hovertime">Contact Seller</button>
                        <button className="anchor-button hovertime">Invoice</button>
                    </div>
                </div> */}
            </div>
     



{/* use skeleton loader */}
</div>

</section>
  );
}