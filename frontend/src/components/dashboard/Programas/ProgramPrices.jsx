import {
  Box, Button, MenuItem, Select, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

/* ===== Paleta y estilos CBA ===== */
const NAVY = "#002E5F";
const RED = "#D50032";
const GRAY_BG = "#f4f6fa";
const GRAY_BORDER = "#DEDEDE";

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

const Card = styled(Box)`
  background: #ffffff;
  border: 1px solid ${GRAY_BORDER};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 46, 95, 0.06);
  margin-bottom: 24px;
`;

const CardHeader = styled(Box)`
  background: linear-gradient(135deg, ${NAVY} 0%, #00477f 100%);
  padding: 20px 28px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardHeaderText = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: #ffffff;
`;

const CardBody = styled(Box)`
  padding: 28px;
`;

const FieldLabel = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${NAVY};
  margin-bottom: 8px;
`;

const StyledSelect = styled(Select)`
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  background-color: ${GRAY_BG};
  & .MuiOutlinedInput-notchedOutline {
    border-color: ${GRAY_BORDER};
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${NAVY};
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${NAVY};
    border-width: 1.5px;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    background-color: ${GRAY_BG};
    & fieldset {
      border-color: ${GRAY_BORDER};
    }
    &:hover fieldset {
      border-color: ${NAVY};
    }
    &.Mui-focused fieldset {
      border-color: ${NAVY};
      border-width: 1.5px;
    }
  }
`;

const AddFieldRow = styled(Box)`
  display: flex;
  gap: 12px;
  flex-direction: column;
  ${"@media (min-width: 600px)"} {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const NavyButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  text-transform: none;
  color: #ffffff;
  background-color: ${NAVY};
  border-radius: 8px;
  padding: 10px 20px;
  white-space: nowrap;
  &:hover {
    background-color: #001f42;
  }
`;

const OutlineButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  text-transform: none;
  color: ${NAVY};
  border: 1px solid ${GRAY_BORDER};
  border-radius: 8px;
  padding: 10px 20px;
  white-space: nowrap;
  &:hover {
    background-color: ${GRAY_BG};
    border-color: ${NAVY};
  }
`;

const RedButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  text-transform: none;
  color: #ffffff;
  background-color: ${RED};
  border-radius: 8px;
  padding: 10px 20px;
  white-space: nowrap;
  &:hover {
    background-color: #b50029;
  }
`;

const TableCard = styled(Box)`
  background: #ffffff;
  border: 1px solid ${GRAY_BORDER};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 46, 95, 0.06);
`;

const StyledTableHead = styled(TableHead)`
  background-color: ${NAVY};
`;

const HeadCell = styled(TableCell)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
  border-bottom: none;
  position: relative;
`;

const RemoveColumnButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: none;
  color: #ffd9e1;
  min-width: 0;
  padding: 2px 6px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
    color: #ffffff;
  }
`;

const BodyCell = styled(TableCell)`
  border-bottom: 1px solid ${GRAY_BORDER};
  padding: 10px 12px;
`;

const RemoveRowButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: none;
  color: ${RED};
  &:hover {
    background-color: #fdeaf0;
  }
`;

const EmptyTableState = styled(Box)`
  text-align: center;
  padding: 48px 16px;
  color: #8a93a3;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
`;

const FooterRow = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 28px;
  border-top: 1px solid ${GRAY_BORDER};
`;

const ProgramaPrecios = () => {
  const [campos, setCampos] = useState([]);
  const [filas, setFilas] = useState([]);
  const [nuevoCampoNombre, setNuevoCampoNombre] = useState("");
  const [nuevoCampoTipo, setNuevoCampoTipo] = useState("texto");
  const [programas, setProgramas] = useState([]);
  const [programaSeleccionado, setProgramaSeleccionado] = useState({ idPrograma: "" });

  // Función para actualizar los campos y filas basándose en el objeto pasado como argumento
  const updateColsRows = (obj) => {
    if (obj.ProgramPrice) {
      setCampos(obj.ProgramPrice.columns);
      setFilas(obj.ProgramPrice.rows);
    } else {
      setCampos([]);
      setFilas([]);
    }
  };

  // Efecto que se ejecuta una vez al cargar el componente para obtener la lista de programas
  useEffect(() => {
    axios
      .get("Program")
      .then((response) => {
        setProgramas(response.data.results);
      })
      .catch((error) => {});
  }, []);

  const agregarCampo = (e) => {
    e.preventDefault();
    if (nuevoCampoNombre && nuevoCampoTipo) {
      setCampos([...campos, nuevoCampoNombre]);
      const nuevasFilas = filas.map((fila) => [...fila, ""]);
      setFilas(nuevasFilas);
      setNuevoCampoNombre("");
      setNuevoCampoTipo("texto");
    } else {
    }
  };

  // Función para agregar una nueva fila
  const agregarFila = () => {
    const nuevaFila = new Array(campos.length).fill("");
    setFilas([...filas, nuevaFila]);
  };

  // Función para modificar un dato en una fila y columna específicas
  const modificarDato = (filaIndice, campoIndice, valor) => {
    const nuevasFilas = [...filas];
    nuevasFilas[filaIndice][campoIndice] = valor;
    setFilas(nuevasFilas);
  };

  // Función para eliminar una fila específica
  const eliminarFila = (filaIndice) => {
    const nuevasFilas = filas.filter((_, index) => index !== filaIndice);
    setFilas(nuevasFilas);
  };
  // Función para eliminar una columna específica
  const eliminarColumna = (campoIndice) => {
    const nuevasColumnas = campos.filter((_, index) => index !== campoIndice);
    const nuevasFilas = filas.map((fila) => fila.filter((_, index) => index !== campoIndice));
    setCampos(nuevasColumnas);
    setFilas(nuevasFilas);
  };

  //Función para guardar los datos en el servidor
  const guardarDatos = async () => {
    try {
      const datos = {
        columns: campos,
        rows: filas,
        ProgramaIdPrograma: programaSeleccionado.idPrograma,
      };
      let response;
      if (programaSeleccionado.ProgramPrice != null) {
        response = await axios.put(`ProgramPrices/?id=${programaSeleccionado.ProgramPrice.id_Programa}`, datos);
      } else {
        response = await axios.post("ProgramPrices/add", datos);
      }
      toast.success("Guardado exitosamente");
    } catch (error) {
      toast.error("Error al guardar los datos");
    }
  };

  // Función para filtrar el programa seleccionado y actualizar campos y filas
  const filterProgram = async (id) => {
    const selected = programas.find((pr) => pr.idPrograma == id);
    setProgramaSeleccionado(selected);
    updateColsRows(selected);
  };

  return (
    <PageWrapper>
      <HeaderRow>
        <PageTitle>Precios de programas</PageTitle>
        <PageSubtitle>Configura las tablas de costos para cada programa</PageSubtitle>
      </HeaderRow>

      <Card>
        <CardHeader>
          <AttachMoneyIcon sx={{ color: "#ffffff", fontSize: 22 }} />
          <CardHeaderText>Selecciona el programa</CardHeaderText>
        </CardHeader>
        <CardBody>
          <FieldLabel>Programa</FieldLabel>
          <StyledSelect
            variant="outlined"
            value={programaSeleccionado.idPrograma}
            onChange={(e) => filterProgram(e.target.value)}
            sx={{ width: "100%", maxWidth: 360 }}
          >
            <MenuItem value="">Selecciona un programa</MenuItem>
            {programas.map((programa) => (
              <MenuItem key={programa.idPrograma} value={programa.idPrograma}>
                {programa.nombre}
              </MenuItem>
            ))}
          </StyledSelect>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <AddIcon sx={{ color: "#ffffff", fontSize: 22 }} />
          <CardHeaderText>Agregar columna de precio</CardHeaderText>
        </CardHeader>
        <CardBody>
          <form onSubmit={agregarCampo}>
            <AddFieldRow>
              <Box sx={{ flexGrow: 1 }}>
                <FieldLabel>Nombre del campo</FieldLabel>
                <StyledTextField
                  variant="outlined"
                  placeholder="Ej. Mensualidad, Matrícula, Material..."
                  value={nuevoCampoNombre}
                  onChange={(e) => setNuevoCampoNombre(e.target.value)}
                  fullWidth
                />
              </Box>
              <NavyButton type="submit" startIcon={<AddIcon />}>
                Agregar campo
              </NavyButton>
            </AddFieldRow>
          </form>
        </CardBody>
      </Card>

      <TableCard>
        <TableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                {campos.map((campo, indice) => (
                  <HeadCell key={indice}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                      {campo}
                      <RemoveColumnButton
                        onClick={() => eliminarColumna(indice)}
                        startIcon={<CloseIcon sx={{ fontSize: 14 }} />}
                      >
                        Quitar
                      </RemoveColumnButton>
                    </Box>
                  </HeadCell>
                ))}
                <HeadCell align="right">Acciones</HeadCell>
              </TableRow>
            </StyledTableHead>

            <TableBody>
              {filas.map((fila, filaIndice) => (
                <TableRow key={filaIndice}>
                  {fila.map((dato, index) => (
                    <BodyCell key={index}>
                      <StyledTextField
                        variant="outlined"
                        size="small"
                        type={campos[index].tipo === "numero" ? "number" : "text"}
                        value={dato}
                        onChange={(e) => modificarDato(filaIndice, index, e.target.value)}
                        fullWidth
                      />
                    </BodyCell>
                  ))}
                  <BodyCell align="right">
                    <RemoveRowButton
                      onClick={() => eliminarFila(filaIndice)}
                      startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                    >
                      Eliminar
                    </RemoveRowButton>
                  </BodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {campos.length === 0 && (
            <EmptyTableState>
              Agrega al menos una columna para empezar a registrar precios.
            </EmptyTableState>
          )}
        </TableContainer>

        <FooterRow>
          <OutlineButton onClick={agregarFila} startIcon={<AddIcon />}>
            Agregar fila
          </OutlineButton>
          <RedButton onClick={guardarDatos} startIcon={<SaveIcon />}>
            Guardar todo
          </RedButton>
        </FooterRow>
      </TableCard>
    </PageWrapper>
  );
};

export default ProgramaPrecios;