import Link from "next/link";
import Image from "next/image";
// import "@/styles/review.css";
export default function ReviewCard(){
    return (
        <div className="review-card text-center">
            <div className="review-thumb">
                <Image width={256} height={256} className="w-full" src={'/assets/images/product.jpg'} alt=""></Image>
            </div>
            <div className="quote-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" fill="none" viewBox="0 0 22 12"><path fill="#820906" d="M0 12a22.96 22.96 0 011.694-6.62C2.58 3.294 3.724 1.501 5.128 0h6.136c-1.1 1.594-2 3.479-2.702 5.655C7.891 7.801 7.51 9.915 7.418 12H0zm10.165 0a22.96 22.96 0 011.694-6.62c.885-2.085 2.03-3.878 3.434-5.38h6.136c-1.1 1.594-2 3.479-2.702 5.655-.672 2.146-1.053 4.26-1.145 6.345h-7.417z"></path></svg>
            </div>
            <div className="attrismheading">Life changing ACV</div>
            <p>Plix has changed the way I will consume ACV forever! All the benefits of liquid ACV with the additional nutrition of Vitamins and Superfoods. The effervescent formula makes it absolutely convenient and a fun way to consume apple cider vinegar.</p>
            <div className="username">Tanya</div>
            <div className="review-star d-flex justify-center">
                <svg className="star-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="star-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="star-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="star-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            </div>
        </div>
    );
}