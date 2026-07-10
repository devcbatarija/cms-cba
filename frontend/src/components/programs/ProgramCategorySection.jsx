import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProgram } from '../../redux-toolkit/actions/programActions';
import ImagenFondo from '../educationUSA/EdUSAComponents/ImagenComponent';
import CaracteristicasCurso from './ProgramComponent/ProgramaCaracteristica';
import RequisitosInscripcion from './ProgramComponent/ProgramaRequisitos';
import CuadroInscripcion from '../inscripcion/incripcion';
import ListaPreciosCursos from './ProgramComponent/ProgramaPrecios';

const CBA_NAVY = '#002E5F';
const CBA_ROJO = '#D50032';

const ProgramCategorySection = ({ categoria }) => {
  const dispatch = useDispatch();

  const programas = useSelector((state) =>
    (state.programs.programs || [])
      .filter((p) => p.categoria === categoria)
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
  );

  useEffect(() => {
    dispatch(getAllProgram());
  }, [dispatch]);

  return (
    <>
      <div className="w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 mx-auto justify-center bg-gray-50 py-8">
        {programas.length === 0 && (
          <div className="text-center py-16 px-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div
              className="mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${CBA_NAVY}1A` }}
            >
              <svg className="w-7 h-7" style={{ color: CBA_NAVY }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">
              Aún no hay programas publicados en esta categoría.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-10">
          {programas.map((programa) => {
            const programPrice = programa.ProgramPrice || null;
            return (
              <div
                key={programa.idPrograma}
                className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Nombre del programa, tal cual fue creado */}
                <div className="px-4 md:px-8 pt-6 pb-3 text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: CBA_NAVY }}>
                    {programa.nombre}
                  </h2>
                  <span
                    className="block w-16 h-1 rounded-full mx-auto mt-2"
                    style={{ backgroundColor: CBA_ROJO }}
                  />
                </div>

                <div className="w-full">
                  <ImagenFondo imageUrl={programa.multimedia?.[0]} title={programa.nombre} />
                </div>

                <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 border-b border-gray-100">
                  <CaracteristicasCurso descripcion={programa.caracteristica} />
                  <div className="hidden md:block w-px bg-gray-100" />
                  <RequisitosInscripcion
                    requisitos={programa.requisitos ? programa.requisitos.split(" , ") : []}
                  />
                </div>

                <div className="px-4 md:px-8 py-6 text-center">
                  <ListaPreciosCursos preciosCursos={programPrice} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <CuadroInscripcion />
      </div>
    </>
  );
};

export default ProgramCategorySection;