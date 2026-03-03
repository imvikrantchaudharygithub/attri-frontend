import { useMemo, useRef } from "react";

type OtpInputGroupProps = {
  value: string[];
  length?: number;
  onChange: (nextValue: string[]) => void;
  hasError?: boolean;
};

export default function OtpInputGroup({ value, length = 4, onChange, hasError = false }: OtpInputGroupProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const normalizedValue = useMemo(() => {
    const next = Array.from({ length }).map((_, index) => value[index] ?? "");
    return next;
  }, [length, value]);

  const setDigit = (index: number, digit: string) => {
    const next = [...normalizedValue];
    next[index] = digit;
    onChange(next);
  };

  const moveFocus = (index: number) => {
    refs.current[index]?.focus();
    refs.current[index]?.select();
  };

  return (
    <div className="flex justify-center gap-2.5 md:gap-3">
      {normalizedValue.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            refs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          aria-label={`OTP digit ${index + 1}`}
          className={`h-14 w-12 rounded-xl border-2 text-center text-xl font-semibold text-[var(--color-text-primary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-glow)] md:w-14 ${
            hasError ? "border-[var(--color-error)]" : "border-[var(--color-border)] focus:border-[var(--color-primary)]"
          }`}
          onChange={(event) => {
            const nextValue = event.target.value.replace(/\D/g, "");
            setDigit(index, nextValue);
            if (nextValue && index < length - 1) {
              moveFocus(index + 1);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !normalizedValue[index] && index > 0) {
              moveFocus(index - 1);
            }
            if (event.key === "ArrowLeft" && index > 0) {
              event.preventDefault();
              moveFocus(index - 1);
            }
            if (event.key === "ArrowRight" && index < length - 1) {
              event.preventDefault();
              moveFocus(index + 1);
            }
          }}
          onPaste={(event) => {
            event.preventDefault();
            const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");
            if (!digits.length) return;

            const next = [...normalizedValue];
            digits.forEach((item, offset) => {
              const targetIndex = index + offset;
              if (targetIndex < length) {
                next[targetIndex] = item;
              }
            });
            onChange(next);

            const nextFocusIndex = Math.min(index + digits.length, length - 1);
            moveFocus(nextFocusIndex);
          }}
        />
      ))}
    </div>
  );
}
