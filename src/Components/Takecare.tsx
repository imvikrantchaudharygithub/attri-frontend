import Link from "next/link";
import Image from "next/image";
export default function TakeCare(){
    return (
        <section className="take bg-gray padding-tb">
            <div className="container">
                <div className="take-main d-flex">
                    <div className="take-left">
                        <h4 className="attriheading">Take care, have fun!</h4>
                        <p>We are on a mission to make nutrition fun! Taking care of yourself and having fun need not be mutually exclusive. Our flavourful blends created from clinically backed wholefood ingredients empower your mind, body and soul.</p>
                        <Link href='/' className="anchor-button d-inline cursor-pointer hovertime">
                            Learn more
                        </Link>
                    </div>
                    <div className="take-right d-flex align justify-end">
                        <div className="take-card d-flex">
                            <span className="take-icon"></span>
                            <div className="attrixxsheading">Vegan Friendly</div>
                        </div>
                        <div className="take-card d-flex">
                            <span className="take-icon"></span>
                            <div className="attrixxsheading">Clean Label Certified</div>
                        </div>
                        <div className="take-card d-flex">
                            <span className="take-icon"></span>
                            <div className="attrixxsheading">Reusable & Recyclable Packaging</div>
                        </div>
                        <div className="take-card d-flex">
                            <span className="take-icon"></span>
                            <div className="attrixxsheading">Gluten Free</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}