import React from "react";
import { useForm } from "react-hook-form";
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
  padding: 20px;
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const customStyle = {
  backgroundColor: "#070e4b",
  color: "#fff"
};



const AmbienteAddComponent = () => {
  const userId = useSelector((state) => state.login.user._userId);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("environment", {
        nombre: data.nombre,
        descripcion: data.descripcion,
        UsuarioIdUsuario: userId ? userId : "",
      });

      if (res.data) {
        toast.success("Registro exitoso.");
        reset();
      }
    } catch (error) {
      toast.error("Error al crear");
    }
  };

  return (
    <div className="p-10 bg-cl-red">
      <StyledContainer >
        <div className="flex justify-center items-center">
          <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">AGREGAR AMBIENTES</h1>

        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Typography variant="body1">Nombre:</Typography>
            <TextField
              {...register("nombre", { required: "Este campo es obligatorio" })}
              error={errors.nombre ? true : false}
              helperText={errors.nombre && errors.nombre.message}
              required
              multiline
              rows={1}
            />
          </FormGroup>
          <FormGroup>
            <Typography variant="body1">Descripción:</Typography>
            <TextField
              {...register("descripcion", { required: "Este campo es obligatorio" })}
              error={errors.descripcion ? true : false}
              helperText={errors.descripcion && errors.descripcion.message}
              required
              multiline
              rows={4}
            />
          </FormGroup>
          <br />
          <Grid container justifyContent="center">
            <Button type="submit" variant="contained" style={customStyle}>
              Crear
            </Button>
          </Grid>
        </form>
      </StyledContainer>
    </div>
  );
};

export default AmbienteAddComponent;