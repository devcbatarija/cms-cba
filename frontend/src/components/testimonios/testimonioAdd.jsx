import React, { useRef, useState } from "react";
import styled from "styled-components";
import { handleUpload, uploadImgbb } from "../../services/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CardActionArea, CardMedia, IconButton } from "@mui/material";

const Title = styled.h2`
  color: #343a40;
  font-size: 20px;
`;
export const TestimonioAdd = ({
  testimonios,
  setTestimonios,
  handleSubmit,
  handleSetImagen,
  handleSubmitTestimonio
}) => {
  const [input, setInput] = useState(false);
  const [image, setImage] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let newTestimonios = {
      ...testimonios,
      [name]: value,
    };
  
    if (['Estudiante', 'Maestro'].includes(value)) {
      newTestimonios.cargoTwo = '';
    } else if (value === 'Otro') {
      setInput(true);
    } else if (name === 'cargoTwo') {
      // No additional logic needed here, as we've already set the value above
    } else {
      setInput(false);
      if (testimonios.cargo !== 'Otro') {
        newTestimonios.cargoTwo = '';
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
  const handleSubmitImg = async(e) =>{ //subir imagenes con el servicio
    e.preventDefault()
    try {
      const response=await uploadImgbb(image);
      if(response.status==200){
        handleSubmitTestimonio(response.results)
      }
    } catch (error) {
      if(error){
        console.log(error)
      }
    }
  }
  const handleFileChange = (e) => {
    setSelectedFile(e.dataTransfer.files);
  };
  return (
    <div className="w-full w-full border bg-white rounded-lg p-4">
      <div className="flex flex-col items-center justify-center">
        <Title>Crear testimonio</Title>
      </div>
      <form onSubmit={handleSubmitImg} className="flex w-full pl-12 pr-12 sm:pl-6 sm:pr-6 md:pl-12 md:pr-12 lg:pl-0 lg:pr-0">
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
            {
              testimonios.cargo=="Otro"?(
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
              ):null
            }
            
          </div>
          <div className="w-40">
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

          <div className="w-full flex pl-12 pr-12 sm:pl-0 sm:pr-0 md:pl-0 md:pr-0 lg:pl-0 lg:pr-0 xl:pl-0 xl:pr-0">
            <div className="w-full">
              <label
                className={`flex justify-center  w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${
                  fileInputRef.current?.classList.contains("drag-over")
                    ? "bg-blue-100"
                    : ""
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!testimonios.imagen != "" ? (
                  <>
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
                        Image
                        <span className="text-blue-600 underline">Files</span>
                      </span>
                    </span>
                  </>
                ) : (
                  <Card
                    sx={{
                      maxWidth: 150,
                      maxHeight: 150,
                      position: "relative",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={testimonios.imagen}
                      />
                    </CardActionArea>
                    <IconButton
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon
                        titleAccess="Eliminar credencial"
                        sx={{ color: "crimson", borderRadius: "50%" }}
                      />
                    </IconButton>
                  </Card>
                )}
                <input
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  type="file"
                  name="file_upload"
                />
              </label>
            </div>
          </div>
          <button type="submit" className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};
