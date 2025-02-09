import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
export default function FasterResults(){
    const fasterproductslider = {
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
					slidesToShow:6.5,
				}
			},
			{
				breakpoint: 991,
				settings: {
                    arrows: true,
					slidesToShow: 5.5,
				}
			},
			{
				breakpoint: 767,
				settings: {
					arrows: true,
					slidesToShow: 4.5,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 379,
				settings: {
					arrows: true,
					slidesToShow: 3.5,
					slidesToScroll: 1,
				}
			}
		]
	};
    return (
        <section className="faster-box padding-tb">
            <div className="container">
                <div className="heading-top">
                    <h3 className="attriheading">Faster Results With</h3>
                </div>
                <div className="slider-btn slider-height slider-rl">
                    <Slider className="fasterproductslider" {...fasterproductslider}>
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
        </section>
    );
}