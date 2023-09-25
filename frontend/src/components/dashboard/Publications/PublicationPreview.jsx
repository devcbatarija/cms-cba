import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carrousel from "../widgets/carrousel";

function PublicationPreview({ titulo, descripcion, multimedia, estado, tipo }) {
  useEffect(() => {
    // Este efecto se ejecutará cuando cambie el estado multimedia
    // Puedes agregar aquí cualquier lógica que deba ejecutarse cuando cambie multimedia
  }, [multimedia]);
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{titulo}</h2>
      <p className="text-gray-700">{descripcion}</p>
      <div className="mt-4">
      <Carrousel multimedia={multimedia}></Carrousel>
      </div>
    </div>
  );
}

export default PublicationPreview;
