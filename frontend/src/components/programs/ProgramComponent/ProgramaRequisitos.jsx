import React from 'react';

const RequisitosInscripcion = (props) => {
    const { imagenUrl, requisitos } = props;

    return (
        <div className="w-full md:w-1/2 mt-4 p-5 rounded-lg text-center">
            <div className='imagen flex items-center '>
                <img className='imagenPequena w-15 h-20' src={imagenUrl} alt="estudianteIcon" />
            </div>
            <h2 className="text-2xl font-bold">REQUISITOS DE INSCRIPCION</h2>
            <br />
            <ul className="list-disc pl-4 list-none">
                {requisitos.map((requisito, index) => (
                    <li key={index}>{requisito}</li>
                ))}
            </ul>
            <br />
        </div>
    );
}

export default RequisitosInscripcion;
