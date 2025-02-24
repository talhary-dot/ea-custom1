import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default: Show 3 images at a time
    slidesToScroll: 1,
    autoplay: false,
  
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // For screens <= 1024px
        settings: {
          slidesToShow: 2, // Show 2 images
        },
      },
      {
        breakpoint: 768, // For screens <= 768px
        settings: {
          slidesToShow: 2, // Show 1 image
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {/* Image 1 */}
        {images?.map((e,i) => {
          return (
            <div key={i} className="slider-box">
              <img src={e} className="slider-image" />
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default Carousel;
