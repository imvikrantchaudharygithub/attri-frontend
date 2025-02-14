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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <HomeBanner></HomeBanner>
      <Nutrition></Nutrition>
      <BestSeller></BestSeller>
      <TakeCare></TakeCare>
      <div className="newproduct-sec">
        <NewProduct></NewProduct>
        <NewProduct></NewProduct>
        <NewProduct></NewProduct>
      </div>
      <Review></Review>
      <HaveFun></HaveFun>
      <About></About>
      <LoginPopup></LoginPopup>
    </>
  );
}
