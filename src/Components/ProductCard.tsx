import Link from "next/link";
import Image from "next/image";
// import "@/styles/product.css";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, selectCartTotal, selectCartItemCount } from '@/slices/cartSlice';
import { toast } from 'react-toastify';
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/slices/rootReduces";
import { postData } from "@/services/apiServices";
import { setCartCount } from "@/slices/loginUserSlice";
export default function ProductCard({product , category}:any){
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state?.token?.token);
    const user = useAppSelector((state: any) => state.user);
    const cartCount = useSelector((state: RootState) => state?.cartCount?.count);
    const handleAddToCart = (productitem: any) => {
        if(!token){
        dispatch(addToCart({ 
            product: productitem, 
            quantity: 1 
        }));
        toast.success('Item added to cart');
    }else{
       const data = {
        userId: user?.id,
        productId: productitem?._id,
        quantity: 1
       }
       postData('add-item',data)
       .then((res:any)=>{
        dispatch(setCartCount(cartCount + 1));
        toast.success('Item added to cart');
       })
       .catch((err:any)=>{
        toast.error('Item not added to cart');
       })
    }
    };


    return (
        <div className="product-card relative">
            <div className="product-thumb relative">
                <Link href={`/product/${product?.slug}`}>
                    <Image width={600} height={600} className="full-image hovertime" src={product?.images[0] ? product?.images[0] :  '/assets/images/product.jpg'} alt=""></Image>
                </Link>
            </div>
            <div className="product-content text-center">
                <div className="attrixxsheading text-twoline">
                    <Link href={`/product/${product?.slug}`} className="hovertime">
                        {product?.name}
                    </Link>
                </div>
                <div className="product-rating d-flex justify-center align">
                    <div className="p-rating d-flex justify-content align">
                        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 1.72633L10.3645 5.50413L10.4907 5.75999L10.7731 5.80103L14.9421 6.40682L11.9254 9.34742L11.7211 9.54659L11.7693 9.82781L12.4815 13.98L8.75256 12.0196L8.5 11.8868L8.24744 12.0196L4.51854 13.98L5.2307 9.82781L5.27893 9.54659L5.07461 9.34742L2.05786 6.40682L6.2269 5.80103L6.50927 5.75999L6.63555 5.50413L8.5 1.72633Z" fill="#FFA227" stroke="#FFA227" stroke-width="1.08547"/>
                        </svg>
                        <span>5</span>
                    </div>
                    <div className="product-tag">
                        <span>{category}</span>
                    </div>
                </div>
                {/* <div className="product-collection">
                    <span>pack of 4 tubes</span>
                </div> */}
                <div className="product-price">
                    ₹{product?.price?.toFixed(2)}<span>₹{product?.mrp?.toFixed(2)}</span>
                </div>
                <button className="anchor-button hovertime" onClick={() => handleAddToCart(product)}>
                    Add To Bag
                </button>
            </div>
            <div className="product-top d-flex align">
                {/* <div className="top-tag">Weight</div> */}
                <div className="product-discount">{product?.discount}% OFF</div>
            </div>
        </div>
    );
}