import React, { useState, useEffect } from 'react';

const ImagenFondo = ({ imageUrl, titulo }) => {
  const [imagenCargada, setImagenCargada] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImagenCargada(true);
    };
    img.onerror = () => {
      setImagenCargada(false);
    };
  }, [imageUrl]);

  const imagenEstilo = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '50vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    opacity: 0.9,
  };

  const tituloEstilo = {
    fontFamily: 'arial, sans-serif',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  };

  return (
    <div className="ImagenPrincipal" style={imagenEstilo}>
      <h1 style={tituloEstilo}>{titulo}</h1>
      {!imagenCargada && (
        <div className="loading-indicator">
          LOADING...
        </div>
      )}
    </div>
  );
};

export default ImagenFondo;