import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image:
        'https://www.cba.com.bo/wp-content/uploads/2023/05/65-ANOS_SLIDE-WEB_SLIDE-WEB-scaled-2560x768.jpg',
      title: 'Slide 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image:
        'https://www.cba.com.bo/wp-content/uploads/2023/08/ARTE-INTERDIARIOS-PRESENCIAL-INSCABIER_SLIDE-WEB-scaled.jpg',
      title: 'Slide 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      image:
        'https://www.cba.com.bo/wp-content/uploads/2023/08/EXECUTIVE-HIBRIDO-INSCRIPCIONES-ABIERTAS_SLIDE-WEB-scaled-2560x768.jpg',
      title: 'Slide 3',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Change image every 3 seconds (adjust according to your preferences)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="carousel flex overflow-hidden">
        {slides.map((slide, index) => (
          <div
            className={`slide w-full flex-shrink-0 ${
              index === currentSlide ? 'active' : ''
            }`}
            key={index}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="carousel-image w-full h-auto min-h-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
