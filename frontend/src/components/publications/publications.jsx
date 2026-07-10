import React, { useEffect, useRef, useState } from 'react'
import { getAllPublication } from "../../redux-toolkit/actions/publicationActions";
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@mui/material';
import ImagenesEstilizadas from '../dashboard/widgets/imagenPublicacion';
import { calcularTimestate } from '../../services/functions';
import FilterPublications from '../dashboard/widgets/botonfiltarpublicaciones';
import Pagination from '../dashboard/widgets/pagination';
import CuadroInscripcion from '../inscripcion/incripcion';
import NoData from '../dashboard/calendario/widgets/noData';

import fondoHeader from "../../assets/3.jpeg";

/* ---------- Paleta institucional CBA (misma que Home.jsx / About.jsx) ---------- */
const CBA_ROJO = "#D50032";
const CBA_NAVY = "#002E5F";
const CBA_GRIS = "#DEDEDE";

/* ---------- Wrapper liviano para animar al entrar en viewport (idéntico al de Home.jsx) ---------- */
const AlAparecer = ({ children, className = "", retraso = 0 }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } ${className}`}
            style={{ transitionDelay: `${retraso}ms` }}
        >
            {children}
        </div>
    );
};

/* ---------- Icono ubicación reutilizable ---------- */
const IconoUbicacion = ({ color = CBA_NAVY }) => (
    <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
    >
        <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
        <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
);

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

export const Publications = () => {
    const dispatch = useDispatch();
    const arrayPublicaciones = useSelector((state) => state.publications.publications)
    const [publicaciones, setPublicaciones] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(publicaciones.length / itemsPerPage);

    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const ActualizarFiltroPublicaciones = (newData) => {
        // El filtro de tipo/búsqueda (FilterPublications) también debe respetar
        // solo publicaciones visibles
        setPublicaciones((newData || []).filter((pub) => pub.estado));
    }

    useEffect(() => {
        // Solo mostramos en el sitio web las publicaciones marcadas como "Visible" (estado: true)
        setPublicaciones((arrayPublicaciones || []).filter((pub) => pub.estado))
    }, [arrayPublicaciones])

    useEffect(() => {
        dispatch(getAllPublication())
    }, []);

    return (
        <div className="bg-zinc-50">
            <style>{richTextPreviewStyles}</style>

            {/* ---------- HEADER CON IMAGEN DE FONDO ---------- */}
            <div className="relative w-full h-48 sm:h-60 md:h-72 overflow-hidden">
                <img
                    src={fondoHeader}
                    alt="Publicaciones CBA"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay degradado con los colores institucionales */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(115deg, ${CBA_NAVY}E6 0%, ${CBA_NAVY}99 45%, ${CBA_ROJO}66 100%)`,
                    }}
                />
                <div className="relative h-full flex flex-col items-start justify-end sm:justify-center px-4 sm:px-12 pb-6 sm:pb-0 max-w-6xl mx-auto">
                    <span
                        className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-white/80 mb-1"
                    >
                        Centro Boliviano Americano
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-bold text-white">
                        Publicaciones
                    </h1>
                    <div className="w-12 h-1 mt-3 rounded-full" style={{ backgroundColor: CBA_ROJO }} />
                </div>
            </div>

            {/* ---------- BARRA DE FILTRO ---------- */}
            <div className="pt-5 px-4 sm:px-6 md:pt-7 md:px-8">
                <div className="items-center max-w-4xl mx-auto flex flex-row justify-between lg:max-w-6xl">
                    <p className="text-sm text-gray-500">
                        Últimas noticias, comunicados y novedades del instituto
                    </p>
                    <FilterPublications
                        ActualizarFiltroPublicaciones={ActualizarFiltroPublicaciones}
                    />
                </div>
            </div>

            {/* ---------- LISTADO DE PUBLICACIONES ---------- */}
            {publicaciones.length > 0 ?
                publicaciones.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((publicacion, index) => {
                    const acento = index % 2 === 0 ? CBA_NAVY : CBA_ROJO;
                    return (
                        <AlAparecer key={publicacion.id_Publicacion} retraso={index * 60}>
                            <div className="py-4 px-4 sm:p-6 md:py-8 md:px-8">
                                <div
                                    className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg
                                    transition-all duration-300 hover:-translate-y-0.5 bg-white
                                    border border-gray-100 max-w-4xl mx-auto lg:max-w-6xl"
                                >
                                    {/* Barra superior de acento, igual criterio que en Home/About */}
                                    <div className="h-1.5 w-full" style={{ backgroundColor: acento }} />

                                    <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-14 items-center">
                                        {/* Imagen con badge de tiempo, mismo patrón que en Home */}
                                        <div className="relative h-60 sm:h-96 lg:h-80 rounded-xl overflow-hidden order-1 lg:order-2 mb-6 lg:mb-0">
                                            <ImagenesEstilizadas multimedia={publicacion.multimedia} />
                                            <span
                                                className="absolute top-3 left-3 text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm backdrop-blur-sm"
                                                style={{ backgroundColor: `${acento}E6` }}
                                            >
                                                {calcularTimestate(publicacion.createdAt)}
                                            </span>
                                        </div>

                                        {/* Contenido */}
                                        <div className="flex flex-col order-2 lg:order-1">
                                            <h2
                                                className="text-xl sm:text-2xl font-bold transition-colors duration-200"
                                                style={{ color: CBA_NAVY }}
                                            >
                                                {publicacion.titulo}
                                            </h2>
                                            <div
                                                className="w-8 h-0.5 my-3 rounded-full"
                                                style={{ backgroundColor: acento }}
                                            />

                                            {/* Autor / ubicación, mismo estilo tipo badge que el resto del sitio */}
                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-gray-500 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Avatar
                                                        sx={{ width: 26, height: 26 }}
                                                        src="https://www.pagoexpress.com.bo/sitioweb/assets/images/cba.png"
                                                    />
                                                    <span>Centro Boliviano Americano</span>
                                                </div>
                                                <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" aria-hidden="true" />
                                                <span className="inline-flex items-center gap-1.5">
                                                    <IconoUbicacion color={acento} />
                                                    Tarija, Bolivia
                                                </span>
                                            </div>

                                            <div
                                                className="rich-text-preview text-sm leading-relaxed text-gray-600 line-clamp-4"
                                                style={{ "--accent-color": acento }}
                                                dangerouslySetInnerHTML={{ __html: publicacion.descripcion }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AlAparecer>
                    )
                }) :
                <div className="w-full h-96">
                    <NoData
                        text={'Aun no hay publicaciones'}
                        fontSize={''}
                    />
                </div>
            }

            {
                publicaciones.length > itemsPerPage &&
                <div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        topRank={10}
                    />
                </div>
            }
            <CuadroInscripcion />
        </div>
    )
}