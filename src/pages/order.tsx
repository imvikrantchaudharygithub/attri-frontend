import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
// import "@/styles/account.css";
import AccountSideBar from "@/Components/accountsidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/rootReduces";
import { getData } from "@/services/apiServices";

export default function Order() {
	const user = useSelector((state: RootState) => state.user);
	const token = useSelector((state: RootState) => state.token.token);
	const [orderData,setOrderData] = useState<any>(null)
	const getOrder = async () => {
		await getData(`/get-user-orders/${user?.id}`).then((response)=>{
			setOrderData(response?.data)
			console.log("orderData",response)
		}).catch((error)=>{
			console.log("error",error)
		})
	}
	useEffect(()=>{
		getOrder()
	},[])
	
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
					{orderData?.map((item:any)=>(
					<div className="cart-order-item d-flex">
						<div className="shipped-order-top d-flex align">
							<div className="shipped-tag">Order ID : <span>#HW374915036</span></div>
							<div className="shipped-tag">Order ID : <span>#HW374915036</span></div>
							<div className="shipped-tag">Order ID : <span>#HW374915036</span></div>
						</div>
					{item?.products?.map((prodetail:any)=>(
							<div className="shipped-left d-flex align relative">
							<div className="cart-order-left relative">
								<Image width={600} height={600} className="w-full hovertime" src={prodetail?.product?.images[0]} alt=""></Image>
							</div>
							<div className="cart-order-right">
								<div className="attrixxsheading">Air Cooler</div>
								<h3 className="attrixsheading">{prodetail?.product?.name}</h3>
								<div className="product-price d-flex align">
									<div className="product-bottom-left attrixxsheading">
										₹{prodetail?.product?.price} <span>₹{prodetail?.product?.mrp}</span>
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
							<div className="shipped-price-right">₹{item?.totalAmount}</div>
						</div>
						<div className="cart-order-btn cart-order-mobile d-flex">
                            <Link href='/' className="anchor-button anchor-button-line hovertime">View Details</Link>
                            <Link href='/' className="anchor-button hovertime">TRACK ORDER</Link>
						</div>
						
					</div>
					))}
				</div>
			</div>
		</div>
	</section>
    </>
  );
}