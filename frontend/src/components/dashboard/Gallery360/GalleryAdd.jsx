import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormGroup, TextField, Button, Container, Grid, Typography, Select, MenuItem } from "@mui/material";
import Uploader from "../Publications/Uploader";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { toast } from "react-hot-toast";
import { getAllAmbientes } from "../../../redux-toolkit/actions/galleryActions";

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

const GalleryAddComponent = () => {
  const dispatch = useDispatch();
  const ambientes = useSelector((state) => state.gallery.ambient);
  const initialState = {
    imagen: "",
    AmbienteIdAmbiente: ""
  };

  const [form, setForm] = useState({
    imagen: '',
    multimedia: [],
    AmbienteIdAmbiente: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.AmbienteIdAmbiente) {
      toast.error("Debes seleccionar un ambiente antes de agregar una imagen.");
      return;
    }

    try {
      const response = await axios.post("/files/upload", {
        filePath: form.multimedia,
        type: "image",
      });

      if (response.data) {
        setForm({
          ...form,
          multimedia: response.data.results[0],
        });

        const res = await axios.post("gallery", {
          AmbienteIdAmbiente: form.AmbienteIdAmbiente,
          imagen: response.data.results[0]
        });

        console.log(res);
        toast.success("Registro exitoso.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al crear");
    }
  };

  useEffect(() => {
    dispatch(getAllAmbientes());
  }, []);

  return (
    <StyledContainer>
      <Typography variant="h5" align="center" gutterBottom>
        <div className="flex justify-center items-center">
          <h1 className="mb-4 text-1xl font-extrabold text-gray-900 dark:text-white ">Agregar Imagenes</h1>
        </div>
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="AmbienteIdAmbiente" className="sr-only">Ambientes</label>
        <select
          onChange={handleChange}
          name="AmbienteIdAmbiente"
          id="AmbienteIdAmbiente"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option value="">Selecciona un ambiente</option>
          {ambientes && ambientes.map((ambient) => (
            <option key={ambient.id_ambiente} value={ambient.id_ambiente}>
              {ambient.nombre}
            </option>
          ))}
        </select>
        <FormGroup>
          <Uploader
            publicacion={form}
            setPublicacion={setForm}
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

export default GalleryAddComponent;
