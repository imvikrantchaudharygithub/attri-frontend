"use client";

/**
 * Full-page skeletons shown during navigation to SSR-heavy routes (home, category)
 * so the UI switches immediately instead of waiting for the server response.
 */

function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAF9FF]">
      {/* Banner strip */}
      <div className="skeleton h-64 md:h-80 w-full rounded-none" />
      <div className="container -mt-8 md:-mt-12 relative z-10 px-4">
        <div className="skeleton h-24 md:h-28 rounded-2xl w-full max-w-2xl mx-auto" />
      </div>
      {/* Section blocks */}
      <div className="container py-8 md:py-12 space-y-10 md:space-y-14">
        <div className="skeleton h-8 w-48 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton aspect-[4/3] rounded-2xl" />
          ))}
        </div>
        <div className="skeleton h-8 w-40 rounded-lg mt-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="skeleton aspect-square" />
              <div className="p-3 space-y-2">
                <div className="skeleton h-3 w-3/4 rounded" />
                <div className="skeleton h-4 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="skeleton h-8 w-56 rounded-lg mt-6" />
        <div className="skeleton h-48 rounded-2xl w-full" />
        <div className="skeleton h-6 w-32 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-40 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAF9FF]">
      {/* Hero strip */}
      <div className="border-b border-[#E5E7EB] bg-[#FAF9FF]">
        <div className="container pt-10 pb-8 sm:pt-12 sm:pb-10 md:pt-16 md:pb-14">
          <div className="skeleton h-9 w-64 md:w-80 rounded-lg max-w-2xl" />
          <div className="skeleton h-5 w-full max-w-xl mt-3 rounded" />
        </div>
      </div>
      <section className="py-8 md:py-12">
        <div className="container space-y-12">
          {[1, 2].map((block) => (
            <div key={block}>
              <div className="flex justify-between items-center mb-6">
                <div className="skeleton h-7 w-40 rounded-lg" />
                <div className="skeleton h-5 w-20 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white border border-[#E5E7EB]">
                    <div className="skeleton aspect-square" />
                    <div className="p-4 space-y-2">
                      <div className="skeleton h-4 rounded-lg" />
                      <div className="skeleton h-4 w-2/3 rounded-lg" />
                      <div className="skeleton h-5 w-1/2 rounded-lg mt-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function RouteSkeleton({ type }: { type: "home" | "category" }) {
  return type === "home" ? <HomePageSkeleton /> : <CategoryPageSkeleton />;
}
