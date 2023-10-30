import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllProgram } from '../../redux-toolkit/actions/programActions';
import ImagenFondo from '../educationUSA/EdUSAComponents/ImagenComponent';
import CaracteristicasCurso from './ProgramComponent/ProgramaCaracteristica';
import RequisitosInscripcion from './ProgramComponent/ProgramaRequisitos';
import CuadroInscripcion from '../inscripcion/incripcion';
import ListaPreciosCursos from './ProgramComponent/ProgramaPrecios';

const ProgramAdults = () => {
  const programa = useSelector((state) => state.programs.programs.find((p) => p.nombre == "Children"));
  const programPrice = programa ? programa.ProgramPrice : null;
  useEffect(() => {
  }, []);
  return (
    <>
      <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 mx-auto justify-center bg-gray-50'>
        <div className='InformationContainer'>
          {
            programa && <>
              <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10'>
                <ImagenFondo imageUrl={programa.multimedia[0]}  />
              </div>
              <div id='2' className="mt-4 p-4 rounded-lg text-gray-700 blur-10 flex flex-col md:flex-row border-b border-gray-300 ">
                <CaracteristicasCurso
                  titulo={"Caracteristicas del curso"}
                  descripcion={programa.caracteristica} />
                <RequisitosInscripcion requisitos={programa.requisitos.split(" , ")} />
              </div>
              <div className="padding-40  text-center">
                <ListaPreciosCursos preciosCursos={programPrice} />
              </div>
            </>
          }
        </div>
        <div className='mt-4'>
          <CuadroInscripcion />
        </div>
      </div>
    </>
  );
}

export default ProgramAdults;

