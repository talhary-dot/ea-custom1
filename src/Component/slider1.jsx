import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const FullCarousel = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Default: Show 3 images at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
   
  };

  return (
    <>
      <Slider {...settings}>
        {/* Image 1 */}
        {images?.map((e,i) => {
          return (
            <div key={i} className="">
              <img src={e} className="" />
            </div>
          );
        })}
      </Slider>
    </>
  );
};
