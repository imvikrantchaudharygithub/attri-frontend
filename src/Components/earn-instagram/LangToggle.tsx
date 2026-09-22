import type { Lang } from "@/lib/earnCopy";

interface LangToggleProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
  ariaLabel: string;
}

/**
 * Two-way language switch. A real button group (not a checkbox) so screen
 * readers announce the current language, and each option stays tappable at
 * 44px on phones.
 */
export default function LangToggle({ lang, onChange, ariaLabel }: LangToggleProps) {
  const options: { value: Lang; label: string; langAttr: string }[] = [
    { value: "en", label: "English", langAttr: "en" },
    { value: "hi", label: "हिन्दी", langAttr: "hi" },
  ];
  return (
    <div className="ei-lang" role="group" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.langAttr}
          aria-pressed={lang === o.value}
          className={`ei-lang-btn${lang === o.value ? " is-active" : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
