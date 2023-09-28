import React, { useEffect, useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useLocation } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
const Carousel = ({ multimedia, type }) => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();

  const nextSlide = () => {
    setCurrent(current === multimedia.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? multimedia.length - 1 : current - 1);
  };
  const isHome = location.pathname.startsWith("/dashboard");

  useEffect(() => {}, [multimedia]);

  return multimedia.length > 0 ? (
    <div className="relative flex items-center justify-center h-48 overflow-hidden bg-gray-800">
      {multimedia.map((image, index) => (
        <div
          className={`absolute w-full transition-opacity duration-500 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          key={index}
        >
          <img src={image} alt="" className="object-center object-cover w-full h-full border"/>
        </div>
      ))}
      {multimedia.length > 1 ? (
        <>
          <button
            className="absolute left-0 p-2 text-white bg-opacity-50"
            onClick={prevSlide}
          >
            <ArrowCircleLeftIcon
              sx={{
                color: "rgba(255,255,255,0.7)",
              }}
            ></ArrowCircleLeftIcon>
          </button>
          <button
            className="absolute right-0 p-2 text-white bg-opacity-800"
            onClick={nextSlide}
          >
            <ArrowCircleRightIcon
              sx={{
                color: "rgba(255,255,255,0.7)",
              }}
            ></ArrowCircleRightIcon>
          </button>
        </>
      ) : null}
    </div>
  ) : null;
};

export default Carousel;
