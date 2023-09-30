import React from "react";
import { TestimonioAdd } from "./testimonioAdd";
import { TestimonioPreview } from "./testimonioPreview";
import { useState } from "react";

export const TestimoniosContainer = () => {
  const [testimonios, setTestimonios] = useState({
    nombre: "",
    apellidos: "",
    cargo: "Estudiante",
    comentario: "",
    state: false,
  });
  const [urls, setUrls] = useState([]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full p-4 gap-2 bg-zinc-100">
      <TestimonioAdd
        testimonios={testimonios}
        setTestimonios={setTestimonios}
        setUrls={setUrls}
      ></TestimonioAdd>
      <div className="flex flex-col w-full ">
        <TestimonioPreview
          nombre={testimonios.nombre}
          apellidos={testimonios.apellidos}
          cargo={testimonios.cargo}
          comentario={testimonios.comentario}
        ></TestimonioPreview>
      </div>
    </div>
  );
};
