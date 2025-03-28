import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import BestSeller from "@/Components/bestseller";
import TakeCare from "@/Components/Takecare";
import NewProduct from "@/Components/NewProduct";
import HomeBanner from "@/Components/HomeBanner";
import Nutrition from "@/Components/Nutrition";
import Review from "@/Components/Review";
import HaveFun from "@/Components/HaveFun";
import About from "@/Components/About";
import LoginPopup from "@/Components/loginpopup";
import { getData } from '@/services/apiServices';
import StickyBar from "@/Components/stickybar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface HomeProps {
  homeData: any;
  error?: string;
}

export default function Home({ homeData, error }: HomeProps) {
  if (error) {
    console.error('Error from server:', error);
  }
  if(homeData){
    console.log(homeData)
  }
  
  return (
    <>
      <HomeBanner bannerdata={homeData?.data?.banners}></HomeBanner>
      <Nutrition data={homeData?.data?.sectionsData[0]}></Nutrition>
      <BestSeller data={homeData?.data?.categories}></BestSeller>
      <TakeCare data={homeData?.data?.sectionsData[1]}></TakeCare>
      <div className="newproduct-sec">
        {/* <NewProduct></NewProduct> */}
        {homeData?.data?.categories && homeData?.data?.categories.map((item: any) => (
          <NewProduct categoryData={item}></NewProduct>
        ))}
        {/* <NewProduct></NewProduct> */}
      </div>
      <Review reviewData={homeData?.data?.testimonials}></Review>
      <HaveFun></HaveFun>
      <About></About>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const homeData = await getData('/home-pagedata');
    
    return {
      props: {
        homeData : homeData?.data,   
      },
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      props: {
        homeData: null,
        error: 'Failed to fetch home data'
      },
    };
  }
}
