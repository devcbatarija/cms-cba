import React from "react";

export default function Rectangulo({ color, text }) {
    const rectangleStyle = {
        width: "100%", // Hace que ocupe todo el ancho disponible
        height: "30px",
        backgroundColor: `${color}`,
        display: "flex", // Permite que los elementos internos se alineen horizontalmente
        alignItems: "center", // Centra verticalmente el texto dentro del rectángulo
        justifyContent: "center", // Centra horizontalmente el texto dentro del rectángulo
        color: "white"
    };

    return (
        <div className="flex pt-1 pb-1">
            <div className="shadow-lg" style={rectangleStyle}>
                <strong><h1>{text}</h1></strong>
            </div>
        </div>
    );
}
