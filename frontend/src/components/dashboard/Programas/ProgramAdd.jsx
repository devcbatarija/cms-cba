import React, { useState } from "react";
import axios from "axios";
import { FormGroup, TextField, Button, Container, Grid, Typography } from "@mui/material";
import Uploader from "../Publications/Uploader";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { toast } from "react-hot-toast";

const StyledContainer = styled(Container)`
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #000;
  padding: 16px;
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProgramAddForm = () => {
  const userId = useSelector((state) => state.login.user._userId);

  const initialState = {
    nombre: "",
    caracteristica: "",
    multimedia: "",
    requisitos: "",
    UsuarioIdUsuario: userId ? userId : "",
  };
  const [urls, setUrls] = useState([]);
  const [programa, setPrograma] = useState({
    nombre: "",
    caracteristica: "",
    requisitos: "",
    multimedia: [],
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
      if (!programa.nombre || !programa.caracteristica || !programa.requisitos || programa.multimedia.length === 0) {
        toast.error("Por favor, complete todos los campos obligatorios.");
        return;
      }
      else {
        const response = await axios.post("/files/upload", {
          filePath: programa.multimedia,
          type: "image",
        })
        if (response.data) {
          setPrograma({
            ...programa,
            multimedia: response.data.results[0],
          });
          const res = await axios.post("http://localhost:3001/api/Program", {
            nombre: programa.nombre,
            caracteristica: programa.caracteristica,
            requisitos: programa.requisitos,
            multimedia: [response.data.results[0]],
            UsuarioIdUsuario: userId ? userId : "",
          });
        }


        toast.success("Registro exitoso.");
        setPrograma(initialState);
      }
    } catch (error) {
      toast.error("Error al crear");
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h5" align="center" gutterBottom>
        Crear programa
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Typography variant="body1">Nombre:</Typography>
          <TextField
            name="nombre"
            value={programa.nombre}
            onChange={handleChange}
            required
            multiline
            rows={1}
          />
        </FormGroup>
        <FormGroup>
          <Typography variant="body1">Características:</Typography>
          <TextField
            name="caracteristica"
            value={programa.caracteristica}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
        </FormGroup>
        <FormGroup>
          <Typography variant="body1">Requisitos:</Typography>
          <TextField
            name="requisitos"
            value={programa.requisitos}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </FormGroup>
        <FormGroup>
          <Uploader
            publicacion={programa}
            setPublicacion={setPrograma}
          />
        </FormGroup>
        <Grid container justifyContent="center">
          <Button variant="contained" onClick={handleSubmit}>
            Crear
          </Button>
        </Grid>
      </StyledForm>
    </StyledContainer>
  );
};

export default ProgramAddForm;
