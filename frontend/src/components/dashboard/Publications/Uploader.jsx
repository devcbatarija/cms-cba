import React, { useState, useRef } from "react";
import { handleUpload } from "../../../services/functions";

const CBA_RED = "#D50032";
const CBA_NAVY = "#002E5F";
const CBA_GRAY = "#DEDEDE";

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  dropzone: (dragging) => ({
    border: `2px dashed ${dragging ? CBA_RED : CBA_GRAY}`,
    borderRadius: 8,
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: dragging ? "#fff0f3" : "#fafafa",
    cursor: "pointer",
    transition: "all 0.2s",
    gap: 8,
    minHeight: 100,
  }),
  dropIcon: {
    fontSize: 28,
    color: CBA_GRAY,
    marginBottom: 2,
  },
  dropText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    margin: 0,
  },
  dropSubtext: {
    fontSize: 11,
    color: "#bbb",
    margin: 0,
  },
  previewGrid: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  previewItem: {
    position: "relative",
    width: 72,
    height: 72,
    borderRadius: 6,
    overflow: "hidden",
    border: `1.5px solid ${CBA_GRAY}`,
  },
  previewImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  previewDelete: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: CBA_RED,
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 20,
    height: 20,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    lineHeight: 1,
    padding: 0,
  },
  fileInput: {
    display: "block",
    width: "100%",
    padding: "8px 10px",
    border: `1px solid ${CBA_GRAY}`,
    borderRadius: 6,
    fontSize: 12,
    color: "#555",
    backgroundColor: "#fff",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  errorMsg: {
    fontSize: 12,
    color: CBA_RED,
    backgroundColor: "#fff0f3",
    border: `1px solid #ffc0c0`,
    borderRadius: 5,
    padding: "7px 12px",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  hint: {
    fontSize: 11,
    color: "#bbb",
    margin: 0,
  },
};

const Uploader = ({ setUrls, publicacion, setPublicacion, cantMax = 1 }) => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const processFiles = async (files) => {
    const fileArray = Array.from(files);
    const format = fileArray.map((f) => ({ name: f.name, type: f.type }));

    if (format.length + images.length > cantMax) {
      setError(`Máximo ${cantMax} archivo${cantMax !== 1 ? "s" : ""} permitido${cantMax !== 1 ? "s" : ""}.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setError("");
    const promises = await handleUpload(fileArray);
    const base64Array = await Promise.all(promises);

    setImages((prev) => [...prev, ...format]);
    setPublicacion((prev) => ({
      ...prev,
      multimedia: [...prev.multimedia, ...base64Array],
    }));
    if (setUrls) setUrls(base64Array);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleDelete = (name) => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    const idx = images.findIndex((f) => f.name === name);
    const newImages = images.filter((f) => f.name !== name);
    const newMultimedia = publicacion.multimedia.filter((_, i) => i !== idx);
    setImages(newImages);
    setPublicacion({ ...publicacion, multimedia: newMultimedia });
  };

  return (
    <div style={styles.wrap}>
      {/* Dropzone */}
      <div
        style={styles.dropzone(isDragging)}
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {images.length > 0 ? (
          <div style={styles.previewGrid} onClick={(e) => e.stopPropagation()}>
            {images.map((img, idx) => (
              <div key={img.name} style={styles.previewItem}>
                {img.type.startsWith("image/") ? (
                  <img
                    src={publicacion.multimedia[idx]}
                    alt={img.name}
                    style={styles.previewImg}
                  />
                ) : (
                  <div style={{ ...styles.previewImg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#888", backgroundColor: "#f0f0f0" }}>
                    video
                  </div>
                )}
                <button
                  style={styles.previewDelete}
                  onClick={() => handleDelete(img.name)}
                  aria-label="Eliminar imagen"
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}
            {images.length < cantMax && (
              <div style={{ ...styles.previewItem, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f8f8", cursor: "pointer", border: `2px dashed ${CBA_GRAY}` }}>
                <span style={{ fontSize: 22, color: "#ccc" }}>+</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <span style={styles.dropIcon}>🖼️</span>
            <p style={styles.dropText}>Arrastra archivos aquí o haz clic para seleccionar</p>
            <p style={styles.dropSubtext}>PNG, JPG, MP4 · Máx. {cantMax} archivo{cantMax !== 1 ? "s" : ""}</p>
          </>
        )}
      </div>

      {/* File input */}
      <input
        ref={fileInputRef}
        type="file"
        id="formFile"
        name="file"
        multiple={cantMax > 1}
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={(e) => processFiles(e.target.files)}
      />

      {/* Visible file input (styled) */}
      <input
        type="file"
        accept="image/*,video/*"
        multiple={cantMax > 1}
        style={styles.fileInput}
        onChange={(e) => processFiles(e.target.files)}
      />

      {/* Error */}
      {error && (
        <div style={styles.errorMsg}>
          ⚠ {error}
        </div>
      )}

      <p style={styles.hint}>{images.length}/{cantMax} archivo{cantMax !== 1 ? "s" : ""} cargado{images.length !== 1 ? "s" : ""}</p>
    </div>
  );
};

export default Uploader;