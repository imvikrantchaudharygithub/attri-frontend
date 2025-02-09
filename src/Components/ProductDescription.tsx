import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { SetStateAction, useState } from "react";
export default function ProductDescription(){
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
                                <div className="card">
                                    <div className="card-thumb">
                                        <Image width={160} height={160} className="" src={'/assets/images/product.jpg'} alt=""></Image>
                                    </div>
                                    <div className="card-content">
                                        <div className="attrixsheading">Brown Rice & Green Peas</div>
                                        <p>20G Premium Plant Protein</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-thumb">
                                        <Image width={160} height={160} className="" src={'/assets/images/product.jpg'} alt=""></Image>
                                    </div>
                                    <div className="card-content">
                                        <div className="attrixsheading">Brown Rice & Green Peas</div>
                                        <p>20G Premium Plant Protein</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-thumb">
                                        <Image width={160} height={160} className="" src={'/assets/images/product.jpg'} alt=""></Image>
                                    </div>
                                    <div className="card-content">
                                        <div className="attrixsheading">Brown Rice & Green Peas</div>
                                        <p>20G Premium Plant Protein</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-thumb">
                                        <Image width={160} height={160} className="" src={'/assets/images/product.jpg'} alt=""></Image>
                                    </div>
                                    <div className="card-content">
                                        <div className="attrixsheading">Brown Rice & Green Peas</div>
                                        <p>20G Premium Plant Protein</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={toggleState === 2 ? "content-tab active" : "content-tab"}>
                            <div className="table-responsive product-table">
                                <table className="table table-bordered table_custom_wrap">
                                    <tbody>
                                        <tr>
                                            <td colSpan={1}>Product Name</td>
                                            <td colSpan={2}>Super Woman 20G Plant Protein</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={1}>Product Name</td>
                                            <td colSpan={2}>Super Woman 20G Plant Protein</td>
                                        </tr>
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