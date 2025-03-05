"use client"
import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState, useEffect } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { useDispatch } from 'react-redux';


export default function BestSeller({data}:any){
    
    // Safe initialization with fallback to null if data is empty
    const [toggleState, setToggleState] = useState(null);
    const [activeProducts, setActiveProducts] = useState([]);
    const [activeCategoryName, setActiveCategoryName] = useState('');
    const dispatch = useDispatch();
    
    // Set initial category when component mounts or data changes
    useEffect(() => {
        if (data && data.length > 0) {
            const initialCategory = data[0]?._id;
            const initialCategoryName = data[0]?.name || '';
            setToggleState(initialCategory);
            setActiveCategoryName(initialCategoryName);
            
            // Find and set the products for the initial category
            const initialProducts = data.find((item:any) => item._id === initialCategory)?.products || [];
            setActiveProducts(initialProducts);
            console.log("Initial products set:", initialProducts);
        }
    }, [data]);
    
    const toggleTab = (index: SetStateAction<any>) => {
        console.log("Toggling to category:", index);
        setToggleState(index);
        
        // Find the selected category
        const selectedCategory = data.find((item:any)=> item._id === index);
        
        // Set the category name
        const categoryName = selectedCategory?.name || '';
        setActiveCategoryName(categoryName);
        
        // Find and set the products for the selected category
        const products = selectedCategory?.products || [];
        setActiveProducts(products);
        console.log("Products updated:", products);
        console.log("Category name:", categoryName);
    }

  
    const bestsellerslider = {
		dots: false,
		arrows: true,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
            {
				breakpoint: 1199,
				settings: {
                    arrows: true,
					slidesToShow:4,
				}
			},
			{
				breakpoint: 991,
				settings: {
                    arrows: true,
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 767,
				settings: {
					arrows: true,
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 479,
				settings: {
					arrows: true,
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	};
    
    // Let's check if we have valid data
    if (!data || data.length === 0) {
        return <div>No bestseller data available</div>;
    }
    
    return (
        <section className="bestseller padding-tb">
            <div className="container">
                <div className="heading-top d-flex">
                    <h3 className="attriheading">Best Sellers</h3>
                    <Link href='/' className="anchor-button-line hovertime">
                        Shop All
                        <span></span>
                    </Link>
                </div>
                <div className="custom-tab d-flex justify-content">
                  {data?.map((item:any)=>(  
                    <div key={item?._id} className={toggleState === item?._id ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(item?._id)}>{item?.name}</div>
                   ))}
                </div>
                <div className="latest-content">
                    <div className="content-tab active">
                        <div className="slider-btn slider-height slider-rl">
                            <Slider className="bestsellerslider" {...bestsellerslider}>
                                {activeProducts && activeProducts.length > 0 ? (
                                    activeProducts?.map((product:any) => (
                                        <div className="item" key={product?._id || Math.random()}>
                                            <ProductCard product={product} category={activeCategoryName}></ProductCard>
                                        </div>
                                    ))
                                ) : (
                                    <div className="item">No products available in this category</div>
                                )}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}