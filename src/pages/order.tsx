import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
// import "@/styles/account.css";
import AccountSideBar from "@/Components/accountsidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/rootReduces";
import { getData } from "@/services/apiServices";
import { useRouter } from "next/router";
export default function Order() {
	const user = useSelector((state: RootState) => state.user);
	const token = useSelector((state: RootState) => state.token.token);
	const [orderData,setOrderData] = useState<any>(null)
	const [isLoading,setIsLoading] = useState(false)
	const router = useRouter()
    useEffect(()=>{
        if(!token){
            router.push("/")
        }
    },[token])
	const getOrder = async () => {
		setIsLoading(true)
		await getData(`/get-user-orders/${user?.id}`)
			.then((response) => {
				const sortedData = response?.data?.sort((a: any, b: any) => 
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				setOrderData(sortedData);
				console.log("orderData", sortedData);
			})
			.catch((error) => {
				console.log("error", error);
			})
			.finally(() => {
				setIsLoading(false)
			})
	}
	useEffect(()=>{
		getOrder()
	},[])
	
	return (
    <>
        <section className="account-box">
		<div className="container">
            <h1 className="attriheading">My Orders</h1>
			<div className="account-main d-flex padding-tb">
                <div className="account-left">
					<AccountSideBar/>
				</div>
				<div className="account-right">
					{isLoading ? (
						<div className="space-y-6">
							{[1, 2, 3].map((i) => (
								<div key={i} className="cart-order-item d-flex animate-pulse">
									<div className="shipped-order-top d-flex align">
										<div className="shipped-tag w-32 h-4 bg-gray-200 rounded"></div>
										<div className="shipped-tag w-24 h-4 bg-gray-200 rounded"></div>
									</div>
									<div className="space-y-4">
										{[1, 2].map((j) => (
											<div key={j} className="shipped-left d-flex align relative">
												<div className="cart-order-left relative w-24 h-24 bg-gray-200"></div>
												<div className="cart-order-right space-y-2">
													<div className="h-4 bg-gray-200 w-3/4 rounded"></div>
													<div className="h-4 bg-gray-200 w-1/2 rounded"></div>
													<div className="product-price d-flex align gap-2">
														<div className="h-4 bg-gray-200 w-20 rounded"></div>
														<div className="h-4 bg-gray-200 w-16 rounded"></div>
													</div>
												</div>
											</div>
										))}
									</div>
									<div className="shipped-price d-flex align">
										<div className="shipped-price-left w-32 h-4 bg-gray-200 rounded"></div>
									</div>
								</div>
							))}
						</div>
					) : (
						orderData?.length > 0 ? (
						orderData?.map((item:any)=>(
							<div className="cart-order-item d-flex">
								<div className="shipped-order-top d-flex align">
									<div className="shipped-tag">Order ID : <span>#{item?._id}</span></div>
									<div className="shipped-tag">Status : <span className={`${item?.status === 'pending' ? 'text-yellow-500' :item?.status === 'confirmed' ? 'text-green-500'  : item?.status === 'delivered' ? 'text-green-500' : 'text-red-500'}`}>{item?.status.toUpperCase()}</span></div>
									{/* <div className="shipped-tag">Order ID : <span>#HW374915036</span></div> */}
								</div>
							{item?.products?.map((prodetail:any)=>(
									<div className="shipped-left d-flex align relative">
									<div className="cart-order-left relative">
										<Image width={600} height={600} className="w-full hovertime" src={prodetail?.product?.images[0]} alt=""></Image>
									</div>
									<div className="cart-order-right">
										{/* <div className="attrixxsheading">Air Cooler</div> */}
										<h3 className="attrixsheading">{prodetail?.product?.name}</h3>
										<div className="product-price d-flex align">
											<div className="product-bottom-left attrixxsheading">
												₹{prodetail?.product?.price?.toFixed(2)} <span>₹{prodetail?.product?.mrp?.toFixed(2)}</span>
											</div>
											<div className="product-bottom-right">
												({prodetail?.product?.discount}%off)
											</div>
										</div>
										<div className="cart-order-btn d-flex">
											<Link href='/' className="anchor-button anchor-button-line hovertime">View Details</Link>
											<Link href='/' className="anchor-button hovertime">TRACK ORDER</Link>
										</div>
									</div>
								</div>
								))}
								<div className="shipped-price d-flex align">
									<div className="shipped-price-left">Total Order Price</div>
									<div className="shipped-price-right">₹{item?.totalAmount?.toFixed(2)}</div>
								</div>
								<div className="cart-order-btn cart-order-mobile d-flex">
									<Link href={`/orderdetail/${item?._id}`} className="anchor-button anchor-button-line hovertime">View Details</Link>
									{/* <Link href='/' className="anchor-button hovertime">TRACK ORDER</Link> */}
								</div>
								
							</div>
							))
						) : (
							<div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-12">
								<div className="mb-8 relative">
									<div className="w-32 h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full flex items-center justify-center">
										<svg 
											className="w-16 h-16 text-green-600" 
											fill="none" 
											stroke="currentColor" 
											viewBox="0 0 24 24"
										>
											<path 
												strokeLinecap="round" 
												strokeLinejoin="round" 
												strokeWidth="1.5" 
												d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
											/>
										</svg>
									</div>
									<div className="absolute -inset-4 bg-blue-100/30 rounded-full blur-xl -z-10"></div>
								</div>
								
								<h3 className="text-2xl font-bold text-gray-900 mb-2">
									No Orders Found
								</h3>
								<p className="text-gray-500 mb-6 max-w-md mx-auto">
									It looks like you haven't placed any orders yet. Ready to find your next favorite product?
								</p>
								
								<Link 
									href="/"
									className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:shadow-lg transition-all"
								>
									<svg 
										className="w-5 h-5" 
										fill="none" 
										stroke="currentColor" 
										viewBox="0 0 24 24"
									>
										<path 
											strokeLinecap="round" 
											strokeLinejoin="round" 
											strokeWidth="2" 
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									Start Shopping
								</Link>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	</section>
    </>
  );
}