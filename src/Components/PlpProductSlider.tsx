import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { useState } from "react";
export default function PlpProductSlider(){
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const productslider = {
		dots: false,
		arrows: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
    const productnavslider = {
		dots: false,
		arrows: true,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
        focusOnSelect:true,
	};
    return (
        <div className="plpslider">
            <Slider className="productslider" {...productslider} asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
                <div className="item">
                    <div className="plp-slider">
                        <Image width={600} height={600} className="w-full" src={'/assets/images/new-banner.jpg'} alt=""></Image>
                    </div>
                </div>
                <div className="item">
                    <div className="plp-slider">
                        <Image width={600} height={600} className="w-full" src={'/assets/images/new-banner.jpg'} alt=""></Image>
                    </div>
                </div>
            </Slider>
            <div className="slider-btn slider-rl">
                <Slider className="productnavslider" {...productnavslider} asNavFor={nav1} ref={(slider2) => setNav2(slider2)}>
                    <div className="item">
                        <div className="plp-slider">
                            <Image width={600} height={600} className="w-full" src={'/assets/images/new-banner.jpg'} alt=""></Image>
                        </div>
                    </div>
                    <div className="item">
                        <div className="plp-slider">
                            <Image width={600} height={600} className="w-full" src={'/assets/images/new-banner.jpg'} alt=""></Image>
                        </div>
                    </div>
                </Slider>
            </div>
            
        </div>
    );
}