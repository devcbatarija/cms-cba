import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CarouselHome = ({ multimedia }) => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const [showArrows, setShowArrows] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((current) =>
      current === multimedia.length - 1 ? 0 : current + 1
    );
  }, [multimedia.length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? multimedia.length - 1 : current - 1);
  };

  const handleMouseEnter = () => {
    setShowArrows(true);
  };

  const handleMouseLeave = () => {
    setShowArrows(false);
  };

  const isHome = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  return multimedia.length > 0 ? (
    <div
      className="relative flex h-56 sm:h-64 md:h-80 lg:h-96 xl:h-118 items-center justify-center overflow-hidden bg-green-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {multimedia.map((image, index) => (
        <div
          className={`absolute w-full h-56 sm:h-64 md:h-80 lg:h-96 xl:h-118 transition-opacity duration-500 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url("${image}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
          key={index}
        />
      ))}
    </div>
  ) : null;
};

export default CarouselHome;
