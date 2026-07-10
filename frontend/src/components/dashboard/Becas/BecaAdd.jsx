import { useState, useEffect, useRef } from "react";
import { handleUpload } from "../../../services/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import { Card, CardActionArea, CardMedia, Alert } from "@mui/material";
import styled from "styled-components";

const CBA_NAVY = "#1a2744";
const CBA_RED = "#e02040";
const GRAY_BG = "#f4f6fa";
const GRAY_BORDER = "#DEDEDE";

/* ===== Estilos del editor de texto enriquecido (idéntico al de Podcast / ContainerNewPublication) ===== */
const baseInputStyles = `
  width: 100%;
  background: ${GRAY_BG};
  border: 1px solid ${GRAY_BORDER};
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.92rem;
  color: #1f2937;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: ${CBA_NAVY};
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(26, 39, 68, 0.12);
  }

  &:disabled {
    background: #eef0f4;
    color: #9aa3b1;
    cursor: not-allowed;
  }
`;

const EditorWrapper = styled.div`
  border: 1px solid ${GRAY_BORDER};
  border-radius: 10px;
  overflow: hidden;
  background: ${GRAY_BG};
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:focus-within {
    border-color: ${CBA_NAVY};
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(26, 39, 68, 0.12);
  }
`;

const Toolbar = styled.div`
  background: #eef1f6;
  border-bottom: 1px solid ${GRAY_BORDER};
  padding: 6px 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
`;

const TB = styled.button`
  background: none;
  border: none;
  border-radius: 6px;
  width: 28px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  color: #3a4a6b;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;

  &:hover {
    background: ${CBA_NAVY};
    color: #fff;
  }
`;

const TBSep = styled.span`
  width: 1px;
  height: 16px;
  background: ${GRAY_BORDER};
  margin: 0 3px;
  flex-shrink: 0;
`;

const FontSelect = styled.select`
  height: 24px;
  border: 1px solid ${GRAY_BORDER};
  border-radius: 5px;
  font-size: 0.74rem;
  padding: 0 4px;
  color: #6b7a99;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.15s;

  &:hover {
    border-color: ${CBA_NAVY};
  }
  &:focus {
    outline: none;
    border-color: ${CBA_NAVY};
  }
`;

const EditorArea = styled.div`
  min-height: 110px;
  padding: 10px 14px;
  font-size: 0.92rem;
  color: #1f2937;
  line-height: 1.6;
  outline: none;
  font-family: inherit;
  background: transparent;

  &:empty::before {
    content: attr(data-placeholder);
    color: #9ca3af;
  }

  a {
    color: ${CBA_NAVY};
    text-decoration: underline;
  }
  blockquote {
    border-left: 3px solid ${CBA_NAVY};
    margin: 0.5rem 0;
    padding-left: 1rem;
    color: #5a6a8a;
  }
  pre {
    background: #eef0f4;
    padding: 0.5rem 0.75rem;
    border-radius: 5px;
    font-size: 0.85rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LinkModal = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  width: 320px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
`;

const LinkModalTitle = styled.p`
  font-weight: 700;
  color: ${CBA_NAVY};
  margin: 0 0 1rem;
  font-size: 0.92rem;
`;

const LinkInput = styled.input`
  ${baseInputStyles}
`;

const BtnGhost = styled.button`
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7a99;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 7px;
  transition: color 0.15s;

  &:hover {
    color: ${CBA_RED};
  }
`;

const BtnSmallPrimary = styled.button`
  background: ${CBA_NAVY};
  color: #fff;
  border: none;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  padding: 8px 18px;
  border-radius: 7px;
  transition: background 0.15s;

  &:hover {
    background: ${CBA_RED};
  }
`;

/* ── RichEditor: mismo editor de texto enriquecido usado en Podcast y ContainerNewPublication ── */
function RichEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);
  const savedRange = useRef(null);
  const [showLink, setShowLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const ensureFocus = () => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    const sel = window.getSelection();
    const hasRangeInsideEditor =
      sel &&
      sel.rangeCount > 0 &&
      editor.contains(sel.getRangeAt(0).commonAncestorContainer);
    if (!hasRangeInsideEditor) {
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const exec = (cmd, arg = null) => {
    ensureFocus();
    document.execCommand(cmd, false, arg);
    handleInput();
  };

  const getBlockElement = (node) => {
    const editor = editorRef.current;
    let el = node.nodeType === 3 ? node.parentElement : node;
    while (
      el &&
      el !== editor &&
      !/^(P|DIV|LI|H1|H2|H3|BLOCKQUOTE|PRE)$/.test(el.tagName)
    ) {
      el = el.parentElement;
    }
    return el === editor ? null : el;
  };

  const toggleList = (listTag) => {
    const editor = editorRef.current;
    if (!editor) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) return;

    const block =
      getBlockElement(range.commonAncestorContainer) || editor.firstChild;

    if (block && block.tagName === "LI" && block.parentElement.tagName === listTag) {
      const list = block.parentElement;
      const p = document.createElement("p");
      p.innerHTML = block.innerHTML || "<br>";
      list.parentElement.insertBefore(p, list);
      list.remove();
    } else if (block && block.tagName === "LI") {
      const oldList = block.parentElement;
      const newList = document.createElement(listTag);
      newList.innerHTML = oldList.innerHTML;
      oldList.parentElement.replaceChild(newList, oldList);
    } else if (block) {
      const list = document.createElement(listTag);
      const li = document.createElement("li");
      li.innerHTML = block.innerHTML || "<br>";
      list.appendChild(li);
      block.parentElement.replaceChild(list, block);
    } else {
      const list = document.createElement(listTag);
      const li = document.createElement("li");
      li.innerHTML = "<br>";
      list.appendChild(li);
      editor.appendChild(list);
    }
    handleInput();
  };

  const clearFormat = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const sel = window.getSelection();
    const inEditor =
      sel &&
      sel.rangeCount > 0 &&
      editor.contains(sel.getRangeAt(0).commonAncestorContainer);
    const block = inEditor
      ? getBlockElement(sel.getRangeAt(0).commonAncestorContainer)
      : null;

    if (block) {
      const list = block.tagName === "LI" ? block.parentElement : null;
      const text = block.textContent || "";
      const p = document.createElement("p");
      p.textContent = text || "";
      if (list) {
        list.parentElement.insertBefore(p, list);
        if (list.children.length <= 1) list.remove();
        else block.remove();
      } else {
        block.parentElement.replaceChild(p, block);
      }
    } else {
      const text = editor.textContent || "";
      editor.innerHTML = "";
      const p = document.createElement("p");
      p.textContent = text;
      editor.appendChild(p);
    }
    handleInput();
  };

  const handleInput = () => onChange(editorRef.current.innerHTML);

  const openLink = () => {
    const sel = window.getSelection();
    if (
      sel &&
      sel.rangeCount > 0 &&
      editorRef.current.contains(sel.getRangeAt(0).commonAncestorContainer)
    )
      savedRange.current = sel.getRangeAt(0).cloneRange();
    setShowLink(true);
  };

  const insertLink = () => {
    if (linkUrl) {
      editorRef.current.focus();
      if (savedRange.current) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange.current);
      }
      document.execCommand("createLink", false, linkUrl);
      editorRef.current.querySelectorAll("a").forEach((a) => (a.target = "_blank"));
      handleInput();
    }
    setShowLink(false);
    setLinkUrl("");
  };

  const setFont = (e) => {
    ensureFocus();
    document.execCommand("fontName", false, e.target.value);
    handleInput();
  };

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML)
      editorRef.current.innerHTML = value || "";
  }, []);

  return (
    <>
      <EditorWrapper>
        <Toolbar>
          <TB type="button" title="Negrita" onMouseDown={(e) => { e.preventDefault(); exec("bold"); }}>
            <b>B</b>
          </TB>
          <TB type="button" title="Cursiva" onMouseDown={(e) => { e.preventDefault(); exec("italic"); }}>
            <i style={{ fontStyle: "italic" }}>I</i>
          </TB>
          <TB type="button" title="Subrayado" onMouseDown={(e) => { e.preventDefault(); exec("underline"); }}>
            <u>U</u>
          </TB>
          <TB type="button" title="Tachado" onMouseDown={(e) => { e.preventDefault(); exec("strikeThrough"); }} style={{ textDecoration: "line-through" }}>
            S
          </TB>
          <TB type="button" title="Cita" onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", "blockquote"); }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width={13} height={13}>
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
          </TB>
          <TB type="button" title="Código" onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", "pre"); }}>
            &lt;/&gt;
          </TB>
          <TB type="button" title="H1" onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", "h1"); }} style={{ fontSize: "0.7rem", fontWeight: 900 }}>
            H1
          </TB>
          <TB type="button" title="H2" onMouseDown={(e) => { e.preventDefault(); exec("formatBlock", "h2"); }} style={{ fontSize: "0.7rem", fontWeight: 900 }}>
            H2
          </TB>
          <TB type="button" title="Lista" onMouseDown={(e) => { e.preventDefault(); toggleList("UL"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={13} height={13}>
              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />
            </svg>
          </TB>
          <TB type="button" title="Lista num." onMouseDown={(e) => { e.preventDefault(); toggleList("OL"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={13} height={13}>
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <path d="M4 6h1v4" />
              <path d="M4 10h2" />
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
            </svg>
          </TB>
          <TB type="button" title="Subíndice" onMouseDown={(e) => { e.preventDefault(); exec("subscript"); }}>
            X<sub style={{ fontSize: "0.6em" }}>2</sub>
          </TB>
          <TB type="button" title="Superíndice" onMouseDown={(e) => { e.preventDefault(); exec("superscript"); }}>
            X<sup style={{ fontSize: "0.6em" }}>2</sup>
          </TB>
          <TB type="button" title="Sangría ←" onMouseDown={(e) => { e.preventDefault(); exec("outdent"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={13} height={13}>
              <line x1="21" y1="6" x2="3" y2="6" />
              <line x1="21" y1="12" x2="9" y2="12" />
              <line x1="21" y1="18" x2="3" y2="18" />
              <polyline points="7 8 3 12 7 16" />
            </svg>
          </TB>
          <TB type="button" title="Sangría →" onMouseDown={(e) => { e.preventDefault(); exec("indent"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={13} height={13}>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
              <polyline points="17 8 21 12 17 16" />
            </svg>
          </TB>

          <div style={{ width: "100%", height: 0 }} />

          <TB
            type="button"
            title="Color texto"
            onMouseDown={(e) => {
              e.preventDefault();
              ensureFocus();
              const sel = window.getSelection();
              const range = sel.rangeCount > 0 ? sel.getRangeAt(0).cloneRange() : null;
              const c = prompt("Color (ej: #e02040)", "#000000");
              if (c && range) {
                sel.removeAllRanges();
                sel.addRange(range);
                exec("foreColor", c);
              }
            }}
          >
            <span style={{ display: "flex", alignItems: "center", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700 }}>A</span>
              <span style={{ width: 13, height: 3, background: CBA_RED, borderRadius: 1, marginTop: 1 }} />
            </span>
          </TB>
          <TB
            type="button"
            title="Resaltado"
            onMouseDown={(e) => {
              e.preventDefault();
              ensureFocus();
              const sel = window.getSelection();
              const range = sel.rangeCount > 0 ? sel.getRangeAt(0).cloneRange() : null;
              const c = prompt("Color resaltado (ej: #FFFF00)", "#FFFF00");
              if (c && range) {
                sel.removeAllRanges();
                sel.addRange(range);
                exec("hiliteColor", c);
              }
            }}
          >
            <span style={{ display: "flex", alignItems: "center", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, fontStyle: "italic" }}>A</span>
              <span style={{ width: 13, height: 3, background: "#FFFF00", borderRadius: 1, marginTop: 1 }} />
            </span>
          </TB>
          <FontSelect onChange={setFont} defaultValue="Sans Serif" title="Fuente">
            <option>Sans Serif</option>
            <option>Arial</option>
            <option>Georgia</option>
            <option>Courier New</option>
            <option>Times New Roman</option>
          </FontSelect>
          <TBSep />
          <TB type="button" title="Centrar" onMouseDown={(e) => { e.preventDefault(); exec("justifyCenter"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={13} height={13}>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="7" y1="12" x2="17" y2="12" />
              <line x1="5" y1="18" x2="19" y2="18" />
            </svg>
          </TB>
          <TB type="button" title="Insertar enlace" onClick={openLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={13} height={13}>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </TB>
          <TB type="button" title="Limpiar formato" onMouseDown={(e) => { e.preventDefault(); clearFormat(); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={13} height={13}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </TB>
        </Toolbar>

        <EditorArea
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder || "Escribe aquí..."}
          onInput={handleInput}
        />
      </EditorWrapper>

      {showLink && (
        <Overlay onClick={() => setShowLink(false)}>
          <LinkModal onClick={(e) => e.stopPropagation()}>
            <LinkModalTitle>Insertar enlace</LinkModalTitle>
            <LinkInput
              type="url"
              placeholder="https://ejemplo.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && insertLink()}
              autoFocus
            />
            <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem", justifyContent: "flex-end" }}>
              <BtnGhost type="button" onClick={() => { setShowLink(false); setLinkUrl(""); }}>
                Cancelar
              </BtnGhost>
              <BtnSmallPrimary type="button" onClick={insertLink}>
                Insertar
              </BtnSmallPrimary>
            </div>
          </LinkModal>
        </Overlay>
      )}
    </>
  );
}

function BecaAdd({ beca, setBeca, handleSubmitBeca }) {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const cantMax = 1;

  const handleFiles = async (files) => {
    const arr = Array.from(files);
    if (arr.length > cantMax) {
      setFileError(`Máximo ${cantMax} archivo permitido`);
      return;
    }
    const format = arr.map((f) => ({ name: f.name, type: f.type }));
    setImages((prev) => [...prev, ...format]);
    const promises = await handleUpload(arr);
    const base64Array = await Promise.all(promises);
    setBeca((prev) => ({
      ...prev,
      multimedia: [...prev.multimedia, ...base64Array],
    }));
    setFileError("");
  };

  const handleInputChange = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (name) => {
    const idx = images.findIndex((i) => i.name === name);
    setImages((prev) => prev.filter((i) => i.name !== name));
    setBeca((prev) => ({
      ...prev,
      multimedia: prev.multimedia.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSubmitBeca(beca.multimedia);
  };

  return (
    <div style={{ background: "white", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>

      {/* Header del panel */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid #f0f0f0" }}>
        <EditNoteIcon sx={{ fontSize: 18, color: "#2e2e2e" }} />
        <span style={{ fontSize: "14px", fontWeight: 600, color: CBA_NAVY }}>Datos de la beca</span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        {/* Título */}
        <div>
          <label style={labelStyle}>TÍTULO <span style={{ color: CBA_RED }}>*</span></label>
          <input
            type="text"
            placeholder="Título de la beca"
            value={beca.titulo}
            onChange={(e) => setBeca({ ...beca, titulo: e.target.value })}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = CBA_NAVY)}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>

        {/* Descripción — mismo editor enriquecido usado en Podcast / ContainerNewPublication */}
        <div>
          <label style={labelStyle}>DESCRIPCIÓN</label>
          <RichEditor
            value={beca.descripcion}
            onChange={(html) => setBeca({ ...beca, descripcion: html })}
            placeholder="Describe el contenido de esta beca..."
          />
        </div>

        {/* Tipo y Visibilidad */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div>
            <label style={labelStyle}>TIPO</label>
            <select
              value={beca.tipo}
              onChange={(e) => setBeca({ ...beca, tipo: e.target.value })}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = CBA_NAVY)}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            >
              <option value="General">General</option>
              <option value="Academico">Académico</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>VISIBILIDAD</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
              <div
                onClick={() => setBeca({ ...beca, estado: !beca.estado })}
                style={{
                  width: "42px", height: "22px", borderRadius: "999px", cursor: "pointer",
                  background: beca.estado ? CBA_NAVY : "#d1d5db",
                  position: "relative", transition: "background 0.2s",
                }}
              >
                <div style={{
                  position: "absolute", top: "3px",
                  left: beca.estado ? "22px" : "3px",
                  width: "16px", height: "16px", borderRadius: "50%",
                  background: "white", transition: "left 0.2s",
                }} />
              </div>
              <span style={{ fontSize: "13px", color: "#374151" }}>
                {beca.estado ? "Visible" : "Oculto"}
              </span>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div>
          <label style={labelStyle}>IMAGEN</label>
          <div
            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${isDragging ? CBA_RED : "#d1d5db"}`,
              borderRadius: "8px", padding: "20px",
              background: isDragging ? "#fff5f7" : "#fafafa",
              display: "flex", flexWrap: "wrap", gap: "10px",
              alignItems: "center", justifyContent: images.length ? "flex-start" : "center",
              minHeight: "100px", cursor: "pointer", transition: "all 0.2s",
            }}
            onClick={() => document.getElementById("beca-file-input").click()}
          >
            {images.length === 0 ? (
              <div style={{ textAlign: "center", color: "#9ca3af" }}>
                <CloudUploadIcon sx={{ fontSize: 32, color: "#d1d5db", mb: 0.5 }} />
                <p style={{ margin: "6px 0 0", fontSize: "13px" }}>Arrastra archivos aquí o haz clic para seleccionar</p>
                <p style={{ margin: "4px 0 0", fontSize: "11px" }}>PNG, JPG, MP4 · Máx. {cantMax} archivo</p>
              </div>
            ) : (
              images.map((img, index) => (
                img.type === "image/jpeg" || img.type === "image/png" ? (
                  <Card key={img.name} sx={{ width: 90, height: 90, position: "relative", borderRadius: "6px", flexShrink: 0 }}>
                    <CardActionArea sx={{ height: "100%" }}>
                      <CardMedia component="img" height="90" image={beca.multimedia[index]} alt={img.name} />
                    </CardActionArea>
                    <IconButton
                      onClick={(e) => { e.stopPropagation(); handleDelete(img.name); }}
                      size="small"
                      style={{ position: "absolute", top: 2, right: 2, background: "rgba(255,255,255,0.85)" }}
                    >
                      <DeleteIcon sx={{ fontSize: 16, color: CBA_RED }} />
                    </IconButton>
                  </Card>
                ) : (
                  <div key={img.name} style={{ fontSize: "12px", color: "#6b7280", padding: "4px 8px", background: "#f3f4f6", borderRadius: "4px" }}>
                    {img.name}
                  </div>
                )
              ))
            )}
          </div>

          <input
            id="beca-file-input"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleInputChange}
            accept="image/png,image/jpeg,video/mp4"
          />

          {fileError && (
            <Alert severity="error" sx={{ mt: 1, fontSize: "12px", py: 0 }}>{fileError}</Alert>
          )}

          <p style={{ fontSize: "11px", color: "#9ca3af", margin: "6px 0 0" }}>
            {images.length}/{cantMax} archivos cargados
          </p>
        </div>

        {/* Botón publicar */}
        <button
          type="submit"
          style={{
            width: "100%", padding: "13px",
            background: CBA_RED, color: "white",
            border: "none", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600,
            cursor: "pointer", letterSpacing: "0.3px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            marginTop: "4px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#c01830")}
          onMouseLeave={(e) => (e.currentTarget.style.background = CBA_RED)}
        >
          Publicar <SendIcon sx={{ fontSize: 16 }} />
        </button>

      </form>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  color: "#6b7280",
  letterSpacing: "0.6px",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "13px",
  color: "#1a2744",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
  background: "white",
  fontFamily: "inherit",
};

export default BecaAdd;