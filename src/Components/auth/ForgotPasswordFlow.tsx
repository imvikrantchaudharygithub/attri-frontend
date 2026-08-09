import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { postData } from "@/services/apiServices";
import AuthHeader from "@/Components/auth/AuthHeader";
import AuthField from "@/Components/auth/AuthField";
import OtpInputGroup from "@/Components/auth/OtpInputGroup";
import SetPasswordForm from "@/Components/auth/SetPasswordForm";

type ForgotPasswordFlowProps = {
  initialPhone?: string;
  onBack: () => void;
  onDone: (token: string, user: any) => void;
  /** Tunes the copy. "login" = forgot password; "profile" = set/change from My Profile. */
  context?: "login" | "profile";
};

const RESEND_SECONDS = 120;

/**
 * Phone → OTP → new password. Used by the login modal's "Forgot password?" and
 * by My Profile's set/change button, because they are the same operation:
 * prove you own the phone, then write a new hash.
 */
export default function ForgotPasswordFlow({
  initialPhone = "",
  onBack,
  onDone,
  context = "login",
}: ForgotPasswordFlowProps) {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState(initialPhone);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [sending, setSending] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (step !== "code") return;
    const timer = setInterval(() => setResendTimer((prev) => (prev <= 1 ? 0 : prev - 1)), 1000);
    return () => clearInterval(timer);
  }, [step]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const sendCode = (isResend = false) => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    setSending(true);
    postData("auth/password/otp", { phone })
      .then(() => {
        // The endpoint answers 202 for every number, registered or not, so the
        // copy stays conditional and never confirms an account exists.
        toast.success("If that number has an account, a code is on its way.");
        setResendTimer(RESEND_SECONDS);
        if (!isResend) setStep("code");
      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.message || "Could not send the code. Please try again.");
      })
      .finally(() => setSending(false));
  };

  const primaryButton =
    "flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#A855F7] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(139,53,184,0.28)] transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50";

  if (step === "phone") {
    return (
      <div>
        <AuthHeader
          badge={context === "profile" ? "Verify it's you" : "Password reset"}
          title={context === "profile" ? "Confirm your number" : "Forgot your password?"}
          subtitle="We'll text a 4-digit code to your mobile number."
        />

        <div className="space-y-4">
          <AuthField
            id="forgotPhone"
            name="forgotPhone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            label="Mobile number"
            leftSlot="+91"
            placeholder="10-digit mobile number"
            maxLength={10}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />

          <button type="button" onClick={() => sendCode()} disabled={sending} className={primaryButton}>
            {sending ? "Sending..." : "Send code"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-[var(--color-primary)] hover:underline"
            onClick={onBack}
          >
            {context === "profile" ? "Cancel" : "← Back to login"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AuthHeader
        badge="Step 2 of 2"
        title="Enter the code"
        subtitle={`If that number has an account, a code is on its way to +91 ${phone}`}
      />

      <div className="mb-5 flex items-center gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-full border border-[var(--color-accent-gold)] px-2.5 py-1 text-xs font-semibold text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)] hover:text-white"
          onClick={() => setStep("phone")}
        >
          Change number
        </button>
      </div>

      <div className="mb-5">
        <OtpInputGroup value={otp} onChange={setOtp} hasError={false} />
      </div>

      <div className="mb-5 text-center text-sm text-[var(--color-text-muted)]" aria-live="polite">
        {resendTimer > 0 ? (
          <span>
            Resend code in <span className="font-semibold text-[var(--color-primary)]">{formatTime(resendTimer)}</span>
          </span>
        ) : (
          <button
            type="button"
            className="cursor-pointer font-semibold text-[var(--color-accent-gold)] hover:text-[var(--color-primary-dark)]"
            onClick={() => sendCode(true)}
          >
            Resend code
          </button>
        )}
      </div>

      <SetPasswordForm
        submitLabel={context === "profile" ? "Save password" : "Save and log in"}
        onSubmit={async (password) => {
          try {
            const res: any = await postData("auth/password/set", {
              phone,
              otp: otp.join(""),
              password,
            });
            toast.success("Password updated");
            onDone(res?.data?.token, res?.data?.user);
          } catch (err: any) {
            toast.error(err?.response?.data?.message || "Invalid or expired code");
          }
        }}
      />

      <div className="mt-4 text-center">
        <button
          type="button"
          className="cursor-pointer text-xs font-semibold text-[var(--color-primary)] hover:underline"
          onClick={onBack}
        >
          {context === "profile" ? "Cancel" : "← Back to login"}
        </button>
      </div>
    </div>
  );
}
