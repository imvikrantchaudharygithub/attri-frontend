import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import "@/styles/account.css";
import "@/styles/popup.css";
export default function NewAddressPopUp() {
  return (
    <div className="attri-popup newaddress-popup">
        <div className="attri-popup-overlay"></div>
        <div className="attri-popup-wrapper">
            <button className="attri-popup-close"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg></button>
            <div className="attri-popup-body d-flex align">
				<h1 className="attrimdheading">Add New Address</h1>
				<div className="attri-popup-form">
					<form>
						<div className="form-row d-flex">
							<div className="form-group">
								<label className="form-label">Name</label>
								<input type="text" className="form-control" placeholder="Name"></input>
							</div>
							
							<div className="form-group">
								<label className="form-label">Mobile Number</label>
								<input type="number" className="form-control" placeholder="Mobile Number"></input>
							</div>
							<div className="form-group">
								<label className="form-label">Pincode</label>
								<input type="number" className="form-control" placeholder="Enter your pincode"></input>
							</div>
							<div className="form-group">
								<label className="form-label">State</label>
								<select className="form-control">
									<option>Select</option>
								</select>
							</div>
							<div className="form-group">
								<label className="form-label">City</label>
								<input type="text" className="form-control" placeholder="Enter your city"></input>
							</div>
							<div className="form-group">
								<label className="form-label">Street Address</label>
								<input type="text" className="form-control" placeholder="Enter your address"></input>
							</div>
							<div className="form-group form-radio">
								<div className="radio-item">
									<input className="radio-input" type="radio" id="Home" name="selectaddress" value="Home"></input>
									<label htmlFor="Home">Home</label>
								</div>
								<div className="radio-item">
									<input className="radio-input" type="radio" id="Office" name="selectaddress" value="Office"></input>
									<label htmlFor="Office">Office</label>
								</div>
							</div>
							<div className="form-group">
								<button type="submit" className="w-full anchor-button hovertime">Save</button>
							</div>
						</div>
					</form>
				</div>
            </div>
        </div>
    </div>
  );
}