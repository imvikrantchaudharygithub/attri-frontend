import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { useState } from "react";
export default function OfferSection(){
    const [isofferDropDown, setIsOfferDropDown] = useState(false);
        const toggleOfferDropDown = () => {
        setIsOfferDropDown(!isofferDropDown);
    };
    return (
        <div className= {isofferDropDown ? "offersection active" : "offersection"}>
            <div className="offertop d-flex align" onClick={toggleOfferDropDown}>
                <div className="attrixxsheading">Available Offers</div>
                <div className="offerright d-flex align">
                    <div className="offerCount">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.11133 4.59766L5.40234 0.888672C5.24414 0.730469 5.0332 0.625 4.80469 0.625H1.21875C0.744141 0.625 0.375 1.01172 0.375 1.46875V5.07227C0.375 5.30078 0.462891 5.51172 0.621094 5.66992L4.33008 9.37891C4.66406 9.71289 5.20898 9.71289 5.52539 9.37891L9.11133 5.79297C9.44531 5.47656 9.44531 4.93164 9.11133 4.59766ZM2.34375 3.4375C1.86914 3.4375 1.5 3.06836 1.5 2.59375C1.5 2.13672 1.86914 1.75 2.34375 1.75C2.80078 1.75 3.1875 2.13672 3.1875 2.59375C3.1875 3.06836 2.80078 3.4375 2.34375 3.4375ZM11.3613 5.79297C11.6953 5.47656 11.6953 4.93164 11.3613 4.59766L7.65234 0.888672C7.49414 0.730469 7.2832 0.625 7.05469 0.625H6.19336L9.63867 4.08789C9.9375 4.38672 10.1133 4.77344 10.1133 5.19531C10.1133 5.61719 9.9375 6.02148 9.63867 6.32031L6.58008 9.37891C6.91406 9.71289 7.45898 9.71289 7.77539 9.37891L11.3613 5.79297Z" fill="#06543D"></path></svg>
                        <span>3 Offers</span>
                    </div>
                    <div className="arrow-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" fill="none" viewBox="0 0 14 8"><path fill="#095933" d="M13.5 1.563L7.531 7.28c-.187.157-.375.219-.531.219a.849.849 0 01-.531-.188l-6-5.75A.746.746 0 01.438.5.746.746 0 011.5.469L7 5.719l5.469-5.25A.746.746 0 0113.53.5a.746.746 0 01-.031 1.063z"></path></svg>
                    </div>
                </div>
            </div>
            <div className="offercontent">
                <div className="offercontent-card">
                    <div className="offercontent-top d-flex align">
                        <div className="offercontent-left dflex align">
                            <div className="attrixxsheading">Get 2 Minis Free</div>
                            <div className="Code">VDAY</div>
                        </div>
                        <span className="copy-txt">Copy</span>
                    </div>
                    <p>Buy &amp; Get 2 Minis Free on orders Rs.999+. Terms &amp; Conditions apply.</p>
                </div>
            </div>
        </div>
    );
}