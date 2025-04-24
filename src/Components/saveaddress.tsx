import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
export default function SaveAddress({address,defaultAddress,deleteAddress}:any){
    const [isLoading, setIsLoading] = useState(false);
    const deleteAddressHandler = async (addressId: string) => {
        
        try {
            setIsLoading(true);
            await deleteAddress(addressId);
        } catch (error) {
            console.error('Error deleting address:', error);
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <div className={`address-item ${address?.isDefault === true ? 'active' : ''} relative`}>
            <input className="radio-input" type="radio" id="html" name="fav_language" value="HTML" checked={address?.isDefault === true} onChange={()=>defaultAddress(address?._id)}></input>
            <label htmlFor="html">
            <div className="address-details">
                <div className="attrixxsheading">{address?.name}</div>
                <p>{address?.street}, {address?.city}, {address?.state} - {address?.pincode}</p>
                <div className="address-number">Mobile Number : <span>+91{address?.contact}</span></div>
            </div>
            <div className="address-tag">
                {address?.type === 'home' ? 'Home' : 'Office'}
            </div>
            <div className="address-bottom">
                {/* <button type="button" className="address-btn align d-flex">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.83398 4.33333H3.00065C2.55862 4.33333 2.1347 4.50893 1.82214 4.82149C1.50958 5.13405 1.33398 5.55797 1.33398 6V13.5C1.33398 13.942 1.50958 14.3659 1.82214 14.6785C2.1347 14.9911 2.55862 15.1667 3.00065 15.1667H10.5007C10.9427 15.1667 11.3666 14.9911 11.6792 14.6785C11.9917 14.3659 12.1673 13.942 12.1673 13.5V12.6667M11.334 2.66666L13.834 5.16666M14.9882 3.9875C15.3164 3.65929 15.5007 3.21415 15.5007 2.75C15.5007 2.28584 15.3164 1.8407 14.9882 1.5125C14.6599 1.18429 14.2148 0.999908 13.7507 0.999908C13.2865 0.999908 12.8414 1.18429 12.5132 1.5125L5.50065 8.5V11H8.00065L14.9882 3.9875Z" stroke="#D03438" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    EDIT
                </button> */}
                <button type="button" className="address-btn align d-flex" onClick={()=>deleteAddressHandler(address?._id)}>
                    {isLoading ? <><div className="w-4 h-4 animate-spin rounded-full border-t-2 border-b-2 border-red-500 mr-4" />  Removing... </> : 
                    <>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6667 2.66666C14.8877 2.66666 15.0996 2.75445 15.2559 2.91073C15.4122 3.06701 15.5 3.27898 15.5 3.49999C15.5 3.721 15.4122 3.93296 15.2559 4.08925C15.0996 4.24553 14.8877 4.33332 14.6667 4.33332H13.8333L13.8308 4.39249L13.0533 15.285C13.0234 15.7055 12.8352 16.099 12.5268 16.3863C12.2183 16.6736 11.8124 16.8333 11.3908 16.8333H4.60833C4.18678 16.8333 3.78089 16.6736 3.4724 16.3863C3.16392 16.099 2.97576 15.7055 2.94583 15.285L2.16833 4.39332C2.16707 4.37335 2.16651 4.35334 2.16667 4.33332H1.33333C1.11232 4.33332 0.900358 4.24553 0.744078 4.08925C0.587797 3.93296 0.5 3.721 0.5 3.49999C0.5 3.27898 0.587797 3.06701 0.744078 2.91073C0.900358 2.75445 1.11232 2.66666 1.33333 2.66666H14.6667ZM12.1642 4.33332H3.83583L4.60917 15.1667H11.3908L12.1642 4.33332ZM9.66667 0.166656C9.88768 0.166656 10.0996 0.254454 10.2559 0.410734C10.4122 0.567014 10.5 0.778976 10.5 0.99999C10.5 1.221 10.4122 1.43297 10.2559 1.58925C10.0996 1.74553 9.88768 1.83332 9.66667 1.83332H6.33333C6.11232 1.83332 5.90036 1.74553 5.74408 1.58925C5.5878 1.43297 5.5 1.221 5.5 0.99999C5.5 0.778976 5.5878 0.567014 5.74408 0.410734C5.90036 0.254454 6.11232 0.166656 6.33333 0.166656H9.66667Z" fill="#D03438" />
                    </svg>
                    REMOVE
                    </>}
              {/* {!isLoading ? <div className="w-4 h-4 animate-spin rounded-full border-t-2 border-b-2 border-red-500" /> : "REMOVE"} */}
                </button>
            </div>
            </label>
        </div>
    );
}