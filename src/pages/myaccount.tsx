import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import "@/styles/account.css";
import AccountSideBar from "@/Components/accountsidebar";
export default function MyAccount() {
  return (
    <section className="account-box">
		<div className="container">
			<h1 className="attriheading">My Account</h1>
			<div className="account-main d-flex padding-tb">
				<div className="account-left">
					<AccountSideBar/>
				</div>
				<div className="account-right">
					{/* <div className="account-form">
						<form>
							<div className="form-row d-flex">
								<div className="form-group">
									<label className="form-label">Name</label>
									<input type="text" className="form-control" placeholder="Name"/>
								</div>
								<div className="form-group">
									<label className="form-label">Last Name</label>
									<input type="text" className="form-control" placeholder="Last Name"/>
								</div>
								<div className="form-group">
									<label className="form-label">Mobile Number</label>
									<input type="number" className="form-control" placeholder="Mobile Number"/>
								</div>
								<div className="form-group">
									<label className="form-label">Email</label>
									<input type="email" className="form-control" placeholder="Email"/>
								</div>
							</div>
						</form>
					</div> */}
					<div className="account-form text-center">
						<div className="user-profile-icon relative">
							<Image width={150} height={150} className="w-full" src={'/assets/images/product.jpg'} alt=""></Image>
							<div className="profile-edit-icon">
								<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
									<path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
								</svg>
							</div>
						</div>
						<div className="attrixsheading">Himanshu Ghosh</div>
						<p>9999999999</p>
						<div className="user-wallet d-flex">
							<div className="wallet-card">
								<div className="wallet-left">
									<div className="attrixsheading">Rs.7,490</div>
									<p>Total Balance</p>
								</div>
								<div className="wallet-icon">
									<svg xmlns="http://www.w3.org/2000/svg" id="wallet" x="0" y="0" version="1.1" viewBox="0 0 20 20">
										<path d="M16 6H3.5v-.5l11-.88v.88H16V4c0-1.1-.891-1.872-1.979-1.717L3.98 3.717C2.891 3.873 2 4.9 2 6v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1.5 7.006a1.5 1.5 0 1 1 .001-3.001 1.5 1.5 0 0 1-.001 3.001z"></path>
									</svg>
								</div>
							</div>
							<div className="wallet-card">
								<div className="wallet-left">
									<div className="attrixsheading">Rs.7,490</div>
									<p>Total Balance</p>
								</div>
								<div className="wallet-icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="money">
										<path d="M16 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"></path>
										<path d="M16.4 13.2h-.8a2.613 2.613 0 0 1-2.493-1.864 1 1 0 1 1 1.918-.565c.075.253.312.43.575.43h.8a.6.6 0 0 0 0-1.201h-.8C14.166 10 13 8.833 13 7.4s1.166-2.6 2.6-2.6h.8c1.121 0 2.111.714 2.466 1.778a1 1 0 1 1-1.897.633.598.598 0 0 0-.569-.411h-.8a.6.6 0 0 0 0 1.2h.8c1.434 0 2.6 1.167 2.6 2.6s-1.166 2.6-2.6 2.6z"></path>
										<path d="M16 6c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18C15.01 5.13 15 5.07 15 5c0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm0 8c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18c-.009-.07-.019-.13-.019-.2 0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm2 17H2a1 1 0 0 1-1-1v-9c0-.265.105-.52.293-.707C1.527 20.058 3.653 18 6 18c1.944 0 4.452 1.469 5.295 2H16a3.004 3.004 0 0 1 2.955 3.519l7.891-3.288a2.995 2.995 0 0 1 2.818.273A2.993 2.993 0 0 1 31 23a1 1 0 0 1-.496.864l-12 7A1.003 1.003 0 0 1 18 31zM3 29h14.729l11.14-6.498a1.01 1.01 0 0 0-.314-.334.984.984 0 0 0-.939-.091l-9.23 3.846A1.007 1.007 0 0 1 18 26h-8a1 1 0 1 1 0-2h6a1.001 1.001 0 0 0 0-2h-5c-.197 0-.391-.059-.555-.167C9.68 21.323 7.387 20 6 20c-1.09 0-2.347.88-3 1.439V29z"></path>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
  );
}