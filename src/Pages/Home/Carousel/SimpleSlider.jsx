import React, { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet-async";
// import image1 from "../../../assets/Carousel/boywithbird.jpg";
// import image2 from "../../../assets/Carousel/boywithdog.jpg";
// import image3 from "../../../assets/Carousel/fish.jpg";
// import image4 from "../../../assets/Carousel/girlwithcat.jpg";
// import image5 from "../../../assets/Carousel/womentwodog.jpg";
// import image6 from "../../../assets/Carousel/womenwithdog.jpg";

const slides = [
  { src: "https://i.ibb.co/DDkNJ5WH/girlwithfish.jpg", caption: "Discover the joy of adopting a pet and find your new best friend!" },
  { src: "https://i.ibb.co/pvWc11bW/womentwodog.jpg", caption: "Save a life, gain a loyal companion—adopt a pet today!" },
  { src: "https://i.ibb.co/84cVgPFm/womenwithdog.jpg", caption: "Perfect pets for every lifestyle, ready for loving homes." },
  { src: "https://i.ibb.co/d02gPs0R/boywithbird.jpg", caption: "Healthy, happy pets waiting to bring joy to your family." },
  { src: "https://i.ibb.co/6RVsF1H2/boywithdog.jpg", caption: "Affordable adoption, including vaccinations and spaying/neutering." },
  { src: "https://i.ibb.co/hR7rRhDX/fish.jpg", caption: "Make a difference—adopt a pet and support your community." },
];

const SimpleSlider = memo(() => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: "ondemand",
    pauseOnHover: true,
    pauseOnFocus: true,
    fade: false,
    pauseOnDotsHover: true,
    cssEase: "ease-in-out",
  };

  return (
    <>
    <Helmet>
        <link rel="preload" href={slides[0].src} as="image" />
      </Helmet>
    <Slider 
    {...settings}
      className="overflow-hidden [&_.slick-slide>div]:!mx-0 [&_.slick-arrow]:!right-0 [&_.slick-arrow]:!z-10"
    >
      {slides.map((slide, index) => (
        <div key={index} className="relative w-full h-[70vh] overflow-hidden">
          <img src={slide.src} alt={`Slide ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4 bg-black bg-opacity-50">
            <h3 className="p-4 rounded-md text-lg md:text-2xl">{slide.caption}</h3>
          </div>
        </div>
      ))}
    </Slider>
    </>
  );
});

export default SimpleSlider;
