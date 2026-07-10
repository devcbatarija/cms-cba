import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Uploader from "../Publications/Uploader";
import axios from "axios";
import { Fade } from "@mui/material";
import Checkboxes from "./widgets/checkbox";
import SelectColorList from "./widgets/selectColor";
import { useNavigate } from "react-router-dom";
import "./calendarStyles.css";

/* ─── Brand tokens ─────────────────────────────────────────── */
const PRIMARY_BLUE = "#002E5F";
const PRIMARY_RED  = "#D50032";
const GRAY_LIGHT   = "#DEDEDE";
const WHITE        = "#FFFFFF";

/* ─── Page layout (igual que Becas: fondo gris bajito, header con
   título a la izquierda y botón Volver a la derecha) ───────────── */
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #f4f6fa;
  padding: 0;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 2.5rem 1.25rem;
  background: #f4f6fa;
`;

const PageHeaderText = styled.div``;

const PageTitle = styled.h1`
  font-family: inherit;
  font-size: 1.55rem;
  font-weight: 700;
  color: #1a2744;
  margin: 0 0 0.2rem;
  text-align: left;
`;

const PageSubtitle = styled.p`
  font-size: 0.88rem;
  color: #6b7a99;
  margin: 0;
`;

const BtnBack = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: ${WHITE};
  border: 1px solid ${GRAY_LIGHT};
  color: #1a2744;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.2s, background 0.2s;
  flex-shrink: 0;

  svg { width: 16px; height: 16px; }

  &:hover { background: #f5f6fa; border-color: #c9d2e3; }
`;

const PageBody = styled.div`
  padding: 0 2.5rem 2.5rem;
  width: 100%;
  max-width: none;
  box-sizing: border-box;
`;

const FormColumn = styled.div`
  min-width: 0;
`;

/* ─── Section card ─────────────────────────────────────────── */
const SectionCard = styled.div`
  background: ${WHITE};
  border: 1px solid ${GRAY_LIGHT};
  border-radius: 10px;
  padding: 1.75rem 2rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${PRIMARY_BLUE};
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${GRAY_LIGHT};

  svg {
    width: 18px;
    height: 18px;
    color: ${PRIMARY_BLUE};
  }
`;

/* ─── Field labels ─────────────────────────────────────────── */
const FieldLabel = styled.label`
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${PRIMARY_BLUE};
  margin-bottom: 0.45rem;

  span.req {
    color: ${PRIMARY_RED};
    margin-left: 2px;
  }
`;

/* ─── Inputs ───────────────────────────────────────────────── */
const StyledInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1.5px solid ${GRAY_LIGHT};
  border-radius: 7px;
  font-size: 0.95rem;
  color: #1a1a2e;
  background: ${WHITE};
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.2s;

  &::placeholder { color: #b0bac9; font-style: italic; }
  &:focus { outline: none; border-color: ${PRIMARY_BLUE}; }
`;

const SelectStyled = styled.select`
  width: 100%;
  padding: 0.65rem 2.2rem 0.65rem 0.9rem;
  border: 1.5px solid ${GRAY_LIGHT};
  border-radius: 7px;
  font-size: 0.95rem;
  color: #1a1a2e;
  background: ${WHITE};
  appearance: none;
  font-family: inherit;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23002E5F'%3E%3Cpath fill-rule='evenodd' d='M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus { outline: none; border-color: ${PRIMARY_BLUE}; }
`;

/* ─── Custom dropdown (reemplaza el <select> nativo para poder
   controlar el estilo del menú desplegado) ───────────────────── */
const CustomSelectWrap = styled.div`
  position: relative;
  width: 100%;
`;

const CustomSelectTrigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.65rem 0.9rem;
  border: 1.5px solid ${p => p.$open ? PRIMARY_BLUE : GRAY_LIGHT};
  border-radius: 7px;
  font-size: 0.95rem;
  color: #1a1a2e;
  background: ${WHITE};
  font-family: inherit;
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.2s;
  box-shadow: ${p => p.$open ? `0 0 0 3px rgba(0,46,95,0.12)` : "none"};

  &:focus { outline: none; }

  svg {
    width: 16px;
    height: 16px;
    color: ${PRIMARY_BLUE};
    flex-shrink: 0;
    transition: transform 0.18s;
    transform: rotate(${p => p.$open ? "180deg" : "0deg"});
  }
`;

const CustomSelectMenu = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  background: ${WHITE};
  border-radius: 10px;
  box-shadow: 0 12px 28px rgba(20,30,60,0.16), 0 2px 6px rgba(20,30,60,0.08);
  z-index: 30;
  max-height: 260px;
  overflow-y: auto;
`;

const CustomSelectOption = styled.li`
  padding: 0.65rem 0.8rem;
  font-size: 0.95rem;
  color: #1a1a2e;
  border-radius: 7px;
  cursor: pointer;
  background: ${p => p.$selected ? "#eaf1fb" : "transparent"};
  transition: background 0.12s;

  &:hover { background: ${p => p.$selected ? "#eaf1fb" : "#f5f6fa"}; }
`;

function CustomSelect({ name, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const current = options.find(o => String(o.value) === String(value));

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const pick = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setOpen(false);
  };

  return (
    <CustomSelectWrap ref={wrapRef}>
      <CustomSelectTrigger
        type="button"
        $open={open}
        onClick={() => setOpen(o => !o)}
      >
        <span>{current ? current.label : ""}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </CustomSelectTrigger>

      {open && (
        <CustomSelectMenu>
          {options.map(opt => (
            <CustomSelectOption
              key={opt.value}
              $selected={String(opt.value) === String(value)}
              onClick={() => pick(opt.value)}
            >
              {opt.label}
            </CustomSelectOption>
          ))}
        </CustomSelectMenu>
      )}
    </CustomSelectWrap>
  );
}

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const FieldGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const HelperText = styled.p`
  font-size: 0.77rem;
  color: #8a96aa;
  margin: 0.3rem 0 0;
`;

/* ─── Rich editor ──────────────────────────────────────────── */
const EditorWrapper = styled.div`
  border: 1.5px solid ${GRAY_LIGHT};
  border-radius: 7px;
  overflow: hidden;
  transition: border-color 0.2s;
  &:focus-within { border-color: ${PRIMARY_BLUE}; }
`;

const Toolbar = styled.div`
  background: #fbfbfd;
  border-bottom: 1.5px solid #e9ecf2;
  padding: 0.4rem 0.6rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1px;
`;

const TB = styled.button`
  background: none;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.82rem;
  color: #3a4a6b;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;

  &:hover { background: ${PRIMARY_BLUE}; color: ${WHITE}; }
`;

const TBSep = styled.span`
  width: 1px;
  height: 18px;
  background: #e9ecf2;
  margin: 0 3px;
  flex-shrink: 0;
`;

const FontSelect = styled.select`
  height: 26px;
  border: 1px solid #e9ecf2;
  border-radius: 5px;
  font-size: 0.78rem;
  padding: 0 6px;
  color: #6b7a99;
  background: #fbfbfd;
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover { border-color: #c9d2e3; }
  &:focus { outline: none; border-color: ${PRIMARY_BLUE}; }
`;

const EditorArea = styled.div`
  min-height: 130px;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: #1a1a2e;
  line-height: 1.65;
  outline: none;
  font-family: inherit;

  &:empty::before {
    content: attr(data-placeholder);
    color: #b0bac9;
    font-style: italic;
  }

  a { color: ${PRIMARY_BLUE}; text-decoration: underline; }
  blockquote {
    border-left: 3px solid ${PRIMARY_BLUE};
    margin: 0.5rem 0;
    padding-left: 1rem;
    color: #5a6a8a;
  }
  pre {
    background: #f0f2f5;
    padding: 0.5rem 0.75rem;
    border-radius: 5px;
    font-size: 0.85rem;
  }
`;

/* ─── Link modal ───────────────────────────────────────────── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LinkModal = styled.div`
  background: ${WHITE};
  border-radius: 10px;
  padding: 1.5rem;
  width: 360px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
`;

const LinkModalTitle = styled.p`
  font-weight: 700;
  color: ${PRIMARY_BLUE};
  margin: 0 0 1rem;
  font-size: 0.95rem;
`;

/* ─── Date section ─────────────────────────────────────────── */
const DateRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
`;

const DateBlock = styled.div`
  flex: 1;
  min-width: 160px;
`;

const DateArrow = styled.div`
  color: ${PRIMARY_BLUE};
  padding-bottom: 0.3rem;
  flex-shrink: 0;
`;

/* ─── Consigna ─────────────────────────────────────────────── */
const ConsignaToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 2px solid ${p => p.$active ? PRIMARY_RED : PRIMARY_BLUE};
  background: ${p => p.$active ? PRIMARY_RED : "transparent"};
  color: ${p => p.$active ? WHITE : PRIMARY_BLUE};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    background: ${p => p.$active ? "#b0002a" : PRIMARY_BLUE};
    color: ${WHITE};
    border-color: ${p => p.$active ? "#b0002a" : PRIMARY_BLUE};
  }

  svg { width: 15px; height: 15px; }
`;

const ConsignaSection = styled.div`
  background: #f7f8fa;
  border: 1.5px solid ${GRAY_LIGHT};
  border-radius: 9px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const ConsignaHeading = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${PRIMARY_BLUE};
  margin: 0 0 0.2rem;
`;

/* ─── Footer ───────────────────────────────────────────────── */
const FooterBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding-top: 0.5rem;
`;

const BtnCancel = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7a99;
  cursor: pointer;
  padding: 0.55rem 1.1rem;
  border-radius: 7px;
  font-family: inherit;
  transition: color 0.2s;
  &:hover { color: ${PRIMARY_RED}; }
`;

const BtnCancelFooter = styled.button`
  background: ${PRIMARY_BLUE};
  color: ${WHITE};
  border: none;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0.6rem 2.2rem;
  border-radius: 7px;
  font-family: inherit;
  letter-spacing: 0.03em;
  transition: background 0.2s;
  &:hover { background: ${PRIMARY_RED}; }
`;

const BtnPublish = styled.button`
  background: ${PRIMARY_BLUE};
  color: ${WHITE};
  border: none;
  padding: 0.6rem 2.2rem;
  border-radius: 7px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.03em;
  transition: background 0.2s;
  &:hover { background: ${PRIMARY_RED}; }
`;

const NumberInput = styled.input`
  width: 130px;
  padding: 0.65rem 0.9rem;
  border: 1.5px solid ${GRAY_LIGHT};
  border-radius: 7px;
  font-size: 0.95rem;
  color: #1a1a2e;
  background: ${WHITE};
  font-family: inherit;
  transition: border-color 0.2s;
  &:focus { outline: none; border-color: ${PRIMARY_BLUE}; }
`;

/* ══════════════════════════════════════════════════════════════
   Rich Text Editor
══════════════════════════════════════════════════════════════ */
function RichEditor({ value, onChange, placeholder }) {
  const editorRef  = useRef(null);
  const savedRange = useRef(null);
  const [showLink, setShowLink] = useState(false);
  const [linkUrl, setLinkUrl]   = useState("");

  /* Asegura que el editor tenga foco y una selección válida dentro de él
     antes de ejecutar cualquier comando. Sin esto, comandos como las
     listas o "limpiar formato" fallan silenciosamente cuando el usuario
     hizo click en un botón de la toolbar (lo que mueve el foco fuera
     del área editable y pierde la selección). */
  const ensureFocus = () => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    const sel = window.getSelection();
    const hasRangeInsideEditor =
      sel && sel.rangeCount > 0 && editor.contains(sel.getRangeAt(0).commonAncestorContainer);
    if (!hasRangeInsideEditor) {
      // No había selección dentro del editor: coloca el cursor al final.
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

  /* ── Listas, sin depender de execCommand ──────────────────────
     insertUnorderedList/insertOrderedList de execCommand es poco
     confiable en navegadores modernos (función deprecada). En vez de
     pedirle al navegador que adivine, armamos la lista nosotros mismos:
     tomamos el bloque (párrafo/línea) donde está el cursor y lo
     envolvemos en <ul><li> o <ol><li>. Si ya es una lista del mismo
     tipo, la revertimos a un párrafo normal (toggle). */
  const getBlockElement = (node) => {
    const editor = editorRef.current;
    let el = node.nodeType === 3 ? node.parentElement : node;
    while (el && el !== editor && !/^(P|DIV|LI|H1|H2|H3|BLOCKQUOTE|PRE)$/.test(el.tagName)) {
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

    const block = getBlockElement(range.commonAncestorContainer) || editor.firstChild;

    if (block && block.tagName === "LI" && block.parentElement.tagName === listTag) {
      // Ya es una lista del mismo tipo: la deshacemos (vuelve a párrafo).
      const list = block.parentElement;
      const p = document.createElement("p");
      p.innerHTML = block.innerHTML || "<br>";
      list.parentElement.insertBefore(p, list);
      list.remove();
    } else if (block && block.tagName === "LI") {
      // Es una lista del otro tipo: cambia ul<->ol conservando los items.
      const oldList = block.parentElement;
      const newList = document.createElement(listTag);
      newList.innerHTML = oldList.innerHTML;
      oldList.parentElement.replaceChild(newList, oldList);
    } else if (block) {
      // Bloque normal (p, div, h1, etc.): lo convertimos en lista de un item.
      const list = document.createElement(listTag);
      const li = document.createElement("li");
      li.innerHTML = block.innerHTML || "<br>";
      list.appendChild(li);
      block.parentElement.replaceChild(list, block);
    } else {
      // No había ningún bloque (editor vacío): crea la lista desde cero.
      const list = document.createElement(listTag);
      const li = document.createElement("li");
      li.innerHTML = "<br>";
      list.appendChild(li);
      editor.appendChild(list);
    }
    handleInput();
  };

  /* ── Limpiar formato, sin depender de execCommand ─────────────
     Reemplaza el bloque actual por un párrafo simple con el mismo
     texto, sin ninguna etiqueta de estilo (negrita, color, enlaces,
     listas, citas, etc.) ni atributos. */
  const clearFormat = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const sel = window.getSelection();
    const inEditor = sel && sel.rangeCount > 0 && editor.contains(sel.getRangeAt(0).commonAncestorContainer);
    const block = inEditor ? getBlockElement(sel.getRangeAt(0).commonAncestorContainer) : null;

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
      // Sin un bloque identificable: limpia todo el contenido a texto plano.
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
    if (sel && sel.rangeCount > 0 && editorRef.current.contains(sel.getRangeAt(0).commonAncestorContainer))
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
      editorRef.current.querySelectorAll("a").forEach(a => (a.target = "_blank"));
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

  /* SVG helpers */
  const Icon = ({ d, size = 14 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
      <path d={d} />
    </svg>
  );

  return (
    <>
      <EditorWrapper>
        <Toolbar>
          {/* Row 1 */}
          <TB type="button" title="Negrita"    onMouseDown={e => { e.preventDefault(); exec("bold"); }}><b>B</b></TB>
          <TB type="button" title="Cursiva"    onMouseDown={e => { e.preventDefault(); exec("italic"); }}><i style={{fontStyle:"italic"}}>I</i></TB>
          <TB type="button" title="Subrayado"  onMouseDown={e => { e.preventDefault(); exec("underline"); }}><u>U</u></TB>
          <TB type="button" title="Tachado"    onMouseDown={e => { e.preventDefault(); exec("strikeThrough"); }} style={{textDecoration:"line-through"}}>S</TB>
          <TB type="button" title="Cita"       onMouseDown={e => { e.preventDefault(); exec("formatBlock","blockquote"); }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
          </TB>
          <TB type="button" title="Código"     onMouseDown={e => { e.preventDefault(); exec("formatBlock","pre"); }}>&lt;/&gt;</TB>
          <TB type="button" title="H1"         onMouseDown={e => { e.preventDefault(); exec("formatBlock","h1"); }} style={{fontSize:"0.72rem",fontWeight:900}}>H1</TB>
          <TB type="button" title="H2"         onMouseDown={e => { e.preventDefault(); exec("formatBlock","h2"); }} style={{fontSize:"0.72rem",fontWeight:900}}>H2</TB>
          <TB type="button" title="Lista"      onMouseDown={e => { e.preventDefault(); toggleList("UL"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={14} height={14}><line x1="9" y1="6"  x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
          </TB>
          <TB type="button" title="Lista num." onMouseDown={e => { e.preventDefault(); toggleList("OL"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={14} height={14}><line x1="10" y1="6"  x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
          </TB>
          <TB type="button" title="Subíndice"  onMouseDown={e => { e.preventDefault(); exec("subscript"); }}>X<sub style={{fontSize:"0.6em"}}>2</sub></TB>
          <TB type="button" title="Superíndice"onMouseDown={e => { e.preventDefault(); exec("superscript"); }}>X<sup style={{fontSize:"0.6em"}}>2</sup></TB>
          <TB type="button" title="Sangría ←"  onMouseDown={e => { e.preventDefault(); exec("outdent"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={14} height={14}><line x1="21" y1="6"  x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/><polyline points="7 8 3 12 7 16"/></svg>
          </TB>
          <TB type="button" title="Sangría →"  onMouseDown={e => { e.preventDefault(); exec("indent"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={14} height={14}><line x1="3"  y1="6"  x2="21" y2="6"/><line x1="3"  y1="12" x2="15" y2="12"/><line x1="3"  y1="18" x2="21" y2="18"/><polyline points="17 8 21 12 17 16"/></svg>
          </TB>

          {/* row break visual */}
          <div style={{width:"100%",height:0}}/>

          {/* Row 2 */}
          <TB type="button" title="Color texto" onMouseDown={e => {
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
          }}>
            <span style={{display:"flex",alignItems:"center",flexDirection:"column",lineHeight:1}}>
              <span style={{fontSize:"0.75rem",fontWeight:700}}>A</span>
              <span style={{width:14,height:3,background:PRIMARY_RED,borderRadius:1,marginTop:1}}/>
            </span>
          </TB>
          <TB type="button" title="Resaltado"   onMouseDown={e => {
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
          }}>
            <span style={{display:"flex",alignItems:"center",flexDirection:"column",lineHeight:1}}>
              <span style={{fontSize:"0.72rem",fontWeight:700,fontStyle:"italic"}}>A</span>
              <span style={{width:14,height:3,background:"#FFFF00",borderRadius:1,marginTop:1}}/>
            </span>
          </TB>
          <FontSelect onChange={setFont} defaultValue="Sans Serif" title="Fuente">
            <option>Sans Serif</option>
            <option>Arial</option>
            <option>Georgia</option>
            <option>Courier New</option>
            <option>Times New Roman</option>
          </FontSelect>
          <TBSep/>
          <TB type="button" title="Centrar"    onMouseDown={e => { e.preventDefault(); exec("justifyCenter"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={14} height={14}><line x1="3" y1="6" x2="21" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="5" y1="18" x2="19" y2="18"/></svg>
          </TB>
          <TB type="button" title="Insertar enlace" onClick={openLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={14} height={14}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </TB>
          <TB type="button" title="Limpiar formato" onMouseDown={e => { e.preventDefault(); clearFormat(); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={14} height={14}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
          <LinkModal onClick={e => e.stopPropagation()}>
            <LinkModalTitle>Insertar enlace</LinkModalTitle>
            <StyledInput
              type="url"
              placeholder="https://ejemplo.com"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && insertLink()}
              autoFocus
            />
            <div style={{display:"flex",gap:"0.75rem",marginTop:"1rem",justifyContent:"flex-end"}}>
              <BtnCancel onClick={() => { setShowLink(false); setLinkUrl(""); }}>Cancelar</BtnCancel>
              <BtnPublish onClick={insertLink} style={{padding:"0.5rem 1.25rem"}}>Insertar</BtnPublish>
            </div>
          </LinkModal>
        </Overlay>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main EventAdd component
══════════════════════════════════════════════════════════════ */
function EventAdd({
  datosEvento, setDatosEvento,
  handleSubmitEvent,
  data, setData,
  Consigna, handleChangeConsigna,
  secondPartForm, toggleSecondPartForm,
}) {
  const navigate = useNavigate();
  const [urls, setUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "multimedia") setDatosEvento({ ...datosEvento, [name]: value });
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (data.tipo !== "General") {
      navigate("/dashboard/Calendario/", {
        state: { prevPath: "/dashboard/Calendario/addEvent", data },
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      const res = await axios.post("/files/upload", {
        filePath: datosEvento.multimedia,
        type: "image",
      });
      if (res.data.results) handleSubmitEvent(res.data.results);
    } catch (err) { return err; }
  };

  return (
    <PageWrapper>
      {/* ── Page header ─────────────────────────────────── */}
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Crear Evento</PageTitle>
          <PageSubtitle>Gestiona los eventos del calendario</PageSubtitle>
        </PageHeaderText>
        <BtnBack type="button" onClick={() => navigate("/dashboard/Calendario/")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5m7-7-7 7 7 7"/>
          </svg>
          Volver
        </BtnBack>
      </PageHeader>

      <PageBody>
        <FormColumn>
        {/* ── Section: Datos del evento ─────────────────── */}
        <SectionCard>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"/>
            </svg>
            Datos del evento
          </SectionTitle>

          {/* Título */}
          <FieldGroup>
            <FieldLabel htmlFor="title">Título <span className="req">*</span></FieldLabel>
            <StyledInput
              id="title"
              name="title"
              type="text"
              value={data.title}
              onChange={handleChangeData}
              required
              placeholder="Título del evento"
            />
          </FieldGroup>

          {/* Descripción con editor rico */}
          <FieldGroup>
            <FieldLabel>Descripción</FieldLabel>
            <RichEditor
              value={datosEvento.descripcion}
              onChange={html => setDatosEvento({ ...datosEvento, descripcion: html })}
              placeholder="Describe el contenido de este evento..."
            />
            <HelperText>
              Usa las herramientas para dar formato, insertar enlaces y enriquecer la descripción.
            </HelperText>
          </FieldGroup>
        </SectionCard>

        {/* ── Section: Configuración ────────────────────── */}
        <SectionCard>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5"/>
            </svg>
            Fechas y configuración
          </SectionTitle>

          {/* Fechas */}
          <FieldGroup>
            <FieldLabel>Fechas</FieldLabel>
            <DateRow>
              <DateBlock>
                <HelperText style={{margin:"0 0 0.3rem",color:"#6b7a99",fontSize:"0.8rem"}}>Fecha de inicio</HelperText>
                <StyledInput type="date" name="start" value={data.start} onChange={handleChangeData}/>
                {data.allDay === false && (
                  <Fade in={!data.allDay}>
                    <StyledInput type="time" name="start_Time" value={data.start_Time} onChange={handleChangeData} style={{marginTop:"0.5rem"}}/>
                  </Fade>
                )}
              </DateBlock>

              <DateArrow>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{width:20,height:20}}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
              </DateArrow>

              <DateBlock>
                <HelperText style={{margin:"0 0 0.3rem",color:"#6b7a99",fontSize:"0.8rem"}}>Fecha de finalización</HelperText>
                <StyledInput type="date" name="end" value={data.end} onChange={handleChangeData}/>
                {data.allDay === false && (
                  <StyledInput type="time" name="end_Time" value={data.end_Time} onChange={handleChangeData} style={{marginTop:"0.5rem"}}/>
                )}
              </DateBlock>

              <div style={{paddingTop:"1.3rem"}}>
                <Checkboxes data={data} setData={setData}/>
              </div>
            </DateRow>
          </FieldGroup>

          {/* Tipo + Color */}
          <TwoCol>
            <FieldGroup>
              <FieldLabel>Tipo de evento</FieldLabel>
              <CustomSelect
                name="tipo"
                value={data.tipo}
                onChange={handleChangeData}
                options={[
                  { value: "General", label: "General" },
                  { value: "Administrativo", label: "Administrativo" },
                  { value: "Academico", label: "Académico" },
                ]}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Color</FieldLabel>
              <SelectColorList data={data} setData={setData}/>
            </FieldGroup>
          </TwoCol>

          {/* Estado + Categoría */}
          <TwoCol>
            <FieldGroup>
              <FieldLabel>Estado</FieldLabel>
              <CustomSelect
                name="state"
                value={data.state}
                onChange={handleChangeData}
                options={[
                  { value: "true", label: "Visible" },
                  { value: "false", label: "Oculto" },
                ]}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Categoría</FieldLabel>
              <CustomSelect
                name="categoria"
                value={datosEvento.categoria}
                onChange={handleChange}
                options={[
                  { value: "Cine", label: "Cine" },
                  { value: "Comunicado", label: "Comunicado" },
                ]}
              />
            </FieldGroup>
          </TwoCol>
        </SectionCard>

        {/* ── Section: Imagen ───────────────────────────── */}
        <SectionCard>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15.75a4.5 4.5 0 0 0 4.5 4.5h9a4.5 4.5 0 0 0 1.06-8.866 6 6 0 0 0-11.71-1.97A4.502 4.502 0 0 0 3 15.75Z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25V9m0 0-3 3m3-3 3 3"/>
            </svg>
            Imagen del evento
          </SectionTitle>
          <Uploader
            urls={urls}
            setUrls={setUrls}
            publicacion={datosEvento}
            setPublicacion={setDatosEvento}
          />
        </SectionCard>

        {/* ── Section: Consigna (toggle) ────────────────── */}
        <SectionCard>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"/>
            </svg>
            Consigna
            <span style={{marginLeft:"auto"}}>
              <ConsignaToggle type="button" $active={secondPartForm} onClick={toggleSecondPartForm}>
                {secondPartForm ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                    Quitar consigna
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    Añadir consigna
                  </>
                )}
              </ConsignaToggle>
            </span>
          </SectionTitle>

          {secondPartForm ? (
            <ConsignaSection>
              <ConsignaHeading>Datos de la consigna</ConsignaHeading>
              <HelperText style={{marginBottom:"1.25rem"}}>
                Introduce los criterios que el estudiante debe cumplir para ser elegible a la recompensa.
              </HelperText>

              <FieldGroup>
                <FieldLabel htmlFor="descripcion_consigna">Descripción</FieldLabel>
                <RichEditor
                  value={Consigna.descripcion_consigna}
                  onChange={html =>
                    handleChangeConsigna({ target: { name: "descripcion_consigna", value: html } })
                  }
                  placeholder="Escribe una consigna clara y detallada..."
                />
                <HelperText>
                  Escribe una consigna clara para que los estudiantes comprendan lo que se espera de ellos.
                </HelperText>
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="cantidad_Referidos">Cantidad de referidos</FieldLabel>
                <NumberInput
                  type="number"
                  id="cantidad_Referidos"
                  name="cantidad_Referidos"
                  value={Consigna.cantidad_Referidos}
                  onChange={handleChangeConsigna}
                  min={1}
                />
              </FieldGroup>
            </ConsignaSection>
          ) : (
            <HelperText>
              Activa la consigna para definir criterios de participación estudiantil en este evento.
            </HelperText>
          )}
        </SectionCard>

        {/* ── Botones de acción ─────────────────────────── */}
        <FooterBar>
          <BtnCancelFooter type="button" onClick={() => navigate("/dashboard/Calendario/")}>
            Cancelar
          </BtnCancelFooter>
          <BtnPublish type="button" onClick={handleSubmit}>
            Publicar
          </BtnPublish>
        </FooterBar>
        </FormColumn>
      </PageBody>
    </PageWrapper>
  );
}

export default EventAdd;