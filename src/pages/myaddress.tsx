import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState,useEffect } from "react";
// import "@/styles/account.css";
import NewAddressPopUp from "@/Components/newaddresspopup";
import EditAddressPopUp from "@/Components/editaddresspopup";
import AccountSideBar from "@/Components/accountsidebar";
import SaveAddress from "@/Components/saveaddress";
import { useRouter } from "next/router";
import { getData, postData } from "@/services/apiServices";
import { useAppSelector } from "@/hooks/hooks";
export default function MyAddress() {
    const router = useRouter();
    const [showAddAddressPopup,setShowAddAddressPopup] = useState(false);
    const [addressData,setAddressData] = useState([]);
    const user = useAppSelector((state: any) => state.user);
    useEffect(()=>{
        getaddressData();
    },[showAddAddressPopup]);
const getaddressData = async () => {
    await getData(`users/${user?.id}/addresses`).then((res:any)=>{
        setAddressData(res?.data?.addresses);
        console.log(res.data);
    }).catch((err:any)=>{
        console.log(err);
    })
}

const makeDefaultAddress = async (addressId: string) => {
    const data = {
        userId: user?.id
    }
  
    await postData(`addresses/${addressId}/default`, data).then((res:any)=>{
        console.log(res);
        getaddressData();
    }).catch((err:any)=>{
        console.log(err);
    })
  
};

   
  return (
    <>
        <section className="account-box">
            <div className="container">
                <h1 className="attriheading">My Address</h1>
                <div className="account-main d-flex padding-tb">
                    <div className="account-left">
                        <AccountSideBar/>
                    </div>
                    <div className="account-right">
                        <div className="address-top d-flex">
                            <h2 className="attrixsheading">Saved Address</h2>
                            <button type="button" className="address-btn align d-flex" onClick={()=>setShowAddAddressPopup(true)}>
                                <svg className="plus-icon" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 1.5V15.5M1 8.5H15" stroke="#D03438" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>	
                                ADD NEW ADDRESS							
                            </button>
                        </div>
                        {addressData?.map((item:any)=>(
                            <SaveAddress key={item?.id} address={item} defaultAddress={makeDefaultAddress}/>
                        ))}
                     
				    </div>
                </div>
            </div>
	    </section>
      {showAddAddressPopup && <NewAddressPopUp closePopup={()=>setShowAddAddressPopup(false)}/>}
        <EditAddressPopUp/>
    </>
  );
}