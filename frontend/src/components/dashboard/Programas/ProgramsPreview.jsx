import React, { useEffect } from "react";
import Carrousel from "../widgets/carrousel";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { calcularTimestate } from "../../../services/functions";

const ProgramPreview = ({
  nombre,
  imagen,
  caracteristicas,
  requisitos,
}) => {
   

  // const renderAprendizaje = () => {
  //   return {
  //     __html: aprendizaje.replace(/\n/g, "<br>"),
  //   };
  // };

  return (
    <div className="bg-white shadow-lg rounded-lg border">
      {/* <header className="flex flex-row gap-5 p-4">
        <div className="flex flex-col gap-2">
          <p className="text-1xl font-bold">{nombre}</p>
        </div>
      </header>
      <div className="flex flex-row gap-5 p-4">
        <h2 className="text-2xl text-black">{nombre}</h2>
      </div>
      <div className="flex flex-row gap-5 p-4">
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={renderAprendizaje()}
        ></p>
      </div>
      <div className="flex flex-row gap-5 p-4">
        {/* <a
          className="text-blue-500 underline"
          href="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          http://localhost:5173/dashboard/publinav/add
        </a> }
      </div> */}
    </div>
  );
};

export default ProgramPreview;
