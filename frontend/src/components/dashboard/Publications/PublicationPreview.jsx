import React from "react";
import Carrousel from "../widgets/carrousel";
import Avatar from "@mui/material/Avatar";

const PublicationPreview = ({
  titulo,
  descripcion,
  multimedia,
  estado,
  tipo,
  fecha,
  user,
}) => {
  return (
    <div style={{
      background: "white",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
      fontFamily: "inherit",
    }}>

      {/* Header: avatar + info + badges */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px", borderBottom: "1px solid #f3f4f6",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar
            src={user?.image || user?._profileImage}
            sx={{ width: 38, height: 38, fontSize: "14px", bgcolor: "#1a2744" }}
          >
            {user?.correo?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#1a2744", fontFamily: "inherit" }}>
              {user?.correo}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#9ca3af", fontFamily: "inherit" }}>
              {fecha}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {tipo && (
            <span style={{
              fontSize: "11px", fontWeight: 500,
              padding: "3px 8px", borderRadius: "4px",
              background: "#f3f4f6", color: "#6b7280",
              border: "1px solid #e5e7eb",
              fontFamily: "inherit",
            }}>
              {tipo}
            </span>
          )}
          <span style={{
            fontSize: "11px", fontWeight: 500,
            padding: "3px 8px", borderRadius: "4px",
            background: estado ? "#ecfdf5" : "#f9fafb",
            color: estado ? "#059669" : "#6b7280",
            border: `1px solid ${estado ? "#a7f3d0" : "#e5e7eb"}`,
            display: "flex", alignItems: "center", gap: "4px",
            fontFamily: "inherit",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: estado ? "#10b981" : "#d1d5db",
              display: "inline-block",
            }} />
            {estado ? "Visible" : "Oculto"}
          </span>
        </div>
      </div>

      {/* Título */}
      {titulo && (
        <div style={{ padding: "14px 16px 8px" }}>
          <h2 style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 700,
            color: "#1a2744",
            lineHeight: 1.3,
            fontFamily: "inherit",
          }}>
            {titulo}
          </h2>
        </div>
      )}

      {/* Imagen / Carrusel */}
      {multimedia?.length > 0 && (
        <div style={{ width: "100%" }}>
          <Carrousel multimedia={multimedia} />
        </div>
      )}

      {/* Descripción */}
      {descripcion && (
        <div style={{ padding: "10px 16px 14px" }}>
          <div
            className="pub-description"
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#4b5563",
              lineHeight: 1.6,
              fontFamily: "inherit",
            }}
            dangerouslySetInnerHTML={{ __html: descripcion }}
          />
        </div>
      )}

      {/* Footer */}
      <div style={{
        padding: "10px 16px",
        borderTop: "1px solid #f3f4f6",
        display: "flex", alignItems: "center",
      }}>
        <span style={{
          display: "inline-block",
          width: "3px", height: "14px",
          background: "#e02040",
          borderRadius: "2px",
          marginRight: "8px",
        }} />
        <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500, fontFamily: "inherit" }}>
          CBA Tarija · Vista previa
        </span>
      </div>

    </div>
  );
};

export default PublicationPreview;