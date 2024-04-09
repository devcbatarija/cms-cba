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
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import Checkboxes from "./widgets/checkbox";
import SelectColorList from "./widgets/selectColor";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { getEvents } from "../../../redux-toolkit/actions/eventActions";


const Container = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

function EventUpdate({ }) {
  const navigate = useNavigate();
  const [urls, setUrls] = useState([]);
  const [textAreaHeight, setTextAreaHeight] = useState("100px"); // Estado para controlar la altura del TextArea
  const location = useLocation();
  const dispatch = useDispatch();
  const [Evento, setEvento] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    color: "",
    tipo: "General",
    start_Time: "",
    end_Time: "",
    state: true,
    allDay: true,
    UsuarioIdUsuario: ""
  })
  const [datosEvento, setDatosEvento] = useState({
    id_Evento: '',
    descripcion: "",
    multimedia: [],
    categoria: "Cine",
    EventoId: "",
  });
  const idUser = useSelector((state) => state.login.user._userId);
  const handleSubmitEvent = async (urls) => {
    try {
      const enviar = Evento
      const response = await axios.put(`datosevento/update/${datosEvento.id_Evento}`, {
        Evento: {
          title: enviar.title,
          start: enviar.start,
          end: enviar.end,
          color: enviar.color,
          tipo: enviar.tipo,
          start_Time: !enviar.allDay ? enviar.start_Time : '',
          end_Time: !enviar.allDay ? enviar.end_Time : '',
          state: enviar.state,
          allDay: enviar.allDay,
          UsuarioIdUsuario: enviar.UsuarioIdUsuario
        },
        datosEvento: {
          EventoId:datosEvento.EventoId,
          descripcion: datosEvento.descripcion,
          multimedia: urls,
          categoria: datosEvento.categoria
        }
      });
      if (response.data) {
        toast.success("Registro exitoso.");
        setDatosEvento({
          ...datosEvento,
          descripcion: "",
          multimedia: [],
          categoria: "Cine",
        });
        navigate('/dashboard/Calendario/calendario')
        dispatch(getEvents())
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    if (location.state?.prevPath === '/dashboard/Calendario/calendario' && location.state?.data) {
      setEvento(location.state.data.General)
      setDatosEvento(location.state.data.datosEvento)
      setUrls(location.state.data.datosEvento.multimedia)
      location.state = null
    }
    else {
      idUser ? setEvento({
        ...Evento,
        UsuarioIdUsuario: idUser
      }) : null
    }
  }, [])






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
  const handleChangeEvento = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setEvento({
      ...Evento,
      [property]: value,
    })
  }
  // useEffect(() => {
  //   if (Evento.tipo != 'General') {
  //     navigate('/dashboard/Calendario/calendario', { state: { prevPath: '/dashboard/Calendario/UpdateEvent', data: Evento } })
  //   }
  // }, [Evento])

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
    <div className="grid shadow border bg-zinc-100 lg:py-5 ">
      <div className="w-full flex justify-center">
        <Container className="rounded-lg border rounded-lg p-10 bg-white w-full lg:w-3/4">
          <div className="flex flex-col items-center justify-center">
            <Title>Modificar Evento</Title>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col rounded-lg ">
            <FormGroup style={{ width: "100%" }}>
              <Label>Título:</Label>
              <Input
                type="text"
                name="title"
                value={Evento.title}
                onChange={handleChangeEvento}
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

            <div className="flex flex-col lg:flex-row lg:items-center">
              <Grid sx={{ marginY: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-start">
                  Fecha de Inicio
                </InputLabel>
                <TextField
                  sx={!Evento.allDay ? { width: "58%", marginRight: "2%" } : { width: "100%" }}
                  onChange={handleChangeEvento}
                  value={Evento.start}
                  id="outlined-basic-start"
                  name="start"
                  type="date"
                  size="small"
                  variant="outlined" />
                {Evento.allDay === false ?
                  <Fade in={!Evento.allDay}>
                    <TextField
                      sx={{ width: "40%" }}
                      onChange={handleChangeEvento}
                      value={Evento.start_Time}
                      id="outlined-basic-start_Time"
                      name="start_Time"
                      type="time"
                      size="small"
                      variant="outlined" />
                  </Fade>
                  : null}
              </Grid>
              <div className="grid content-center hidden lg:block">
                <ArrowRightAltRoundedIcon />
              </div>
              <Grid sx={{ marginY: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-end">
                  Fecha de finalizacion
                </InputLabel>
                <TextField
                  sx={!Evento.allDay ? { width: "58%" } : { width: "100%" }}
                  onChange={handleChangeEvento}
                  value={Evento.end}
                  id="outlined-basic-end"
                  name="end"
                  type="date"
                  size="small"
                  variant="outlined" />
                {Evento.allDay === false ?
                  <TextField
                    sx={{ width: "40%", marginLeft: "2%" }}
                    onChange={handleChangeEvento}
                    value={Evento.end_Time}
                    id="outlined-basic-end_Time"
                    name="end_Time"
                    type="time"
                    size="small"
                    variant="outlined" />
                  : null}
              </Grid>
              <div className="grid content-center lg:ml-2">
                <Checkboxes
                  data={Evento}
                  setData={setEvento}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
              <Grid sx={{ marginY: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-tipo">Tipo de evento</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={Evento.tipo}
                  onChange={handleChangeEvento}
                  name="tipo"
                >
                  {/* <MenuItem value="Administrativo">Administrativo</MenuItem>
                  <MenuItem value="Academico">Academico</MenuItem> */}
                  <MenuItem value="General">General</MenuItem>
                </Select>
              </Grid>
              <Grid sx={{ m: 1, width: "40%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-color" >
                  Color
                </InputLabel>
                <div style={{ display: 'flex' }} className=''>
                  {Evento.id != '' ?
                    <SelectColorList
                      data={Evento}
                      setData={setEvento}
                    /> : null}
                </div>
              </Grid>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-tipo">Estado</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={Evento.state}
                  onChange={handleChangeEvento}
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
              Modificar
            </Button>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default EventUpdate;
