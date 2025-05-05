import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
// import "@/styles/account.css";
import AccountSideBar from "@/Components/accountsidebar";
import { useAppSelector } from "@/hooks/hooks";	
import { useRouter } from "next/router";
import { getData, postData } from "@/services/apiServices";
import { toast } from "react-toastify";
import { clearUser, setUser } from "@/slices/userSlice";
import { useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import { clearToken } from "@/slices/tokenSlice";
import { clearCart } from "@/slices/cartSlice";
import { resetCartCount, setCartCount } from "@/slices/loginUserSlice";

export default function MyAccount() {
	const token = useAppSelector((state: any) => state.token.token);
	const router = useRouter();
	const dispatch = useDispatch();
	if(!token){
		router.push('/');
	}
	const [userData,setUserData] = useState<any>({});
	const [teamData,setTeamData] = useState<any>([]);
	useEffect(()=>{
		getUserData();
	},[])
	const logout = () => {
		dispatch(clearUser());
		dispatch(clearToken());
		dispatch(resetCartCount());
		dispatch(clearCart());
		dispatch(setCartCount(0));
		toast.success('Logged out successfully');
		}

	const getUserData = async () => {
		await getData('user/profile').then((res:any)=>{
			console.log(res);
			setUserData(res?.data?.user);
			dispatch(setUser({ 
				id:res?.data?.user?._id,
				name:res?.data?.user?.username,
				balance:res?.data?.user?.balance,
				phone:res?.data?.user?.phone,
			  }));
		}).catch((err:any)=>{
			console.log(err);
			
			if(err.status === 401){
				logout();
			}
		})
	}
	const copyReferralcode = () => {
		navigator.clipboard.writeText(userData?.referral_code);
		toast.success('Referral code copied to clipboard');
	}
	const shareWhatsapp = () => {
		const text = `🚀 I’m using *Attri Products* and *Earning Money* from it — and I’m LOVING it! 💸✨ \n\nWanna try it too? Use my referral code 👉 *“${userData?.referral_code}”* \n\n  Join here 🔗 https://www.attriindustries.com/signup/${userData?.referral_code}   \n\n  -Let’s grow & earn together! 💼💰🔥`;
		window.open(`https://wa.me/?text=${text}`, '_blank');
	}
	const getTeamData = async () => {
		await getData(`/get-user/${userData?._id}`).then((res:any)=>{
			console.log(res);
			setTeamData(res?.data);
			console.log(teamData?.user?.referralsByLevel);
		}).catch((err:any)=>{
			console.log(err);
		})
	}
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
						<div className="user-profile-icon relative flex justify-center items-center">
							<div className="relative group">
								<div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-4xl font-bold text-gray-100 shadow-lg border-2 border-gray-700">
									{userData?.username?.charAt(0).toUpperCase()}
								</div>
								{/* <div className="profile-edit-icon">
								<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
									<path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
								</svg>
							</div> */}
							</div>
						</div>
						<div className="attrixsheading">{userData?.username}</div>
						<p>{userData?.phone}</p>
					
						<div className="user-wallet d-flex">
						<Link href='/withdraw' className="wallet-card">
							{/* <div className="wallet-card"> */}
								<div className="wallet-left">
									<div className="attrixsheading">₹{userData?.balance?.toFixed(2)}</div>
									<p>Total Balance</p>
								</div>
								<div className="wallet-icon">
									<svg xmlns="http://www.w3.org/2000/svg" id="wallet" x="0" y="0" version="1.1" viewBox="0 0 20 20">
										<path d="M16 6H3.5v-.5l11-.88v.88H16V4c0-1.1-.891-1.872-1.979-1.717L3.98 3.717C2.891 3.873 2 4.9 2 6v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1.5 7.006a1.5 1.5 0 1 1 .001-3.001 1.5 1.5 0 0 1-.001 3.001z"></path>
									</svg>
								</div>
							{/* </div> */}
							</Link>
							<div className="wallet-card" onClick={()=>toast.error('Cashback usage will be added soon')}>
								<div className="wallet-left">
									<div className="attrixsheading">₹{userData?.cashback?.toFixed(2)}</div>
									<p>Total Cashback</p>
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
					
						<div className="referral-code">
							<div className="referral-code-left">
								<div className="attrixsheading">Referral Code</div>
								<p className="anchor-button hovertime copy-btn">
									{userData?.referral_code}
									<div className="icon">
										<button onClick={shareWhatsapp}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30"><path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path></svg></button>
									<button onClick={()=>copyReferralcode()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="copy"><path fill="#212121" d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z"></path></svg></button>
									</div>
								</p>
							</div>
							
						</div>
					<div className="qr-code mt-2">
						<div className="attrixsheading">Referral QR Code</div>
						<div className="qr-code-container flex flex-col items-center justify-center">
						<QRCode 
							value={`https://www.attriindustries.com/signup/${userData?.referral_code}`}
							size={128}
							style={{ margin: '10px 0' }}
						/>
						<p>Scan to share your referral code</p>
						</div>
					</div>
					</div>
					 <div className="team-list">
						{/* <div className="team-card d-flex align">
							<div className="attrixsheading">Level 1</div>
							<div className="team-num">{userData?.referralFamily?.length}</div>
						</div> */}
						{/* {teamData?.user?.referralsByLevel?.length > 0 && teamData?.user?.referralsByLevel?.map((item:any,index:number)=>{
							return <div className="team-card d-flex align" key={index}>
								<div className="attrixsheading">Level {item?.level}</div>
								<div className="team-num">{item?.referrals?.length}</div>
							</div>
						})} */}
						
						<div className="flex justify-center items-center">
						<Link href='/teams' className="spcl-button learn-more">
							<span className="circle" aria-hidden="true">
								<span className="icon arrow"></span>
							</span>
							<span className="button-text">View Team</span>
						</Link>
						</div>

						{/* <div className="team-card d-flex align">
							<div className="attrixsheading">Level 1</div>
							<div className="team-num">30</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	</section>
  );
}