import React from "react";
import "tailwindcss/tailwind.css";

const CuadroInscripcion = () => {
  return (
    <div className="bg-gray-100 w-full shadow-md">
      <main className="w-full">
        <section className="bg-red-600 shadow-lg p-8 text-center w-full">
          <h2 className="text-4xl font-bold mb-5 text-white">
            ¿Quieres inscribirte?
          </h2>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Ve al formulario de preinscripcion
          </h2>
          <div className="flex justify-center">
            <button className="bg-white text-red-600 py-2 px-4 rounded shadow-md">
              Inscribirse
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CuadroInscripcion;
