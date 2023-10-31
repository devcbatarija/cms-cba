import { useState } from "react";

const Form = ({setIsOpen}) => {
  return (
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen 
                      pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75">
           
          </div>
        </div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"></div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => setIsOpen()}
              className="mt-3 w-full inline-flex justify-center rounded-md
                               border border-transparent shadow-sm px-4 py-2 bg-cbaBlue 
                               text-base font-medium text-white hover:bg-blue-700 
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                               sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;


// <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//   <div className="mb-4">
//     <label
//       className="block text-gray-700 text-sm font-bold mb-2"
//       htmlFor="correo"
//     >
//       Correo
//     </label>
//     <input
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       id="correo"
//       type="text"
//       placeholder="Correo"
//     />
//   </div>
//   <div className="mb-4">
//     <label
//       className="block text-gray-700 text-sm font-bold mb-2"
//       htmlFor="celular"
//     >
//       Celular
//     </label>
//     <input
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       id="celular"
//       type="text"
//       placeholder="Celular"
//     />
//   </div>
//   <div className="mb-4">
//     <label
//       className="block text-gray-700 text-sm font-bold mb-2"
//       htmlFor="nombres"
//     >
//       Nombres
//     </label>
//     <input
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       id="nombres"
//       type="text"
//       placeholder="Nombres"
//     />
//   </div>
//   <div className="mb-4">
//     <label
//       className="block text-gray-700 text-sm font-bold mb-2"
//       htmlFor="apellidos"
//     >
//       Apellidos
//     </label>
//     <input
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       id="apellidos"
//       type="text"
//       placeholder="Apellidos"
//     />
//   </div>
//   <div className="mb-4">
//     <label
//       className="block text-gray-700 text-sm font-bold mb-2"
//       htmlFor="fecha_Nacimiento"
//     >
//       Fecha de Nacimiento
//     </label>
//     <input
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       id="fecha_Nacimiento"
//       type="date"
//     />
//   </div>
//   <div className="mb-4">
//     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ci">
//       CI
//     </label>
//     <input
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       id="ci"
//       type="text"
//       placeholder="CI"
//     />
//   </div>
//   <div className="flex items-center justify-between">
//     <button
//       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       type="submit"
//     >
//       Registrar
//     </button>
//   </div>
// </form>;
