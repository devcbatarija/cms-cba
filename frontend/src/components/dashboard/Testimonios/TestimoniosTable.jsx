import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Avatar, Checkbox, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import axios from "axios";
import styled from "styled-components";
import {
  deleteStateAllTestimonio, deselectAllTestimonio, deselectTestimonio,
  getAllTestimonio, selectAllTestimonio, selectTestimonio,
} from "../../../redux-toolkit/actions/testimonioActions";

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

  &:hover { background: ${(p) => (p.$disabled ? "rgba(255,255,255,0.1)" : "#b8002a")}; }
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
    padding: 10px 16px;
  }

  tbody tr:last-child td { border-bottom: none; }
`;

const CargoChip = styled.span`
  display: inline-block;
  background: #eef2f8;
  color: ${NAVY};
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  white-space: nowrap;
`;

const CommentCell = styled.div`
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #4b5563;
  text-align: left;
`;

const StyledAvatar = styled(Avatar)`
  && { border: 2px solid ${GRAY_BORDER}; }
`;

export default function TestimonioTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.testimonios.testimonios);
  const selectedTestimonios = useSelector((state) => state.testimonios.selectedTestimonios);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllTestimonio(data.map((t) => t.id_Testimonios)));
      setSelectAll(true);
    } else {
      dispatch(deselectAllTestimonio());
      setSelectAll(false);
    }
  };

  const handleDelete = async () => {
    await axios.post("testimonios/delete/select", { ids: selectedTestimonios });
    setTimeout(() => {
      dispatch(getAllTestimonio());
      dispatch(deselectAllTestimonio());
      dispatch(deleteStateAllTestimonio());
      toast.success("Borrado exitoso.");
    }, 1500);
  };

  const handleSelectOne = (id) => {
    if (selectedTestimonios.includes(id)) {
      dispatch(deselectTestimonio(id));
      setSelectAll(false);
    } else {
      dispatch(selectTestimonio(id));
    }
  };

  useEffect(() => { dispatch(getAllTestimonio()); }, []);

  const checkboxSx = { color: NAVY, "&.Mui-checked": { color: NAVY } };

  return (
    <Wrapper>
      <Panel>
        <Toolbar>
          <ToolbarLeft>
            <ToolbarTitle>Testimonios</ToolbarTitle>
            <ToolbarCount>
              {data?.length || 0} {data?.length === 1 ? "registro" : "registros"}
            </ToolbarCount>
          </ToolbarLeft>
          <DeleteButton
            type="button"
            $disabled={selectedTestimonios.length === 0}
            disabled={selectedTestimonios.length === 0}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" />
            Borrar {selectedTestimonios.length > 0 ? selectedTestimonios.length : ""}
          </DeleteButton>
        </Toolbar>

        <StyledContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de testimonios">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: 56 }}>
                  <Checkbox sx={checkboxSx} checked={selectAll} onChange={handleSelectAll}
                    inputProps={{ "aria-label": "seleccionar todos" }} />
                </TableCell>
                <TableCell align="left">Nombres</TableCell>
                <TableCell align="left">Apellidos</TableCell>
                <TableCell align="center">Cargo</TableCell>
                <TableCell align="left">Comentario</TableCell>
                <TableCell align="center">Imagen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center" padding="checkbox">
                      <Checkbox
                        sx={checkboxSx}
                        checked={selectedTestimonios.includes(row.id_Testimonios)}
                        onChange={() => handleSelectOne(row.id_Testimonios)}
                      />
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 600, color: NAVY }}>
                      {row.nombre}
                    </TableCell>
                    <TableCell align="left">{row.apellidos}</TableCell>
                    <TableCell align="center">
                      <CargoChip>{row.cargo}</CargoChip>
                    </TableCell>
                    <TableCell align="left">
                      <CommentCell title={row.comentario}>{row.comentario}</CommentCell>
                    </TableCell>
                    <TableCell align="center"
                      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <StyledAvatar
                        alt={row.nombre || "Testimonio"}
                        src={row.imagen || null}
                        sx={{ width: 44, height: 44 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ border: 0, py: 8 }}>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      color: "#9aa3b1",
                      textAlign: "center",
                    }}>
                      <PersonOutlineIcon sx={{ fontSize: "2.8rem", color: "#c9d2e3" }} />
                      <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "#6b7a99", margin: 0 }}>
                        Todavía no hay testimonios
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