import { LEVEL_PERCENTS, formatInr } from "@/lib/earnPlan";
import type { EarnCopy } from "@/lib/earnCopy";

interface LevelLadderProps {
  /** Distribution value of the example product, in ₹. */
  distribution: number;
  productName: string;
  copy: EarnCopy["levels"]["ladder"];
}

/**
 * The seven commission levels as proportional bars. Widths are relative to
 * level 1 (25%), so the shape of the plan is readable at a glance: front-
 * loaded, but every level pays.
 */
export default function LevelLadder({ distribution, productName, copy }: LevelLadderProps) {
  const max = LEVEL_PERCENTS[0];

  return (
    <div>
      <p className="mb-4 text-sm text-[#6B7280]">{copy.example(productName, formatInr(distribution))}</p>
      <ol className="ei-ladder" aria-label={copy.aria}>
        {LEVEL_PERCENTS.map((pct, i) => {
          const amount = (pct / 100) * distribution;
          const width = `${Math.max((pct / max) * 100, 22)}%`;
          const isYou = i === 0;
          return (
            <li key={pct} className={`ei-ladder-row${isYou ? " is-you" : ""}`}>
              <span className="text-sm font-semibold text-[#3D3C3C]">
                {copy.level(i + 1)}
                {isYou && <span className="block text-[11px] font-medium text-[#A07810]">{copy.directSale}</span>}
              </span>
              <span className="ei-ladder-bar" style={{ width }}>
                {pct}%
              </span>
              <span className="ei-ladder-amount text-[#1A1A1A]">{formatInr(amount)}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-sm text-[#6B7280]">{copy.footnote}</p>
    </div>
  );
}
