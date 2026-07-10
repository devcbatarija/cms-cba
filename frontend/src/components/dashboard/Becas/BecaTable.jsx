import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStateAllBecas,
  deselectAllBecas,
  deselectBeca,
  getAllBeca,
  selectAllBecas,
  selectBeca,
} from "../../../redux-toolkit/actions/becaActions";
import toast from "react-hot-toast";
import ModalUpdateBeca from "./modalUpdateBeca";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CBA_RED = "#D50032";
const CBA_NAVY = "#002E5F";

const THUMB_COLORS = [CBA_RED, CBA_NAVY, "#6B4E9B", "#1a7a38", "#e08a00", "#0077b6"];

function getInitials(title = "") {
  return title.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const inputBase = {
  padding: "9px 13px",
  border: "1.5px solid #e0e3ed",
  borderRadius: 7,
  fontSize: 13,
  backgroundColor: "#fafbff",
  color: "#1a1a2e",
  cursor: "pointer",
  outline: "none",
  fontFamily: "inherit",
  height: 38,
  boxSizing: "border-box",
};

export default function BecaTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.becas.becas);
  const selectedBecas = useSelector((state) => state.becas.selectedBecas);

  const [open, setOpen] = useState(false);
  const [selectedBecaModal, setSelectedBecaModal] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [tipoFilter, setTipoFilter] = useState("");

  useEffect(() => {
    dispatch(getAllBeca());
  }, [dispatch]);

  const filtered = (data || []).filter((row) => {
    const q = searchQ.toLowerCase();
    const matchQ = !q || row.titulo?.toLowerCase().includes(q) || row.descripcion?.toLowerCase().includes(q);
    const matchE = !estadoFilter || (estadoFilter === "visible" ? row.estado : !row.estado);
    const matchT = !tipoFilter || row.tipo === tipoFilter;
    return matchQ && matchE && matchT;
  });

  const handleDelete = async () => {
    await axios.post("beca/delete/select", { ids: selectedBecas });
    setTimeout(() => {
      dispatch(getAllBeca());
      dispatch(deselectAllBecas());
      dispatch(deleteStateAllBecas());
      toast.success("Borrado exitoso!");
    }, 1500);
  };

  const handleModal = (id) => {
    setSelectedBecaModal(id);
    setOpen(true);
  };

  const handleSelectBeca = (id) => {
    if (selectedBecas.includes(id)) {
      dispatch(deselectBeca(id));
    } else {
      dispatch(selectBeca(id));
    }
  };

  const resetFilters = () => {
    setSearchQ("");
    setEstadoFilter("");
    setTipoFilter("");
  };

  return (
    <div style={{ backgroundColor: "#f5f6fa", minHeight: "100vh", fontFamily: "'Segoe UI', 'Inter', sans-serif", color: "#1a1a2e" }}>
      {open && (
        <ModalUpdateBeca
          id={selectedBecaModal}
          open={open}
          handleClose={() => setOpen(false)}
        />
      )}

      {/* HEADER */}
      <div style={{ padding: "28px 32px 20px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: CBA_NAVY }}>Becas</h1>
          <p style={{ fontSize: 14, color: "#888", margin: "4px 0 0", fontFamily: "inherit" }}>
            Gestiona las becas del sitio web
          </p>
        </div>
      </div>

      {/* BULK BAR */}
      {selectedBecas.length > 0 && (
        <div style={{
          margin: "0 32px 16px",
          backgroundColor: "#fff3f5",
          border: "1.5px solid #ffc0c9",
          borderRadius: 8,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <span style={{ fontSize: 13, color: "#555", fontWeight: 500, fontFamily: "inherit" }}>
            {selectedBecas.length} seleccionada{selectedBecas.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={handleDelete}
            style={{ backgroundColor: CBA_RED, color: "#fff", border: "none", borderRadius: 6, padding: "6px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            Borrar selección
          </button>
        </div>
      )}

      {/* CONTROLS */}
      <div style={{ padding: "0 32px 20px" }}>
        <div style={{
          backgroundColor: "#fff",
          border: "1.5px solid #e8eaef",
          borderRadius: 10,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}>
          {/* Buscador */}
          <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 320 }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar beca..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              style={{ ...inputBase, paddingLeft: 30, width: "100%", cursor: "text" }}
            />
          </div>

          {/* Estado */}
          <select
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            style={{ ...inputBase, flex: "0 0 auto", minWidth: 150 }}
          >
            <option value="">Todos los estados</option>
            <option value="visible">Visible</option>
            <option value="oculto">Oculto</option>
          </select>

          {/* Tipo */}
          <select
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value)}
            style={{ ...inputBase, flex: "0 0 auto", minWidth: 145 }}
          >
            <option value="">Todos los tipos</option>
            <option value="General">General</option>
            <option value="Academico">Academico</option>
          </select>

          {/* Restablecer */}
          <button
            onClick={resetFilters}
            style={{
              ...inputBase,
              backgroundColor: "#fafbff",
              border: "1.5px solid #e0e3ed",
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 6,
              flex: "0 0 auto",
              paddingLeft: 12,
              paddingRight: 14,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.36"/>
            </svg>
            Restablecer filtro
          </button>

          <span style={{ marginLeft: "auto", fontSize: 12, color: "#aaa", whiteSpace: "nowrap", fontFamily: "inherit" }}>
            {filtered.length} beca{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* CARDS */}
      <div style={{ padding: "0 32px 40px" }}>
        {filtered.length === 0 ? (
          <div style={{
            backgroundColor: "#fff",
            border: "1.5px solid #e8eaef",
            borderRadius: 10,
            padding: "48px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d0d3de" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <p style={{ fontSize: 14, color: "#bbb", margin: 0, fontFamily: "inherit" }}>
              No se encontraron becas.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
            {filtered.map((beca, index) => {
              const color = THUMB_COLORS[index % THUMB_COLORS.length];
              const isSelected = selectedBecas.includes(beca.id_Beca);
              const hasImage = beca.multimedia?.length > 0;

              return (
                <div
                  key={beca.id_Beca || index}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    overflow: "hidden",
                    border: isSelected ? `2px solid ${CBA_RED}` : "1.5px solid #e8eaef",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.15s, transform 0.15s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,46,95,0.10)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Checkbox */}
                  <div style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectBeca(beca.id_Beca)}
                      style={{ width: 16, height: 16, accentColor: CBA_RED, cursor: "pointer" }}
                    />
                  </div>

                  {/* Estado badge */}
                  <div style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}>
                    <span style={{
                      backgroundColor: beca.estado ? "rgba(26,122,56,0.88)" : "rgba(120,120,130,0.80)",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontFamily: "inherit",
                    }}>
                      {beca.estado ? "Visible" : "Oculto"}
                    </span>
                  </div>

                  {/* Imagen o placeholder */}
                  {hasImage ? (
                    <img src={beca.multimedia[0]} alt={beca.titulo} style={{ width: "100%", height: 175, objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{ width: "100%", height: 175, backgroundColor: color + "14", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 40, fontWeight: 800, color: color + "50" }}>
                        {getInitials(beca.titulo)}
                      </span>
                    </div>
                  )}

                  {/* Contenido */}
                  <div style={{ padding: "14px 16px 10px", flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                    {beca.tipo && (
                      <span style={{
                        fontSize: 11, fontWeight: 600, color: CBA_NAVY,
                        backgroundColor: "#edf0f8", padding: "2px 9px",
                        borderRadius: 20, alignSelf: "flex-start", fontFamily: "inherit",
                      }}>
                        {beca.tipo}
                      </span>
                    )}
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0, lineHeight: 1.4, fontFamily: "inherit" }}>
                      {beca.titulo}
                    </h3>
                    {/* rich-text para renderizar HTML con links */}
                    <div
                      className="rich-text"
                      style={{
                        fontSize: 13, color: "#777", margin: 0, lineHeight: 1.65, flex: 1,
                        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                        fontFamily: "inherit",
                      }}
                      dangerouslySetInnerHTML={{ __html: beca.descripcion }}
                    />
                  </div>

                  {/* Footer */}
                  <div style={{ padding: "10px 16px 14px", borderTop: "1.5px solid #f0f2f7" }}>
                    <button
                      onClick={() => handleModal(beca.id_Beca)}
                      style={{
                        width: "100%", backgroundColor: CBA_NAVY, color: "#fff",
                        border: "none", borderRadius: 7, padding: "9px 0",
                        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      Editar beca
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}