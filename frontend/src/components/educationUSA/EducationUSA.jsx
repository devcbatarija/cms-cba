import React, { useEffect, useRef, useState } from "react";
import CuadroInscripcion from "../inscripcion/incripcion";
import ImagenFondo from "./EdUSAComponents/ImagenComponent";
import MapComponent from "./Maps";
import {
    COMO_ESTUDIAR_INFO,
    PASOS,
    SERVICIOS,
    IMAGE_BANNER,
    IMAGE_CBA_FACHADA,
} from "./EdUSAComponents/Constants";
import { IconoUbicacion } from "./EdUSAComponents/Iconos";

/* ---------- Paleta institucional CBA (misma que Home/About/Publications) ---------- */
const CBA_ROJO = "#D50032";
const CBA_NAVY = "#002E5F";

/* ---------- Wrapper de animación al entrar en viewport (idéntico al resto del sitio) ---------- */
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
            className={`transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } ${className}`}
            style={{ transitionDelay: `${retraso}ms` }}
        >
            {children}
        </div>
    );
};

function EducationUSA() {
    return (
        <div className="bg-zinc-50">
            {/* ---------- HEADER (se mantiene igual que antes) ---------- */}
            <ImagenFondo imageUrl={IMAGE_BANNER} titulo="EDUCATION USA" />

            {/* ---------- INTRO ---------- */}
            <div className="px-4 sm:px-6 md:px-8 pt-10 pb-2 max-w-6xl mx-auto">
                <AlAparecer>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 text-center">
                        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: CBA_NAVY }}>
                            {COMO_ESTUDIAR_INFO.title}
                        </h2>
                        <div className="w-10 h-1 mx-auto my-4 rounded-full" style={{ backgroundColor: CBA_ROJO }} />
                        {COMO_ESTUDIAR_INFO.description.map((parrafo, i) => (
                            <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                                {parrafo}
                            </p>
                        ))}
                        <span
                            className="inline-block mt-5 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full"
                            style={{ backgroundColor: `${CBA_NAVY}14`, color: CBA_NAVY }}
                        >
                            Todos nuestros servicios son gratuitos
                        </span>
                    </div>
                </AlAparecer>
            </div>

            {/* ---------- SERVICIOS: cards de color sólido ---------- */}
            <div className="px-4 sm:px-6 md:px-8 pt-10 pb-2 max-w-6xl mx-auto">
                <AlAparecer>
                    <h2 className="text-xl sm:text-2xl font-bold text-center mb-8" style={{ color: CBA_NAVY }}>
                        Nuestros servicios
                    </h2>
                </AlAparecer>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {SERVICIOS.map((s, i) => {
                        const fondo = i % 2 === 0 ? CBA_NAVY : CBA_ROJO;
                        const Icono = s.icono;
                        return (
                            <AlAparecer key={s.titulo} retraso={i * 80}>
                                <div
                                    className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full p-6 flex gap-4"
                                    style={{ backgroundColor: fondo }}
                                >
                                    <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-white/15">
                                        <Icono color="#FFFFFF" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm sm:text-base text-white">
                                            {s.titulo}
                                        </h3>
                                        <p className="text-sm text-white/85 leading-relaxed mt-1.5">
                                            {s.descripcion}
                                        </p>
                                    </div>
                                </div>
                            </AlAparecer>
                        );
                    })}
                </div>
            </div>

            {/* ---------- PASOS ---------- */}
            <div className="px-4 sm:px-6 md:px-8 pt-14 pb-2 max-w-6xl mx-auto">
                <AlAparecer>
                    <h2 className="text-xl sm:text-2xl font-bold text-center mb-1" style={{ color: CBA_NAVY }}>
                        ¿Quieres estudiar en los Estados Unidos?
                    </h2>
                    <p className="text-center text-gray-500 text-sm mb-10">
                        Estos son los pasos del proceso
                    </p>
                </AlAparecer>

                <div className="relative">
                    <div
                        className="hidden lg:block absolute left-6 top-2 bottom-2 w-0.5"
                        style={{ backgroundColor: `${CBA_NAVY}1A` }}
                    />
                    <div className="flex flex-col gap-5">
                        {PASOS.map((p, i) => {
                            const acento = i % 2 === 0 ? CBA_NAVY : CBA_ROJO;
                            const Icono = p.icono;
                            return (
                                <AlAparecer key={p.titulo} retraso={i * 80}>
                                    <div className="relative lg:pl-16">
                                        <div
                                            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center shadow-sm border-4 border-zinc-50 z-10"
                                            style={{ backgroundColor: acento }}
                                        >
                                            <span className="text-white font-bold text-sm">{i + 1}</span>
                                        </div>
                                        <div className="rounded-2xl shadow-sm border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 overflow-hidden">
                                            <div className="flex items-center gap-4 p-5 sm:p-6">
                                                <div
                                                    className="lg:hidden shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                                    style={{ backgroundColor: acento }}
                                                >
                                                    {i + 1}
                                                </div>
                                                <div
                                                    className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                                                    style={{ backgroundColor: `${acento}14` }}
                                                >
                                                    <Icono color={acento} />
                                                </div>
                                                <div>
                                                    <span
                                                        className="text-[11px] font-semibold uppercase tracking-wide"
                                                        style={{ color: acento }}
                                                    >
                                                        Paso {i + 1}
                                                    </span>
                                                    <h3 className="font-bold text-sm sm:text-base" style={{ color: CBA_NAVY }}>
                                                        {p.titulo}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 leading-relaxed mt-1">
                                                        {p.descripcion}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AlAparecer>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ---------- MAPA + FOTO / VISÍTANOS ---------- */}
<div className="px-4 sm:px-6 md:px-8 pt-14 pb-10 max-w-6xl mx-auto">
    <AlAparecer>
        <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: CBA_NAVY }}>
            Visita nuestras oficinas en Tarija
        </h2>
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
            <IconoUbicacion color={CBA_ROJO} />
            Centro Boliviano Americano — EducationUSA
        </div>
    </AlAparecer>

    <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Mapa con header de color */}
            <AlAparecer>
                <div className="rounded-2xl shadow-sm border border-gray-100 bg-white overflow-hidden h-full flex flex-col">
                    <div
                        className="flex items-center gap-2 px-5 py-3"
                        style={{ backgroundColor: CBA_NAVY }}
                    >
                        <IconoUbicacion color="#FFFFFF" />
                        <span className="text-white text-sm font-semibold">Cómo llegar</span>
                    </div>
                    <div className="flex-1">
                        <MapComponent />
                    </div>
                </div>
            </AlAparecer>

            {/* Foto con header de color */}
            <AlAparecer retraso={100}>
                <div className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
                    <div
                        className="flex items-center gap-2 px-5 py-3"
                        style={{ backgroundColor: CBA_ROJO }}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                            <path d="M9 22V12h6v10" />
                        </svg>
                        <span className="text-white text-sm font-semibold">Nuestras instalaciones</span>
                    </div>
                    <div className="relative flex-1 min-h-[300px]">
                        <img
                            src={IMAGE_CBA_FACHADA}
                            alt="Fachada del Centro Boliviano Americano en Tarija"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </AlAparecer>
        </div>

        {/* Cuadro flotante de contacto, se sobrepone a ambas cards */}
        <AlAparecer retraso={200}>
           <div className="relative -mt-6 mx-4 sm:mx-8 lg:mx-16">
                
                <a href="https://wa.me/59173496225?text=Hola%2C%20quisiera%20agendar%20una%20visita%20a%20las%20oficinas%20de%20EducationUSA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${CBA_NAVY}14` }}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={CBA_NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Consultas y visitas</p>
                            <p className="font-bold text-sm sm:text-base" style={{ color: CBA_NAVY }}>
                                Agenda tu visita a EducationUSA
                            </p>
                        </div>
                    </div>
                    <span
                        className="text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded-full text-white shrink-0 flex items-center gap-1.5"
                        style={{ backgroundColor: CBA_ROJO }}
                    >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.53 1.36 5.07L2.05 22l5.18-1.36a9.9 9.9 0 0 0 4.81 1.23h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11a16.6 16.6 0 0 1-1.55-.57c-2.72-1.17-4.5-3.9-4.63-4.08-.14-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97.94-2.24.24-.27.53-.34.71-.34l.51.01c.16 0 .38-.06.6.46.24.57.8 1.98.87 2.13.07.14.11.31.02.5-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.44.2.51.31.07.11.07.63-.17 1.31z" />
                        </svg>
                        Asesoría EducationUSA
                    </span>
                </a>
            </div>
        </AlAparecer>
    </div>
</div>
        </div>
    );
}

export default EducationUSA;