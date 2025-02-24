import React, { useState, useEffect } from "react";
import "./carousal.css";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slidesPerView = isMobile ? 2 : 4;
  const slidePercentage = 100 / slidesPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = images.length - slidesPerView;
      return prev >= maxIndex ? maxIndex : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const goToSlide = (index) => {
    const maxIndex = images.length - slidesPerView;
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      nextSlide();
    }

    if (touchStartX - touchEndX < -50) {
      // Swipe right
      prevSlide();
    }

    // Reset touch positions
    setTouchStartX(0);
    setTouchEndX(0);
  };

  const maxDots = images.length - (slidesPerView - 1);

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * slidePercentage}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              filter:
                currentIndex === index ? "none" : isMobile ? "blur(3px)" : "",
              transition: "filter 250ms ease",
              flex: `0 0 ${slidePercentage}%`,
            }}
          >
            <img src={image} alt={`Slide ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      <div>
        {!isMobile && (
          <div>
            {" "}
            {currentIndex > 0 && (
              <button className="carousel-button prev" onClick={prevSlide}>
                ❮
              </button>
            )}
            {currentIndex < images.length - slidesPerView && (
              <button className="carousel-button next" onClick={nextSlide}>
                ❯
              </button>
            )}
          </div>
        )}
      </div>
      <div className="carousel-dots">
        {Array.from({ length: maxDots }).map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
