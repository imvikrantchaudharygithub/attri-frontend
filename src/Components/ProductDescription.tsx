import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { SetStateAction, useState } from "react";
export default function ProductDescription({ingredients,productinfo}:any){
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index: SetStateAction<number>) => {
        setToggleState(index);
    }
    return (
        <section className="ProductDescription padding-tb">
            <div className="container">
                <div className="heading-top">
                    <h4 className="attriheading">What's in it?</h4>
                </div>
                <div className="description-tab">
                    <div className="custom-tab d-flex justify-center">
                        <div className={toggleState === 1 ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(1)}>Main Ingredients</div>
                        <div className={toggleState === 2 ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(2)}>Product Information</div>
                    </div>
                    <div className="latest-content">
                        <div className={toggleState === 1 ? "content-tab active" : "content-tab"}>
                            <div className="description-content d-grid">
                                {ingredients?.map((ingredient:any,index:number)=>(
                                <div key={index} className="card">
                                    <div className="card-thumb">
                                        <Image width={160} height={160} className="" src={ingredient?.image} alt=""></Image>
                                    </div>
                                    <div className="card-content">
                                        <div className="attrixsheading">{ingredient?.title}</div>
                                        <p>{ingredient?.description}</p>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={toggleState === 2 ? "content-tab active" : "content-tab"}>
                            <div className="table-responsive product-table">
                                <table className="table table-bordered table_custom_wrap">
                                    <tbody>
                                        {productinfo?.map((info:any,index:number)=>(
                                        <tr key={index}>
                                            <td colSpan={1}>{info?.title}</td>
                                            <td colSpan={2}>{info?.description}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}