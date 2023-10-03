import React from 'react';

const CaracteristicasCurso = (props) => {
    const { imagenUrl, titulo, descripcion } = props;

    return (
        <div className="w-full md:w-1/2 mt-4 p-2 rounded-lg text-center">
            <div className='imagen flex items-center '>
                <img className='imagenPequena w-15 h-20' src={imagenUrl} alt="estudianteIcon" />
            </div>
            <h2 className="text-2xl font-bold text-center">{titulo}</h2>
            <br />
            <div className="text-justify">
                <p>{descripcion}</p>
            </div>
        </div>
    );
}

export default CaracteristicasCurso;
