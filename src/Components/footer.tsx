"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { SetStateAction} from "react";
import { useAppSelector } from '@/hooks/hooks';
import StickyBar from "./stickybar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import router from "next/router";
import { getData } from "@/services/apiServices";
export default function Footer() {
  const [accordionState, setAccordionState] = useState(0);
  const accordion = (index: number) => {
    setAccordionState((prev) => (prev === index ? 0 : index));
  }
  const token = useAppSelector((state: any) => state.token.token);
  const cartCount = useSelector((state: RootState) => state?.cartCount?.count);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [categories, setCategories] = useState([]);

  console.log("cart",cartCount);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const getCategories = async () => {
    const res = await getData(`/get-product-categories`);
    setCategories(res?.data?.categories);
  }
  useEffect(() => {
    getCategories();
  }, []);


  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log("url",url);
      if (url === '/cart') {
        setShowStickyBar(false);
      } else {
        setShowStickyBar(true);
      }
    };

    // Check initial route on mount
    handleRouteChange(window.location.pathname);
    
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
  return (
    <>
    <footer className="footer bg-gray padding-tb">
      <div className="container d-flex">
        <div className="footer-left">
          <div className="footer-logo">
            <Link href='/' className="d-flex cursor-pointer">
            <Image width={842} height={148} src={'/assets/images/logo.png'} alt="logo"></Image>

              {/* <Image width={942} height={248} className="w-full" src={'/assets/images/header-logo.png'} alt=""></Image> */}
              {/* <svg width="86" height="28" viewBox="0 0 86 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M78.3211 14.9518C77.0257 15.5674 74.8373 16.3091 73.291 16.5519C73.0523 16.5895 72.9507 16.2603 73.1691 16.1557C74.9735 15.2931 78.2286 14.331 82.2752 7.58704L85.5842 1.86209L85.8433 1.39982C86.0241 1.04221 85.7986 0.655124 85.3901 0.654108L75.322 0.634805C75.131 0.634805 74.9542 0.734369 74.8546 0.897939L72.4336 5.50127C72.3066 5.71157 72.0008 5.71157 71.8738 5.50127L69.3359 0.843077C69.2577 0.713034 69.1165 0.633789 68.9641 0.633789L58.7242 0.653092C58.3909 0.653092 58.1837 1.01478 58.3503 1.30331L65.6469 13.4725C65.8024 13.7407 65.7983 14.0729 65.6388 14.3381L58.4732 26.553C58.2548 26.9147 58.5139 27.377 58.9365 27.379L68.895 27.442C69.09 27.443 69.2719 27.3394 69.3694 27.1697L71.8088 22.5583C71.9805 22.1631 72.3625 22.3144 72.458 22.5583L74.8759 27.2266C74.9542 27.3607 75.0974 27.444 75.2529 27.443L85.569 27.378C85.9052 27.376 86.1115 27.0082 85.9367 26.7207L78.9276 15.1316C78.8016 14.9233 78.5395 14.8461 78.3201 14.9497" fill="#FEFFED"></path><path d="M42.1587 16.4677C42.0571 16.3844 41.9291 16.3397 41.798 16.3447C36.6999 16.55 32.3313 19.7929 31.0034 21.7497C30.9079 21.8899 30.6895 21.7903 30.7362 21.6278C30.9719 20.8099 31.6953 19.4648 33.0597 18.018C33.5403 17.508 34.1214 17.0488 34.5938 16.6038C34.8041 16.4047 34.925 16.1294 34.925 15.8398V3.7915H34.9098C34.9118 2.98788 34.9139 2.26654 34.9169 1.42025C34.9189 0.94884 34.7096 0.618652 34.2901 0.618652C30.2628 0.618652 28.176 0.629828 24.1487 0.630844C23.7342 0.630844 23.3979 0.967128 23.3969 1.38266C23.3969 9.79483 23.3969 18.2619 23.3969 26.674C23.3969 26.7899 23.404 26.9047 23.3989 27.0205C23.3878 27.2481 23.5686 27.438 23.7962 27.434C24.0319 27.4299 24.2686 27.434 24.5043 27.434C30.6214 27.434 35.6271 27.4309 41.7452 27.4431C42.2115 27.4431 42.3974 27.3415 42.3954 26.8254C42.3792 23.5327 42.3771 20.2399 42.3863 16.9472C42.3863 16.7613 42.304 16.5845 42.1597 16.4667" fill="#FEFFED"></path><path d="M11.4753 22.212V20.8495C11.4753 20.7114 11.39 20.5884 11.262 20.5387C9.91681 20.0195 8.74439 19.4668 7.61667 17.7854C7.61363 17.7813 7.61058 17.7763 7.60855 17.7702C7.54353 17.6188 7.63801 17.4887 7.79345 17.5456C7.81784 17.5548 7.84527 17.5649 7.8727 17.5781C8.34004 17.7925 9.00753 18.1511 10.1312 18.5311C11.9183 19.1356 13.8506 19.1986 15.6682 18.6927C15.8998 18.6287 16.61 18.3889 16.7959 18.3127C21.7182 16.3153 23.0288 8.59805 19.9088 4.29748C18.1685 1.89981 15.8399 0.628835 12.9932 0.652202V0.641027L5.25253 0.636963C5.22611 0.636963 5.20071 0.637979 5.17532 0.641027H0.346443C0.155442 0.643059 0 0.798501 0 0.989502V27.1363C0 27.2948 0.128011 27.4228 0.286502 27.4228H4.77401C4.82684 27.4371 4.88983 27.4431 4.96603 27.4431C7.50594 27.434 8.49243 27.435 11.0323 27.4431C11.3595 27.4442 11.4712 27.3355 11.4702 26.9992C11.4631 25.5108 11.4601 23.5998 11.4611 22.212H11.4773H11.4753Z" fill="#FEFFED"></path><path d="M57.3542 7.41641C57.3542 11.1389 54.3367 14.1563 50.6143 14.1563C46.8918 14.1563 43.8744 11.1389 43.8744 7.41641C43.8744 3.69392 46.8918 0.676514 50.6143 0.676514C54.3367 0.676514 57.3542 3.69392 57.3542 7.41641Z" fill="#FEFFED"></path><path d="M56.9187 15.4466V13.7438C56.9187 13.5102 56.6343 13.4055 56.4859 13.5843C55.0697 15.2891 52.9565 16.0856 50.5964 16.0856C48.2363 16.0856 46.1546 15.3054 44.7384 13.6219C44.59 13.4452 44.3066 13.5498 44.3066 13.7835C44.3066 20.6514 44.3066 19.0919 44.3066 26.7136C44.3066 27.4299 44.3066 27.4329 45.0086 27.4329C48.7809 27.4339 52.5531 27.4248 56.3254 27.4451C56.805 27.4472 56.9137 27.2765 56.9127 26.8254C56.9015 23.1496 56.9005 19.1224 56.9096 15.4476H56.9177L56.9187 15.4466Z" fill="#FEFFED"></path></svg> */}
            </Link>
          </div>
          {/* <div className="footer-app d-flex justify-content">
            <Link href='/' className="d-flex cursor-pointer">
              <Image width={165} height={54} className="w-full" src={'/assets/images/apple-app.png'} alt=""></Image>
            </Link>
            <Link href='/' className="d-flex cursor-pointer">
              <Image width={165} height={54} className="w-full" src={'/assets/images/playstpre-app.png'} alt=""></Image>
            </Link>
          </div> */}
         { !token && <div className="footer-signup">
            <div className="attrixsheading">Sign up for exclusive deals and offers</div>
            <Link href='/' className="anchor-button d-inline cursor-pointer hovertime">
              Sign up
            </Link>
            <p>By signing up, you agree to our Privacy Policy</p>
          </div>}

        </div>
        <div className="footer-right d-flex justify-end">
          <div className="item">
            <div className={accordionState === 1 ? "footer-col active" : "footer-col"}>
              <h6 onClick={() => accordion(1)} className={accordionState === 1 ? "attrixxsheading d-flex align" : "attrixxsheading d-flex align"}>
                Categories
                <span>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 9.49995L0.499998 1.99995L1.55 0.949951L8 7.39995L14.45 0.949951L15.5 1.99995L8 9.49995Z" fill="#B0D235" />
                  </svg>
                </span>
              </h6>
              <ul className="footer-list">
                {categories?.map((item: any,index:number) => (
                  <li key={index}>
                    <Link href={`/category/${item?.slug}`} className="cursor-pointer">
                      {item?.name}
                    </Link>
                  </li>
                ))}
              
              </ul>
            </div>
          </div>

          <div className="item">
            <div className={accordionState === 2 ? "footer-col active" : "footer-col"}>
              <h6 onClick={() => accordion(2)} className={accordionState === 2 ? "attrixxsheading d-flex align" : "attrixxsheading d-flex align"}>
                About Us
                <span>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 9.49995L0.499998 1.99995L1.55 0.949951L8 7.39995L14.45 0.949951L15.5 1.99995L8 9.49995Z" fill="#B0D235" />
                  </svg>
                </span>
              </h6>
              <ul className="footer-list">
                <li>
                  <Link href='/privacypolicy' className="cursor-pointer">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href='/vision' className="cursor-pointer">
                    Vision
                  </Link>
                </li>
                <li>
                  <Link href='/aboutus' className="cursor-pointer">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div className={accordionState === 3 ? "footer-col active" : "footer-col"}>
              <h6 onClick={() => accordion(3)} className={accordionState === 3 ? "attrixxsheading d-flex align" : "attrixxsheading d-flex align"}>
                Connect
                <span>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 9.49995L0.499998 1.99995L1.55 0.949951L8 7.39995L14.45 0.949951L15.5 1.99995L8 9.49995Z" fill="#B0D235" />
                  </svg>
                </span>
              </h6>
              <ul className="footer-list">
                <li>
                  <Link href='/' className="cursor-pointer">
                    Weight
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>

          <div className="item">
            {/* <div className={accordionState === 4 ? "footer-col active" : "footer-col"}>
              <h6 onClick={() => accordion(4)} className={accordionState === 4 ? "attrixxsheading d-flex align" : "attrixxsheading d-flex align"}>
                Legal
                <span>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 9.49995L0.499998 1.99995L1.55 0.949951L8 7.39995L14.45 0.949951L15.5 1.99995L8 9.49995Z" fill="#B0D235" />
                  </svg>
                </span>
              </h6>
              <ul className="footer-list">
                <li>
                  <Link href='/' className="cursor-pointer">
                    Weight
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className={accordionState === 5 ? "footer-col active" : "footer-col"}>
              <h6 onClick={() => accordion(5)} className={accordionState === 5 ? "attrixxsheading d-flex align" : "attrixxsheading d-flex align"}>
                My Account
                <span>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 9.49995L0.499998 1.99995L1.55 0.949951L8 7.39995L14.45 0.949951L15.5 1.99995L8 9.49995Z" fill="#B0D235" />
                  </svg>
                </span>
              </h6>
              <ul className="footer-list">
              { !token ?  (<li>
               <Link href='/signup' className="cursor-pointer dflex align">
                    Sign up
                    <svg width="1em" height="1em" viewBox="0 0 13 13" fill="none" style={{marginLeft:"10px"}}><path d="M5.96.103l-.546.52c-.137.136-.137.355 0 .464l4.238 4.238H.328A.332.332 0 000 5.653v.766c0 .191.137.328.328.328h9.324l-4.238 4.266c-.137.11-.137.328 0 .464l.547.52c.11.137.328.137.465 0l5.715-5.715a.315.315 0 000-.465L6.426.103c-.137-.137-.356-.137-.465 0z" fill="#E7E7E7"></path></svg>
                  </Link>
                </li>
                ) : (
                  <li>
                    <Link href='/myaccount' className="cursor-pointer dflex align">
                      Profile
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </footer>
    {showStickyBar && cartCount>0 && <StickyBar cartData={ token ? cartCount : cartItems?.length} />}
    </>
  );
}