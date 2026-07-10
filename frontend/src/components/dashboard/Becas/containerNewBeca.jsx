import { useState, useEffect } from "react";
import BecaAdd from "./BecaAdd";
import BecaPreview from "./BecaPreview";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CBA_NAVY = "#1a2744";

const ContainerNewBeca = () => {
  const [beca, setBeca] = useState({
    titulo: "",
    descripcion: "",
    multimedia: [],
    estado: false,
    tipo: "General",
    UsuarioIdUsuario: "",
  });

  const idUser = useSelector((state) => state.login.user._userId);
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (idUser) setBeca((prev) => ({ ...prev, UsuarioIdUsuario: idUser }));
  }, []);

  const handleSubmitBeca = async (urls) => {
    try {
      const response = await axios.post("beca/create", {
        titulo: beca.titulo,
        descripcion: beca.descripcion,
        multimedia: urls,
        estado: beca.estado,
        tipo: beca.tipo,
        UsuarioIdUsuario: beca.UsuarioIdUsuario,
      });
      if (response.data) {
        toast.success("Beca creada con éxito.");
        navigate("/dashboard/becanav/table");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al crear la beca.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f6fa", minHeight: "100vh", padding: "28px 32px" }}>

      {/* Encabezado igual que publicaciones */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: CBA_NAVY, margin: 0 }}>
            Nueva beca
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>
            Gestiona las becas del sitio web
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/becanav/table")}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "white", border: "1px solid #d1d5db",
            borderRadius: "6px", padding: "8px 16px",
            fontSize: "13px", color: "#374151", cursor: "pointer", fontWeight: 500,
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 15 }} /> Volver
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <BecaAdd beca={beca} setBeca={setBeca} handleSubmitBeca={handleSubmitBeca} />
        <BecaPreview
          titulo={beca.titulo}
          descripcion={beca.descripcion}
          multimedia={beca.multimedia}
          estado={beca.estado}
          tipo={beca.tipo}
          fecha="Hace un momento"
          user={user}
        />
      </div>

    </div>
  );
};

export default ContainerNewBeca;