import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { useState } from "react";
export default function PlpProductSlider({productimages}:any){
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
            
            <Slider className="productslider" {...productslider} asNavFor={nav2} ref={(slider1:any) => setNav1(slider1)}>
               {productimages?.map((image:any,index:number)=>(
                <div key={index} className="item">
                    <div className="plp-slider">
                        <Image width={600} height={600} className="w-full" src={image ? image : '/assets/images/new-banner.jpg'} alt=""/>
                    </div>
                </div>
               ))}
            </Slider>
            <div className="slider-btn slider-rl">
                <Slider className="productnavslider" {...productnavslider} asNavFor={nav1} ref={(slider2:any) => setNav2(slider2)}>
                    {productimages?.map((image:any,index:number)=>(
                    <div key={index} className="item">
                        <div className="plp-slider">
                            <Image width={600} height={600} className="w-full" src={image ? image : '/assets/images/new-banner.jpg'} alt=""/>
                        </div>
                    </div>
                    ))}
                </Slider>
            </div>
            
        </div>
    );
}