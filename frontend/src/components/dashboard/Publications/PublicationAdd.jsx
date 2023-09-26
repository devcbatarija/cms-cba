import React, { useState } from 'react';
import styled from 'styled-components';
import Uploader from './Uploader';
import axios from 'axios';
import { Grid, MenuItem, Select,Button } from '@mui/material';


const Container = styled.div`
margin: 0 auto;
padding: 5px;
background-color: white;
box-shadow: 0 0 10px rgba(0,0,0,0.1);
height: 100vh;  //Agrega esta línea
width: 100%;    //Agrega esta línea
`;
const Title = styled.h2`
  color: #343a40;
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
`;


function PublicationAdd({publicacion, setPublicacion,handleSubmitPublication }) {
  const [urls,setUrls]=useState([])

  const handleChange=(e)=>{
    const property=e.target.name;
    const value=e.target.value;

    if (property!="multimedia") {
      setPublicacion({
        ...publicacion,
        [property]:value
      });
      return;
    }
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/files/upload", {
        filePath: publicacion.multimedia,
        type: "image",
      });
      if(response.data.results){
        handleSubmitPublication(response.data.results)
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Container 
      className='rounded-lg border rounded-lg' 
      >
        <Title>Crear</Title>
        <form 
        onSubmit={handleSubmit}
      className='rounded-lg'
        
        >
          <FormGroup>
            <Label>Título:</Label>
            <Input
              type="text"
              name="titulo"
              value={publicacion.titulo}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Descripción:</Label>
            <TextArea
              name="descripcion"
              value={publicacion.descripcion}
              onChange={handleChange}
              required
            ></TextArea>
          </FormGroup>
          <FormGroup>
          <Label>Estado</Label>
            <Select
                labelId="demo-select-small-label"
                id="estado"
                value={publicacion.estado}
                label="rol"
                onChange={handleChange}
                name="estado"
              >
                <MenuItem value="true">Activo</MenuItem>
                <MenuItem value="false">Oculto</MenuItem>
              </Select>
          </FormGroup>
          <FormGroup>
          <Label>Tipo</Label>
            <Select
                labelId="demo-select-small-label"
                id="estado"
                value={publicacion.tipo}
                label="rol"
                onChange={handleChange}
                name="tipo"
              >
                <MenuItem selected value="General">Seleccionar</MenuItem>
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Academico">Academico</MenuItem>
              </Select>
          </FormGroup>
        </form>
        <FormGroup>
            <Label>Multimedia:</Label>
            <Uploader 
            urls={urls} 
            setUrls={setUrls} 

            publicacion={publicacion}
            setPublicacion={setPublicacion}
            ></Uploader>
        </FormGroup>
        <Grid sx={{ m: 1, width: "100%" }}>
              <Button
                variant="contained"
                sx={{ width: "20%", borderRadius: "0px" }}
                onClick={handleSubmit}
              >
                CREAR
              </Button>
            </Grid>
      </Container>

    </>
  );
}

export default PublicationAdd;

