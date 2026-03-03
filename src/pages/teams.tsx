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
	return (
        <section className="bg-[#FAF9FF] min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-2xl font-bold text-[#8B35B8] font-heading italic mb-6">My Teams</h1>

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