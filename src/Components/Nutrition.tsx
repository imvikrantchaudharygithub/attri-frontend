import Link from "next/link";
import Image from "next/image";
export default function Nutrition({data}:any){
    return (
        <section className="nutrition padding-tb">
            <div className="container">
                <div className="heading-top text-center">
                    <h2 className="attriheading">{data?.title}</h2>
                </div>
                <div className="nutrition-main d-flex justify-center">
                    {data?.gallery?.map((item: any, index: number) => (
                        <div className="nutrition-card d-flex align justify-content" key={index}>
                            <div className="nutrition-icon">
                                <Image width={50} height={50} className="w-full" src={item.image} alt={item.title} />
                            </div>
                            <div className="attrixxsheading">{item.title}</div>
                        </div>
                    ))}

                    <div className="nutrition-card d-flex align justify-content">
                        <span className="nutrition-icon"></span>
                        <div className="attrixxsheading">Clean Label certified</div>
                    </div>
                  
                </div>
            </div>
        </section>
    );
}