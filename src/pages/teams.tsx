import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { getData } from "@/services/apiServices";
import { useSelector } from "react-redux";
export default function Teams() {
    const [toggleState, setToggleState] = useState(1);
    const [teamData, setTeamData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const toggleTab = (index: SetStateAction<number>) => {
        setToggleState(index);
    }
    const userData = useSelector((state: any) => state.user);
    const getTeamData = async () => {
        setIsLoading(true);
		await getData(`get-user/${userData?.id}`).then((res:any)=>{
			console.log(res);
			setTeamData(res?.data);
			// console.log(res?.data);
		}).catch((err:any)=>{
			console.log(err);
		}).finally(()=>{
			setIsLoading(false);
		})
	}
	useEffect(() => {
		getTeamData();
	}, []);

	// Total downline across all 7 levels — derived from data already fetched (no extra call).
	const levels = teamData?.user?.referralsByLevel || [];
	const totalTeam = levels.reduce((sum: number, lvl: any) => sum + (lvl?.referrals?.length || 0), 0);
	const directCount = levels.find((l: any) => l?.level === 1)?.referrals?.length || 0;
	const activeLevels = levels.filter((l: any) => (l?.referrals?.length || 0) > 0).length;

	return (
        <section className="bg-[#FAF9FF] min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-2xl font-bold text-[#8B35B8] font-heading italic mb-6">My Teams</h1>

                {/* Total team summary — always visible above the tabs */}
                {isLoading ? (
                    <div className="h-[88px] rounded-2xl skeleton mb-6" />
                ) : (
                    <div className="relative overflow-hidden rounded-2xl mb-6 p-5 bg-gradient-to-br from-[#8B35B8] to-[#5C1F82] shadow-[0_8px_24px_rgba(139,53,184,0.25)]">
                        <div className="absolute -right-6 -top-8 w-28 h-28 rounded-full bg-white/10" />
                        <div className="absolute right-10 -bottom-10 w-24 h-24 rounded-full bg-[#D4A847]/20" />
                        <div className="relative flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">Total Team Members</p>
                                <div className="flex items-end gap-2 mt-1">
                                    <span className="text-4xl font-extrabold text-white leading-none">{totalTeam}</span>
                                    <span className="text-xs text-white/70 mb-0.5">across 7 levels</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="text-center bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[64px]">
                                    <div className="text-lg font-bold text-white leading-none">{directCount}</div>
                                    <div className="text-[10px] text-white/70 mt-1">Direct</div>
                                </div>
                                <div className="text-center bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[64px]">
                                    <div className="text-lg font-bold text-[#F2D98D] leading-none">{activeLevels}<span className="text-white/60 text-xs font-semibold">/7</span></div>
                                    <div className="text-[10px] text-white/70 mt-1">Active Levels</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex bg-white rounded-xl p-1 shadow-card border border-[#E5E7EB] mb-6">
                    {["All Teams", "My Team"].map((label, i) => (
                        <button
                            key={label}
                            onClick={() => toggleTab(i + 1)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                toggleState === i + 1
                                    ? "bg-[#8B35B8] text-white shadow-sm"
                                    : "text-[#6B7280] hover:text-[#8B35B8]"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-16 bg-white rounded-xl skeleton" />
                        ))}
                    </div>
                ) : (
                    <>
                        {toggleState === 1 && (
                            <div className="space-y-3">
                                {teamData?.user?.referralsByLevel?.length > 0 ? (
                                    teamData.user.referralsByLevel.map((item: any, index: number) => (
                                        <div key={index} className="bg-white rounded-xl px-5 py-4 shadow-card border border-[#E5E7EB] flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#8B35B8]/10 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-[#8B35B8]">L{item?.level}</span>
                                                </div>
                                                <span className="font-medium text-[#1A1A1A] text-sm">Level {item?.level}</span>
                                            </div>
                                            <div className="bg-[#D4A847]/10 text-[#3F3F46] px-3 py-1 rounded-full text-sm font-bold">
                                                {item?.referrals?.length} members
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-16 text-[#9CA3AF]">
                                        <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-sm">No team data found</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {toggleState === 2 && (
                            <div className="space-y-3">
                                {teamData?.user?.referralFamily?.length > 0 ? (
                                    teamData.user.referralFamily.map((item: any, index: number) => (
                                        <div key={index} className="bg-white rounded-xl px-5 py-4 shadow-card border border-[#E5E7EB] flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-[#8B35B8] flex items-center justify-center text-white text-sm font-bold">
                                                    {item?.username?.charAt(0)?.toUpperCase() || "?"}
                                                </div>
                                                <span className="font-medium text-[#1A1A1A] text-sm">{item?.username}</span>
                                            </div>
                                            <span className="text-xs text-[#9CA3AF] font-mono">{item?.phone}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-16 text-[#9CA3AF]">
                                        <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-sm">No family members found</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
  );
}