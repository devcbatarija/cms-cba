import React from 'react';

const CBA_NAVY = '#002E5F';
const CBA_ROJO = '#D50032';

const ProgramaOferta = (props) => {
  const { id, imagenUrl, iconoUrl, titulo, descripcion, puntos } = props;

  return (
    <div id={id} className="flex flex-col md:flex-row items-stretch border-b border-gray-100">
      <div className="w-full md:w-1/2">
        <div
          style={{
            backgroundImage: `url("${imagenUrl}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '50vh',
            width: '100%',
          }}
        />
      </div>

      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: `${CBA_NAVY}1A` }}
        >
          <img className="w-8 h-8 object-contain" src={iconoUrl} alt="estudianteIcon" />
        </div>

        <p className="text-2xl font-bold" style={{ color: CBA_NAVY }}>{titulo}</p>
        <span className="block w-12 h-1 rounded-full mt-2 mb-4" style={{ backgroundColor: CBA_ROJO }} />

        <ul className="space-y-2">
          {puntos.map((punto, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-600">
              <span
                className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: CBA_ROJO }}
              />
              <span>{punto}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgramaOferta;