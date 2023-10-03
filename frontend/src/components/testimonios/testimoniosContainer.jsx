import React from "react";
import { TestimonioAdd } from "./testimonioAdd";
import { TestimonioPreview } from "./testimonioPreview";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getAllTestimonio } from "../../redux-toolkit/actions/testimonioActions";
import toast from "react-hot-toast";

export const TestimoniosContainer = () => {
  const [testimonios, setTestimonios] = useState({
    nombre: "",
    apellidos: "",
    cargo: "Estudiante",
    cargoTwo: "",
    comentario: "",
    imagen: "",
    state: false,
  });
  const idUser = useSelector((state) => state.login.user._userId);
  const handleSetImagen = async (img) =>
    setTestimonios({
      ...testimonios,
      imagen: img,
    });
  const handleSubmitTestimonio = async (url) => {
    try {
      const response = await axios.post("testimonios/", {
        nombre: testimonios.nombre,
        apellidos: testimonios.apellidos,
        cargo:
          testimonios.cargo != "Otro"
            ? testimonios.cargo
            : testimonios.cargoTwo,
        comentario: testimonios.comentario,
        imagen: url[0],
        state: testimonios.state,
        UsuarioIdUsuario: idUser,
      });
      if (response.data) {
        toast.success("Registro exitoso.");
        getAllTestimonio();
        setTestimonios({
          ...testimonios,
          nombre: "",
          apellidos: "",
          cargo: "Estudiante",
          cargoTwo: "",
          comentario: "",
          imagen: "",
          state: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [urls, setUrls] = useState([]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2 w-full p-4 gap-2 bg-zinc-100">
      <TestimonioAdd
        testimonios={testimonios}
        setTestimonios={setTestimonios}
        setUrls={setUrls}
        handleSetImagen={handleSetImagen}
        handleSubmitTestimonio={handleSubmitTestimonio}
      ></TestimonioAdd>
      <div className="flex flex-col w-full ">
        <TestimonioPreview
          testimonios={testimonios}
          nombre={testimonios.nombre}
          apellidos={testimonios.apellidos}
          cargo={testimonios.cargo}
          comentario={testimonios.comentario}
          imagen={testimonios.imagen}
          type={"Editor"}
        ></TestimonioPreview>
      </div>
    </div>
  );
};
