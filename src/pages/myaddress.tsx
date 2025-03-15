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
    const [isLoading,setIsLoading] = useState(false);
    const user = useAppSelector((state: any) => state.user);
    useEffect(()=>{
        getaddressData();
    },[showAddAddressPopup]);
const getaddressData = async () => {
    setIsLoading(true);
    await getData(`users/${user?.id}/addresses`).then((res:any)=>{
        setAddressData(res?.data?.addresses);
        console.log(res.data);
    }).catch((err:any)=>{
        console.log(err);
    }).finally(()=>{
        setIsLoading(false);
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

if(isLoading){
    return <div className="flex justify-center items-center h-screen">
          <div className="line-loader">
          <span className="line-loader-text">loading</span>
          <span className="line-load"></span>
        </div>
      </div>
}
   
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
                        { addressData?.length > 0 && addressData?.map((item:any)=>(
                            <SaveAddress key={item?.id} address={item} defaultAddress={makeDefaultAddress}/>
                        ))}
                        { addressData?.length === 0 && (
                            <div className="flex flex-col items-center justify-center p-8 my-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">No Addresses Found</h2>
                                <p className="text-gray-500 text-center mb-4">You haven't added any delivery addresses yet.</p>
                                <button 
                                    onClick={() => setShowAddAddressPopup(true)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center"
                                >
                                    <span className="mr-2">+</span>
                                    Add Your First Address
                                </button>
                            </div>
                        )}
                     
				    </div>
                </div>
            </div>
	    </section>
      {showAddAddressPopup && <NewAddressPopUp closePopup={()=>setShowAddAddressPopup(false)}/>}
        <EditAddressPopUp/>
    </>
  );
}