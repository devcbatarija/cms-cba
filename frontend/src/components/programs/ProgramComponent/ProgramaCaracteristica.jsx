import React from 'react';

const CBA_NAVY = '#002E5F';
const CBA_ROJO = '#D50032';

const CaracteristicasCurso = (props) => {
  const { titulo, descripcion } = props;

  return (
    <div className="w-full md:w-1/2 p-2 flex flex-col items-center text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: `${CBA_NAVY}1A` }}
      >
        {/* Ícono: birrete de graduación */}
        <svg className="w-7 h-7" style={{ color: CBA_NAVY }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L1 8.5L12 14L21 9.5V16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 11V16.5C5 16.5 8 19 12 19C16 19 19 16.5 19 16.5V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {titulo && (
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-1">
          {titulo}
        </p>
      )}

      <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide" style={{ color: CBA_NAVY }}>
        Características del curso
      </h2>
      <span className="block w-12 h-1 rounded-full mt-2 mb-4" style={{ backgroundColor: CBA_ROJO }} />

      <p className="text-gray-600 leading-relaxed text-left">{descripcion}</p>
    </div>
  );
};

export default CaracteristicasCurso;