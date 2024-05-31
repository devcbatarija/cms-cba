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
import { useNavigate } from "react-router-dom";
import './calendarStyles.css'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Test from "../../calendar/test";

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

function EventAdd({
  datosEvento,
  setDatosEvento,
  handleSubmitEvent,
  data,
  setData,
  Consigna,
  handleChangeConsigna,
  secondPartForm,
  toggleSecondPartForm,
}) {
  const navigate = useNavigate();
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
  useEffect(() => {
    if (data.tipo != 'General') {
      navigate('/dashboard/Calendario/', { state: { prevPath: '/dashboard/Calendario/addEvent', data: data } })
    }
  }, [data])
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
      <div className="w-full bg-zinc-50 flex justify-center items-center ">
        <div className=" rounded-lg p-10 bg-zinc-50 w-full lg:w-3/4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-zinc-700 font-semibold text-xl">Crear Evento</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col rounded-lg ">
            <div className="w-3/5">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Título:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={data.title}
                  onChange={handleChangeData}
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                Descripcion
              </label>
              <div className="mt-2">
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={datosEvento.descripcion}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center">
              <Grid sx={{ marginY: 1 }} variant="outlined">
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
              <div className="grid content-center hidden lg:block">
                <ArrowRightAltRoundedIcon />
              </div>
              <Grid sx={{ marginY: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-end">
                  Fecha de finalizacion
                </InputLabel>
                <TextField
                  sx={!data.allDay ? { width: "58%" } : { width: "100%" }}
                  onChange={handleChangeData}
                  value={data.end}
                  id="outlined-basic-end"
                  name="end"
                  type="date"
                  size="small"
                  variant="outlined" />
                {data.allDay === false ?
                  <TextField
                    sx={{ width: "40%", marginLeft: "2%" }}
                    onChange={handleChangeData}
                    value={data.end_Time}
                    id="outlined-basic-end_Time"
                    name="end_Time"
                    type="time"
                    size="small"
                    variant="outlined" />
                  : null}
              </Grid>
              <div className="grid content-center lg:ml-2">
                <Checkboxes
                  data={data}
                  setData={setData}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
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

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center ">
              <div className="bg-zinc-50 px-3">
                <button className="rounded-full btn-Consigna hover:w-[180px] hover:duration-300 w-10 h-10 flex justify-center items-center relative duration-300 shadow-xl bg-cbaBlue overflow-hidden "
                  onClick={toggleSecondPartForm}
                >  {/*style={{ background: 'linear-gradient(144deg,#af40ff,#5b42f3 50%,#00ddeb)' }}*/}
                  <div className="text-plus w-full text-white h-full duration-300 flex items-center justify-center">
                    {
                      secondPartForm ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    }
                  </div>
                  <div className=" text absolute right-0 opacity-0 text-white text-[15px] font-semibold">{secondPartForm ? 'Quitar consigna' : 'Añadir consigna'}</div>
                </button>
              </div>
            </div>
          </div>

          <form>
            {
              secondPartForm &&
              <div className="space-y-12 pt-5">
                <div className="border-b border-gray-900/10 pb-12 pt-5">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Consigna</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    En esta sección, debes introducir información sobre los criterios que el estudiante debe cumplir para ser elegible a la recompensa.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label htmlFor="descripcion_consigna" className="block text-sm font-medium leading-6 text-gray-900">
                        Descripcion
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="descripcion_consigna"
                          name="descripcion_consigna"
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={Consigna.descripcion_consigna}
                          onChange={handleChangeConsigna}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">Escribe una consigna clara y detallada para que los estudiantes comprendan lo que se espera de ellos.</p>
                    </div>


                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="cantidad_Referidos" className="block text-sm font-medium leading-6 text-gray-900">
                        Cantidad de referidos
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="cantidad_Referidos"
                          id="cantidad_Referidos"
                          value={Consigna.cantidad_Referidos}
                          onChange={handleChangeConsigna}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            }

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button onClick={() => navigate('/dashboard/Calendario/')} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="rounded-md bg-cbaBlue px-4 w-[180px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EventAdd;
