import React, { useState } from "react";
import styled from "styled-components";
import Uploader from "../Publications/Uploader";
import axios from "axios";
import { Grid, MenuItem, Select, Button } from "@mui/material";
import { useEffect } from "react";

const Container = styled.div`
  margin: 0 auto;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 90vh;
  width: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
`;
const Title = styled.h2`
  color: #343a40;
  font-Size:20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  min-height: 100px;
  overflow-y: hidden;
`;

function EventAdd({
  datosEvento,
  setDatosEvento,
  handleSubmitEvent,
  data,
  setData
}) {
  const [urls, setUrls] = useState([]);
  const [textAreaHeight, setTextAreaHeight] = useState("100px"); // Estado para controlar la altura del TextArea

  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;

    if (property != "multimedia") {
      setDatosEvento({
        ...datosEvento,
        [property]: value,
      });
      return;
    }
  };
  const handleChangeData=(e)=>{
    const property = e.target.name;
    const value = e.target.value;
    setData({
        ...data,
        [property]: value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/files/upload", {
        filePath: datosEvento.multimedia,
        type: "image",
      });
      if (response.data.results) {
        handleSubmitPublication(response.data.results);
      }
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    // Calcula la altura del TextArea basándose en su contenido
    setTextAreaHeight(`${datosEvento.descripcion.split("\n").length * 25}px`);
  }, [datosEvento.descripcion]);

  return (
    <>
      <Container className="rounded-lg border rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <Title>Crear datosEvento</Title>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col rounded-lg ">
          <FormGroup style={{ width: "100%" }}>
            <Label>Título:</Label>
            <Input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChangeData}
              required
            />
          </FormGroup>
          <FormGroup style={{ width: "100%" }}>
            <Label>Descripción:</Label>
            <TextArea
              name="descripcion"
              value={datosEvento.descripcion}
              onChange={handleChange}
              style={{ height: textAreaHeight }}
              required
            ></TextArea>
          </FormGroup>
          <FormGroup
            style={{ display: "flex", flexDirection: "row", gap: "20px" }}
          >
            <div>
              <Label>Estado</Label>
              <Select
                labelId="demo-select-small-label"
                id="state"
                value={datosEvento.state}
                label="Estado"
                onChange={handleChange}
                name="estado"
              >
                <MenuItem value="true">Visible</MenuItem>
                <MenuItem value="false">Oculto</MenuItem>
              </Select>
            </div>
            <div>
              <Label>Tipo</Label>
              <Select
                labelId="demo-select-small-label"
                id="tipo"
                value={data.tipo}
                label="tipo"
                onChange={handleChangeData}
                name="tipo"
              >
                <MenuItem value="Administrativo">Administrativo</MenuItem>
                <MenuItem value="Academico">Academico</MenuItem>
                <MenuItem value="General">General</MenuItem>
              </Select>
            </div>
          </FormGroup>
        </form>
        <FormGroup>
          <Label>Arrastre y suelte las imagenes:</Label>
          <Uploader
            urls={urls}
            setUrls={setUrls}
            publicacion={datosEvento}
            setPublicacion={setDatosEvento}
          ></Uploader>
        </FormGroup>
        <Grid sx={{ m: 1, width: "100%" }}>
          <Button
            variant="contained"
            sx={{ width: "100%", borderRadius: "0px" }}
            onClick={handleSubmit}
          >
            Publicar
          </Button>
        </Grid>
      </Container>
    </>
  );
}

export default EventAdd;
