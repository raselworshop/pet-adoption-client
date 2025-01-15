import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from '../../../assets/Carousel/boywithbird.jpg';
import image2 from '../../../assets/Carousel/boywithdog.jpg';
import image3 from '../../../assets/Carousel/fish.jpg';
import image4 from '../../../assets/Carousel/girlwithcat.jpg';
import image5 from '../../../assets/Carousel/womentwodog.jpg';
import image6 from '../../../assets/Carousel/womenwithdog.jpg';

const SimpleSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    };

    return (
        <Slider {...settings}>
            <div className="relative w-full h-[80vh] overflow-hidden">
                <img src={image1} alt="Slide 1" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                    <h3 className="bg-black bg-opacity-50 p-4 rounded-md">Discover the joy of adopting a pet and find your new best friend!</h3>
                </div>
            </div>
            <div className="relative w-full h-[80vh] overflow-hidden">
                <img src={image2} alt="Slide 2" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                    <h3 className="bg-black bg-opacity-50 p-4 rounded-md">Save a life, gain a loyal companion—adopt a pet today!</h3>
                </div>
            </div>
            <div className="relative w-full h-[80vh] overflow-hidden">
                <img src={image3} alt="Slide 3" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                    <h3 className="bg-black bg-opacity-50 p-4 rounded-md">Perfect pets for every lifestyle, ready for loving homes.</h3>
                </div>
            </div>
            <div className="relative w-full h-[80vh] overflow-hidden">
                <img src={image4} alt="Slide 4" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                    <h3 className="bg-black bg-opacity-50 p-4 rounded-md">Healthy, happy pets waiting to bring joy to your family.</h3>
                </div>
            </div>
            <div className="relative w-full h-[80vh] overflow-hidden">
                <img src={image5} alt="Slide 5" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                    <h3 className="bg-black bg-opacity-50 p-4 rounded-md">Affordable adoption, including vaccinations and spaying/neutering.</h3>
                </div>
            </div>
            <div className="relative w-full h-[80vh] overflow-hidden">
                <img src={image6} alt="Slide 6" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                    <h3 className="bg-black bg-opacity-50 p-4 rounded-md">Make a difference—adopt a pet and support your community.</h3>
                </div>
            </div>
        </Slider>
    );
};

export default SimpleSlider;
