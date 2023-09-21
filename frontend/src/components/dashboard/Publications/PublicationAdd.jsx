import React, { useState } from 'react';
import styled from 'styled-components';
import Uploader from './TestComponent';
import axios from 'axios';

const StyledButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  color: #FFF;
  background-clip: padding-box;
  border: 0;
  cursor: pointer;
  transition: all .2s;
  width: 100px;
  background: linear-gradient(to right, #007bff 0%, #66a6ff 100%);

  &:hover {
    transform: scale(1.1);
  }
  
  &:focus {
    outline:0;
  }

  &:not(:last-child) {
    margin-right: .75rem;
  }
`;
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
  text-align: center;
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

function PublicationAdd({publicacion, setPublicacion }) {
  const [urls,setUrls]=useState([])
  const handleChange=(e)=>{
    const property=e.target.name;
    const value=e.target.value;
    console.log(value);

    if (property!="multimedia") {
      setPublicacion({
        ...publicacion,
        [property]:value
      });
    }
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response= await axios.post('/files/upload',{
        filePath:urls,
        type:"image"
      })
      console.log(response)
    } catch (error) {
      console.log(error)
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
          <FormGroup>
            <Label>Imagen:</Label>
            <Uploader urls={urls} setUrls={setUrls} ></Uploader>
          </FormGroup>
          <Button type="submit">Crear</Button> <Button type="submit">Cancelar</Button>
        </form>
      </Container>

    </>
  );
}

export default PublicationAdd;

