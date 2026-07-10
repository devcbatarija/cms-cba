import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar, Checkbox, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import axios from "axios";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import {
  deleteStateAllAmbientes, deselectAllAmbientes, deselectAmbiente,
  getAllAmbientes, selectAllAmbientes, selectAmbiente,
} from "../../../redux-toolkit/actions/galleryActions";

/* ===== Paleta CBA ===== */
const NAVY        = "#002E5F";
const RED         = "#D50032";
const GRAY_BG     = "#f4f6fa";
const GRAY_BORDER = "#DEDEDE";

const Wrapper = styled.div`
  background: ${GRAY_BG};
  min-height: 100vh;
  padding: 24px;
`;

const Panel = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid ${GRAY_BORDER};
  box-shadow: 0 2px 10px rgba(0,46,95,0.06);
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: ${NAVY};
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const ToolbarTitle = styled.h1`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0;
`;

const ToolbarCount = styled.span`
  color: rgba(255,255,255,0.55);
  font-size: 0.8rem;
`;

const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: ${(p) => (p.$disabled ? "rgba(255,255,255,0.1)" : RED)};
  color: ${(p) => (p.$disabled ? "rgba(255,255,255,0.35)" : "#fff")};
  border: none;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 9px 18px;
  border-radius: 9px;
  cursor: ${(p) => (p.$disabled ? "not-allowed" : "pointer")};
  transition: background 0.15s, transform 0.05s;
  font-family: inherit;

  &:hover  { background: ${(p) => (p.$disabled ? "rgba(255,255,255,0.1)" : "#b8002a")}; }
  &:active { transform: ${(p) => (p.$disabled ? "none" : "translateY(1px)")}; }
  svg { font-size: 17px; }
`;

const StyledContainer = styled(TableContainer)`
  && { box-shadow: none; border-radius: 0; }
  table { border-collapse: separate; border-spacing: 0; }

  thead th {
    background: #eef2f8;
    color: ${NAVY};
    font-weight: 700;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid ${GRAY_BORDER};
    white-space: nowrap;
    padding: 12px 16px;
  }

  tbody tr { transition: background 0.1s; }
  tbody tr:hover { background: #f6f8fc; }

  tbody td {
    border-bottom: 1px solid #eef0f4;
    font-size: 0.88rem;
    color: #1f2937;
    padding: 12px 16px;
    vertical-align: middle;
  }

  tbody tr:last-child td { border-bottom: none; }
`;

const AmbienteChip = styled.span`
  display: inline-block;
  background: #eef2f8;
  color: ${NAVY};
  font-size: 0.78rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 999px;
  white-space: nowrap;
`;

const GalleryCell = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const GalleryThumb = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${GRAY_BORDER};
  flex-shrink: 0;
  background: #eef2f8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const EmptyImages = styled.span`
  font-size: 0.8rem;
  color: #b0bac9;
  font-style: italic;
`;

export default function GalleryTable() {
  const dispatch = useDispatch();
  const ambient = useSelector((state) => state.gallery.ambient);
  const selectedAmbientes = useSelector((state) => state.gallery.selectedAmbients);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllAmbientes(ambient.map((a) => a.id_ambiente)));
      setSelectAll(true);
    } else {
      dispatch(deselectAllAmbientes());
      setSelectAll(false);
    }
  };

  const handleDelete = async () => {
    await axios.post("gallery/delete/select", { ids: selectedAmbientes });
    setTimeout(() => {
      dispatch(getAllAmbientes());
      dispatch(deselectAllAmbientes());
      dispatch(deleteStateAllAmbientes());
      toast.success("Borrado exitoso.");
    }, 1500);
  };

  const handleSelectAmbiente = (amId) => {
    if (selectedAmbientes.includes(amId)) {
      dispatch(deselectAmbiente(amId));
      setSelectAll(false);
    } else {
      dispatch(selectAmbiente(amId));
    }
  };

  useEffect(() => {
    dispatch(getAllAmbientes());
  }, [dispatch]);

  const checkboxSx = { color: NAVY, "&.Mui-checked": { color: NAVY } };

  return (
    <Wrapper>
      <Panel>
        {/* ── Toolbar ── */}
        <Toolbar>
          <ToolbarLeft>
            <ToolbarTitle>Galería American Spaces</ToolbarTitle>
            <ToolbarCount>
              {ambient?.length || 0} {ambient?.length === 1 ? "ambiente" : "ambientes"}
            </ToolbarCount>
          </ToolbarLeft>
          <DeleteButton
            type="button"
            $disabled={selectedAmbientes.length === 0}
            disabled={selectedAmbientes.length === 0}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" />
            Borrar {selectedAmbientes.length > 0 ? selectedAmbientes.length : ""}
          </DeleteButton>
        </Toolbar>

        {/* ── Tabla ── */}
        <StyledContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de galería">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: 56 }}>
                  <Checkbox
                    sx={checkboxSx}
                    checked={selectAll}
                    onChange={handleSelectAll}
                    inputProps={{ "aria-label": "seleccionar todos" }}
                  />
                </TableCell>
                <TableCell align="left" sx={{ width: 200 }}>Ambiente</TableCell>
                <TableCell align="left">Imágenes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ambient && ambient.length > 0 ? (
                ambient.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" padding="checkbox">
                      <Checkbox
                        sx={checkboxSx}
                        checked={selectedAmbientes.includes(row.id_ambiente)}
                        onChange={() => handleSelectAmbiente(row.id_ambiente)}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <AmbienteChip>{row.nombre}</AmbienteChip>
                    </TableCell>
                    <TableCell align="left">
                      <GalleryCell>
                        {row.Galleries && row.Galleries.length > 0 ? (
                          row.Galleries.map((gallery, i) => (
                            <GalleryThumb key={i}>
                              <img
                                src={gallery.image}
                                alt={`${row.nombre} ${i + 1}`}
                              />
                            </GalleryThumb>
                          ))
                        ) : (
                          <EmptyImages>Sin imágenes</EmptyImages>
                        )}
                      </GalleryCell>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} sx={{ border: 0, py: 8 }}>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      textAlign: "center",
                    }}>
                      <CollectionsOutlinedIcon sx={{ fontSize: "2.8rem", color: "#c9d2e3" }} />
                      <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "#6b7a99", margin: 0 }}>
                        Todavía no hay ambientes
                      </p>
                      <p style={{ fontSize: "0.83rem", color: "#9aa3b1", margin: 0 }}>
                        Crea un ambiente desde "Agregar ambiente".
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledContainer>
      </Panel>
    </Wrapper>
  );
}