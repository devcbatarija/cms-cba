import React from 'react';

const ProgramaOferta = (props) => {
  const { id, imagenUrl, iconoUrl, titulo, descripcion, puntos } = props;

  return (
    <div id={id} className="program-container flex flex-col md:flex-row lg:flex-row items-center justify-center border-b border-gray-300">
      <div className="ImagenPrincipal w-full md:w-1/2 p-0">
        <div style={{
          backgroundImage: `url("${imagenUrl}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "50vh",
          width: "100%"
        }}></div>
      </div>
      <div className="mt-4 md:mt-0 md:ml-4 md:w-1/2 md:mt-4 text-justify pb-4 pl-4 pr-6 pt-4">
        <div className='imagen flex items-center h-full'>
          <img className='imagenPequena w-30 h-20' src={iconoUrl} alt="estudianteIcon" />
        </div>
        <br />
        <br />
        <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 justify-center flex-col md:flex-row justify-center ' >
          <p className="text-2xl font-bold text-black">{titulo}</p>
          <br />
          <div className='text-justify'>
            <ul className="list-disc pl-4 list-none">
              {puntos.map((punto, index) => (
                <li key={index} className="text-1xl text-gray-600">{punto}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramaOferta;
