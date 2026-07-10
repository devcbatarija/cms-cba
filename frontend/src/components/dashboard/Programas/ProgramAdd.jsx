import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Grid, TextField, Typography, Autocomplete } from "@mui/material";
import Uploader from "../Publications/Uploader";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { toast } from "react-hot-toast";
import SchoolIcon from "@mui/icons-material/School";
import SaveIcon from "@mui/icons-material/Save";

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

const FormCard = styled(Box)`
  background: #ffffff;
  border: 1px solid ${GRAY_BORDER};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 46, 95, 0.06);
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

const UploaderLabel = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${NAVY};
  margin-bottom: 10px;
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

const Divider = styled(Box)`
  height: 1px;
  background-color: ${GRAY_BORDER};
  margin: 0 28px;
`;

const FooterRow = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 20px 28px;
`;

const CreateButton = styled(Button)`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-transform: none;
  color: #ffffff;
  background-color: ${RED};
  border-radius: 8px;
  padding: 10px 28px;
  &:hover {
    background-color: #b50029;
  }
`;

const ProgramAddForm = () => {
  const userId = useSelector((state) => state.login.user._userId);

  // categorías ya usadas por otros programas, para el autocomplete
  const categoriasExistentes = useSelector((state) => {
    const programs = state.programs.programs || [];
    return Array.from(new Set(programs.map((p) => p.categoria).filter(Boolean)));
  });

  const initialState = {
    nombre: "",
    caracteristica: "",
    multimedia: "",
    requisitos: "",
    categoria: "",
    orden: 0,
    UsuarioIdUsuario: userId ? userId : "",
  };
  const [programa, setPrograma] = useState({
    nombre: "",
    caracteristica: "",
    requisitos: "",
    multimedia: [],
    categoria: "",
    orden: 0,
    UsuarioIdUsuario: userId ? userId : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrograma({
      ...programa,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !programa.nombre ||
        !programa.caracteristica ||
        !programa.requisitos ||
        !programa.categoria ||
        programa.multimedia.length === 0
      ) {
        toast.error("Por favor, complete todos los campos obligatorios, incluyendo la categoría.");
        return;
      } else {
        const response = await axios.post("/files/upload", {
          filePath: programa.multimedia,
          type: "image",
        });
        if (response.data) {
          setPrograma({
            ...programa,
            multimedia: response.data.results[0],
          });
          await axios.post("Program", {
            nombre: programa.nombre,
            caracteristica: programa.caracteristica,
            requisitos: programa.requisitos,
            multimedia: [response.data.results[0]],
            categoria: programa.categoria,
            orden: Number(programa.orden) || 0,
            UsuarioIdUsuario: userId ? userId : "",
          });
        }

        toast.success("Registro exitoso.");
        setPrograma(initialState);
      }
    } catch (error) {
      console.error("Error al crear el programa:", error);
      toast.error(
        error.response?.data?.message ||
          `Error al crear (${error.response?.status || "sin conexión"})`
      );
    }
  };

  return (
    <PageWrapper>
      <HeaderRow>
        <PageTitle>Crear programa</PageTitle>
        <PageSubtitle>Completa la información para publicar un nuevo programa</PageSubtitle>
      </HeaderRow>

      <FormCard>
        <CardHeader>
          <SchoolIcon sx={{ color: "#ffffff", fontSize: 22 }} />
          <CardHeaderText>Información del programa</CardHeaderText>
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
                    placeholder="Escriba el nombre del programa..."
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
                          setPrograma({ ...programa, categoria: newValue })
                        }
                        renderInput={(params) => (
                          <StyledTextField
                            {...params}
                            placeholder="Ej. Children, Teens, Adults..."
                            required
                          />
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
                    placeholder="Describe el contenido y enfoque del programa"
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
                    placeholder="Requisitos de ingreso o nivel previo"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </FieldGroup>
              </Grid>

              <Grid item xs={12} md={5}>
                <UploaderLabel>Imagen del programa</UploaderLabel>
                <UploaderPanel>
                  <Uploader publicacion={programa} setPublicacion={setPrograma} />
                </UploaderPanel>
              </Grid>
            </Grid>
          </FormBody>

          <Divider />

          <FooterRow>
            <CreateButton variant="contained" type="submit" startIcon={<SaveIcon />}>
              Crear programa
            </CreateButton>
          </FooterRow>
        </form>
      </FormCard>
    </PageWrapper>
  );
};

export default ProgramAddForm;