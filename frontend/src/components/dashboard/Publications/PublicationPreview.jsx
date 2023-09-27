import React, { useEffect } from "react";
import Carrousel from "../widgets/carrousel";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

const PublicationPreview = ({
  titulo,
  descripcion,
  multimedia,
  estado,
  tipo,
}) => {
  const data = useSelector((state) => state.login.user);
  useEffect(() => {}, [multimedia]);

  const renderDescription = () => {
    return {
      __html: descripcion.replace(/\n/g, "<br>"),
    };
  };

  return (
    <div className="bg-white shadow-lg rounded-lg border">
      <header className="flex flex-row gap-5 p-4">
        <Avatar src={data._profileImage} />
        <div className="flex flex-col gap-2">
          <p className="text-1xl font-bold">{data.correo}</p>
          <p className="text-gray-700">Hace un momento</p>
        </div>
      </header>
      <div className="flex flex-row gap-5 p-4">
        <h2 className="text-2xl ">{titulo}</h2>
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
        {/* <a
          className="text-blue-500 underline"
          href="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          http://localhost:5173/dashboard/publinav/add
        </a> */}
      </div>
    </div>
  );
};

export default PublicationPreview;
