import Link from "next/link";
import Image from "next/image";
export default function Nutrition(){
    return (
        <section className="nutrition padding-tb">
            <div className="container">
                <div className="heading-top text-center">
                    <h2 className="attriheading">India's Leading Plant Based Nutrition Brand</h2>
                </div>
                <div className="nutrition-main d-flex justify-center">
                    <div className="nutrition-card d-flex align justify-content">
                        <span className="nutrition-icon"></span>
                        <div className="attrixxsheading">Clean Label certified</div>
                    </div>
                    <div className="nutrition-card d-flex align justify-content">
                        <span className="nutrition-icon"></span>
                        <div className="attrixxsheading">Clean Label certified</div>
                    </div>
                    <div className="nutrition-card d-flex align justify-content">
                        <span className="nutrition-icon"></span>
                        <div className="attrixxsheading">Clean Label certified</div>
                    </div>
                </div>
            </div>
        </section>
    );
}