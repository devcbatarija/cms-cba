import React from "react";
import { TestimonioAdd } from "./testimonioAdd";
import { TestimonioPreview } from "./testimonioPreview";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getAllTestimonio } from "../../redux-toolkit/actions/testimonioActions";
import toast from "react-hot-toast";
import { Box, Grid } from "@mui/material";

export const TestimoniosContainer = () => {
  const [testimonios, setTestimonios] = useState({
    nombre: "",
    apellidos: "",
    cargo: "Estudiante",
    cargoTwo: "",
    comentario: "",
    imagen: "",
    state: false,
  });
  const idUser = useSelector((state) => state.login.user._userId);

  const handleSetImagen = async (img) =>
    setTestimonios({
      ...testimonios,
      imagen: img,
    });

  const handleSubmitTestimonio = async (url) => {
    try {
      const response = await axios.post("testimonios", {
        nombre: testimonios.nombre,
        apellidos: testimonios.apellidos,
        cargo:
          testimonios.cargo != "Otro" ? testimonios.cargo : testimonios.cargoTwo,
        comentario: testimonios.comentario,
        imagen: url[0],
        state: testimonios.state,
        UsuarioIdUsuario: idUser,
      });
      if (response.data) {
        toast.success("Registro exitoso.");
        getAllTestimonio();
        setTestimonios({
          ...testimonios,
          nombre: "",
          apellidos: "",
          cargo: "Estudiante",
          cargoTwo: "",
          comentario: "",
          imagen: "",
          state: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#F5F6F8",
        p: { xs: 2, md: 4 },
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <TestimonioAdd
            testimonios={testimonios}
            setTestimonios={setTestimonios}
            handleSetImagen={handleSetImagen}
            handleSubmitTestimonio={handleSubmitTestimonio}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TestimonioPreview
            testimonios={testimonios}
            nombre={testimonios.nombre}
            apellidos={testimonios.apellidos}
            cargo={testimonios.cargo}
            comentario={testimonios.comentario}
            imagen={testimonios.imagen}
            type={"Editor"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};