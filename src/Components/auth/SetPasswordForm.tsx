import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordField from "@/Components/auth/PasswordField";
import { passwordYupSchema, confirmPasswordYupSchema } from "@/utils/passwordPolicy";

type SetPasswordFormProps = {
  onSubmit: (password: string) => Promise<void>;
  submitLabel?: string;
};

/**
 * The set/confirm pair, shared by all three journeys that write a password —
 * the login soft gate, forgot-password, and My Profile. One component means a
 * policy change lands in every one of them at once.
 *
 * Owns its own busy state via Formik's isSubmitting; callers don't pass one.
 */
export default function SetPasswordForm({ onSubmit, submitLabel = "Save password" }: SetPasswordFormProps) {
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: Yup.object({
      password: passwordYupSchema,
      confirmPassword: confirmPasswordYupSchema("password"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values.password);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <PasswordField
        id="password"
        label="New password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        showStrength
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password ? formik.errors.password : undefined}
      />

      <PasswordField
        id="confirmPassword"
        label="Confirm password"
        placeholder="Re-enter password"
        autoComplete="new-password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
      />

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#A855F7] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(139,53,184,0.28)] transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {formik.isSubmitting ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
            </svg>
            Saving...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
