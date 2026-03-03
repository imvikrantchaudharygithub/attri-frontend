import { ReactNode } from "react";

type AuthFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  error?: string;
  leftSlot?: ReactNode;
};

export default function AuthField({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  error,
  leftSlot,
}: AuthFieldProps) {
  const hasError = Boolean(error);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[var(--color-text-primary)]">
        {label}
      </label>
      <div className="relative">
        {leftSlot ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--color-text-secondary)]">
            {leftSlot}
          </span>
        ) : null}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-[var(--color-text-primary)] transition-all duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-glow)] ${
            leftSlot ? "pl-12" : ""
          } ${hasError ? "border-[var(--color-error)] bg-red-50/50" : "border-[var(--color-border)]"}`}
        />
      </div>
      {hasError ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-[var(--color-error)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
