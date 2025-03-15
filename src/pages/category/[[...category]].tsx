import Image from "next/image";
// import "@/styles/plp.css";
import ProductCard from "@/Components/ProductCard";
import HaveFun from "@/Components/HaveFun";
import About from "@/Components/About";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { getData } from '@/services/apiServices';

export default function ProductListing() {
    const router = useRouter();
    const { category } = router.query;
    const [categoryData, setCategoryData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategoryData = async () => {
        setIsLoading(true);
        if (Array.isArray(category) && category.length > 0) {
            getData(`/get-product-category/${category[0]}`, '').then((res: any) => {
                setCategoryData(res?.data?.category);
                console.log(res);
                setIsLoading(false);
            }).catch((err: any) => {
                console.log(err);
                setIsLoading(false);
            });
        }
    };

    useEffect(() => {
        console.log(category);
        if (Array.isArray(category) && category.length > 0) {
            fetchCategoryData();
        }
    }, [category]);

    if(categoryData?.length === 0){
        return <div>No data found</div>
    }
    if(isLoading){
        return <div className="flex justify-center items-center h-screen">
              <div className="line-loader">
              <span className="line-loader-text">loading</span>
              <span className="line-load"></span>
            </div>
          </div>
    }

    return (
        <>
            <div className="inner-banner relative">
                <div className="container ">
                    <picture className="picture relative">
                        <source media="(max-width: 767px)" srcSet={categoryData?.image ? categoryData?.image : '/assets/images/inner-banner.jpg'} />
                        <source media="(min-width: 768px)" srcSet={categoryData?.banner ? categoryData?.banner : '/assets/images/inner-banner.jpg'} />
                        <Image className="w-full" width={1920} height={340} src={categoryData?.banner ? categoryData?.banner : '/assets/images/inner-banner.jpg'} alt="Kurlon Hula Hula" />
                    </picture>
                    <h1 className="attrilgheading">{categoryData?.name}</h1>
                </div>
            </div>
            <div className="plp-box padding-tb">
                <div className="container">
                    <div className="plp-main d-flex">
                        <div className="plp-left"></div>
                        <div className="plp-right">
                            <div className="plp-top d-flex align justify-content">
                                <span className="product-count">{categoryData?.products?.length} Products</span>
                                <ul className="d-flex align justify-content">
                                    <li>
                                        {categoryData?.name}
                                        <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.51562 6.98438C7.82031 7.26562 7.82031 7.75781 7.51562 8.03906C7.375 8.17969 7.1875 8.25 7 8.25C6.78906 8.25 6.60156 8.17969 6.46094 8.03906L4 5.57812L1.51562 8.03906C1.375 8.17969 1.1875 8.25 1 8.25C0.789062 8.25 0.601562 8.17969 0.460938 8.03906C0.15625 7.75781 0.15625 7.26562 0.460938 6.98438L2.92188 4.5L0.460938 2.03906C0.15625 1.75781 0.15625 1.26562 0.460938 0.984375C0.742188 0.679688 1.23438 0.679688 1.51562 0.984375L4 3.44531L6.46094 0.984375C6.74219 0.679688 7.23438 0.679688 7.51562 0.984375C7.82031 1.26562 7.82031 1.75781 7.51562 2.03906L5.05469 4.52344L7.51562 6.98438Z" fill="#BEBEBE"></path></svg>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div className="plp-list d-grid padding-tb">
                                {categoryData?.products?.map((product: any) => (
                                    <ProductCard key={product._id} product={product} category={categoryData?.name}></ProductCard>
                                ))}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HaveFun></HaveFun>
            <About></About>
        </>
    );
}
