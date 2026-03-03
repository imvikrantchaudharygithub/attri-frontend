import Slider from "react-slick";
import ReviewCard from "./ReviewCard";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/utils/animations";

export default function Review({ reviewData }: any) {
  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 2, arrows: true } },
      { breakpoint: 991, settings: { slidesToShow: 2, arrows: true } },
      { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true } },
    ],
  };

  const sorted = reviewData
    ? [...reviewData].sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  if (sorted.length === 0) return null;

  return (
    <section className="bg-[#FAF9FF] py-14 md:py-20">
      <div className="container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-10"
        >
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D3C3C] font-heading italic">
              Real People, Real Reviews
            </h2>
            <div className="mt-2 h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4A847] to-transparent" />
          </div>
          <p className="mt-3 text-[#6B7280] text-sm md:text-base max-w-md mx-auto">
            Thousands of happy customers trust Attri Industries
          </p>
        </motion.div>

        <div className="slider-btn slider-height slider-rl">
          <Slider className="reviewslider" {...sliderSettings}>
            {sorted.map((item: any) => (
              <div className="item" key={item._id}>
                <ReviewCard data={item} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
