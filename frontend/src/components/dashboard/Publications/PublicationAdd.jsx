import React, { useState } from 'react';
import styled from 'styled-components';
import Uploader from './TestComponent';
import axios from 'axios';


const Container = styled.div`
margin: 0 auto;
padding: 5px;
background-color: #f8f9fa;
border-radius: 0;
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

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 90px;
  cursor: pointer;
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
        console.log(response.data.message)
        handleSubmitPublication()
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Container>
        <Title>Crear</Title>
        <form onSubmit={handleSubmit}>
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
            <Label>Estado:</Label>
            <Input
              type="text"
              name="estado"
              value={publicacion.estado}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Tipo:</Label>
            <Input
              type="text"
              name="tipo"
              value={publicacion.tipo}
              onChange={handleChange}
              required
            />
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
        <Button onClick={handleSubmit} >Crear publicacion</Button>
      </Container>

    </>
  );
}

export default PublicationAdd;

