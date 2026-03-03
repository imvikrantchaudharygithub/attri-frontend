import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { closeLoginPopup } from "@/slices/popupSlice";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postData } from "@/services/apiServices";
import toast from "react-hot-toast";
import { setReduxToken } from "@/slices/tokenSlice";
import { setUser } from "@/slices/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import AuthModalShell from "@/Components/auth/AuthModalShell";
import AuthHeader from "@/Components/auth/AuthHeader";
import AuthField from "@/Components/auth/AuthField";
import OtpInputGroup from "@/Components/auth/OtpInputGroup";

export default function LoginPopup() {
  const dispatch = useAppDispatch();
  const [isLoginpopup, setIsLoginpopup] = useState(true);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const router = useRouter();
  const [resendTimer, setResendTimer] = useState<number>(120);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);

  const redirecttoSignup = () => {
    router.push("/signup");
    dispatch(closeLoginPopup());
  };

  const formik = useFormik({
    initialValues: { mobileNumber: "", notify: false },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .required("Mobile number is required")
        .matches(/^[6-9]\d{9}$/, "Invalid Indian mobile number")
        .length(10, "Must be 10 digits"),
      notify: Yup.boolean(),
    }),
    onSubmit: (values) => {
      postData("send-otp", { phone: values.mobileNumber })
        .then((res: any) => {
          toast.success(res?.data?.message);
          setIsLoginpopup(false);
          otpFormik.resetForm();
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message || "Something went wrong");
        });
    },
  });

  const otpFormik = useFormik({
    initialValues: { otp: ["", "", "", ""] },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().required("Required").matches(/^[0-9]$/, "Must be a single digit"))
        .length(4, "Must be exactly 4 digits"),
    }),
    onSubmit: (values) => {
      setIsOtpVerifying(true);
      postData("verify-login-otp", {
        phone: formik.values.mobileNumber,
        otp: values.otp.join(""),
      })
        .then((res: any) => {
          toast.success(res?.data?.message);
          setIsOtpVerifying(false);
          otpFormik.resetForm();
          formik.resetForm();
          dispatch(setReduxToken(res?.data?.token));
          dispatch(
            setUser({
              id: res?.data?.user?._id,
              name: res?.data?.user?.username,
              balance: res?.data?.user?.balance,
              phone: formik.values.mobileNumber,
            })
          );
          dispatch(closeLoginPopup());
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message || "Something went wrong");
          setIsOtpVerifying(false);
        });
    },
  });

  const handleResendOtp = () => {
    setResendDisabled(true);
    setResendTimer(120);
    postData("send-otp", { phone: formik.values.mobileNumber })
      .then((res: any) => toast.success(res?.data?.message || "OTP sent"))
      .catch((err: any) => toast.error(err?.response?.data?.message || "Failed to resend OTP"));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!isLoginpopup) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) { setResendDisabled(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      setResendTimer(120);
      setResendDisabled(true);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isLoginpopup]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const otpHasError = otpFormik.submitCount > 0 && otpFormik.values.otp.join("").length < 4;

  return (
    <AuthModalShell
      onClose={() => dispatch(closeLoginPopup())}
      sideImageSrc="https://res.cloudinary.com/doz4dnf0h/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1742919806/login_03_luywts.jpg"
      sideImageAlt="Attri wellness products"
    >
      <button
        className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all duration-150 hover:border-[var(--color-primary-light)] hover:bg-[#FAF5FF] hover:text-[var(--color-text-primary)]"
        onClick={() => dispatch(closeLoginPopup())}
        aria-label="Close login popup"
      >
        <svg width="14" height="14" viewBox="0 0 26 26" fill="none">
          <path d="M21.665 4.334L4.332 21.667M21.665 21.667L4.332 4.334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[#A855F7] shadow-[0_8px_20px_rgba(139,53,184,0.35)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <p className="font-heading text-sm font-semibold text-[var(--color-primary)]">Attri Industries</p>
          <p className="text-[11px] text-[var(--color-text-muted)]">Secure account access</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoginpopup ? (
          <motion.div
            key="phone"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.18 }}
          >
            <AuthHeader
              badge="Secure Login"
              title="Welcome back"
              subtitle="Enter your mobile number to continue securely."
            />

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <AuthField
                id="mobileNumber"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                label="Mobile number"
                leftSlot="+91"
                placeholder="10-digit mobile number"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={10}
                error={formik.touched.mobileNumber ? formik.errors.mobileNumber : undefined}
              />

              <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5">
                <input
                  type="checkbox"
                  name="notify"
                  className="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-primary)]"
                  checked={formik.values.notify}
                  onChange={formik.handleChange}
                />
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">Notify me about updates and offers</span>
              </label>

              <button
                type="submit"
                disabled={!formik.isValid || !formik.values.mobileNumber}
                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#A855F7] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(139,53,184,0.28)] transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-[var(--color-text-muted)]">
              <span>By continuing, you agree to our </span>
              <Link href="/privacypolicy" className="text-[var(--color-primary)] underline" onClick={() => dispatch(closeLoginPopup())}>
                Privacy Policy
              </Link>
              <span> and Terms.</span>
            </div>

            <div className="mt-4 text-center text-sm">
              <span className="text-[var(--color-text-secondary)]">Don&apos;t have an account? </span>
              <button className="cursor-pointer font-semibold text-[var(--color-accent-gold)] transition-colors hover:text-[var(--color-primary-dark)]" onClick={redirecttoSignup}>
                Sign up
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.18 }}
          >
            <AuthHeader
              badge="Step 2 of 2"
              title="Verify OTP"
              subtitle={`We sent a 4-digit code to +91 ${formik.values.mobileNumber}`}
            />

            <div className="mb-5 flex items-center gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-full border border-[var(--color-accent-gold)] px-2.5 py-1 text-xs font-semibold text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)] hover:text-white"
                onClick={() => setIsLoginpopup(true)}
              >
                Edit number
              </button>
            </div>

            <form onSubmit={otpFormik.handleSubmit} className="space-y-5">
              <OtpInputGroup
                value={otpFormik.values.otp}
                onChange={(nextOtp) => {
                  otpFormik.setFieldValue("otp", nextOtp);
                }}
                hasError={otpHasError}
              />

              {otpHasError ? (
                <p className="text-center text-xs font-medium text-[var(--color-error)]" role="alert">
                  Please enter the complete 4-digit OTP.
                </p>
              ) : null}

              <div className="text-center text-sm text-[var(--color-text-muted)]" aria-live="polite">
                {resendTimer > 0 ? (
                  <span>
                    Resend code in <span className="font-semibold text-[var(--color-primary)]">{formatTime(resendTimer)}</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="cursor-pointer font-semibold text-[var(--color-accent-gold)] transition-colors hover:text-[var(--color-primary-dark)]"
                    onClick={handleResendOtp}
                    disabled={resendDisabled}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={otpFormik.values.otp.join("").length < 4 || isOtpVerifying}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#A855F7] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(139,53,184,0.28)] transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isOtpVerifying ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Verify and login"
                )}
              </button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-[var(--color-text-secondary)]">New here? </span>
              <button className="cursor-pointer font-semibold text-[var(--color-accent-gold)] transition-colors hover:text-[var(--color-primary-dark)]" onClick={redirecttoSignup}>
                Create account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthModalShell>
  );
}
