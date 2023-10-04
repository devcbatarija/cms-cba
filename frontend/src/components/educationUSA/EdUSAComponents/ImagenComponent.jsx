import React from 'react';

const ImagenFondo = ({ imageUrl }) => {
  return (
    <div className="ImagenPrincipal w-full md:w-1/1 p-0">
      <img
        src={imageUrl}
        alt="Imagen de fondo"
        className="w-full h-auto max-w-full"
      />
    </div>
  );
};

export default ImagenFondo;
