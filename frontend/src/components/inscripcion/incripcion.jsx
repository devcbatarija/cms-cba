import React from "react";
import "./inscripcion.css";

const CuadroInscripcion = () => {
  return (
    <div className="bg-gray-100 w-full shadow-md">
      <main className="w-full">
        <section className="bg-red-600 shadow-lg p-8 text-center w-full px-12">
          <div
            className="grid grid-cols-1  justify-center
                    items-center justify-between sm:justify-between 
                    md:grid-cols-1 md:justify-between
                    lg:grid-cols-2 lg:justify-between"
          >
            <h2 className="text-4xl font-bold mb-5 text-white">
              ¿Estas listo para potenciar tus estudios?
            </h2>
            <div className="flex gap-10 justify-center lg:justify-end">
              <button
                style={{
                  color: "rgb(0, 46, 95)",
                  width: "100px",
                }}
                className="bg-white text-red-600 py-2 px-4 rounded shadow-md"
              >
                Inscribirse
              </button>
              <button
                style={{
                  background: "rgb(0, 46, 95)",
                  color: "white",
                  width: "100px",
                }}
                className="text-red-600 py-2 px-4 rounded shadow-md"
              >
                Ver mas
              </button>
            </div>
          </div>
          <div className="flex">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Inscribete hoy y no dejes pasar esta increible oportunidad.
            </h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CuadroInscripcion;