import React from "react";
import "tailwindcss/tailwind.css";

const CuadroInscripcion = () => {
  return (
    <div className="flex bg-red-600"style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
      <div className="w-2/3">
        <div className=" p-8 text-center w-full">
          <div>
            <h2 className="text-4xl font-bold mb-5 text-white" >
              ¿QUIERES INSCRIBIRTE?
            </h2>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Ve al formulario de preinscripcion
            </h2>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <br />
        <br />
        <div className="flex justify-center">
          <button className="bg-gray-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600">
            Inscribirse
          </button>
        </div>
      </div>
    </div>


  );
};

export default CuadroInscripcion;

// import React from "react";
// import "tailwindcss/tailwind.css";

// const CuadroInscripcion = () => {
//   return (
//     <div className="flex bg-red-700 text-8xl md:text-2xl lg:text-lg" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
//       <div className="w-2/3">
//         <div className="p-5 text-center w-full">
//           <div>
//             <h2 className="font-bold mb-5 text-white text-base md:text-lg lg:text-base">
//               ¿QUIERES INSCRIBIRTE?
//             </h2>
//             <h2 className="font-bold mb-4 text-white text-base md:text-lg lg:text-base">
//               Ve al formulario de preinscripcion
//             </h2>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/3">
//         <br />
//         <br />
//         <div className="flex justify-center">
//           <button className="bg-gray-900 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600">
//             Inscribirse
//           </button>
//         </div>
//       </div>
//     </div>






//   );
// };

// export default CuadroInscripcion;

