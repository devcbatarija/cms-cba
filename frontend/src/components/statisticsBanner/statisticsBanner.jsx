import React, { useState, useEffect, useRef } from "react";
import "./statisticsBanner.css";

const CBA_ROJO = "#D50032";
const CBA_NAVY = "#002E5F";

/* ---------- Iconos SVG inline, mismo lenguaje visual que About.jsx ---------- */
const IconoStat = ({ tipo }) => {
  const p = {
    viewBox: "0 0 24 24",
    width: 30,
    height: 30,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (tipo) {
    case "graduados":
      // Birrete de graduación
      return (
        <svg {...p}>
          <path d="M12 3l10 5-10 5L2 8l10-5z" />
          <path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" />
          <path d="M22 8v6" />
        </svg>
      );
    case "docentes":
      // Personas / equipo docente
      return (
        <svg {...p}>
          <circle cx="8.5" cy="8" r="2.6" />
          <circle cx="16" cy="9" r="2.2" />
          <path d="M3 19c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" />
          <path d="M14.5 14.3c2.5.3 4.5 2.2 4.5 4.7" />
        </svg>
      );
    case "convenios":
      // Manos / acuerdo
      return (
        <svg {...p}>
          <path d="M7 12.5l2.5 2.5 3-3M3.5 11.5l3-3 3 3M14.5 8.5l3 3 3-3" />
          <path d="M7 12.5c0 3 2.5 5.5 5.5 5.5s5.5-2.5 5.5-5.5" />
        </svg>
      );
    default:
      return null;
  }
};

export const StatisticsBanner = () => {
  const [graduados, setGraduados] = useState(0);
  const [docentes, setDocentes] = useState(0);
  const [convenios, setConvenios] = useState(0);
  const [counted, setCounted] = useState(false); // Bandera para controlar el conteo
  const ref = useRef(); // Referencia al elemento que queremos observar

  const graduadosBack = 500;
  const docentesBack = 30;
  const conveniosBack = 10;

  const updateGraduados = (i) => {
    if (i <= graduadosBack) {
      setTimeout(() => {
        setGraduados(i);
        updateGraduados(i + 1);
      }, 1);
    }
  };

  const updateDocentes = (i) => {
    if (i <= docentesBack) {
      setTimeout(() => {
        setDocentes(i);
        updateDocentes(i + 1);
      }, 100);
    }
  };

  const updateConvenios = (i) => {
    if (i <= conveniosBack) {
      setTimeout(() => {
        setConvenios(i);
        updateConvenios(i + 1);
      }, 300);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cuando el elemento se hace visible en la pantalla
        if (entry.isIntersecting && !counted) {
          updateGraduados(1);
          updateDocentes(1);
          updateConvenios(1);
          setCounted(true);
        }
      },
      {
        root: null, // El viewport
        rootMargin: "0px",
        threshold: 0.1, // Cuando el 10% del elemento es visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [counted]);

  const stats = [
    { valor: graduados, etiqueta: "Graduados", tipo: "graduados" },
    { valor: docentes, etiqueta: "Docentes altamente capacitados", tipo: "docentes" },
    { valor: convenios, etiqueta: "Convenios con colegios", tipo: "convenios" },
  ];

  return (
    <div className="w-full" ref={ref}>
      <main className="w-full">
        <section
          className="relative overflow-hidden shadow-lg w-full px-6 md:px-12 py-14"
          style={{
            background: `linear-gradient(120deg, ${CBA_NAVY} 0%, ${CBA_NAVY} 55%, ${CBA_ROJO} 160%)`,
          }}
        >
          {/* Decoración: círculos suaves de fondo, sin interferir con el contenido */}
          <div
            className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
            style={{ backgroundColor: CBA_ROJO, filter: "blur(60px)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-10 w-72 h-72 rounded-full opacity-20"
            style={{ backgroundColor: "#ffffff", filter: "blur(70px)" }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={s.tipo}
                className={`group flex flex-col items-center text-center px-4 ${
                  i !== 0 ? "md:border-l md:border-white/20" : ""
                }`}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-white
                    bg-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20"
                >
                  <IconoStat tipo={s.tipo} />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {s.valor}
                  <span style={{ color: CBA_ROJO }}>+</span>
                </h2>
                <div className="w-8 h-0.5 my-3 rounded-full bg-white/40" />
                <p className="text-gray-200 text-sm md:text-base max-w-[16rem]">
                  {s.etiqueta}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};