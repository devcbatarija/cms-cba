import { Alert } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { ErrorAlert } from "../toastAlerts/errorAlerts";
import { SuccessAlert } from "../toastAlerts/success";

const Form = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const handleOnSubmit = handleSubmit(async (data) => {
    const obj = {
      correo: watch('correo'),
      celular: watch('celular'),
      nombres: watch('nombres'),
      apellidos: watch('apellidos'),
      fecha_Nacimiento: watch('date'),
      ci: watch('ci')
    };
    const response = await axios.post("users/form/register", obj);
    if (!response.data.error) {
      toast.custom((t) => (
        <SuccessAlert
          t={t}
          w={"w-4/12"}
          message="Registro completo!"
        />
      ));
      setIsOpen()
      return
    }
    toast.custom((t) => (
      <ErrorAlert
        t={t}
        w={"w-4/12"}
        message="No se pudo completar el registro!"
      />
    ));
  })
  return (
    <div className="fixed z-10 inset-0 overflow-y-hidden">
      <div
        className="flex items-end justify-center min-h-screen 
                      pt-1 px-1 pb-20 text-center sm:block sm:p-0"
      >
        <div className="fixed inset-0 transition-opacity" ariaHidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden 
        transform transition-all  w-full  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="w-full flex justify-between items-center pt-1">
            <div className="mx-auto">
              <h2 className="mt-1 text-lg font-semibold text-cbaBlue md:text-2xl dark:sm:text-white">
                Pre-Registro
              </h2>
            </div>
            <button
              onClick={() => setIsOpen()}
              className="py-2 px-4 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="gray"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <form
            onSubmit={handleOnSubmit}
            className="bg-white rounded px-8 pt-6 pb-2 mb-1 overflow-y-auto max-h-[500px]"
          >
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
              {errors.correo ? (
                <Alert severity="error">{errors.correo.message}</Alert>
              ) : null}
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
            {errors.celular ? (
              <Alert severity="error">{errors.celular.message}</Alert>
            ) : null}
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
            {errors.nombres ? (
              <Alert severity="error">{errors.nombres.message}</Alert>
            ) : null}
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
                {...register("apellidos", {
                  required: {
                    value: true,
                    message: "El campo apellido es requerido",
                  },
                  minLength: {
                    value: 5,
                    message:
                      "El campo apellido debe tener almenos 5 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message:
                      "El campo apellido debe tener máximo 30 caracteres",
                  },
                })}
              />
            </div>
            {errors.apellidos ? (
              <Alert severity="error">{errors.apellidos.message}</Alert>
            ) : null}
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
                {...register("date", {
                  required: {
                    value: true,
                    message: "La fecha de nacimiento es requerida",
                  },
                })}
              />
            </div>
            {errors.date ? (
              <Alert severity="error">{errors.date.message}</Alert>
            ) : null}
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
                {...register("ci", {
                  required: {
                    value: true,
                    message: "El campo ci es requerido",
                  },
                  minLength: {
                    value: 5,
                    message: "El campo ci debe tener almenos 5 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "El campo ci debe tener máximo 30 caracteres",
                  },
                })}
              />
            </div>
            {errors.ci ? (
              <Alert severity="error">{errors.ci.message}</Alert>
            ) : null}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Registrar
              </button>
            </div>
          </form>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
        </div>
      </div>
    </div>
  );
};
export default Form;
