import Link from "next/link";
import Image from "next/image";
import "@/styles/faq.css";
import { useState } from 'react';
export default function Faq(){
    const [accordionState, setAccordionState] = useState(0);
    const accordion = (index: number) => {
        setAccordionState((prev) => (prev === index ? 0 : index));
    }
    return (
        <section className="faq-box padding-tb">
            <div className="container">
                <div className="heading-top">
                    <h4 className="attriheading">FAQs</h4>
                </div>
                <div className="faq-main">
                    <div className={accordionState === 1 ? "faq-card active" : "faq-card"}>
                        <div onClick={() => accordion(1)} className={accordionState === 1 ? "faq-card-top d-flex align" : "faq-card-top d-flex align"}>
                            <div className="attrismheading">What is L-carnitine?</div>
                            <span className="faq-arrow">
                                <svg className="faq-icon faq-down" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="48" width="48" height="48" rx="24" transform="rotate(90 48 0)" fill="#F9F9F9"></rect>
                                    <path d="M24 17L24 31" stroke="#4D4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M31 24L24 31L17 24" stroke="#4D4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <svg className="faq-icon faq-up" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="48" width="48" height="48" rx="24" transform="rotate(-90 0 48)" fill="#DA2128"></rect>
                                    <path d="M24 31L24 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 24L24 17L31 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                        <div className="faq-content">
                            <p>L-Carnitine is an amino acid-like substance synthesized by your body. This ingredient  plays a crucial role in energy production & metabolism by transporting fatty acids into the mitochondria. L-Carnitine is incorporated in supplements like Plix L-Carnitine Apple Cider Vinegar Effervescent to convert fat into energy for its potential benefits that include enhanced performance, muscle damage reduction & weight loss.</p>
                        </div>
                    </div>
                    <div className={accordionState === 2 ? "faq-card active" : "faq-card"}>
                        <div onClick={() => accordion(2)} className={accordionState === 1 ? "faq-card-top d-flex align" : "faq-card-top d-flex align"}>
                            <div className="attrismheading">What is L-carnitine?</div>
                            <span className="faq-arrow">
                                <svg className="faq-icon faq-down" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="48" width="48" height="48" rx="24" transform="rotate(90 48 0)" fill="#F9F9F9"></rect>
                                    <path d="M24 17L24 31" stroke="#4D4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M31 24L24 31L17 24" stroke="#4D4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <svg className="faq-icon faq-up" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="48" width="48" height="48" rx="24" transform="rotate(-90 0 48)" fill="#DA2128"></rect>
                                    <path d="M24 31L24 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 24L24 17L31 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                        <div className="faq-content">
                            <p>L-Carnitine is an amino acid-like substance synthesized by your body. This ingredient  plays a crucial role in energy production & metabolism by transporting fatty acids into the mitochondria. L-Carnitine is incorporated in supplements like Plix L-Carnitine Apple Cider Vinegar Effervescent to convert fat into energy for its potential benefits that include enhanced performance, muscle damage reduction & weight loss.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}