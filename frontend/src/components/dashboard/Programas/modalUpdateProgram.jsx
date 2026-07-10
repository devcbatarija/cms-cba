import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Uploader from "../Publications/Uploader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { styled } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School";
import SaveIcon from "@mui/icons-material/Save";
import { updateProgram, getAllProgram } from "../../../redux-toolkit/actions/programActions";

const NAVY = "#002E5F";
const RED = "#D50032";
const GRAY_BG = "#f4f6fa";
const GRAY_BORDER = "#DEDEDE";

const ModalWrapper = styled(Box)`
  font-family: "Poppins", sans-serif;
`;

const CardHeader = styled(Box)`
  background: linear-gradient(135deg, ${NAVY} 0%, #00477f 100%);
  padding: 20px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardHeaderText = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: #ffffff;
`;

const FormBody = styled(Box)`
  padding: 28px;
`;

const FieldLabel = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${NAVY};
  margin-bottom: 6px;
`;

const FieldGroup = styled(Box)`
  margin-bottom: 22px;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    background-color: ${GRAY_BG};
    & fieldset { border-color: ${GRAY_BORDER}; }
    &:hover fieldset { border-color: ${NAVY}; }
    &.Mui-focused fieldset { border-color: ${NAVY}; border-width: 1.5px; }
  }
`;

const UploaderPanel = styled(Box)`
  background-color: ${GRAY_BG};
  border: 1px dashed ${GRAY_BORDER};
  border-radius: 10px;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FooterRow = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 20px 28px;
  border-top: 1px solid ${GRAY_BORDER};
`;

const SaveButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-transform: none;
  color: #ffffff;
  background-color: ${RED};
  border-radius: 8px;
  padding: 10px 28px;
  &:hover { background-color: #b50029; }
`;

const ModalUpdateProgram = ({ open, onClose, program }) => {
  const dispatch = useDispatch();

  const categoriasExistentes = useSelector((state) => {
    const programs = state.programs.programs || [];
    return Array.from(new Set(programs.map((p) => p.categoria).filter(Boolean)));
  });

  const [programa, setPrograma] = useState({
    nombre: "",
    caracteristica: "",
    requisitos: "",
    multimedia: [],
    categoria: "",
    orden: 0,
  });
  const [newUpload, setNewUpload] = useState(false);

  useEffect(() => {
    if (program) {
      setPrograma({
        nombre: program.nombre || "",
        caracteristica: program.caracteristica || "",
        requisitos: program.requisitos || "",
        multimedia: program.multimedia || [],
        categoria: program.categoria || "",
        orden: program.orden ?? 0,
      });
      setNewUpload(false);
    }
  }, [program]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrograma((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploaderChange = (updatedPrograma) => {
    setNewUpload(true);
    setPrograma(updatedPrograma);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!programa.nombre || !programa.caracteristica || !programa.categoria) {
        toast.error("Nombre, característica y categoría son obligatorios.");
        return;
      }

      let multimediaFinal = programa.multimedia;

      if (newUpload && programa.multimedia.length > 0) {
        const response = await axios.post("/files/upload", {
          filePath: programa.multimedia,
          type: "image",
        });
        multimediaFinal = [response.data.results[0]];
      }

      await dispatch(
        updateProgram({
          id: program.idPrograma,
          data: {
            nombre: programa.nombre,
            caracteristica: programa.caracteristica,
            requisitos: programa.requisitos,
            multimedia: multimediaFinal,
            categoria: programa.categoria,
            orden: Number(programa.orden) || 0,
          },
        })
      );

      dispatch(getAllProgram());
      toast.success("Programa actualizado correctamente");
      onClose();
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error(error.response?.data?.error || "Error al actualizar el programa");
    }
  };

  if (!program) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <ModalWrapper>
        <CardHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <SchoolIcon sx={{ color: "#ffffff", fontSize: 22 }} />
            <CardHeaderText>Editar programa</CardHeaderText>
          </Box>
          <IconButton onClick={onClose} sx={{ color: "#ffffff" }}>
            <CloseIcon />
          </IconButton>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <FormBody>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <FieldGroup>
                  <FieldLabel>Nombre</FieldLabel>
                  <StyledTextField
                    name="nombre"
                    value={programa.nombre}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </FieldGroup>

                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <FieldGroup>
                      <FieldLabel>Categoría</FieldLabel>
                      <Autocomplete
                        freeSolo
                        options={categoriasExistentes}
                        value={programa.categoria}
                        onInputChange={(e, newValue) =>
                          setPrograma((prev) => ({ ...prev, categoria: newValue }))
                        }
                        renderInput={(params) => (
                          <StyledTextField {...params} required />
                        )}
                      />
                    </FieldGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FieldGroup>
                      <FieldLabel>Orden</FieldLabel>
                      <StyledTextField
                        name="orden"
                        type="number"
                        value={programa.orden}
                        onChange={handleChange}
                        fullWidth
                      />
                    </FieldGroup>
                  </Grid>
                </Grid>

                <FieldGroup>
                  <FieldLabel>Características</FieldLabel>
                  <StyledTextField
                    name="caracteristica"
                    value={programa.caracteristica}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    fullWidth
                  />
                </FieldGroup>

                <FieldGroup sx={{ mb: 0 }}>
                  <FieldLabel>Requisitos</FieldLabel>
                  <StyledTextField
                    name="requisitos"
                    value={programa.requisitos}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </FieldGroup>
              </Grid>

              <Grid item xs={12} md={5}>
                <FieldLabel>Imagen del programa</FieldLabel>
                <UploaderPanel>
                  <Uploader publicacion={programa} setPublicacion={handleUploaderChange} />
                </UploaderPanel>
              </Grid>
            </Grid>
          </FormBody>

          <FooterRow>
            <SaveButton variant="contained" type="submit" startIcon={<SaveIcon />}>
              Guardar cambios
            </SaveButton>
          </FooterRow>
        </form>
      </ModalWrapper>
    </Dialog>
  );
};

export default ModalUpdateProgram;