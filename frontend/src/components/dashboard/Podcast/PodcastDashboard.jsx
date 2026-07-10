import * as React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Reproductor from "./Reproductor";
import { useDispatch, useSelector } from "react-redux";
import {
  getPodcastSongs,
  postPodcastSongsSpotify,
} from "../../../redux-toolkit/actions/podcastActions";
import toast from "react-hot-toast";
import "./Styles.css";
import Uploader from "../Publications/Uploader";
import Percents from "../../progressBar/Percents";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

/* ===== Paleta CBA ===== */
const NAVY = "#002E5F";
const RED = "#D50032";
const GRAY_BG = "#f4f6fa";
const GRAY_BORDER = "#DEDEDE";

/* ===== Límite de duración del audio (20 minutos) ===== */
const MAX_DURATION_SECONDS = 20 * 60;

/* ===== Estilos compartidos ===== */
const Panel = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid ${GRAY_BORDER};
  box-shadow: 0 2px 10px rgba(0, 46, 95, 0.06);
  overflow: hidden;
`;

const PanelHeader = styled.div`
  background: ${NAVY};
  padding: 22px 28px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PanelTitle = styled.h1`
  color: #ffffff;
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin: 0;
`;

const PanelBody = styled.div`
  padding: 26px 28px 30px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${NAVY};
  margin-bottom: 6px;
`;

const FieldGroup = styled.div`
  margin-bottom: 18px;
`;

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
    border-color: ${NAVY};
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(0, 46, 95, 0.12);
  }

  &:disabled {
    background: #eef0f4;
    color: #9aa3b1;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  ${baseInputStyles}
`;

const FileLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: ${(p) => (p.disabled ? "#eef0f4" : GRAY_BG)};
  border: 1px dashed ${GRAY_BORDER};
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.85rem;
  color: ${(p) => (p.disabled ? "#b3bac7" : "#4b5563")};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${(p) => (p.disabled ? GRAY_BORDER : NAVY)};
    background: ${(p) => (p.disabled ? "#eef0f4" : "#eef2f8")};
  }

  span.btn {
    flex-shrink: 0;
    background: ${(p) => (p.disabled ? "#b3bac7" : NAVY)};
    color: #fff;
    font-weight: 600;
    font-size: 0.78rem;
    padding: 6px 12px;
    border-radius: 7px;
  }

  span.name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  input {
    display: none;
  }
`;

const HelperText = styled.p`
  font-size: 0.75rem;
  color: #9aa3b1;
  margin: 6px 2px 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: ${(p) => (p.disabled ? "#e39aab" : RED)};
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: background 0.15s ease, transform 0.05s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: ${(p) => (p.disabled ? "#e39aab" : "#b8002a")};
  }

  &:active {
    transform: ${(p) => (p.disabled ? "none" : "translateY(1px)")};
  }
`;

/* ===== Spinner animado para el estado "subiendo" ===== */
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

const UploadingBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  padding: 12px 14px;
  background: #eaf0fa;
  border: 1px solid #cfe0f5;
  border-radius: 10px;
`;

const UploadingSpinner = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 3px solid rgba(0, 46, 95, 0.15);
  border-top-color: ${NAVY};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

const UploadingText = styled.p`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${NAVY};
  margin: 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 60px 20px;
  color: #9aa3b1;
  text-align: center;

  span.emoji {
    font-size: 2.2rem;
  }
`;

/* ===== Editor de texto enriquecido (Descripción) ===== */
const EditorWrapper = styled.div`
  border: 1px solid ${GRAY_BORDER};
  border-radius: 10px;
  overflow: hidden;
  background: ${GRAY_BG};
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:focus-within {
    border-color: ${NAVY};
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(0, 46, 95, 0.12);
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
    background: ${NAVY};
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
    border-color: ${NAVY};
  }
  &:focus {
    outline: none;
    border-color: ${NAVY};
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
    color: ${NAVY};
    text-decoration: underline;
  }
  blockquote {
    border-left: 3px solid ${NAVY};
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
  color: ${NAVY};
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
    color: ${RED};
  }
`;

const BtnSmallPrimary = styled.button`
  background: ${NAVY};
  color: #fff;
  border: none;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  padding: 8px 18px;
  border-radius: 7px;
  transition: background 0.15s;

  &:hover {
    background: ${RED};
  }
`;

/* ── RichEditor: editor de texto enriquecido para la Descripción ── */
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
              <span style={{ width: 13, height: 3, background: RED, borderRadius: 1, marginTop: 1 }} />
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

// lee la duración real de un archivo de audio en el navegador, sin subirlo
const getAudioDuration = (file) =>
  new Promise((resolve, reject) => {
    const audio = document.createElement("audio");
    const objectUrl = URL.createObjectURL(file);
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(audio.duration);
    };
    audio.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No se pudo leer el archivo de audio"));
    };
    audio.src = objectUrl;
  });

const formatMinSec = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const PodcastDashboard = () => {
  const dataCredentials = useSelector((state) => state.podcasts.credentials);
  const userId = useSelector((state) => state.login.user._userId);
  const songs = useSelector((state) => state.podcasts.podcasts);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showProgress, setShowProgress] = useState({
    message: false,
    bar: false,
  });
  const [form, setForm] = useState({
    epi_number: songs.length + 1,
    title: "",
    description: "",
    authors: "",
    imageUrl: "",
    multimedia: [],
    state: false,
    file: "",
    url_cloudfront: "",
    UsuarioIdUsuario: userId ? userId : "",
  });
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };

  // valida la duración del audio antes de aceptarlo (máx. 20 minutos)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const duration = await getAudioDuration(file);
      if (duration > MAX_DURATION_SECONDS) {
        toast.error(
          `El audio dura ${formatMinSec(duration)} y el máximo permitido es 20:00 minutos.`
        );
        e.target.value = "";
        return;
      }
      setForm((prev) => ({ ...prev, file }));
    } catch (error) {
      toast.error("No se pudo leer la duración del archivo de audio.");
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    const formData = new FormData();
    try {
      setIsUploading(true);
      setShowProgress({
        ...showProgress,
        message: true,
      });
      const response = await axios.post(
        "/files/upload",
        {
          filePath: form.multimedia,
          type: "image",
        },
        { contentType: "application/json" }
      );
      if (response.data) {
        setForm({
          ...form,
          imageUrl: response.data.results[0],
        });
        formData.append("media", form.file);
        eventsSSE();
        setShowProgress({
          ...showProgress,
          bar: true,
        });
        const res = await axios.post("podcast/song/upload", formData, {
          ContentType: "multipart/form-data",
        });
        if (res.data.data.Key) {
          const registerEnd = await axios.post(
            "podcast/song/upload/database",
            {
              epi_number: form.epi_number,
              title: form.title,
              description: form.description,
              authors: form.authors,
              url_cloudfront: res.data.data.Key,
              image: response.data.results[0],
              state: true,
              UsuarioIdUsuario: form.UsuarioIdUsuario,
            }
          );
          if (registerEnd.data.data) {
            await updateState();
            await setUploadProgress(0);
            await setShowProgress({
              ...showProgress,
              message: false,
              bar: false,
            });
            toast.success("Episodio publicado con éxito.");
            setForm({
              epi_number: songs.length + 2,
              title: "",
              description: "",
              authors: "",
              imageUrl: "",
              multimedia: [],
              state: false,
              file: "",
              url_cloudfront: "",
              UsuarioIdUsuario: userId ? userId : "",
            });
          }
        }
      }
    } catch (error) {
      setShowProgress({ message: false, bar: false });
      toast.error("Ocurrió un error al subir el episodio.");
    } finally {
      setIsUploading(false);
    }
  };

  // arma la URL del SSE a partir de la misma baseURL que ya usa axios,
  // para que funcione igual en local (localhost:3001) y en producción
  const eventsSSE = () => {
    const base = axios.defaults.baseURL.endsWith("/")
      ? axios.defaults.baseURL
      : `${axios.defaults.baseURL}/`;
    const eventSource = new EventSource(`${base}podcast/song/events`);

    eventSource.onmessage = (event) => {
      const progress = parseInt(event.data);
      setUploadProgress(progress);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };

  const updateState = () => {
    dispatch(getPodcastSongs());
  };

  useEffect(() => {
    updateState();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-auto p-4 bg-[#f4f6fa] gap-4">
      {/* ===== Formulario ===== */}
      <Panel className="w-full md:w-6/12 h-fit">
        <PanelHeader>
          <PanelTitle>Datos del podcast</PanelTitle>
        </PanelHeader>
        <PanelBody>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-1">
              <div className="w-3/12">
                <FieldGroup>
                  <Label htmlFor="epi_number">N.º Episodio</Label>
                  <Input
                    id="epi_number"
                    type="number"
                    name="epi_number"
                    placeholder="Número"
                    min={1}
                    onChange={handleChange}
                    value={form.epi_number}
                  />
                </FieldGroup>
              </div>
              <div className="w-9/12">
                <FieldGroup>
                  <Label htmlFor="formFile">Archivo de audio</Label>
                  <FileLabel htmlFor="formFile" disabled={isUploading}>
                    <span className="btn">Elegir archivo</span>
                    <span className="name">
                      {form.file && form.file.name
                        ? form.file.name
                        : "Ningún archivo seleccionado"}
                    </span>
                    <input
                      type="file"
                      id="formFile"
                      name="file"
                      accept="audio/*"
                      disabled={isUploading}
                      onChange={handleFileChange}
                    />
                  </FileLabel>
                  <HelperText>Duración máxima permitida: 20 minutos.</HelperText>
                </FieldGroup>
              </div>
            </div>

            <FieldGroup>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="Título del episodio"
                onChange={handleChange}
                value={form.title}
                disabled={isUploading}
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="description">Descripción</Label>
              <RichEditor
                value={form.description}
                onChange={(html) =>
                  setForm({
                    ...form,
                    description: html,
                  })
                }
                placeholder="Cuéntanos de qué trata este episodio"
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="authors">Ingrese uno o más autores</Label>
              <Input
                id="authors"
                type="text"
                name="authors"
                placeholder="Pablo Duarte, Maria Salgado, Joaquin Saavedra"
                onChange={handleChange}
                value={form.authors}
                disabled={isUploading}
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="cover">Imagen de portada</Label>
              <Uploader
                publicacion={form}
                setPublicacion={setForm}
                cantMax={3}
              />
            </FieldGroup>

            <SubmitButton type="submit" disabled={isUploading}>
              {isUploading && <Spinner />}
              {isUploading ? "Subiendo episodio..." : "Subir episodio"}
            </SubmitButton>
          </form>

          {showProgress.message && (
            <UploadingBanner>
              <UploadingSpinner />
              <UploadingText>Preparando la subida de archivos…</UploadingText>
            </UploadingBanner>
          )}
          {showProgress.bar && (
            <div className="mt-3">
              <Percents
                funcional={"Subiendo archivos"}
                uploadProgress={uploadProgress}
              />
            </div>
          )}
        </PanelBody>
      </Panel>

      {/* ===== Lista de canciones ===== */}
      <Panel className="w-full md:w-6/12">
        <PanelHeader>
          <PanelTitle>Lista de episodios</PanelTitle>
        </PanelHeader>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "80vh" }}>
          {songs && songs.length > 0 ? (
            <div className="flex flex-col gap-3">
              {songs.map((s) => {
                return s.url_cloudfront ? (
                  <Reproductor
                    key={s.id_Podcast}
                    song={s.url_cloudfront}
                    name={s.title}
                    album={s.album}
                    imgSong={s.image}
                    authors={s.authors}
                  />
                ) : null;
              })}
            </div>
          ) : (
            <EmptyState>
              <span className="emoji">🎙️</span>
              <p className="font-semibold text-gray-500">
                Todavía no hay episodios publicados
              </p>
              <p className="text-sm">
                Completa el formulario y sube tu primer episodio.
              </p>
            </EmptyState>
          )}
        </div>
      </Panel>
    </div>
  );
};

export default PodcastDashboard;