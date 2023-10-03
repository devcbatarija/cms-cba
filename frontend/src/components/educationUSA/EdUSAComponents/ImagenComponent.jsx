import React from 'react';

const ImagenFondo = ({ imageUrl }) => {
  return (
    <div className="ImagenPrincipal w-full md:w-1/1 p-0">
      <div style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "50vh",
        width: "100%"
      }}>
      </div>
    </div>
  );
}

export default ImagenFondo;
