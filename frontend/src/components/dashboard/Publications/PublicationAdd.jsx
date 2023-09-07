import React, { useState } from 'react';
import styled from 'styled-components';

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
padding: 40px;
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

function PublicationAdd({ onPostCreate }) {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    status: '',
    type: '',
    multimedia: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleMultimediaChange = (e) => {
    const files = e.target.files;
    setPostData({
      ...postData,
      multimedia: [...postData.multimedia, ...files],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostCreate(postData);
    setPostData({
      title: '',
      description: '',
      status: '',
      type: '',
      multimedia: [],
    });
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
              name="title"
              value={postData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Descripción:</Label>
            <TextArea
              name="description"
              value={postData.description}
              onChange={handleChange}
              required
            ></TextArea>
          </FormGroup>
          <FormGroup>
            <Label>Estado:</Label>
            <Input
              type="text"
              name="status"
              value={postData.status}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Tipo:</Label>
            <Input
              type="text"
              name="type"
              value={postData.type}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Subir Multimedia:</Label>
            <Input
              type="file"
              accept="image/*, video/*"
              multiple
              onChange={handleMultimediaChange}
            />
          </FormGroup>
          <Button type="submit">Crear</Button> <Button type="submit">Cancelar</Button>
        </form>
      </Container>

    </>
  );
}

export default PublicationAdd;

