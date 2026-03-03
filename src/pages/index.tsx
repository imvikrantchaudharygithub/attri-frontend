import HomeBanner from "@/Components/HomeBanner";
import Nutrition from "@/Components/Nutrition";
import BestSeller from "@/Components/bestseller";
import TakeCare from "@/Components/Takecare";
import NewProduct from "@/Components/NewProduct";
import Review from "@/Components/Review";
import HaveFun from "@/Components/HaveFun";
import About from "@/Components/About";
import { getData } from "@/services/apiServices";

interface HomeProps {
  homeData: any;
  error?: string;
}

export default function Home({ homeData, error }: HomeProps) {
  if (error) {
    console.error("Error from server:", error);
  }

  return (
    <>
      <HomeBanner bannerdata={homeData?.data?.banners} />
      <Nutrition data={homeData?.data?.sectionsData?.[0]} />
      <BestSeller data={homeData?.data?.categories} />
      <TakeCare data={homeData?.data?.sectionsData?.[1]} />
      <div className="newproduct-sec">
        {homeData?.data?.categories?.map((item: any) => (
          <NewProduct key={item._id} categoryData={item} />
        ))}
      </div>
      <Review reviewData={homeData?.data?.testimonials} />
      <HaveFun />
      <About />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const homeData = await getData("/home-pagedata");
    return {
      props: {
        homeData: homeData?.data,
      },
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      props: {
        homeData: null,
        error: "Failed to fetch home data",
      },
    };
  }
}
