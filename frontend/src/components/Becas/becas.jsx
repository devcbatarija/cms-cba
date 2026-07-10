import React, { useEffect, useState } from 'react'
import { getAllBeca } from "../../redux-toolkit/actions/becaActions";
import { useDispatch, useSelector } from 'react-redux'
import ImagenesEstilizadas from '../dashboard/widgets/imagenBeca';
import { calcularTimestate } from '../../services/functions';
import FilterBecas from '../dashboard/widgets/botonfiltarbecas';
import Pagination from '../dashboard/widgets/pagination';
import CuadroInscripcion from '../inscripcion/incripcion';
import fondoBecas from '../../assets/american_fondo.png';

/* ---------- Paleta institucional CBA ---------- */
const CBA_ROJO = "#D50032";
const CBA_NAVY = "#002E5F";
const CBA_GRIS = "#DEDEDE";

/* ---------- Estilos para renderizar la descripción rich text de forma limpia ---------- */
const richTextPreviewStyles = `
.rich-text-preview p {
  margin: 0 0 4px;
}

.rich-text-preview p:empty,
.rich-text-preview p:has(> br:only-child) {
  display: none;
}

.rich-text-preview a {
  color: var(--accent-color, #002E5F);
  text-decoration: underline;
  word-break: break-all;
}

.rich-text-preview strong {
  font-weight: 700;
  color: #1a1a2e;
}
`;

export const Becas = () => {
    const dispatch = useDispatch();
    const arrayBecas = useSelector((state) => state.becas.becas)
    const [becas, setBecas] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(becas.length / itemsPerPage);

    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const ActualizarFiltroBecas = (newData) => {
        setBecas(newData);
    }
    useEffect(() => {
        setBecas(arrayBecas)
    }, [arrayBecas])
    useEffect(() => {
        dispatch(getAllBeca())
    }, []);

    return (
        <>
            <style>{richTextPreviewStyles}</style>

            <div className="pt-6 px-4 sm:px-6 md:pt-8 md:px-8 bg-zinc-50">
                <div className='items-center max-w-4xl mx-auto flex flex-row justify-between lg:max-w-6xl'>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold md:text-2xl" style={{ color: CBA_NAVY }}>Becas</h1>
                        <div className="w-10 h-1 mt-2 rounded-full" style={{ backgroundColor: CBA_ROJO }} />
                    </div>
                    <FilterBecas
                        ActualizarFiltroBecas={ActualizarFiltroBecas}
                    />
                </div>
            </div>

            {/* ---------- Fondo institucional detrás del listado ---------- */}
            <div className="relative py-8 md:py-12">
                <img
                    src={fondoBecas}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: `${CBA_NAVY}F2` }}
                />

                <div className="relative px-4 sm:px-6 md:px-8">
                    <div className="max-w-4xl mx-auto flex flex-col gap-8 lg:max-w-6xl">
                        {becas.length > 0 ?
                            becas.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((beca, index) => {
                                const acento = index % 2 === 0 ? CBA_NAVY : CBA_ROJO;
                                const tiempo = calcularTimestate(beca.createdAt);
                                return (
                                    <div
                                        key={beca.id_Beca}
                                        className="relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                            <div className="relative p-4 h-72 sm:h-96 md:h-[28rem] lg:h-auto min-h-[20rem] rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl overflow-hidden">
                                                <div className="w-full h-full overflow-hidden rounded-xl"> {/* Contenedor extra opcional si quieres esquinas redondeadas en la imagen */}
                                                    <ImagenesEstilizadas multimedia={beca.multimedia} />
                                                </div>
                                            </div>

                                            <div className="flex flex-col p-6 sm:p-10 justify-center">
                                                {tiempo && (
                                                    <span
                                                        className="text-xs font-semibold uppercase tracking-wide mb-2"
                                                        style={{ color: acento }}
                                                    >
                                                        {tiempo}
                                                    </span>
                                                )}
                                                <h2
                                                    className="text-xl md:text-2xl font-bold leading-snug"
                                                    style={{ color: CBA_NAVY }}
                                                >
                                                    {beca.titulo}
                                                </h2>
                                                <div
                                                    className="w-10 h-1 mt-3 mb-4 rounded-full"
                                                    style={{ backgroundColor: CBA_GRIS }}
                                                />
                                                <div
                                                    className="rich-text-preview text-sm sm:text-base text-gray-600 leading-relaxed"
                                                    style={{ "--accent-color": acento }}
                                                    dangerouslySetInnerHTML={{ __html: beca.descripcion }}
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="absolute top-4 left-4 z-20 flex flex-col items-center justify-center w-16 h-16 rounded-full text-white shadow-md"
                                            style={{ backgroundColor: acento }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Z" />
                                                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z" />
                                            </svg>
                                            <span className="text-[10px] font-semibold mt-0.5">Beca</span>
                                        </div>
                                    </div>
                                )
                            }) : (
                                <div className="flex flex-col items-center justify-center py-16 rounded-2xl bg-white/90">
                                    <span className="text-gray-500">No hay datos</span>
                                </div>
                            )}
                    </div>
                </div>
            </div>

            <div className="bg-zinc-50">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    topRank={5}
                />
            </div>
            <CuadroInscripcion/>
        </>
    )
}