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
		await getData(`/get-user/${userData?.id}`).then((res:any)=>{
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
        <>
            <section className="teams">
                <div className="container">
                    <h1 className="attriheading">Teams</h1>
                    <div className="teams-main padding-tb">
                        <div className="custom-tab d-flex justify-center">
                            <div className={toggleState === 1 ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(1)}>All Teams</div>
                            <div className={toggleState === 2 ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(2)}>My Teams</div>
                        </div>
                        <div className="latest-content">
                            <div className={toggleState === 1 ? "content-tab active" : "content-tab"}>
                            {teamData?.user?.referralsByLevel?.length > 0 && teamData?.user?.referralsByLevel?.map((item:any,index:number)=>{
							return <div className="team-card d-flex align" key={index}>
								<div className="attrixsheading">Level {item?.level}</div>
								<div className="team-num">{item?.referrals?.length}</div>
							</div>
						})}
                            </div>

                            <div className={toggleState === 2 ? "content-tab active" : "content-tab"}>
                                {teamData?.user?.referralFamily?.length > 0 && teamData?.user?.referralFamily?.map((item:any,index:number)=>{
							return <div className="team-card myteams-card d-flex align" key={index}>
								<div className="attrixsheading">{item?.username}</div>
								<div className="attrixsheading">{item?.phone}</div>
							</div>
						})}
                        {teamData?.user?.referralFamily?.length === 0 && <div className="no-family">No family members found</div>}
                            </div>

                        </div>
                        {isLoading && <div className="flex justify-center items-center h-[70vh]">
              <div className="line-loader">
              <span className="line-loader-text">loading</span>
              <span className="line-load"></span>
            </div>
          </div>}
                    </div>
                </div>
            </section>
        </>
  );
}