import Link from "next/link";

export default function Vision() {
    return (
        <div className="bg-[#FAF9FF] min-h-screen">
            {/* Hero */}
            <div className="bg-[#8B35B8] py-16 md:py-24 text-center px-4">
                <p className="text-[#D4A847] text-sm font-semibold uppercase tracking-widest mb-3">Our Purpose</p>
                <h1 className="text-3xl md:text-5xl font-bold text-white font-heading italic mb-5 max-w-3xl mx-auto">
                    Empowering Dreams, Enriching Lives
                </h1>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    Our vision is to be a catalyst for positive change, empowering people to create lives of abundance through natural products and entrepreneurship.
                </p>
                <div className="h-0.5 w-16 bg-[#D4A847] mx-auto mt-8" />
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl space-y-14">
                {/* Financial Freedom */}
                <div className="bg-white rounded-2xl p-8 shadow-card border border-[#E5E7EB]">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#8B35B8]/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-[#8B35B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#1A1A1A] font-heading italic mb-3">Financial Freedom for All</h2>
                            <p className="text-[#6B7280] leading-relaxed">
                                We provide innovative pathways to break free from traditional employment limitations,
                                offering tools and support to build successful, self-sustaining businesses. Every person
                                deserves the opportunity to grow independently.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Community */}
                <div className="bg-[#8B35B8] rounded-2xl p-8 md:p-12 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-heading italic mb-3">Collaborative Success</h3>
                    <p className="text-white/70 max-w-xl mx-auto">
                        We foster a culture where every member thrives through mutual support, creating ripples
                        of positive change across our growing network of entrepreneurs.
                    </p>
                </div>

                {/* Pillars */}
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Quality Innovations", desc: "Cutting-edge wellness solutions and lifestyle products designed to enhance daily living.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                        { title: "Ethical Foundation", desc: "Commitment to transparency and integrity in every business decision and interaction.", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
                        { title: "Sustainable Growth", desc: "Building lasting businesses grounded in natural products and community-driven entrepreneurship.", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
                    ].map((item) => (
                        <div key={item.title} className="bg-white p-6 rounded-2xl shadow-card border border-[#E5E7EB] hover:shadow-card-hover transition-shadow">
                            <div className="w-10 h-10 bg-[#D4A847]/10 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-[#D4A847]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                            </div>
                            <h3 className="text-base font-bold text-[#1A1A1A] font-heading mb-2">{item.title}</h3>
                            <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center py-10 bg-white rounded-2xl shadow-card border border-[#E5E7EB]">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] font-heading italic mb-3">Join Our Transformative Journey</h2>
                    <p className="text-[#6B7280] mb-6 max-w-lg mx-auto">
                        Discover opportunities for financial independence, personal growth, and community impact.
                    </p>
                    <Link href="/" className="inline-block bg-[#8B35B8] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#5C1F82] transition-colors">
                        Start Your Journey
                    </Link>
                </div>
            </div>
        </div>
    );
}