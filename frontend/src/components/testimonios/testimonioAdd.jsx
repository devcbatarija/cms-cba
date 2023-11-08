import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { handleUpload, uploadImgbb } from "../../services/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CardActionArea, CardMedia, IconButton } from "@mui/material";
import Uploader from "../dashboard/Publications/Uploader";

const Title = styled.h2`
  color: #343a40;
  font-size: 20px;
`;
export const TestimonioAdd = ({
  testimonios,
  setTestimonios,
  handleSubmit,
  handleSetImagen,
  handleSubmitTestimonio,
}) => {
  const [input, setInput] = useState(false);
  const [image, setImage] = useState({
    multimedia: [],
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newTestimonios = {
      ...testimonios,
      [name]: value,
    };

    if (["Estudiante", "Maestro"].includes(value)) {
      newTestimonios.cargoTwo = "";
    } else if (value === "Otro") {
      setInput(true);
    } else if (name === "cargoTwo") {
      // No additional logic needed here, as we've already set the value above
    } else {
      setInput(false);
      if (testimonios.cargo !== "Otro") {
        newTestimonios.cargoTwo = "";
      }
    }

    setTestimonios(newTestimonios);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    fileInputRef.current.classList.add("drag-over");
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    fileInputRef.current.classList.remove("drag-over");
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    const format = [];
    const files = Array.from(e.dataTransfer.files); //obtenemos las imagenes

    for (let [index, file] of files.entries()) {
      //cargamos las imagenes a un array para visualizar
      format.push({ name: file.name, type: file.type });
    }

    const promises = await handleUpload(files);
    const base64DataArray = await Promise.all(promises);

    setImage(base64DataArray);
    handleSetImagen(base64DataArray[0]); //mandamos a nuestro componente padre la imagen
  };
  const handleSubmitImg = async (e) => {
    //subir imagenes con el servicio
    e.preventDefault();
    try {
      const response = await uploadImgbb(image.multimedia[0]);
      if (response.status == 200) {
        handleSubmitTestimonio(response.results);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.dataTransfer.files);
  };
  useEffect(() => {
    image.multimedia.length > 0
      ? handleSetImagen(image.multimedia[0])
      : handleSetImagen("");
  }, [image]);
  return (
    <div className="w-full border bg-white rounded-lg p-4">
      <div className="flex flex-col items-center justify-center">
        <Title>Crear testimonio</Title>
      </div>
      <div className="w-full">
        <label
          htmlFor="up"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Insertar imagen</label>
        <div name="up">
        <Uploader publicacion={image} setPublicacion={setImage} cantMax={1} ></Uploader>
        </div>
      </div>
      <form
        onSubmit={handleSubmitImg}
        className="flex w-full pl-12 pr-12 sm:pl-6 sm:pr-6 md:pl-12 md:pr-12 lg:pl-0 lg:pr-0"
      >
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
          <div className="flex gap-1">
            <div className="w-1/2">
              <label
                htmlFor="comentario"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cargo
              </label>
              <select
                id="cargo"
                onChange={handleChange}
                name="cargo"
                value={testimonios.cargo}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Estudiante">Estudiante</option>
                <option value="Maestro">Maestro</option>
                <option value="Otro">Otro</option>
              </select>
              {testimonios.cargo == "Otro" ? (
                <input
                  onChange={handleChange}
                  type="text"
                  id="cargoTwo"
                  name="cargoTwo"
                  value={testimonios.cargoTwo}
                  placeholder="Ingrese otro cargo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              ) : null}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Estado
              </label>
              <select
                id="state"
                onChange={handleChange}
                name="state"
                value={testimonios.state}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={true}>Visible</option>
                <option value={false}>Oculto</option>
              </select>
            </div>
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
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};
