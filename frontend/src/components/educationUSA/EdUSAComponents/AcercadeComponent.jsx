import React from "react";
import Flecha from "./FlechaComponent";


const AcercaDeNosotros = ({ texto }) => {
  return (
    <div className="flex flex-wrap">
      <div>
        <div className="textos w-full lg:w-4/5">
          <div>
            <strong>
              <h1>ACERCA DE NOSOTROS</h1>
            </strong>
          </div>
          <div className="text-justify p-10">
            <p>{texto}</p>
          </div>
        </div>
        <div className="figuras lg:w-1/5 flex flex-col items-center">
          <Flecha color="rgb(64, 224, 208)" /> {/* Turquesa */}
          <Flecha color="rgb(255, 255, 0)" /> {/* Mostaza */}
          <Flecha color="rgb(255, 165, 0)" /> {/* Naranja */}
          <Flecha color="rgb(173, 216, 230)" /> {/* Azul Pastel */}
          <Flecha color="rgb(0, 0, 128)" /> {/* Azul Marino */}
        </div>
      </div>
    </div>
  );
};

export default AcercaDeNosotros;
