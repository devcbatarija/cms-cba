import React from 'react';

const InformacionEducacion = ({ titulo, contenido }) => {
  return (
    <div className="p-4 text-justify text-blue-900 bg-white shadow-lg rounded-lg">
      <strong className="text-2xl block mb-4">{titulo}</strong>
      <div className="space-y-4">
        {contenido.map((parrafo, index) => (
          <p key={index}>{parrafo}</p>
        ))}
      </div>
    </div>
  );
};

export default InformacionEducacion;
