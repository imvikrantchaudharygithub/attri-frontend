import Link from "next/link";
import { useEffect, useState } from "react";
import AccountSideBar from "@/Components/accountsidebar";
import { useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/router";
import { getData } from "@/services/apiServices";
import toast from "react-hot-toast";
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
    <section className="account-box min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <div className="account-main d-flex padding-tb">
          <div className="account-left hidden md:block" style={{ background: "transparent" }}>
            <AccountSideBar />
          </div>
          <div className="account-right flex flex-col gap-8">
            {/* Hero: welcome + profile */}
            <header
              className="relative overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-10"
              style={{
                background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 60%)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-3xl font-bold text-white"
                  style={{
                    background: "linear-gradient(145deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                    boxShadow: "0 8px 24px rgba(139, 53, 184, 0.35)",
                  }}
                >
                  {userData?.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    Welcome back
                  </p>
                  <h1 className="mt-0.5 font-bold text-2xl tracking-tight md:text-3xl" style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-heading)" }}>
                    {userData?.username}
                  </h1>
                  <p className="mt-1 text-base" style={{ color: "var(--color-text-secondary)" }}>
                    {userData?.phone}
                  </p>
                </div>
              </div>
            </header>

            {/* Wallet: balance + cashback */}
            <section aria-label="Wallet">
              <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
                Wallet
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Link
                  href="/withdraw"
                  className="group flex min-h-[100px] items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 transition-all duration-200 hover:border-[var(--color-primary)]/30 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                      Total Balance
                    </p>
                    <p className="mt-1 text-2xl font-bold tabular-nums" style={{ color: "var(--color-charcoal)" }}>
                      ₹{userData?.balance?.toFixed(2)}
                    </p>
                    <span className="mt-2 inline-block text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                      Withdraw →
                    </span>
                  </div>
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105"
                    style={{ background: "var(--color-primary-light)" }}
                  >
                    <svg className="h-7 w-7" style={{ color: "var(--color-primary)" }} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M16 6H3.5v-.5l11-.88v.88H16V4c0-1.1-.891-1.872-1.979-1.717L3.98 3.717C2.891 3.873 2 4.9 2 6v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1.5 7.006a1.5 1.5 0 1 1 .001-3.001 1.5 1.5 0 0 1-.001 3.001z" />
                    </svg>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => toast.error("Cashback usage will be added soon")}
                  className="flex min-h-[100px] w-full cursor-pointer items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 text-left transition-all duration-200 hover:border-[var(--color-accent-gold)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]/30"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                      Total Cashback
                    </p>
                    <p className="mt-1 text-2xl font-bold tabular-nums" style={{ color: "var(--color-charcoal)" }}>
                      ₹{userData?.cashback?.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: "#FEF3C7" }}>
                    <svg className="h-7 w-7 text-[var(--color-accent-gold)]" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M16 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z" />
                      <path d="M16.4 13.2h-.8a2.613 2.613 0 0 1-2.493-1.864 1 1 0 1 1 1.918-.565c.075.253.312.43.575.43h.8a.6.6 0 0 0 0-1.201h-.8C14.166 10 13 8.833 13 7.4s1.166-2.6 2.6-2.6h.8c1.121 0 2.111.714 2.466 1.778a1 1 0 1 1-1.897.633.598.598 0 0 0-.569-.411h-.8a.6.6 0 0 0 0 1.2h.8c1.434 0 2.6 1.167 2.6 2.6s-1.166 2.6-2.6 2.6z" />
                    </svg>
                  </div>
                </button>
              </div>
            </section>

            {/* Referral: code + actions + QR in one card */}
            <section aria-label="Referral">
              <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
                Share & earn
              </h2>
              <div
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="grid gap-8 md:grid-cols-[1fr,auto] md:items-start">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                      Referral Code
                    </p>
                    <p className="mt-2 font-mono text-xl font-semibold tracking-wide" style={{ color: "var(--color-charcoal)" }}>
                      {userData?.referral_code}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => copyReferralcode()}
                        className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ background: "var(--color-primary)" }}
                        aria-label="Copy referral code"
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                          <path d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z" />
                        </svg>
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={shareWhatsapp}
                        className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                        aria-label="Share on WhatsApp"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Share on WhatsApp
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center border-t border-[var(--color-border)] pt-6 md:border-t-0 md:border-l md:border-[var(--color-border)] md:pl-8 md:pt-0">
                    <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                      Referral QR Code
                    </p>
                    <div className="rounded-xl border border-[var(--color-border)] bg-white p-3">
                      <QRCode
                        value={`https://www.attriindustries.com/signup/${userData?.referral_code}`}
                        size={128}
                        style={{ margin: 0 }}
                      />
                    </div>
                    <p className="mt-3 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
                      Scan to share your referral code
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Team CTA */}
            <section aria-label="Team">
              <div
                className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
                    Your team
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    Invite friends and grow together
                  </p>
                </div>
                <Link
                  href="/teams"
                  className="spcl-button learn-more inline-flex min-h-[48px] min-w-[160px] cursor-pointer items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                  aria-label="View team"
                >
                  <span className="circle" aria-hidden="true">
                    <span className="icon arrow" />
                  </span>
                  <span className="button-text">View Team</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}