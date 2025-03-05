import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "@/styles/newproduct.css";
export default function NewProduct({categoryData}:any){
    const newproductslider = {
		dots: false,
		arrows: true,
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
            {
				breakpoint: 1399,
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
        <section className="newproduct">
            <div className="container">
                <div className="newproduct-main d-flex">
                    <div className="newproduct-left relative">
                        <Image width={676} height={548} className="w-full" src={categoryData?.image ? categoryData?.image : '/assets/images/new-banner.jpg'} alt=""></Image>
						<Link href={`/category/${categoryData?.slug}`} className="anchor-button hovertime">
							SHOP ALL
						</Link>
                    </div>
                    <div className="newproduct-right">
                        <div className="slider-btn slider-height slider-rl">
                            <Slider className="newproductslider" {...newproductslider}>
							{categoryData?.products && categoryData?.products.length > 0 ? (
                                    categoryData?.products.map((product:any) => (
                                        <div className="item" key={product?._id || Math.random()}>
                                            <ProductCard product={product} category={categoryData?.name}></ProductCard>
                                        </div>
                                    ))
                                ) : (
                                    <div className="item">No products available in this category</div>
                                )}
                               
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}