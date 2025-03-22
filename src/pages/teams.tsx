import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";

export default function Teams() {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index: SetStateAction<number>) => {
        setToggleState(index);
    }
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
                                <div className="team-card d-flex align">
                                    <div className="attrixsheading">Level 1</div>
                                    <div className="team-num">30</div>
                                </div>
                                <div className="team-card d-flex align">
                                    <div className="attrixsheading">Level 1</div>
                                    <div className="team-num">30</div>
                                </div>
                            </div>

                            <div className={toggleState === 2 ? "content-tab active" : "content-tab"}>
                                <div className="team-card myteams-card d-flex align">
                                    <div className="attrixsheading">Vikrant</div>
                                    <div className="team-num">9999999999</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
  );
}