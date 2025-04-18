import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
// import "@/styles/review.css";
import ReviewCard from "./ReviewCard";
export default function Review({reviewData}:any){
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
					slidesToShow:2,
				}
			},
			{
				breakpoint: 991,
				settings: {
                    arrows: true,
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 767,
				settings: {
					arrows: true,
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	};
    return (
        <section className="review bg-gray padding-tb">
            <div className="container">
                <div className="heading-top text-center">
                    <h5 className="attriheading">Real People, Real Reviews</h5>
                </div>
                <div className="slider-btn slider-height slider-rl">
                    <Slider className="reviewslider" {...reviewslider}>
                        {reviewData
                            ?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            ?.map((item: any) => (
                                <div className="item" key={item._id}>
                                    <ReviewCard data={item} />
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}