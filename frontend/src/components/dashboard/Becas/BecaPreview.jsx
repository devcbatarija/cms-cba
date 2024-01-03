import React, { useEffect } from "react";
import Carrousel from "../widgets/carrousel";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { calcularTimestate } from "../../../services/functions";

const BecaPreview = ({
  titulo,
  descripcion,
  multimedia,
  estado,
  tipo,
  fecha,
  user
}) => {


  const renderDescription = () => {
    return {
      __html: descripcion.replace(/\n/g, "<br>"),
    };
  };

  return (
    <div className="bg-white shadow-lg rounded-lg border">
      <header className="flex flex-row gap-5 p-4">
        <Avatar src={user.image || user._profileImage} />
        <div className="flex flex-col gap-2">
          <p className="text-1xl font-bold">{user.correo}</p>
          <p className="text-gray-700">{fecha}</p>
        </div>
      </header>
      <div className="flex flex-row gap-5 p-4">
        <h2 className="text-2xl text-black">{titulo}</h2>
      </div>
      <div className="w-full">
        <Carrousel multimedia={multimedia}></Carrousel>
      </div>
      <div className="flex flex-row gap-5 p-4">
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={renderDescription()}
        ></p>
      </div>
      <div className="flex flex-row gap-5 p-4">
      </div>
    </div>
  );
};

export default BecaPreview;
