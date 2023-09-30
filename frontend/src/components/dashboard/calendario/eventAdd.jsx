import React, { useState } from "react";
import styled from "styled-components";
import Uploader from "../Publications/Uploader";
import axios from "axios";
import { 
  Button,
  Fade,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,} from "@mui/material";
import { useEffect } from "react";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import Checkboxes from "./widgets/checkbox";
import SelectColorList from "./widgets/selectColor";

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
  const handleChangeData = (e) => {
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
        handleSubmitEvent(response.data.results);
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
          <Title>Crear Evento</Title>
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

          <div className="flex flex-row">
              <Grid sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-start">
                  Fecha de Inicio
                </InputLabel>
                <TextField
                  sx={!data.allDay ? { width: "58%", marginRight: "2%" } : { width: "100%" }}
                  onChange={handleChangeData}
                  value={data.start}
                  id="outlined-basic-start"
                  name="start"
                  type="date"
                  size="small"
                  variant="outlined" />
                {data.allDay === false ?
                  <Fade in={!data.allDay}>
                    <TextField
                      sx={{ width: "40%" }}
                      onChange={handleChangeData}
                      value={data.start_Time}
                      id="outlined-basic-start_Time"
                      name="start_Time"
                      type="time"
                      size="small"
                      variant="outlined" />
                  </Fade>
                  : null}
              </Grid>
              <div className="grid content-center">
                <ArrowRightAltRoundedIcon />
              </div>
              <Grid sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-end">
                  Fecha de finalizacion
                </InputLabel>
                {data.allDay === false ?
                  <TextField
                    sx={{ width: "40%", marginRight: "2%" }}
                    onChange={handleChangeData}
                    value={data.end_Time}
                    id="outlined-basic-end_Time"
                    name="end_Time"
                    type="time"
                    size="small"
                    variant="outlined" />
                  : null}
                <TextField
                  sx={!data.allDay ? { width: "58%" } : { width: "100%" }}
                  onChange={handleChangeData}
                  value={data.end}
                  id="outlined-basic-end"
                  name="end"
                  type="date"
                  size="small"
                  variant="outlined" />
              </Grid>
            <div className="grid content-center">
              <Checkboxes
                data={data}
                setData={setData}
              />
            </div>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "10px",
          }}>
            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-tipo">Tipo de evento</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={data.tipo}
                onChange={handleChangeData}
                name="tipo"
              >
                <MenuItem value="Administrativo">Administrativo</MenuItem>
                <MenuItem value="Academico">Academico</MenuItem>
                <MenuItem value="General">General</MenuItem>
              </Select>
            </Grid>
            <Grid sx={{ m: 1, width: "40%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-color" >
                Color
              </InputLabel>
              <div style={{ display: 'flex' }} className=''>
                <SelectColorList
                  data={data}
                  setData={setData}
                />
              </div>
            </Grid>
          </div>

          <div className="grid grid-cols-2 gap-2">
          <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-tipo">Estado</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={data.state}
                onChange={handleChangeData}
                name="state"
              >
                <MenuItem value="true">Visible</MenuItem>
                <MenuItem value="false">Oculto</MenuItem>
              </Select>
            </Grid>
            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-tipo">Categoria</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={datosEvento.categoria}
                onChange={handleChange}
                name="categoria"
              >
                <MenuItem value="Cine">Cine</MenuItem>
                <MenuItem value="Comunicado">Comunicado</MenuItem>
              </Select>
            </Grid>
          </div>
          
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
