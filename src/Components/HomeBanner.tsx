"use client"
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
export default function HomeBanner(){
    const homebannerslider = {
		dots: true,
		arrows: false,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
    return (
        <section className="home-banner">
            <Slider className="homebannerslider" {...homebannerslider}>
                <div className="item">
                    <Link href='/'>
                        <picture className="picture">
                            <source media="(max-width: 767px)"  srcSet={'/assets/images/home-banner.jpg'}/>
                            <source media="(min-width: 768px)"srcSet={'/assets/images/home-banner.jpg'}/>
                            <Image className="w-full" width={1920} height={340} src={'/assets/images/home-banner.jpg'} alt="Kurlon Hula Hula"/>
                        </picture>
                    </Link>
                </div>
                <div className="item">
                    <Link href='/'>
                        <picture className="picture">
                            <source media="(max-width: 767px)"  srcSet={'/assets/images/home-banner.jpg'}/>
                            <source media="(min-width: 768px)"srcSet={'/assets/images/home-banner.jpg'}/>
                            <Image className="w-full" width={1920} height={340} src={'/assets/images/home-banner.jpg'} alt="Kurlon Hula Hula"/>
                        </picture>
                    </Link>
                </div>
            </Slider>
        </section>
    );
}