import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const Carousel = ({ multimedia }) => {
  console.log( multimedia.length>1)
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === multimedia.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? multimedia.length - 1 : current - 1);
  };
  useEffect(()=>{

  },[multimedia])
  return (
        multimedia.length>0?
        <div className="relative flex items-center justify-center h-64 overflow-hidden bg-gray-800">
        {multimedia.map((image, index) => (
        <div
          className={`absolute w-full transition-opacity duration-500 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
          key={index}
        >
          <img src={image} alt="" className="object-cover w-full h-full" />
        </div>
      ))}
      {
        multimedia.length>1?(
          <>
          <button
        className="absolute left-0 p-2 text-white bg-black bg-opacity-50"
        onClick={prevSlide}
      >
        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
      </button>
      <button
        className="absolute right-0 p-2 text-white bg-black bg-opacity-50"
        onClick={nextSlide}
      >
        <ArrowForwardIosIcon></ArrowForwardIosIcon>
      </button>
          </>
        ):
        null
      }
      </div>:null
    
  );
};

export default Carousel;
