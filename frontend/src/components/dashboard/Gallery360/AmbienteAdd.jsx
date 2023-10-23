import React, { useState } from "react";
import axios from "axios";
import { FormGroup, TextField, Button, Container, Grid, Typography } from "@mui/material";
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

const AmbienteAddComponent = () => {
  const userId = useSelector((state) => state.login.user._userId);
  console.log(userId)

  const initialState = {
    nombre: "",
    descripcion: "",
    UsuarioIdUsuario: userId ? userId : "",
  };
  const [ambiente, setAmbiente] = useState({
    nombre: "",
    descripcion: "",
    UsuarioIdUsuario: userId ? userId : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmbiente({
      ...ambiente,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/environment", {
        nombre: ambiente.nombre,
        descripcion: ambiente.descripcion,
        UsuarioIdUsuario: userId ? userId : "",
      });

      if (res.data) {
        // Handle successful response here
        toast.success("Registro exitoso.");
      }
      setAmbiente(initialState); // Limpiar los campos del formulario
    } catch (error) {
      toast.error("Error al crear");
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h5" align="center" gutterBottom>
        Crear ambiente
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Typography variant="body1">Nombre:</Typography>
          <TextField
            name="nombre"
            value={ambiente.nombre}
            onChange={handleChange}
            required
            multiline
            rows={1}
          />
        </FormGroup>
        <FormGroup>
          <Typography variant="body1">descripcion:</Typography>
          <TextField
            name="descripcion"
            value={ambiente.descripcion}
            onChange={handleChange}
            required
            multiline
            rows={4}
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

export default AmbienteAddComponent;
