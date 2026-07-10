import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import styled from "styled-components";
import { getAllBeca } from "../../../redux-toolkit/actions/becaActions";
import { Skeleton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

const CBA_RED = "#D50032";
const CBA_NAVY = "#002E5F";
const CBA_GRAY = "#DEDEDE";
const GRAY_BG = "#f4f6fa";
const FONT_FAMILY = "'Poppins', 'Inter', 'Segoe UI', sans-serif";

/* ===== Estilos del RichEditor (idéntico al de Nueva publicación / Nueva beca) ===== */
const baseInputStyles = `
  width: 100%;
  background: ${GRAY_BG};
  border: 1px solid ${CBA_GRAY};
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
    box-shadow: 0 0 0 3px rgba(0, 46, 95, 0.12);
  }

  &:disabled {
    background: #eef0f4;
    color: #9aa3b1;
    cursor: not-allowed;
  }
`;

const EditorWrapper = styled.div`
  border: 1px solid ${CBA_GRAY};
  border-radius: 10px;
  overflow: hidden;
  background: ${GRAY_BG};
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:focus-within {
    border-color: ${CBA_NAVY};
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(0, 46, 95, 0.12);
  }
`;

const Toolbar = styled.div`
  background: #eef1f6;
  border-bottom: 1px solid ${CBA_GRAY};
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
  background: ${CBA_GRAY};
  margin: 0 3px;
  flex-shrink: 0;
`;

const FontSelect = styled.select`
  height: 24px;
  border: 1px solid ${CBA_GRAY};
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

/* ── RichEditor: mismo editor de texto enriquecido usado en Nueva publicación ── */
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
              const c = prompt("Color (ej: #D50032)", "#000000");
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

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1300,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    maxWidth: 680,
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
    fontFamily: FONT_FAMILY,
  },
  modalHeader: {
    backgroundColor: CBA_NAVY,
    padding: "18px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitleWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: 600,
    margin: 0,
    fontFamily: FONT_FAMILY,
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 4,
    opacity: 0.85,
  },
  body: {
    padding: "24px 28px",
  },
  thumbRow: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 8,
    objectFit: "cover",
    border: `2px solid ${CBA_GRAY}`,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: "#555",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontFamily: FONT_FAMILY,
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
    fontFamily: FONT_FAMILY,
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
    fontFamily: FONT_FAMILY,
  },
  fullField: {
    gridColumn: "1 / -1",
  },
  footer: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
    marginTop: 24,
    paddingTop: 20,
    borderTop: `1px solid ${CBA_GRAY}`,
  },
  cancelBtn: {
    padding: "10px 22px",
    border: `1px solid ${CBA_GRAY}`,
    borderRadius: 6,
    backgroundColor: "transparent",
    color: "#555",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: FONT_FAMILY,
  },
  saveBtn: {
    padding: "10px 26px",
    border: "none",
    borderRadius: 6,
    backgroundColor: CBA_RED,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: FONT_FAMILY,
  },
  savingBtn: {
    padding: "10px 26px",
    border: "none",
    borderRadius: 6,
    backgroundColor: "#999",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "not-allowed",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: FONT_FAMILY,
  },
};

// CSS global: solo queda el import de Poppins y la animación del spinner
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default function ModalUpdateBeca({ id, open, handleClose }) {
  const [spinner, setSpinner] = useState(false);
  const [skeleton, setSkeleton] = useState(true);
  const [form, setForm] = useState({
    id_Beca: "",
    titulo: "",
    descripcion: "",
    multimedia: [],
    estado: false,
    tipo: "",
    UsuarioIdUsuario: null,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDescriptionChange = (html) => {
    setForm((prev) => ({ ...prev, descripcion: html }));
  };

  const getBecaById = async () => {
    try {
      const response = await axios.get(`beca/getone/${id}`);
      setForm(response.data.results);
      setSkeleton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      await axios.put(`beca/update/${id}`, form);
      setTimeout(() => {
        toast.success("Actualización exitosa!");
        dispatch(getAllBeca());
        setSpinner(false);
        handleClose();
      }, 1500);
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (open) getBecaById();
  }, [open]);

  if (!open) return null;

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div style={styles.modal}>

        {/* Header */}
        <div style={styles.modalHeader}>
          <div style={styles.modalTitleWrap}>
            <EditNoteIcon sx={{ fontSize: 22, color: "#fff" }} />
            <h2 style={styles.modalTitle}>Editar beca</h2>
          </div>
          <button style={styles.closeBtn} onClick={handleClose} aria-label="Cerrar">
            <CloseIcon sx={{ fontSize: 22, color: "#fff" }} />
          </button>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {skeleton ? (
            <div style={styles.grid2}>
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} variant="rectangular" width="100%" height={56} style={{ borderRadius: 6 }} />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* Imágenes preview */}
              {form.multimedia?.length > 0 && (
                <div style={styles.thumbRow}>
                  {form.multimedia.map((im, i) => (
                    <img key={i} src={im} alt={`Imagen ${i + 1}`} style={styles.thumb} />
                  ))}
                </div>
              )}

              <div style={styles.grid2}>

                {/* Título */}
                <div style={{ ...styles.fieldGroup, ...styles.fullField }}>
                  <label style={styles.label}>Título</label>
                  <input
                    style={styles.input}
                    name="titulo"
                    type="text"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                    onFocus={(e) => (e.target.style.borderColor = CBA_NAVY)}
                    onBlur={(e) => (e.target.style.borderColor = CBA_GRAY)}
                  />
                </div>

                {/* Descripción — mismo RichEditor usado en Nueva publicación / Nueva beca */}
                <div style={{ ...styles.fieldGroup, ...styles.fullField }}>
                  <label style={styles.label}>Descripción</label>
                  <RichEditor
                    value={form.descripcion}
                    onChange={handleDescriptionChange}
                    placeholder="Describe el contenido de esta beca..."
                  />
                </div>

                {/* Estado */}
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Estado</label>
                  <select
                    style={styles.select}
                    name="estado"
                    value={form.estado}
                    onChange={(e) => setForm({ ...form, estado: e.target.value === "true" })}
                  >
                    <option value="true">Visible</option>
                    <option value="false">Oculto</option>
                  </select>
                </div>

                {/* Tipo */}
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Tipo</label>
                  <select
                    style={styles.select}
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                  >
                    <option value="General">General</option>
                    <option value="Academico">Académico</option>
                  </select>
                </div>

              </div>

              {/* Footer */}
              <div style={styles.footer}>
                <button type="button" style={styles.cancelBtn} onClick={handleClose}>
                  <CancelIcon sx={{ fontSize: 16 }} />
                  Cancelar
                </button>
                <button type="submit" style={spinner ? styles.savingBtn : styles.saveBtn} disabled={spinner}>
                  {spinner ? (
                    <>
                      <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <SaveIcon sx={{ fontSize: 16 }} />
                      Guardar cambios
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
      <style>{globalCss}</style>
    </div>
  );
}

ModalUpdateBeca.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};