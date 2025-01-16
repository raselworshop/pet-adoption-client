import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imag1 from '../../../../assets/slider/Birds.jpg'
import imag2 from '../../../../assets/slider/rabbit.jpg'
import imag3 from '../../../../assets/slider/sadcat.jpg'

const images = [
  {
    url: imag1,
    text: 'Give a loving home to a pet in need',
  },
  {
    url: imag2,
    text: 'Adopt a pet and make a friend for life',
  },
  {
    url: imag3,
    text: 'Be a hero, adopt a pet today',
  },
];

const SlickSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="w-full overflow-hidden">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <div className=' h-96'>
          <img src={image.url} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-center text-2xl font-bold">{image.text}</h2>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SlickSlider;
