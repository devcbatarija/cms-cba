import React, { useState, useEffect, useRef } from "react";
import "./statisticsBanner.css";

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
  }, [counted])

  return (
    <div className="bg-gray-100 w-full shadow-md" ref={ref}>
      <main className="w-full">
        <section className="bg-red-600 shadow-lg p-8 text-center w-full px-12">
          <div
            className="grid grid-cols-1 
                    justify-center
                    items-center justify-between sm:justify-between 
                    md:grid-cols-3 md:justify-between
                    lg:grid-cols-3 lg:justify-between"
          >
            <div className="">
              <h2 className="text-3xl font-bold mb-5 text-white">
                {graduados}+
              </h2>
              <p className="text-gray-200">Graduados</p>
            </div>
            <div className="">
              <h2 className="text-3xl font-bold mb-5 text-white">
                {docentes}+
              </h2>
              <p className="text-gray-200">Docentes altamente capacitados</p>
            </div>
            <div className="">
              <h2 className="text-3xl font-bold mb-5 text-white">
                {convenios}+
              </h2>
              <p className="text-gray-200">Convenios con colegios</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
