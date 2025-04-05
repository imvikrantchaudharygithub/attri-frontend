import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
export default function WhyAttri({gallery , productname}:any){
    return (
        <>
            <section className="why-box bg-gray padding-tb">
                <div className="container">
                    <div className="heading-top white-top">
                        <h2 className="attriheading">Why {productname} ?</h2>
                    </div>
                    <div className="why-main d-flex align">
                        {gallery?.map((item:any , index:number)=>(
                        <div key={index} className="why-card d-grid align">
                            <div className="why-icon">
                                <Image width={600} height={600} className="w-full" src={item?.image} alt=""></Image>
                            </div>
                            <div className="why-content">
                                <div className="attrixxsheading">{item?.title}</div>
                                <p>{item?.description}</p>
                            </div>
                        </div>
                       
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}