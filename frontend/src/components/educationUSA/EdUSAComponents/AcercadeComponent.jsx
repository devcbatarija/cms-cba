import React from "react";
import Flecha from "./FlechaComponent";
import ImagenFondo from "./ImagenComponent";

const AcercadeNosotros = ({ texto, imageUrl }) => {
  return (
    <div className="flex flex-col text-justify text-blue-900 bg-white shadow-lg rounded-lg">
      <div className="flex flex-row pr-5 pl-5 pb-5 pt-5 ">
        <div className="textos w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 ">
          <div className="text-justify pr-5 ">
            <strong>
              <h1>Acerca de nosotros</h1>
            </strong>
            <p>{texto}</p>
          </div>
        </div>
        <div className="figuras w-1/5 sm:w-1/5 md:w-1/5 lg:w-1/5 flex flex-col items-center">
          <Flecha color="rgb(3, 121, 137)" /> {/* turquesa */}
          <Flecha color="rgb(128, 160, 0)" /> {/* mostaza */}
          <Flecha color="rgb(179, 80, 0)" /> {/* naranja */}
          <Flecha color="rgb(0, 56, 152)" /> {/* azul pastel */}
          <Flecha color="rgb(0, 22, 60)" /> {/* azul marino */}
        </div>
      </div>
      <div className="pr-6 pl-6">
        <ImagenFondo imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default AcercadeNosotros;
