import React, { useEffect } from 'react'
import { getAllPublication } from "../../redux-toolkit/actions/publicationActions";
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@mui/material';
import ImagenesEstilizadas from '../dashboard/widgets/imagenPublicacion';
import { calcularTimestate } from '../../services/functions';
export const Publications = () => {
    const dispatch = useDispatch();
    const publicaciones = useSelector((state) => state.publications.publications)

    useEffect(() => {
        dispatch(getAllPublication())
    }, []);
    return (
        <>
            <div className="pt-4 px-4 sm:px-6 md:pt-10 md:px-8 bg-zinc-50">
                <div className='items-center max-w-4xl mx-auto grid grid-cols-1 lg:max-w-6xl lg:grid-cols-2'>
                    <h1 className="mt-1 text-lg font-semibold text-cbaBlue md:text-2xl dark:sm:text-white">Publicaciones</h1>
                    <button>filtrar</button>
                </div>
            </div>
            {publicaciones.length > 0 ?
                publicaciones.map((publicacion) => (
                    <div key={publicacion.id_Publicacion} className="py-4 px-4 sm:p-6 md:py-10 md:px-8 bg-zinc-50">
                        <div className="p-10 rounded-lg shadow-md  bg-white items-center max-w-4xl mx-auto grid grid-cols-1 lg:max-w-6xl lg:gap-x-20 lg:grid-cols-2">
                            <div className="col-start-1 flex flex-col-reverse row-start-2 lg:row-start-1">
                                <h1 className="mt-1 text-lg font-semibold text-cbaBlue md:text-2xl dark:sm:text-white">{publicacion.titulo}</h1>
                                <time className="text-sm leading-4 font-medium text-gray-400 dark:sm:text-slate-400">{calcularTimestate(publicacion.createdAt)}</time>
                            </div>
                            <div className='h-60 sm:h-96 col-start-1 col-end-3 row-start-1 mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0'>
                                <ImagenesEstilizadas multimedia={publicacion.multimedia} />
                            </div>
                            <dl className="pt-6 sm:pt-0 text-xs font-medium flex items-center sm:mt-1 row-start-3 md:mt-2.5 lg:row-start-2">
                                {/* <dt className="sr-only">Reviews</dt>
                            <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                                <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-1 stroke-current dark:stroke-indigo-500">
                                    <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>4.89 <span className="text-slate-400 font-normal">(128)</span></span>
                            </dd> */}
                                <dt><Avatar src="https://www.pagoexpress.com.bo/sitioweb/assets/images/cba.png" /></dt>
                                <dd><span>Centro Boliviano Americano </span></dd>
                                <dt className="sr-only">Location</dt>
                                <dd className="flex items-center">
                                    <svg width="2" height="2" aria-hidden="true" fill="currentColor" className="mx-3 text-slate-300">
                                        <circle cx="1" cy="1" r="1" />
                                    </svg>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
                                        <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                                        <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                    </svg>
                                    Tarija, Bolivia
                                </dd>
                            </dl>
                            <div className="mt-4 hidden col-start-1 row-start-3 self-center sm:block sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
                            </div>
                            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
                                {publicacion.descripcion}
                            </p>
                        </div>
                    </div>
                )) : <div>
                    No hay datos
                </div>}
        </>
    )
}
