import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import "@/styles/account.css";
import "@/styles/popup.css";
export default function EditAddressPopUp() {
  return (
    <div className="attri-popup editaddress-popup">
        <div className="attri-popup-overlay"></div>
        <div className="attri-popup-wrapper">
            <button className="attri-popup-close"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg></button>
            <div className="attri-popup-body d-flex align">
				<h1 className="attrimdheading">Edit Address</h1>
				<div className="attri-popup-form">
                    <form>
						<div className="form-row d-flex">
							<div className="form-group">
								<label className="form-label">Name</label>
								<input type="text" className="form-control" placeholder="Name"></input>
							</div>
							<div className="form-group">
								<label className="form-label">Last Name</label>
								<input type="text" className="form-control" placeholder="Last Name"></input>
							</div>
							<div className="form-group">
								<label className="form-label">Mobile Number</label>
								<input type="number" className="form-control" placeholder="Mobile Number"></input>
							</div>
							<div className="form-group">
								<label className="form-label">Email</label>
								<input type="email" className="form-control" placeholder="Email"></input>
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