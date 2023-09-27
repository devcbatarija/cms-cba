import React from "react";
import "tailwindcss/tailwind.css";

const CuadroInscripcion = () => {
  return (
    <div className="bg-gray-100 w-full">
      <main className="w-full">
        <section className="bg-red-600 shadow-lg p-8 text-center w-full">
          <h2 className="text-1xl font-bold mb-5 text-black">¿Quieres inscribirte?</h2>
          <h2 className="text-1xl font-bold mb-4 text-white">Ve al formulario de preinscripcion</h2>
          <button className="bg-white text-white-500 py-2 px-4 rounded">
            Inscribirse
          </button>
        </section>
      </main>
    </div>
  );
};

export default CuadroInscripcion;
