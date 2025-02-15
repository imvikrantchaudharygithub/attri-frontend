import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import "@/styles/account.css";
export default function MyAccount() {
  return (
    <section className="account-box">
		<div className="container">
			<h1 className="attriheading">My Account</h1>
			<div className="account-main d-flex padding-tb">
				<div className="account-left">
					<div className="account-left-top active hovertime">
						<span className="account-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M20.6682 21.5997V19.4664C20.6682 18.3348 20.2187 17.2495 19.4186 16.4494C18.6184 15.6492 17.5332 15.1997 16.4016 15.1997H7.86823C6.73664 15.1997 5.6514 15.6492 4.85124 16.4494C4.05108 17.2495 3.60156 18.3348 3.60156 19.4664V21.5997" stroke="#636266" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M12.1358 10.9333C14.4922 10.9333 16.4025 9.02308 16.4025 6.66666C16.4025 4.31025 14.4922 2.39999 12.1358 2.39999C9.77939 2.39999 7.86914 4.31025 7.86914 6.66666C7.86914 9.02308 9.77939 10.9333 12.1358 10.9333Z" stroke="#636266" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
						Profile
						<span className="account-arrow">
							<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0.999998 1L11 11L1 21" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>										
						</span>
					</div>
					<ul className="account-list">
						<li>
							<Link href='/' className="hovertime">
								<span className="account-icon">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M20.3889 7.75L11.9444 3L3.5 7.75M20.3889 7.75V17.25L11.9444 22M20.3889 7.75L11.9444 12.5M11.9444 22L3.5 17.25V7.75M11.9444 22V12.5M3.5 7.75L11.9444 12.5M7.93335 10.1778L15.9556 5.32222" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</span>
								Orders
								<span className="account-arrow">
									<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0.999998 1L11 11L1 21" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>									
							</Link>
						</li>
						<li>
							<Link href='/' className="hovertime"> 
								<span className="account-icon">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M19.9214 13.0556L12.0088 20.8922L4.09622 13.0556C3.57432 12.5477 3.16322 11.9373 2.88882 11.2627C2.61442 10.5882 2.48265 9.86412 2.50183 9.13614C2.521 8.40817 2.6907 7.69205 3.00024 7.03288C3.30977 6.37371 3.75243 5.78577 4.30035 5.30609C4.84827 4.8264 5.48958 4.46536 6.18389 4.2457C6.8782 4.02604 7.61047 3.95252 8.33458 4.02976C9.0587 4.10701 9.75898 4.33335 10.3913 4.69453C11.0237 5.05571 11.5744 5.54391 12.0088 6.12838C12.4451 5.54815 12.9964 5.06422 13.6283 4.70687C14.2602 4.34952 14.9591 4.12645 15.6812 4.05162C16.4033 3.97679 17.1331 4.05181 17.8248 4.27198C18.5166 4.49215 19.1554 4.85274 19.7014 5.33118C20.2474 5.80962 20.6888 6.3956 20.9979 7.05246C21.307 7.70931 21.4772 8.4229 21.4979 9.14857C21.5185 9.87423 21.3891 10.5963 21.1179 11.2697C20.8466 11.9431 20.4393 12.5532 19.9214 13.0619" stroke="#636266" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>
								Wishlist
								<span className="account-arrow">
									<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0.999998 1L11 11L1 21" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>									
							</Link>
						</li>
						<li>
							<Link href='/' className="hovertime">
								<span className="account-icon">
									<svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M7.57692 1C3.94591 1 1 3.80401 1 7.25752C1 11.2313 5.38462 17.5285 6.99459 19.7036C7.06142 19.7954 7.14901 19.8701 7.25021 19.9216C7.35142 19.9731 7.46337 20 7.57692 20C7.69048 20 7.80243 19.9731 7.90363 19.9216C8.00484 19.8701 8.09243 19.7954 8.15925 19.7036C9.76923 17.5295 14.1538 11.2345 14.1538 7.25752C14.1538 3.80401 11.2079 1 7.57692 1Z" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M7.57707 9.76923C8.78785 9.76923 9.76938 8.7877 9.76938 7.57692C9.76938 6.36614 8.78785 5.38461 7.57707 5.38461C6.3663 5.38461 5.38477 6.36614 5.38477 7.57692C5.38477 8.7877 6.3663 9.76923 7.57707 9.76923Z" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>
								Addresses
								<span className="account-arrow">
									<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0.999998 1L11 11L1 21" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>									
							</Link>
						</li>
						<li>
							<Link href='/' className="hovertime">
								<span className="account-icon">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M9 15L15 9M10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5ZM15 14.5C15 14.7761 14.7761 15 14.5 15C14.2239 15 14 14.7761 14 14.5C14 14.2239 14.2239 14 14.5 14C14.7761 14 15 14.2239 15 14.5ZM3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>
								Offers & Coupons
								<span className="account-arrow">
									<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0.999998 1L11 11L1 21" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>									
							</Link>
						</li>
						<li>
							<Link href='/' className="hovertime">
								<span className="account-icon">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M3 17L9 11L13 15L21 7M21 7H14M21 7V14" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>																				
								</span>
								Trending
								<span className="account-arrow">
									<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0.999998 1L11 11L1 21" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>									
							</Link>
						</li>
						<li>
							<Link href='/' className="hovertime">
								<span className="account-icon">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 17V17.01M12 13.5C11.9816 13.1754 12.0692 12.8536 12.2495 12.583C12.4299 12.3125 12.6933 12.1079 13 12C13.3759 11.8563 13.7132 11.6272 13.9856 11.331C14.2579 11.0347 14.4577 10.6792 14.5693 10.2926C14.6809 9.90597 14.7013 9.49871 14.6287 9.10288C14.5562 8.70705 14.3928 8.33346 14.1513 8.01153C13.9099 7.68959 13.597 7.4281 13.2373 7.24763C12.8776 7.06716 12.4809 6.97265 12.0785 6.97154C11.6761 6.97042 11.2789 7.06273 10.9182 7.2412C10.5576 7.41967 10.2432 7.67942 10 8.00001M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>																														
								</span>
								Help Center
								<span className="account-arrow">
									<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0.999998 1L11 11L1 21" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>									
							</Link>
						</li>
						<li>
							<Link href='/' className="hovertime">
								<span className="account-icon">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<mask id="mask0_1083_2142" maskUnits="userSpaceOnUse" x="3" y="3" width="19" height="19">
										<rect x="3" y="3" width="19" height="19" fill="#636266"/>
										</mask>
										<g mask="url(#mask0_1083_2142)">
										<path d="M9.96608 20.1H6.5883C6.14038 20.1 5.71081 19.922 5.39408 19.6053C5.07735 19.2886 4.89941 18.859 4.89941 18.4111V6.58885C4.89941 6.14093 5.07735 5.71136 5.39408 5.39463C5.71081 5.0779 6.14038 4.89996 6.5883 4.89996H9.96608" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M15.877 16.7221L20.0992 12.4999L15.877 8.27765" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M20.0992 12.4999H9.96582" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										</g>
									</svg>																																								
								</span>
								Signout
								<span className="account-arrow">
									<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0.999998 1L11 11L1 21" stroke="#636266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
								</span>									
							</Link>
						</li>
					</ul>
				</div>
				<div className="account-right">
					<div className="account-form">
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
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
  );
}