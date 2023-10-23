import React from 'react';

const CaracteristicasCurso = (props) => {
    const { titulo, descripcion } = props;

    return (
        <div className="w-full md:w-1/2 mt-4 p-2 rounded-lg text-center">
            <div className='imagen flex flex-cols-2 items-center '>
                <img className='imagenPequena w-12 h-17' src='https://th.bing.com/th/id/OIP.oyfVrGhPO9wNwN-eO3wMDAHaHa?pid=ImgDet&rs=1' alt="estudianteIcon" />

            </div>
            <h2 className="text-2xl font-bold text-center">CARACTERISTICAS DEL CURSOS</h2>
            <br />
            <div className="text-justify">
                <p>{descripcion}</p>
            </div>
        </div>
    );
}

export default CaracteristicasCurso;
