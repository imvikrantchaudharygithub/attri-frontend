import { useState } from "react";
import { scorePassword, PASSWORD_MIN } from "@/utils/passwordPolicy";

type PasswordFieldProps = {
  id: string;
  /** Form field key. Defaults to `id`. See AuthField. */
  name?: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  showStrength?: boolean;
};

/** Mirrors AuthField's styling so the two sit together without seams. */
export default function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  autoComplete = "current-password",
  error,
  showStrength = false,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const hasError = Boolean(error);
  const strength = showStrength ? scorePassword(value) : null;

  const barColor = (score: number) =>
    score <= 1 ? "bg-[var(--color-error)]" : score === 2 ? "bg-[var(--color-warning)]" : "bg-[var(--color-success)]";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[var(--color-text-primary)]">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name ?? id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`h-12 w-full rounded-xl border bg-white px-4 pr-12 text-sm text-[var(--color-text-primary)] transition-all duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-glow)] ${
            hasError ? "border-[var(--color-error)] bg-red-50/50" : "border-[var(--color-border)]"
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1.5 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-glow)]"
        >
          {visible ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <path d="M1 1l22 22" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {showStrength && value ? (
        <>
          <div className="mt-2 flex gap-1" aria-hidden="true">
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                  bar <= strength!.score ? barColor(strength!.score) : "bg-[var(--color-border)]"
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-[11px] font-medium text-[var(--color-text-muted)]" aria-live="polite">
            {strength!.label}
          </p>
        </>
      ) : null}

      {showStrength && !value ? (
        <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">Use at least {PASSWORD_MIN} characters</p>
      ) : null}

      {hasError ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-[var(--color-error)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
