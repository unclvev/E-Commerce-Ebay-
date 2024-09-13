import React, { useState, useEffect } from 'react';

const Carousel = ({ slides, hideNavigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [slides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Slide container with transition effect */}
      <div
        className="relative w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Slide content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-12 py-6 max-w-[400px] w-full h-full bg-black bg-opacity-50">
        <h2 className="text-4xl font-bold mb-4 text-white">
          {slides[currentSlide].title}
        </h2>
        <p className="text-lg mb-6 text-white">{slides[currentSlide].description}</p>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
          {slides[currentSlide].buttonText}
        </button>
      </div>

      {/* Conditionally render navigation if hideNavigation is false */}
      {!hideNavigation && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white py-3 px-5 rounded-full hover:bg-gray-700 focus:outline-none focus:ring"
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white py-3 px-5 rounded-full hover:bg-gray-700 focus:outline-none focus:ring"
            aria-label="Next Slide"
          >
            &#10095;
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-500'}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
