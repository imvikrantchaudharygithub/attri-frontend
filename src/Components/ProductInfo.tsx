import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import OfferSection from "./OfferSection";
export default function ProductInfo({ProductDetails}:any){
    return (
        <div className="pdp-info">
            <h1 className="attrimdheading">{ProductDetails?.name}</h1>
            <div className="info-tags-list d-flex justify-content">
                <div className="info-tag dflex align">
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 14 14"><path fill="#000" d="M7 14A7 7 0 107 0a7 7 0 000 14z"></path><path stroke="#fff" stroke-width="1.4" d="M3.01 6.694l1.92 2.398 5.642-4.422"></path></svg>
                    </span>
                    No Maltodextrin
                </div>
                <div className="info-tag dflex align">
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 14 14"><path fill="#000" d="M7 14A7 7 0 107 0a7 7 0 000 14z"></path><path stroke="#fff" stroke-width="1.4" d="M3.01 6.694l1.92 2.398 5.642-4.422"></path></svg>
                    </span>
                    No Added Sugar
                </div>
                <div className="info-tag dflex align">
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 14 14"><path fill="#000" d="M7 14A7 7 0 107 0a7 7 0 000 14z"></path><path stroke="#fff" stroke-width="1.4" d="M3.01 6.694l1.92 2.398 5.642-4.422"></path></svg>
                    </span>
                    US Clean Label Certified
                </div>
            </div>
            <div className="addcartinfo dflex">
                <div className="product-star d-flex align">
                    {ProductDetails?.rating ? ProductDetails?.rating : 0}
                    <span className="filledicon">
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                    </span>
                    <span className="filledicon">
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                    </span>
                    <span className="filledicon">
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                    </span>
                    <span className="filledicon">
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                    </span>
                    <span className="emptyicon">
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                    </span>    
                </div>
                <div className="product-stories">
                    3571 Customer Stories
                </div>
                <div className="productSold">5L+ Units Sold</div>
            </div>
            <div className="product-price">
                <div className="price-info dflex align">
                    <span>MRP:</span>
                    <span>₹{ProductDetails?.mrp}</span>
                    ₹{ProductDetails?.price}
                    <span className="off-tag">{ProductDetails?.discount}% OFF</span>
                </div>
                <p>Inclusive of all taxes</p>
            </div>
            <button className="anchor-button hovertime">Add To Bag</button>
            <div className="service-list dflex align justify-center">
                <div className="service-card dflex align justify-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none" viewBox="0 0 41 41"><path fill="#F1F2DA" d="M.003 20.79V16.9C.12 12.792 2.31 9.687 4.93 6.902c2.97-3.16 6.606-5.311 10.78-6.46C16.776.15 17.882.097 18.97.062c3.905-.127 7.804-.231 11.462 1.611 4.662 2.348 8.27 5.671 10.022 10.8.396 1.158.329 2.377.46 3.57.018.17-.046.355.086.505v5.126c-.18.89-.205 1.804-.228 2.702-.052 2.015-.808 3.733-2.034 5.235-2.308 2.829-4.542 5.79-7.74 7.643-3.746 2.175-7.725 3.58-12.144 3.736-5.71.2-10.177-2.241-14.023-6.197C2.7 32.6 1.617 29.822.851 26.868.33 24.862.272 22.816 0 20.788l.003.002z"></path><path fill="#095933" d="M10.973 24.133c.74.53 1.746-.124 1.561-1.016l-.417-2.009a1 1 0 01.776-1.182l9.35-1.94a1 1 0 00.779-1.168l-.156-.806a1 1 0 00-1.185-.79l-9.36 1.942a1 1 0 01-1.183-.776l-.413-1.995c-.185-.892-1.369-1.092-1.837-.311l-3.116 5.196a1 1 0 00.276 1.327l4.925 3.528zM31.986 27.281c-.468.781-1.652.58-1.837-.311l-.417-2.009a1 1 0 00-1.182-.776l-9.35 1.94a1 1 0 01-1.179-.763l-.177-.801a1 1 0 01.773-1.196l9.36-1.941a1 1 0 00.776-1.183l-.413-1.995c-.185-.891.82-1.546 1.561-1.016l4.925 3.528a1 1 0 01.275 1.327l-3.115 5.196z"></path></svg>
                    <div className="attrixxsheading">Easy Returns</div>
                </div>
                <div className="service-card dflex align justify-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="42" fill="none" viewBox="0 0 41 42"><path fill="#F1F2DA" d="M.003 21.29V17.4C.12 13.292 2.31 10.187 4.93 7.402c2.97-3.16 6.606-5.311 10.78-6.46C16.776.65 17.882.597 18.97.562 22.875.434 26.774.33 30.432 2.172c4.662 2.348 8.27 5.671 10.022 10.8.396 1.158.329 2.377.46 3.57.018.17-.046.355.086.505v5.126c-.18.89-.205 1.804-.228 2.702-.052 2.015-.808 3.733-2.034 5.235-2.308 2.829-4.542 5.79-7.74 7.643-3.746 2.175-7.725 3.58-12.144 3.736-5.71.2-10.177-2.241-14.023-6.197C2.7 33.1 1.617 30.322.851 27.368.33 25.362.272 23.316 0 21.288l.003.002z"></path><path fill="#095933" d="M13.747 13.843a2 2 0 012.187-1.794l13.932 1.37a2 2 0 011.795 2.187l-.784 7.962a2 2 0 01-2.186 1.794l-13.933-1.37a2 2 0 01-1.794-2.187l.783-7.962zm8.859 1.877a3 3 0 11-.588 5.971 3 3 0 01.588-5.971zm-3.315-1.331c-.863-.085-1.614.646-2.285 1.196-.67.55-1.533 1.144-1.618 2.008l-.084.854c-.085.864.646 1.614 1.196 2.285.55.67 1.144 1.534 2.008 1.618l6.825.672c.864.085 1.614-.646 2.285-1.196.67-.55 1.534-1.144 1.619-2.008l.084-.854c.085-.863-.646-1.614-1.197-2.285-.55-.67-1.144-1.533-2.007-1.618l-6.826-.672zm-9.818 2.048a1 1 0 011.99.196l-.685 6.966a2 2 0 001.794 2.187l12.938 1.273a1 1 0 11-.196 1.99L10.386 27.58a2 2 0 01-1.795-2.186l.882-8.957z"></path></svg>
                    <div className="attrixxsheading">COD Available</div>
                </div>
                <div className="service-card dflex align justify-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" fill="none" viewBox="0 0 39 39"><path fill="#F1F2DA" d="M38.561 21.605c.665 14.213-16.442 20.436-27.025 14.872-11.984-6.3-13.418-18.239-7.075-29.091C7.747 1.76 17.381-.738 23.724 1.092c9.738 2.819 16.239 11.913 14.837 20.513z"></path><path fill="#095933" d="M11.033 23.592a.654.654 0 01-.656-.244l-.075-.1a.85.85 0 01.5-1.344l2.975-.63a.85.85 0 00-.352-1.663l-4.02.852a.85.85 0 01-.352-1.662l5.64-1.195a.85.85 0 10-.353-1.663l-6.601 1.4a.85.85 0 01-.352-1.663l1.546-.328c.54-.114.863-.66.98-1.2a2.27 2.27 0 01.279-.704 2.077 2.077 0 011.34-.963l11.565-2.45a1 1 0 011.185.772l.525 2.476a1 1 0 001.185.77l1.651-.349a1 1 0 01.887.244l3.461 3.201a1 1 0 01.3.527l.9 4.252a1 1 0 01-.77 1.185l-.135.029c-.54.114-.87.65-.909 1.201a3.443 3.443 0 01-.49 1.552 3.115 3.115 0 01-2.01 1.443 3.116 3.116 0 01-2.424-.504 3.444 3.444 0 01-1.076-1.22c-.26-.487-.778-.844-1.319-.729l-2.224.471c-.54.115-.87.65-.909 1.202a3.444 3.444 0 01-.49 1.55 3.116 3.116 0 01-2.01 1.444A3.116 3.116 0 0116 29.048a3.443 3.443 0 01-1.076-1.219c-.26-.488-.778-.844-1.319-.73l-.133.029a1 1 0 01-1.186-.771l-.479-2.261a.654.654 0 00-.775-.504zm17.492 2.084a1.558 1.558 0 001.005-.722c.228-.374.304-.832.21-1.273a1.753 1.753 0 00-.708-1.078c-.36-.25-.796-.34-1.212-.252a1.557 1.557 0 00-1.005.722 1.752 1.752 0 00-.21 1.273c.093.44.348.828.708 1.078.36.25.796.34 1.212.252zm-.168-9.972a1 1 0 00-.871-.23l-1.141.242a1 1 0 00-.771 1.186l.172.814a1 1 0 001.186.77l1.743-.369a1 1 0 00.456-1.726l-.774-.687zM18.073 27.89a1.558 1.558 0 001.005-.722c.228-.374.304-.831.21-1.272a1.752 1.752 0 00-.708-1.079c-.36-.249-.796-.34-1.212-.252a1.558 1.558 0 00-1.005.722 1.753 1.753 0 00-.21 1.273c.093.44.348.829.708 1.078.36.25.796.34 1.212.252z"></path></svg>
                    <div className="attrixxsheading">Delivery in 3 Days</div>
                </div>
            </div>
            <OfferSection></OfferSection>
            <div className="pdp-info-text">
                <h2 className="attrimdheading">Lorem ipsum dolor</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium distinctio quos molestiae cumque vero! Praesentium, maxime quibusdam fugiat porro placeat debitis possimus necessitatibus ab ea adipisci inventore laborum explicabo illum!</p>
            </div>
        </div>
    );
}