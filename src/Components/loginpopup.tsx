import Link from "next/link";
import { useRef, useState, useEffect } from "react";
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
import PasswordField from "@/Components/auth/PasswordField";
import OtpInputGroup from "@/Components/auth/OtpInputGroup";
import SetPasswordForm from "@/Components/auth/SetPasswordForm";

/**
 * password     — the default. Phone + password on one step.
 * otp-phone    — the fallback: collect the number to text a code to.
 * otp-code     — enter that code.
 * set-password — the soft gate shown to a legacy user after an OTP login.
 *
 * Deliberately NOT a "check whether this phone has a password" step: an
 * endpoint answering that question is an account-enumeration oracle, letting
 * anyone walk the 10-digit space and map which numbers are Attri customers.
 */
type Mode = "password" | "otp-phone" | "otp-code" | "set-password";

const RESEND_SECONDS = 120;

export default function LoginPopup() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("password");
  const [authError, setAuthError] = useState<string>("");
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [skipsRemaining, setSkipsRemaining] = useState<number>(0);
  const [resendTimer, setResendTimer] = useState<number>(RESEND_SECONDS);
  const lastAutoSubmittedOtpRef = useRef<string>("");

  const redirecttoSignup = () => {
    router.push("/signup");
    dispatch(closeLoginPopup());
  };

  /** Stores the session without closing the modal — the soft gate needs the
   *  token in place before it can call /auth/password/set. */
  const applySession = (token: string, user: any, phone: string) => {
    dispatch(setReduxToken(token));
    dispatch(
      setUser({
        id: user?._id,
        name: user?.username,
        balance: user?.balance,
        phone,
      })
    );
  };

  const finishLogin = (token: string, user: any, phone: string) => {
    applySession(token, user, phone);
    dispatch(closeLoginPopup());
  };

  /* ---------------- password login (default) ---------------- */

  const passwordFormik = useFormik({
    initialValues: { mobileNumber: "", password: "" },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .required("Mobile number is required")
        .matches(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setAuthError("");
      postData("auth/login-password", {
        phone: values.mobileNumber,
        password: values.password,
      })
        .then((res: any) => {
          toast.success(res?.data?.message || "Logged in");
          finishLogin(res?.data?.token, res?.data?.user, values.mobileNumber);
        })
        .catch((err: any) => {
          // One message for every cause — wrong password, unknown number,
          // account with no password yet, locked account. Never branch on it.
          setAuthError(err?.response?.data?.message || "Invalid mobile number or password");
        })
        .finally(() => setSubmitting(false));
    },
  });

  /* ---------------- OTP fallback ---------------- */

  const otpPhoneFormik = useFormik({
    initialValues: { mobileNumber: "" },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .required("Mobile number is required")
        .matches(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      postData("send-otp", { phone: values.mobileNumber })
        .then((res: any) => {
          toast.success(res?.data?.message || "OTP sent");
          otpFormik.resetForm();
          lastAutoSubmittedOtpRef.current = "";
          setResendTimer(RESEND_SECONDS);
          setMode("otp-code");
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message || "Something went wrong");
        })
        .finally(() => setSubmitting(false));
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
        phone: otpPhoneFormik.values.mobileNumber,
        otp: values.otp.join(""),
      })
        .then((res: any) => {
          toast.success(res?.data?.message);
          otpFormik.resetForm();
          // Apply the session first: the gate authenticates with this token,
          // which is what lets it set a password without spending a second SMS.
          applySession(res?.data?.token, res?.data?.user, otpPhoneFormik.values.mobileNumber);

          if (res?.data?.passwordSetRequired) {
            setSkipsRemaining(res?.data?.skipsRemaining ?? 0);
            setMode("set-password");
          } else {
            dispatch(closeLoginPopup());
          }
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message || "Something went wrong");
          // Let the user retype rather than re-firing the same failed code.
          lastAutoSubmittedOtpRef.current = "";
        })
        .finally(() => setIsOtpVerifying(false));
    },
  });

  const handleResendOtp = () => {
    setResendTimer(RESEND_SECONDS);
    postData("send-otp", { phone: otpPhoneFormik.values.mobileNumber })
      .then((res: any) => toast.success(res?.data?.message || "OTP sent"))
      .catch((err: any) => toast.error(err?.response?.data?.message || "Failed to resend OTP"));
  };

  /* ---------------- resend countdown ---------------- */

  useEffect(() => {
    if (mode !== "otp-code") return;
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [mode]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const otpHasError = otpFormik.submitCount > 0 && otpFormik.values.otp.join("").length < 4;

  // Auto-verify once all 4 digits are entered (no extra click).
  useEffect(() => {
    if (mode !== "otp-code") return;
    if (isOtpVerifying) return;

    const otp = otpFormik.values.otp.join("");
    if (!/^\d{4}$/.test(otp)) return;
    if (lastAutoSubmittedOtpRef.current === otp) return;

    lastAutoSubmittedOtpRef.current = otp;
    otpFormik.submitForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, isOtpVerifying, otpFormik.values.otp]);

  const goToOtp = () => {
    setAuthError("");
    // Carry the number across so the user doesn't retype it.
    otpPhoneFormik.setFieldValue("mobileNumber", passwordFormik.values.mobileNumber);
    setMode("otp-phone");
  };

  const primaryButton =
    "flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#A855F7] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(139,53,184,0.28)] transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50";

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
        {mode === "password" ? (
          <motion.div key="password" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
            <AuthHeader
              badge="Secure Login"
              title="Welcome back"
              subtitle="Enter your mobile number and password to continue."
            />

            {authError ? (
              <div className="mb-4 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-3.5 py-3" role="alert">
                <p className="text-xs font-bold text-[var(--color-error)]">{authError}</p>
                {/* Rendered on EVERY failure regardless of account state, so it
                    reveals nothing — while routing legacy users to the path
                    that actually works for them. */}
                <p className="mt-2 border-t border-dashed border-[#FCA5A5] pt-2 text-xs text-[#7F1D1D]">
                  <span className="font-semibold">Never set a password?</span>{" "}
                  <button
                    type="button"
                    className="cursor-pointer font-bold text-[var(--color-accent-gold)] underline"
                    onClick={goToOtp}
                  >
                    Log in with OTP →
                  </button>
                </p>
              </div>
            ) : null}

            <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
              <AuthField
                id="mobileNumber"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                label="Mobile number"
                leftSlot="+91"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={passwordFormik.values.mobileNumber}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                error={passwordFormik.touched.mobileNumber ? passwordFormik.errors.mobileNumber : undefined}
              />

              <PasswordField
                id="password"
                label="Password"
                placeholder="Your password"
                autoComplete="current-password"
                value={passwordFormik.values.password}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                error={passwordFormik.touched.password ? passwordFormik.errors.password : undefined}
              />

              <button type="submit" disabled={passwordFormik.isSubmitting} className={primaryButton}>
                {passwordFormik.isSubmitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs">
              <button type="button" className="cursor-pointer font-semibold text-[var(--color-primary)] hover:underline" onClick={goToOtp}>
                Forgot password?
              </button>
              <span className="text-[var(--color-border)]">·</span>
              <button type="button" className="cursor-pointer font-semibold text-[var(--color-accent-gold)] hover:underline" onClick={goToOtp}>
                Login with OTP instead
              </button>
            </div>

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
        ) : mode === "set-password" ? (
          <motion.div key="set-password" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
            <AuthHeader
              badge={skipsRemaining > 0 ? "One last thing" : "Required"}
              title="Set your password"
              subtitle="You're logged in. Set a password so next time you can skip the SMS entirely."
            />

            <SetPasswordForm
              onSubmit={async (password) => {
                // No OTP here: the user proved phone ownership by logging in
                // seconds ago, and the backend accepts that session as proof
                // for a FIRST password. Costs zero extra SMS.
                try {
                  const res: any = await postData("auth/password/set", { password });
                  if (res?.data?.token) dispatch(setReduxToken(res.data.token));
                  toast.success("Password saved");
                  dispatch(closeLoginPopup());
                } catch (err: any) {
                  toast.error(err?.response?.data?.message || "Could not save password");
                }
              }}
            />

            {skipsRemaining > 0 ? (
              <>
                <button
                  type="button"
                  className="mt-2.5 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
                  onClick={() => {
                    // Fire-and-forget: the counter lives on the server, and a
                    // failed increment must not trap the user in the modal.
                    postData("auth/password/skip", {}).catch(() => undefined);
                    dispatch(closeLoginPopup());
                  }}
                >
                  Skip for now
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[var(--color-text-muted)]">
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${i < skipsRemaining ? "bg-[var(--color-accent-gold)]" : "bg-[var(--color-border)]"}`}
                      />
                    ))}
                  </span>
                  <span>
                    {skipsRemaining} skip{skipsRemaining > 1 ? "s" : ""} left
                  </span>
                </div>
              </>
            ) : (
              <p className="mt-3 text-center text-[11px] text-[var(--color-text-muted)]">
                No skips left — a password is required to continue.
              </p>
            )}
          </motion.div>
        ) : mode === "otp-phone" ? (
          <motion.div key="otp-phone" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
            <AuthHeader
              badge="Step 1 of 2"
              title="Log in with OTP"
              subtitle="We'll text a 4-digit code to your mobile number."
            />

            <form onSubmit={otpPhoneFormik.handleSubmit} className="space-y-4">
              <AuthField
                id="otpMobileNumber"
                name="mobileNumber"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                label="Mobile number"
                leftSlot="+91"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={otpPhoneFormik.values.mobileNumber}
                onChange={otpPhoneFormik.handleChange}
                onBlur={otpPhoneFormik.handleBlur}
                error={otpPhoneFormik.touched.mobileNumber ? otpPhoneFormik.errors.mobileNumber : undefined}
              />

              <button type="submit" disabled={otpPhoneFormik.isSubmitting} className={primaryButton}>
                {otpPhoneFormik.isSubmitting ? "Sending..." : "Send OTP"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button type="button" className="cursor-pointer text-xs font-semibold text-[var(--color-primary)] hover:underline" onClick={() => setMode("password")}>
                ← Back to password login
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="otp-code" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
            <AuthHeader
              badge="Step 2 of 2"
              title="Verify OTP"
              subtitle={`We sent a 4-digit code to +91 ${otpPhoneFormik.values.mobileNumber}`}
            />

            <div className="mb-5 flex items-center gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-full border border-[var(--color-accent-gold)] px-2.5 py-1 text-xs font-semibold text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)] hover:text-white"
                onClick={() => setMode("otp-phone")}
              >
                Edit number
              </button>
            </div>

            <form onSubmit={otpFormik.handleSubmit} className="space-y-5">
              <OtpInputGroup
                value={otpFormik.values.otp}
                onChange={(nextOtp) => otpFormik.setFieldValue("otp", nextOtp)}
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
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={otpFormik.values.otp.join("").length < 4 || isOtpVerifying}
                className={primaryButton}
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
