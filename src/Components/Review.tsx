import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "@/styles/review.css";
import ReviewCard from "./ReviewCard";
export default function Review(){
    const reviewslider = {
		dots: false,
		arrows: true,
		infinite: false,
		slidesToShow: 3,
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
        <section className="review bg-gray padding-tb">
            <div className="container">
                <div className="heading-top text-center">
                    <h5 className="attriheading">Real People, Real Results</h5>
                </div>
                <div className="slider-btn slider-height slider-rl">
                    <Slider className="reviewslider" {...reviewslider}>
                        <div className="item">
                            <ReviewCard></ReviewCard>
                        </div>
                        <div className="item">
                            <ReviewCard></ReviewCard>
                        </div>
                        <div className="item">
                            <ReviewCard></ReviewCard>
                        </div>
                        <div className="item">
                            <ReviewCard></ReviewCard>
                        </div>
                    </Slider>
                </div>
            </div>
        </section>
    );
}