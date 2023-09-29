import React, { useState } from "react";
import styled from "styled-components";
import Uploader from "../dashboard/Publications/Uploader";

const Title = styled.h2`
  color: #343a40;
  font-size: 20px;
`;
export const TestimonioAdd = ({ testimonios, setTestimonios }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setTestimonios({
      ...testimonios,
      [property]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div className="w-full border bg-white rounded-lg p-4">
      <div className="flex flex-col items-center justify-center">
        <Title>Crear testimonio</Title>
      </div>
      <form className="flex w-full">
        <div className="grid gap-6 mb-6 w-full">
          <div className="w-full ">
            <label
              htmlFor="nombre"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre de la persona
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="nombre"
              name="nombre"
              value={testimonios.nombre}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full ">
            <label
              htmlFor="apellidos"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Apellidos de la persona
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="apellidos"
              name="apellidos"
              value={testimonios.apellidos}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="w-40">
            <label
              htmlFor="comentario"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cargo
            </label>
            <select
              id="comentario"
              onChange={handleChange}
              name="comentario"
              value={testimonios.comentario}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Estudiante">Estudiante</option>
              <option value="Maestro">Maestro</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="w-40">
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cargo
            </label>
            <select
              id="state"
              onChange={handleChange}
              name="state"
              value={testimonios.state}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={true}>Activo</option>
              <option value={false}>Desactivado</option>
            </select>
          </div>
          <div className="w-full ">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Comentario
            </label>
            <textarea
              onChange={handleChange}
              id="message"
              rows="4"
              name="comentario"
              value={testimonios.comentario}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>

          <div className="max-w-xl">
            <div className="max-w-xl">
              <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium text-gray-600">
                    Drop files to Attach, or
                    <span className="text-blue-600 underline">browse</span>
                  </span>
                </span>
                <input type="file" name="file_upload" className="hidden" />
              </label>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
