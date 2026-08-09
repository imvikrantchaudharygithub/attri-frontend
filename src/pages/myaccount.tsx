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
import { clearToken, setReduxToken } from "@/slices/tokenSlice";
import AuthModalShell from "@/Components/auth/AuthModalShell";
import ForgotPasswordFlow from "@/Components/auth/ForgotPasswordFlow";
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
	const [securityOpen, setSecurityOpen] = useState(false);
	/** passwordSetAt is not select:false — only the hash itself is hidden. */
	const hasPassword = Boolean(userData?.passwordSetAt);
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
          <div className="account-right flex flex-col gap-6 md:gap-8">

            {/* Profile hero */}
            <header
              className="relative overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-10"
              style={{
                background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 60%)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full" style={{ background: "var(--color-primary)", opacity: 0.08 }} />
              <div aria-hidden className="pointer-events-none absolute right-24 -bottom-12 h-32 w-32 rounded-full" style={{ background: "var(--color-accent-gold)", opacity: 0.14 }} />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-3xl font-bold text-white ring-4 ring-white/50"
                    style={{
                      background: "linear-gradient(145deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                      boxShadow: "0 8px 24px rgba(139, 53, 184, 0.35)",
                    }}
                  >
                    {userData?.username?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--color-text-muted)" }}>
                      Welcome back
                    </p>
                    <h1 className="mt-0.5 text-2xl font-bold tracking-tight md:text-3xl" style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-heading)" }}>
                      {userData?.username}
                    </h1>
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      {userData?.phone}
                    </p>
                  </div>
                </div>

                {/* Referral code chip — quick copy */}
                <button
                  type="button"
                  onClick={copyReferralcode}
                  className="group inline-flex items-center gap-2.5 self-start rounded-full border bg-white/70 px-4 py-2.5 backdrop-blur transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 cursor-pointer"
                  style={{ borderColor: "var(--color-border)" }}
                  aria-label="Copy referral code"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Code</span>
                  <span className="font-mono text-sm font-bold tracking-wide" style={{ color: "var(--color-primary)" }}>{userData?.referral_code}</span>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" className="opacity-60 transition-opacity group-hover:opacity-100" style={{ color: "var(--color-primary)" }} aria-hidden>
                    <path d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Wallet */}
            <section aria-label="Wallet">
              <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
                Wallet
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Balance — links to withdraw */}
                <Link
                  href="/withdraw"
                  className="group relative flex min-h-[120px] items-center justify-between overflow-hidden rounded-2xl border bg-[var(--color-surface)] px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
                  style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
                >
                  <span aria-hidden className="absolute left-0 top-0 h-full w-1" style={{ background: "var(--color-primary)" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Total Balance</p>
                    <p className="mt-1 text-3xl font-bold tabular-nums" style={{ color: "var(--color-charcoal)" }}>₹{Number(userData?.balance || 0).toFixed(2)}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                      Withdraw
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105" style={{ background: "var(--color-primary-light)" }}>
                    <svg className="h-7 w-7" style={{ color: "var(--color-primary)" }} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M16 6H3.5v-.5l11-.88v.88H16V4c0-1.1-.891-1.872-1.979-1.717L3.98 3.717C2.891 3.873 2 4.9 2 6v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1.5 7.006a1.5 1.5 0 1 1 .001-3.001 1.5 1.5 0 0 1-.001 3.001z" />
                    </svg>
                  </div>
                </Link>

                {/* Cashback — display only */}
                <div
                  className="relative flex min-h-[120px] items-center justify-between overflow-hidden rounded-2xl border bg-[var(--color-surface)] px-6 py-5"
                  style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
                >
                  <span aria-hidden className="absolute left-0 top-0 h-full w-1" style={{ background: "var(--color-accent-gold)" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Total Cashback</p>
                    <p className="mt-1 text-3xl font-bold tabular-nums" style={{ color: "var(--color-charcoal)" }}>₹{Number(userData?.cashback || 0).toFixed(2)}</p>
                    <span className="mt-2 inline-block text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Use at checkout</span>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: "#FEF3C7" }}>
                    <svg className="h-7 w-7 text-[var(--color-accent-gold)]" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
                      <path d="M16 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z" />
                      <path d="M16.4 13.2h-.8a2.613 2.613 0 0 1-2.493-1.864 1 1 0 1 1 1.918-.565c.075.253.312.43.575.43h.8a.6.6 0 0 0 0-1.201h-.8C14.166 10 13 8.833 13 7.4s1.166-2.6 2.6-2.6h.8c1.121 0 2.111.714 2.466 1.778a1 1 0 1 1-1.897.633.598.598 0 0 0-.569-.411h-.8a.6.6 0 0 0 0 1.2h.8c1.434 0 2.6 1.167 2.6 2.6s-1.166 2.6-2.6 2.6z" />
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            {/* Login & security */}
            <section aria-label="Login and security">
              <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
                Login &amp; security
              </h2>
              <div
                className="rounded-2xl border bg-[var(--color-surface)] px-6 py-5"
                style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>Password</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          hasPassword
                            ? "bg-[#F0FDF4] text-[var(--color-success)]"
                            : "bg-[#FEF2F2] text-[var(--color-error)]"
                        }`}
                      >
                        {hasPassword ? "PASSWORD SET" : "NOT SET"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                      {hasPassword
                        ? `Last changed ${new Date(userData.passwordSetAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}`
                        : "You currently log in with an OTP every time"}
                    </p>
                  </div>

                  <button
                    onClick={() => setSecurityOpen(true)}
                    className="cursor-pointer whitespace-nowrap rounded-xl border-[1.5px] border-[var(--color-primary)] px-3.5 py-2 text-xs font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
                  >
                    {hasPassword ? "Change password" : "Set password"}
                  </button>
                </div>

                <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>Mobile number</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    +91 {userData?.phone} · verified
                  </p>
                </div>
              </div>
            </section>

            {/* Share & earn */}
            <section aria-label="Referral">
              <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
                Share &amp; earn
              </h2>
              <div className="overflow-hidden rounded-2xl border bg-[var(--color-surface)]" style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}>
                <div className="grid md:grid-cols-[1fr,auto]">
                  <div className="p-6 md:p-8">
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Your referral code</p>
                    <div className="mt-3 inline-flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "var(--color-primary-light)" }}>
                      <span className="font-mono text-xl font-bold tracking-wide" style={{ color: "var(--color-primary-dark)" }}>{userData?.referral_code}</span>
                      <button
                        type="button"
                        onClick={copyReferralcode}
                        aria-label="Copy referral code"
                        className="cursor-pointer rounded-lg p-1.5 transition-colors duration-200 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                          <path d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      Share your code — friends get <span className="font-semibold" style={{ color: "var(--color-accent-gold)" }}>₹200 cashback</span> and you earn <span className="font-semibold" style={{ color: "var(--color-primary)" }}>₹10</span> when they join.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={shareWhatsapp}
                        className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                        aria-label="Share on WhatsApp"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Share on WhatsApp
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-3 border-t p-6 md:border-l md:border-t-0 md:p-8" style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}>
                    <div className="rounded-xl border bg-white p-3" style={{ borderColor: "var(--color-border)" }}>
                      <QRCode value={`https://www.attriindustries.com/signup/${userData?.referral_code}`} size={120} style={{ margin: 0 }} />
                    </div>
                    <p className="text-center text-xs leading-snug" style={{ color: "var(--color-text-muted)" }}>
                      Scan to join with<br />your referral
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Team CTA */}
            <section aria-label="Team">
              <div
                className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-[var(--color-surface)] px-6 py-6 text-center sm:flex-row sm:text-left"
                style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:flex" style={{ background: "var(--color-primary-light)" }}>
                    <svg className="h-6 w-6" style={{ color: "var(--color-primary)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>Your team</h2>
                    <p className="mt-0.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>Invite friends and grow together</p>
                  </div>
                </div>
                <Link
                  href="/teams"
                  className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 sm:w-auto"
                  style={{ background: "var(--color-primary)" }}
                  aria-label="View team"
                >
                  View Team
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>

      {securityOpen ? (
        <AuthModalShell onClose={() => setSecurityOpen(false)}>
          {/* Both set and change go through OTP verification. Phone possession
              is the trust anchor OTP login already relies on, and it means a
              user who forgot their password can still change it from in-app. */}
          <ForgotPasswordFlow
            context="profile"
            initialPhone={String(userData?.phone ?? "")}
            onBack={() => setSecurityOpen(false)}
            onDone={(newToken) => {
              if (newToken) dispatch(setReduxToken(newToken));
              setSecurityOpen(false);
              getUserData();
            }}
          />
        </AuthModalShell>
      ) : null}
    </section>
  );
}
