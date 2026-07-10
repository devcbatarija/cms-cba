import React from 'react';

const CBA_NAVY = '#002E5F';
const CBA_ROJO = '#D50032';

const RequisitosInscripcion = (props) => {
  const { requisitos } = props;

  return (
    <div className="w-full md:w-1/2 p-2 flex flex-col items-center text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: `${CBA_ROJO}1A` }}
      >
        {/* Ícono: clipboard con check */}
        <svg className="w-7 h-7" style={{ color: CBA_ROJO }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M9 4V3.5C9 2.67 9.67 2 10.5 2H13.5C14.33 2 15 2.67 15 3.5V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M9 12L11 14L15.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide" style={{ color: CBA_NAVY }}>
        Requisitos de inscripción
      </h2>
      <span className="block w-12 h-1 rounded-full mt-2 mb-4" style={{ backgroundColor: CBA_ROJO }} />

      <ul className="w-full text-left space-y-2">
        {requisitos.map((requisito, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-600">
            <span
              className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: CBA_ROJO }}
            />
            <span>{requisito}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequisitosInscripcion;