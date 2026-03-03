type AuthHeaderProps = {
  title: string;
  subtitle?: string;
  badge?: string;
};

export default function AuthHeader({ title, subtitle, badge }: AuthHeaderProps) {
  return (
    <div className="mb-6">
      {badge ? (
        <span className="mb-3 inline-flex rounded-full border border-[#E9D5FF] bg-[#FAF5FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#7C3AED]">
          {badge}
        </span>
      ) : null}
      <h2 className="font-heading text-2xl font-semibold leading-tight text-[var(--color-text-primary)] md:text-[28px]">
        {title}
      </h2>
      {subtitle ? <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{subtitle}</p> : null}
    </div>
  );
}
