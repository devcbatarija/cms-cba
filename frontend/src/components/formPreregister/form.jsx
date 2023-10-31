import { useState } from "react";
import { useForm } from "react-hook-form";

const Form = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div
        className="flex items-end justify-center min-h-screen 
                      pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div className="fixed inset-0 transition-opacity" ariaHidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="w-full flex items-center justify-center pt-1">
            <h2 className="mt-1 text-lg font-semibold text-cbaBlue md:text-2xl dark:sm:text-white">
              Pre-Registro
            </h2>
          </div>
          <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="correo"
              >
                Correo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="correo"
                name="correo"
                type="text"
                placeholder="Correo"
                {...register("correo", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                  minLength: {
                    value: 4,
                    message: "Correo debe tener almenos 4 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "Correo debe tener máximo 30 caracteres",
                  },
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Ingrese un correo válido",
                  },
                })}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="celular"
              >
                Celular
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="celular"
                type="text"
                name="celular"
                placeholder="Celular"
                {...register("celular", {
                  required: {
                    value: true,
                    message: "Celular es requerido",
                  },
                  minLength: {
                    value: 5,
                    message: "Celular debe tener almenos 5 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Celular debe tener máximo 30 caracteres",
                  },
                })}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombres"
              >
                Nombres
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombres"
                type="text"
                placeholder="Nombres"
                {...register("nombres", {
                  required: {
                    value: true,
                    message: "El campo nombre es requerido",
                  },
                  minLength: {
                    value: 5,
                    message: "Este campo debe tener almenos 5 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Este campo debe tener máximo 30 caracteres",
                  },
                })}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellidos"
              >
                Apellidos
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="apellidos"
                type="text"
                placeholder="Apellidos"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fecha_Nacimiento"
              >
                Fecha de Nacimiento
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha_Nacimiento"
                type="date"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ci"
              >
                CI
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ci"
                type="text"
                placeholder="CI"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Registrar
              </button>
            </div>
          </form>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
