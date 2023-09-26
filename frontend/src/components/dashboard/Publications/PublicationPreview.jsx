import React, { useEffect } from "react";
import Carrousel from "../widgets/carrousel";

function PublicationPreview({ titulo, descripcion, multimedia, estado, tipo }) {
  useEffect(() => {
  }, [multimedia]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border">
      {titulo || descripcion || multimedia.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-2">{titulo}</h2>
          <p className="text-gray-700">{descripcion}</p>
          <div className="mt-4">
            <Carrousel multimedia={multimedia}></Carrousel>
          </div>
          <a
            className="text-blue-500 underline"
            href="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://localhost:5173/dashboard/publinav/add
          </a>
          <br />
          <a
            className="text-blue-500 underline"
            href="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://localhost:5173/dashboard/publinav/add
          </a>
        </>
      ) : (
        <h2 className="text-2xl font-bold mb-2">Aún no se ha editado nada</h2>
      )}
    </div>
  );
}

export default PublicationPreview;
