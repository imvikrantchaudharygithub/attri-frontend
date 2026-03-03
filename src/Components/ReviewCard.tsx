"use client";

import { useState } from "react";
import Image from "next/image";

const TRUNCATE_LENGTH = 120;

export default function ReviewCard({ data }: any) {
  const rating = Number(data?.rating) || 5;
  const description = data?.description ?? "";
  const isLong = description.length > TRUNCATE_LENGTH;
  const [expanded, setExpanded] = useState(false);

  const showText = isLong && !expanded
    ? `${description.slice(0, TRUNCATE_LENGTH).trim()}${description.length > TRUNCATE_LENGTH ? "…" : ""}`
    : description;

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#E5E7EB] hover:border-[#D8B4FE] hover:shadow-[0_8px_32px_rgba(139,53,184,0.1)] transition-all duration-300 flex flex-col gap-4 h-full">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={i < rating ? "#D4A847" : "none"}
            stroke={i < rating ? "#D4A847" : "#D6D3D1"}
            strokeWidth="1.5"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Quote + title */}
      <div>
        <svg width="20" height="14" viewBox="0 0 22 12" fill="none" className="mb-2 opacity-30">
          <path fill="#8B35B8" d="M0 12a22.96 22.96 0 011.694-6.62C2.58 3.294 3.724 1.501 5.128 0h6.136c-1.1 1.594-2 3.479-2.702 5.655C7.891 7.801 7.51 9.915 7.418 12H0zm10.165 0a22.96 22.96 0 011.694-6.62c.885-2.085 2.03-3.878 3.434-5.38h6.136c-1.1 1.594-2 3.479-2.702 5.655-.672 2.146-1.053 4.26-1.145 6.345h-7.417z" />
        </svg>
        <h4 className="text-base font-bold text-[#3D3C3C] font-heading mb-1">{data?.title}</h4>
        <p className="text-[#6B7280] text-sm leading-relaxed">{showText}</p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-1.5 text-sm font-medium text-[#8B35B8] hover:text-[#7C2DB8] hover:underline focus:outline-none focus:ring-2 focus:ring-[#8B35B8] focus:ring-offset-1 rounded transition-colors"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Author */}
      <div className="mt-auto flex items-center gap-3 pt-3 border-t border-[#E5E7EB]">
        {data?.profilePic && (
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-[#E5E7EB]">
            <Image
              width={36}
              height={36}
              className="w-full h-full object-cover"
              src={data.profilePic}
              alt={data?.author || "Reviewer"}
            />
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-[#3D3C3C]">{data?.author}</div>
          <div className="text-xs text-[#9CA3AF]">Verified Buyer</div>
        </div>
      </div>
    </div>
  );
}
