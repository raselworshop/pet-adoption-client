import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../../assets/Carousel/boywithbird.jpg";
import image2 from "../../../assets/Carousel/boywithdog.jpg";
import image3 from "../../../assets/Carousel/fish.jpg";
import image4 from "../../../assets/Carousel/girlwithcat.jpg";
import image5 from "../../../assets/Carousel/womentwodog.jpg";
import image6 from "../../../assets/Carousel/womenwithdog.jpg";

const slides = [
  { src: image1, caption: "Discover the joy of adopting a pet and find your new best friend!" },
  { src: image2, caption: "Save a life, gain a loyal companion—adopt a pet today!" },
  { src: image3, caption: "Perfect pets for every lifestyle, ready for loving homes." },
  { src: image4, caption: "Healthy, happy pets waiting to bring joy to your family." },
  { src: image5, caption: "Affordable adoption, including vaccinations and spaying/neutering." },
  { src: image6, caption: "Make a difference—adopt a pet and support your community." },
];

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    lazyLoad: "progressive",
    pauseOnHover: true,
    pauseOnFocus: true,
    fade: true,
    pauseOnDotsHover: true,
    cssEase: "ease-in-out",
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="relative w-full h-[70vh] overflow-hidden">
          <img src={slide.src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4 bg-black bg-opacity-50">
            <h3 className="p-4 rounded-md text-lg md:text-2xl">{slide.caption}</h3>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
