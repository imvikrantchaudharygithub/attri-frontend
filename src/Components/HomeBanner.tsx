"use client"
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
export default function HomeBanner({bannerdata}:any){
    const homebannerslider = {
		dots: true,
		arrows: false,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
    console.log(bannerdata)
    return (
        <section className="home-banner">
            <Slider className="homebannerslider" {...homebannerslider}>
            {bannerdata?.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((item:any, index:number) => (
               <div className="item" key={index}>
                    <Link href='/'>
                        <picture className="picture">
                            <source media="(max-width: 767px)"  srcSet={item.mob_image || '/assets/images/home-banner.jpg'}/>
                            <source media="(min-width: 768px)" srcSet={item.image || '/assets/images/home-banner.jpg'}/>
                            <Image 
                                className="w-full h-auto max-h-[300px] md:max-h-[250px] object-cover" 
                                width={1920} 
                                height={340} 
                                src={item.image || '/assets/images/home-banner.jpg'} 
                                alt="Kurlon Hula Hula"
                            />
                        </picture>
                    </Link>
                </div>
            ))}
                {/* <div className="item">
                    <Link href='/'>
                        <picture className="picture">
                            <source media="(max-width: 767px)"  srcSet={'/assets/images/home-banner.jpg'}/>
                            <source media="(min-width: 768px)"srcSet={'/assets/images/home-banner.jpg'}/>
                            <Image className="w-full" width={1920} height={340} src={'/assets/images/home-banner.jpg'} alt="Kurlon Hula Hula"/>
                        </picture>
                    </Link>
                </div> */}
            </Slider>
        </section>
    );
}