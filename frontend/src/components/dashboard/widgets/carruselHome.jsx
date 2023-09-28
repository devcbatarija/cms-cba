import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation } from 'react-router-dom';
const CarouselHome = ({ multimedia }) => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();

  const nextSlide = () => {
    setCurrent(current === multimedia.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? multimedia.length - 1 : current - 1);
  };
  const isHome = location.pathname.startsWith('/dashboard');

  useEffect(()=>{

  },[multimedia])
  
  return (
        multimedia.length>0?
        <div 
        style={{minHeight:"60vh"}}
        className="relative flex items-center justify-center overflow-hidden bg-gray-800">
        {multimedia.map((image, index) => (
        <div
          style={{
          backgroundImage:`url("${image}")`,
          height:"60vh",
          backgroundPosition:"center",
          backgroundRepeat:"no-repear",
          backgroundSize:"cover"
        }}
          className={`absolute w-full transition-opacity duration-500 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
          key={index}
        >
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

export default CarouselHome;
