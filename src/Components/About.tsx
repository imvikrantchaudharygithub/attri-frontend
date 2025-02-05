import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "@/styles/about.css";
export default function About(){
    const [isReadMore, setIsReadMore] = useState(false);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <section className="about">
            <div className="about-top padding-tb">
                <div className="container">
                    <div className="attriheading">About</div>
                    <p>
                        Plix is one of India's most trusted brands in the Skincare & Wellness space. As a Clean-Label Project Certified brand, we strive to bring you non-GMO, vegan, toxin-free products that you can easily add to your daily lifestyle.
                        <span className="readmore" onClick={toggleReadMore}>{isReadMore ? "Read Less" : "Read More"}</span>
                    </p>
                </div>
            </div>
            <div className= {isReadMore ? "about-mib active padding-tb" : "about-mib padding-tb"}>
                <div className="container">
                    <div className="attriheading">About Product</div>
                    <ol>
                        <li>
                            <p><strong>Skincare</strong>- Our drinkable & topical skincare products address specific concerns like pigmentation, acne marks, active acne & dullness.</p>
                            <p><strong>Skincare</strong>- Our drinkable & topical skincare products address specific concerns like pigmentation, acne marks, active acne & dullness.</p>
                        </li>
                        <li>
                            <p><strong>Skincare</strong>- Our drinkable & topical skincare products address specific concerns like pigmentation, acne marks, active acne & dullness.</p>
                        </li>
                    </ol>
                </div>
            </div>
            <div className={isReadMore ? "about-bottom active padding-tb" : "about-bottom padding-tb"}>
                <div className="container">
                    <div className="attriheading">Our Bestsellers</div>
                    <ul>
                        <li>
                            <p><strong>ACV - World’s First Apple Cider Vinegar Effervescent Tablets</strong>Plix ACV is an expert formula for weight loss, improved digestion, & enhanced immunity. It contains the “mother” which comprises beneficial bacterial strains that boost your metabolism & promote healthy weight management.</p>
                        </li>
                        <li>
                        <p><strong>ACV - World’s First Apple Cider Vinegar Effervescent Tablets</strong>Plix ACV is an expert formula for weight loss, improved digestion, & enhanced immunity. It contains the “mother” which comprises beneficial bacterial strains that boost your metabolism & promote healthy weight management.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}