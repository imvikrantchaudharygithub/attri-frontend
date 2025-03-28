import Link from "next/link";
import Image from "next/image";
export default function TakeCare({data}:any){
    return (
        <section className="take bg-gray padding-tb">
            <div className="container">
                <div className="take-main d-flex">
                    <div className="take-left">
                        <h4 className="attriheading">{data?.title}</h4>
                        <p>{data?.description}</p>
                        <Link href='/' className="anchor-button d-inline cursor-pointer hovertime">
                            Learn more
                        </Link>
                    </div>
                    <div className="take-right d-flex align justify-end">
                        {data?.gallery?.map((item: any, index: number) => (
                            <div className="take-card d-flex" key={index}>
                                <div className="take-icon">
                                    <Image width={50} height={50} className="w-full" src={item.image} alt={item.title} />
                                </div>
                                <div className="attrixxsheading">{item.title}</div>
                            </div>
                        ))}
                     
                    </div>
                </div>
            </div>
        </section>
    );
}