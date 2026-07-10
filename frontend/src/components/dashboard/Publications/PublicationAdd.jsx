import React, { useState } from "react";
import Uploader from "./Uploader";

const CBA_RED = "#D50032";
const CBA_NAVY = "#002E5F";
const CBA_GRAY = "#DEDEDE";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    fontFamily: "'Inter','Segoe UI',sans-serif",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "#555",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  input: {
    padding: "10px 12px",
    border: `1px solid ${CBA_GRAY}`,
    borderRadius: 6,
    fontSize: 13,
    color: "#1a1a2e",
    outline: "none",
    width: "100%",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "10px 12px",
    border: `1px solid ${CBA_GRAY}`,
    borderRadius: 6,
    fontSize: 13,
    color: "#1a1a2e",
    outline: "none",
    width: "100%",
    minHeight: 100,
    resize: "vertical",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  select: {
    padding: "10px 12px",
    border: `1px solid ${CBA_GRAY}`,
    borderRadius: 6,
    fontSize: 13,
    color: "#1a1a2e",
    outline: "none",
    width: "100%",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  row2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  toggleWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  toggle: (on) => ({
    position: "relative",
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: on ? CBA_NAVY : CBA_GRAY,
    cursor: "pointer",
    transition: "background-color 0.2s",
    border: "none",
    outline: "none",
  }),
  toggleDot: (on) => ({
    position: "absolute",
    top: 3,
    left: on ? 20 : 3,
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: "#fff",
    transition: "left 0.2s",
  }),
  toggleLabel: (on) => ({
    fontSize: 13,
    fontWeight: 500,
    color: on ? CBA_NAVY : "#999",
  }),
  submitBtn: {
    backgroundColor: CBA_RED,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "12px 24px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 4,
    transition: "background-color 0.15s",
  },
  divider: {
    border: "none",
    borderTop: `1px solid ${CBA_GRAY}`,
    margin: "4px 0",
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#aaa",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: -6,
  },
};

const PublicationAdd = ({ publicacion, setPublicacion, handleSubmitPublication }) => {
  const [urls, setUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicacion({ ...publicacion, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitPublication(urls.length > 0 ? urls : publicacion.multimedia);
  };

  const focusStyle = (e) => (e.target.style.borderColor = CBA_NAVY);
  const blurStyle = (e) => (e.target.style.borderColor = CBA_GRAY);

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      {/* Titulo */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Título *</label>
        <input
          style={styles.input}
          name="titulo"
          type="text"
          value={publicacion.titulo}
          onChange={handleChange}
          placeholder="Ej: Women's History Month 2025"
          required
          onFocus={focusStyle}
          onBlur={blurStyle}
        />
      </div>

      {/* Descripcion */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Descripción</label>
        <textarea
          style={styles.textarea}
          name="descripcion"
          value={publicacion.descripcion}
          onChange={handleChange}
          placeholder="Describe el contenido de esta publicación..."
          onFocus={focusStyle}
          onBlur={blurStyle}
        />
      </div>

      {/* Estado y Tipo */}
      <div style={styles.row2}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Tipo</label>
          <select
            style={styles.select}
            name="tipo"
            value={publicacion.tipo}
            onChange={handleChange}
          >
            <option value="General">General</option>
            <option value="Academico">Académico</option>
          </select>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Visibilidad</label>
          <div style={styles.toggleWrap}>
            <button
              type="button"
              style={styles.toggle(publicacion.estado)}
              onClick={() => setPublicacion({ ...publicacion, estado: !publicacion.estado })}
              aria-label="Cambiar visibilidad"
            >
              <span style={styles.toggleDot(publicacion.estado)} />
            </button>
            <span style={styles.toggleLabel(publicacion.estado)}>
              {publicacion.estado ? "Visible" : "Oculto"}
            </span>
          </div>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* Uploader */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Multimedia</label>
        <Uploader
          setUrls={setUrls}
          publicacion={publicacion}
          setPublicacion={setPublicacion}
          cantMax={3}
        />
      </div>

      <button
        type="submit"
        style={styles.submitBtn}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#b8002b")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = CBA_RED)}
      >
        Publicar
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </form>
  );
};

export default PublicationAdd;