"use client";
import { useMemo, useState } from "react";
import { EarnProduct, LEVEL_PERCENTS, commissionAt, formatInr } from "@/lib/earnPlan";
import type { EarnCopy } from "@/lib/earnCopy";

interface EarningsCalculatorProps {
  products: EarnProduct[];
  copy: EarnCopy["calc"];
}

/**
 * Illustrates a month of earnings from two inputs the creator controls:
 * how many followers buy, and how many people each of those followers goes
 * on to refer. Only levels 1 and 2 are modelled on purpose — it keeps the
 * numbers honest and the controls understandable. Levels 3–7 are called out
 * in copy, not invented here.
 */
export default function EarningsCalculator({ products, copy }: EarningsCalculatorProps) {
  const [productIdx, setProductIdx] = useState(() => {
    const i = products.findIndex((p) => p.slug === "onion-shampoo");
    return i >= 0 ? i : 0;
  });
  const [directBuyers, setDirectBuyers] = useState(10);
  const [teamBuyers, setTeamBuyers] = useState(2);

  const product = products[productIdx] ?? products[0];
  const d = product?.distribution ?? 0;

  const totals = useMemo(() => {
    const level1 = directBuyers * commissionAt(1, d);
    const level2 = directBuyers * teamBuyers * commissionAt(2, d);
    return { level1, level2, total: level1 + level2 };
  }, [directBuyers, teamBuyers, d]);

  if (!product) return null;

  const teamSales = directBuyers * teamBuyers;
  const restPercents = LEVEL_PERCENTS.slice(2).join("%, ") + "%";

  return (
    <div className="grid gap-6 rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-card md:grid-cols-[1.1fr,1fr] md:p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="ei-product" className="mb-2 block text-sm font-semibold text-[#3D3C3C]">
            {copy.productLabel}
          </label>
          <select
            id="ei-product"
            className="ei-select"
            value={productIdx}
            onChange={(e) => setProductIdx(Number(e.target.value))}
          >
            {products.map((p, i) => (
              <option key={p.slug} value={i}>
                {copy.option(p.name, formatInr(p.distribution))}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <label htmlFor="ei-direct" className="text-sm font-semibold text-[#3D3C3C]">
              {copy.directLabel}
            </label>
            <span className="ei-money text-lg text-[#8B35B8]">{directBuyers}</span>
          </div>
          <input
            id="ei-direct"
            className="ei-range"
            type="range"
            min={1}
            max={100}
            step={1}
            value={directBuyers}
            onChange={(e) => setDirectBuyers(Number(e.target.value))}
            aria-valuetext={copy.buyersValue(directBuyers)}
          />
          <div className="mt-1 flex justify-between text-[11px] text-[#9CA3AF]">
            <span>1</span>
            <span>100</span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <label htmlFor="ei-team" className="text-sm font-semibold text-[#3D3C3C]">
              {copy.teamLabel}
            </label>
            <span className="ei-money text-lg text-[#8B35B8]">{teamBuyers}</span>
          </div>
          <input
            id="ei-team"
            className="ei-range"
            type="range"
            min={0}
            max={20}
            step={1}
            value={teamBuyers}
            onChange={(e) => setTeamBuyers(Number(e.target.value))}
            aria-valuetext={copy.referredValue(teamBuyers)}
          />
          <div className="mt-1 flex justify-between text-[11px] text-[#9CA3AF]">
            <span>0</span>
            <span>20</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-[#FAF9FF] p-5 md:p-6" aria-live="polite">
        <div>
          <p className="text-sm text-[#6B7280]">{copy.monthOnPaper}</p>
          <p className="ei-money mt-1 text-4xl text-[#1A1A1A] md:text-5xl">{formatInr(totals.total)}</p>
        </div>
        <dl className="mt-5 grid gap-3 text-sm">
          <div className="flex items-start justify-between gap-4 border-t border-[#E9D5FF] pt-3">
            <dt className="text-[#4B5563]">{copy.level1Line(directBuyers, formatInr(commissionAt(1, d)))}</dt>
            <dd className="ei-money whitespace-nowrap text-[#A07810]">{formatInr(totals.level1)}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-[#E9D5FF] pt-3">
            <dt className="text-[#4B5563]">{copy.level2Line(teamSales, formatInr(commissionAt(2, d)))}</dt>
            <dd className="ei-money whitespace-nowrap text-[#8B35B8]">{formatInr(totals.level2)}</dd>
          </div>
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-[#6B7280]">{copy.disclaimer(restPercents)}</p>
      </div>
    </div>
  );
}
