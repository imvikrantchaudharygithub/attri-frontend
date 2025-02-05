import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "@/styles/newproduct.css";
export default function NewProduct(){
    const newproductslider = {
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
        <section className="newproduct">
            <div className="container">
                <div className="newproduct-main d-flex">
                    <div className="newproduct-left relative">
                        <Image width={676} height={548} className="w-full" src={'/assets/images/new-banner.jpg'} alt=""></Image>
						<Link href='/' className="anchor-button hovertime">
							SHOP ALL
						</Link>
                    </div>
                    <div className="newproduct-right">
                        <div className="slider-btn slider-height slider-rl">
                            <Slider className="newproductslider" {...newproductslider}>
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
                </div>
            </div>
        </section>
    );
}