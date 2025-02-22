"use client"
import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
export default function BestSeller(){
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index: SetStateAction<number>) => {
        setToggleState(index);
    }
    const bestsellerslider = {
		dots: false,
		arrows: true,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
            {
				breakpoint: 1199,
				settings: {
                    arrows: true,
					slidesToShow:4,
				}
			},
			{
				breakpoint: 991,
				settings: {
                    arrows: true,
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 767,
				settings: {
					arrows: true,
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 479,
				settings: {
					arrows: true,
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	};
    return (
        <section className="bestseller padding-tb">
            <div className="container">
                <div className="heading-top d-flex">
                    <h3 className="attriheading">Best Sellers</h3>
                    <Link href='/' className="anchor-button-line hovertime">
                        Shop All
                        <span></span>
                    </Link>
                </div>
                <div className="custom-tab d-flex justify-content">
                    <div className={toggleState === 1 ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(1)}>Latest bets</div>
                    <div className={toggleState === 2 ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(2)}>High rollers</div>
                    <div className={toggleState === 3 ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(3)}>Wager contest</div>
                </div>
                <div className="latest-content">
                    <div className={toggleState === 1 ? "content-tab active" : "content-tab"}>
                        <div className="slider-btn slider-height slider-rl">
                            <Slider className="bestsellerslider" {...bestsellerslider}>
                                <div className="item">
                                    <ProductCard></ProductCard>
                                </div>
                                <div className="item">
                                    <ProductCard></ProductCard>
                                </div>
                                <div className="item">
                                    <ProductCard></ProductCard>
                                </div>
                                <div className="item">
                                    <ProductCard></ProductCard>
                                </div>
                                <div className="item">
                                    <ProductCard></ProductCard>
                                </div>
                                <div className="item">
                                    <ProductCard></ProductCard>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className={toggleState === 2 ? "content-tab active" : "content-tab"}>
                        <div className="slider-btn slider-height slider-rl">
                            <Slider className="bestsellerslider" {...bestsellerslider}>
                                <div className="item">
                                    adsf
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}