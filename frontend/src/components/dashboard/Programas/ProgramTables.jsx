import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import {
  deleteStateAllPrograms, deselectAllPrograms,
  deselectProgram, getAllProgram, selectAllPrograms,
  selectProgram, deleteProgram
} from "../../../redux-toolkit/actions/programActions";
import toast from "react-hot-toast";
import {
  Avatar, Box, Button, Checkbox, Grid, InputAdornment,
  TextField, Typography
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ModalUpdateProgram from "./modalUpdateProgram";

/* ===== Paleta y estilos CBA ===== */
const NAVY = "#002E5F";
const RED = "#D50032";
const GRAY_BG = "#f4f6fa";
const GRAY_BORDER = "#DEDEDE";

// colores fijos para las categorías conocidas
const CATEGORY_COLORS = {
  Adults: { bg: "#eaf0fa", color: "#002E5F" },   // azul navy
  Children: { bg: "#e6f7ee", color: "#1b8a5a" }, // verde
  Teens: { bg: "#fff2e0", color: "#c9711b" },    // naranja
};

// paleta de respaldo para categorías nuevas que no estén en CATEGORY_COLORS
const CATEGORY_PALETTE = [
  { bg: "#f3eafd", color: "#7a3fc9" }, // violeta
  { bg: "#fdeaf0", color: "#c9247a" }, // rosa
  { bg: "#e6f2fb", color: "#1c6fb0" }, // celeste
  { bg: "#e0f7fa", color: "#0e7c86" }, // turquesa
];
const DEFAULT_CATEGORY_STYLE = { bg: "#f0f0f0", color: "#5b6470" };

// devuelve el color fijo si es una categoría conocida, o un color estable por hash si es nueva
const getCategoryStyle = (categoria) => {
  if (!categoria) return DEFAULT_CATEGORY_STYLE;
  if (CATEGORY_COLORS[categoria]) return CATEGORY_COLORS[categoria];

  let hash = 0;
  for (let i = 0; i < categoria.length; i++) {
    hash = categoria.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CATEGORY_PALETTE.length;
  return CATEGORY_PALETTE[index];
};

const PageWrapper = styled(Box)`
  font-family: "Poppins", sans-serif;
  background-color: ${GRAY_BG};
  min-height: 100vh;
  padding: 32px;
`;

const HeaderRow = styled(Box)`
  margin-bottom: 24px;
`;

const PageTitle = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  color: ${NAVY};
  font-size: 28px;
`;

const PageSubtitle = styled(Typography)`
  font-family: "Poppins", sans-serif;
  color: #8a93a3;
  font-size: 14px;
  margin-top: 4px;
`;

const ToolbarCard = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border: 1px solid ${GRAY_BORDER};
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const SearchField = styled(TextField)`
  flex: 1;
  min-width: 220px;
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    & fieldset {
      border-color: ${GRAY_BORDER};
    }
    &:hover fieldset {
      border-color: ${NAVY};
    }
    &.Mui-focused fieldset {
      border-color: ${NAVY};
    }
  }
`;

const DeleteButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  text-transform: none;
  background-color: ${RED};
  border-radius: 8px;
  padding: 8px 16px;
  white-space: nowrap;
  &:hover {
    background-color: #b50029;
  }
`;

const ResultCount = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #8a93a3;
  white-space: nowrap;
  margin-left: auto;
`;

const Card = styled(Box)`
  background: #ffffff;
  border: 1px solid ${GRAY_BORDER};
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 6px rgba(0, 46, 95, 0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 46, 95, 0.12);
    transform: translateY(-2px);
  }
`;

const CardImageArea = styled(Box)`
  position: relative;
  height: 160px;
  background: linear-gradient(135deg, ${NAVY} 0%, #00477f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckboxOverlay = styled(Box)`
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
`;

const CardBody = styled(Box)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const Badge = styled(Box)`
  display: inline-flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  align-self: flex-start;
  margin-bottom: 4px;
`;

const ProgramName = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${NAVY};
  line-height: 1.3;
`;

const ProgramDesc = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #5b6470;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 36px;
`;

const RequisitosLabel = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #8a93a3;
  margin-top: 4px;
`;

const RequisitosText = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: #5b6470;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ImagesRow = styled(Box)`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`;

const EditButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  text-transform: none;
  color: #ffffff;
  background-color: ${NAVY};
  border-radius: 8px;
  padding: 8px 0;
  margin-top: 12px;
  &:hover {
    background-color: #001f42;
  }
`;

const DeleteOneButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  text-transform: none;
  color: ${RED};
  background-color: #ffffff;
  border: 1px solid ${RED};
  border-radius: 8px;
  padding: 8px 0;
  margin-top: 8px;
  &:hover {
    background-color: #fdeaee;
  }
`;

const EmptyState = styled(Box)`
  grid-column: 1 / -1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 16px;
  min-height: 280px;
  color: #8a93a3;
  font-family: "Poppins", sans-serif;
`;

export default function ProgramTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.programs.programs);
  const selectedPrograms = useSelector((state) => state.programs.selectedPrograms);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [editProgram, setEditProgram] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  // función para seleccionar/deseleccionar todos los programas visibles
  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllPrograms(filteredData.map((pub) => pub.idPrograma)));
      setSelectAll(true);
    } else {
      dispatch(deselectAllPrograms());
      setSelectAll(false);
    }
  };

  // función para eliminar los programas seleccionados
  const handleDelete = async () => {
    try {
      await axios.post("program/delete/select", { ids: selectedPrograms });
      setTimeout(() => {
        dispatch(getAllProgram());
        dispatch(deselectAllPrograms());
        dispatch(deleteStateAllPrograms());
        toast.success("Borrado exitoso");
      }, 1500);
    } catch (error) {
      toast.error("Error al borrar");
    }
  };

  // función para eliminar un solo programa (sin selección múltiple)
  const handleDeleteOne = async (idPrograma) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este programa?");
    if (!confirmar) return;

    try {
      await dispatch(deleteProgram(idPrograma));
      dispatch(getAllProgram());
      toast.success("Programa eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el programa");
    }
  };

  // función para seleccionar/deseleccionar un programa individual
  const handleSelectProgram = (idPrograma) => {
    if (selectedPrograms.includes(idPrograma)) {
      dispatch(deselectProgram(idPrograma));
      setSelectAll(false);
    } else {
      dispatch(selectProgram(idPrograma));
    }
  };

  // función para abrir el modal de edición con el programa seleccionado
  const handleOpenEdit = (row) => {
    setEditProgram(row);
    setOpenEditModal(true);
  };

  useEffect(() => {
    dispatch(getAllProgram());
  }, []);

  // filtrado por nombre o características según el buscador
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data;
    const term = search.toLowerCase();
    return data.filter(
      (row) =>
        row.nombre?.toLowerCase().includes(term) ||
        row.caracteristica?.toLowerCase().includes(term)
    );
  }, [data, search]);

  return (
    <PageWrapper>
      <HeaderRow>
        <PageTitle>Programas</PageTitle>
        <PageSubtitle>Gestiona los programas ofrecidos por CBA</PageSubtitle>
      </HeaderRow>

      <ToolbarCard>
        <SearchField
          placeholder="Buscar programa..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#8a93a3", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        {selectedPrograms.length > 0 && (
          <DeleteButton
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Borrar {selectedPrograms.length}
          </DeleteButton>
        )}

        <ResultCount>
          {filteredData.length} programa{filteredData.length !== 1 ? "s" : ""}
        </ResultCount>
      </ToolbarCard>

      {filteredData.length > 0 ? (
        <Grid container spacing={3}>
          {filteredData.map((row) => {
            const initials = row.nombre
              ? row.nombre.trim().slice(0, 2).toUpperCase()
              : "PR";
            const catStyle = getCategoryStyle(row.categoria);
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={row.idPrograma}>
                <Card>
                  <CardImageArea>
                    <CheckboxOverlay>
                      <Checkbox
                        size="small"
                        checked={selectedPrograms.includes(row.idPrograma)}
                        onChange={() => handleSelectProgram(row.idPrograma)}
                        sx={{
                          color: NAVY,
                          "&.Mui-checked": { color: NAVY },
                        }}
                      />
                    </CheckboxOverlay>

                    {row.multimedia && row.multimedia.length > 0 && row.multimedia[0] ? (
                      <Avatar
                        src={row.multimedia[0]}
                        alt={row.nombre}
                        variant="square"
                        sx={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.85)",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          fontSize: 32,
                        }}
                      >
                        {initials}
                      </Typography>
                    )}
                  </CardImageArea>

                  <CardBody>
                    <Badge sx={{ backgroundColor: catStyle.bg, color: catStyle.color }}>
                      <SchoolIcon sx={{ fontSize: 13, mr: 0.5 }} />
                      {row.categoria || "Sin categoría"}
                    </Badge>

                    <ProgramName>{row.nombre}</ProgramName>
                    <ProgramDesc>{row.caracteristica}</ProgramDesc>

                    {row.requisitos && (
                      <>
                        <RequisitosLabel>Requisitos</RequisitosLabel>
                        <RequisitosText>{row.requisitos}</RequisitosText>
                      </>
                    )}

                    {row.multimedia && row.multimedia.length > 1 && (
                      <ImagesRow>
                        {row.multimedia.slice(0, 4).map((im, i) => (
                          <Avatar
                            key={i}
                            src={im}
                            variant="rounded"
                            sx={{ width: 32, height: 32 }}
                          />
                        ))}
                      </ImagesRow>
                    )}

                    <EditButton
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenEdit(row)}
                    >
                      Editar programa
                    </EditButton>

                    <DeleteOneButton
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteOne(row.idPrograma)}
                    >
                      Eliminar programa
                    </DeleteOneButton>
                  </CardBody>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <EmptyState>
          <SchoolIcon sx={{ fontSize: 40, color: GRAY_BORDER, mb: 1 }} />
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
            No se encontraron programas
          </Typography>
        </EmptyState>
      )}

      <ModalUpdateProgram
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        program={editProgram}
      />
    </PageWrapper>
  );
}