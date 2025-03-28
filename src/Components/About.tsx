import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// import "@/styles/about.css";
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
                    Established with a vision to revolutionize the way people earn and thrive, Attri Industries is a dynamic and innovative company dedicated to delivering high-quality products and unparalleled opportunities for personal and financial growth. With a strong focus on integrity, transparency, and empowerment, we've built a community of like-minded individuals who are driven to succeed and make a positive impact in their lives and the lives of others.

                        <span className="readmore" onClick={toggleReadMore}>{isReadMore ? "Read Less" : "Read More"}</span>
                    </p>
                </div>
            </div>
            <div className= {isReadMore ? "about-mib active padding-tb" : "about-mib padding-tb"}>
                <div className="container">
                    <div className="attriheading">Our Products</div>
                    <ul>
                        <li>
                            <p> Discover a diverse range of premium products carefully curated to enhance your well-being and lifestyle. From cutting-edge health supplements to eco-friendly household essentials, our product line is designed to meet the diverse needs and preferences of our customers. We take pride in sourcing the finest ingredients and delivering exceptional quality that you can trust and rely on.</p>
                        </li>
                      
                    </ul>
                </div>
            </div>
            <div className={isReadMore ? "about-bottom active padding-tb" : "about-bottom padding-tb"}>
                <div className="container">
                    <div className="attriheading">Opportunity Awaits</div>
                    <ul>
                        <li>
                            <p><strong>Joinig Attri Industries</strong> isn't just about selling products—it's about unlocking your full potential and building a thriving business on your terms. As an independent distributor, you'll have the opportunity to earn generous commissions, bonuses, and incentives while enjoying the flexibility and freedom to work on your own schedule. Whether you're a seasoned entrepreneur or new to the world of MLM, we provide the training, tools, and support you need to succeed and thrive.
                            </p> 
                        </li>
                       
                    </ul>
                </div>
            </div>
        </section>
    );
}