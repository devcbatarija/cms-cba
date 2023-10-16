import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, MenuItem, Select, Button } from "@mui/material";
import Uploader from "../Publications/Uploader";

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

function GalleryAddComponent({
    ambiente, setAmbiente, handleSubmitAmbiente
}) {
    const [urls, setUrls]=useState([]);

    const handleChange=(e)=>{
        const property = e.target.name;
        const value = e.target.value;
        if(property!="imagen"){
            setAmbiente({
                ...ambiente,
                [property]: value
            });
            return;
        }
    };
    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.post("",{
                filePath: ambiente.gallery.image,
                type:"image"
            });
            if (response.data.results) {
                handleSubmitAmbiente(response.data.results);
            }
        } catch (error) {
            return error;
        }
    };
    useEffect(()=>{
    },[]);
    return (
        <>
            <Container className="rounded-lg border rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <Title>Agregar imagen 360</Title>
                </div>
                <form className="flex flex-col rounded-lg ">
                    <FormGroup style={{ width: "100%" }}>
                        <Label>Título:</Label>
                        <Input
                            type="text"
                            name="titulo"
                            required
                        />
                    </FormGroup>
                    <FormGroup style={{ width: "100%" }}>
                        <Label>Descripción:</Label>
                        <TextArea
                            name="descripcion"
                            required
                        ></TextArea>
                    </FormGroup>
                    
                </form>
                <FormGroup>
                    <Label>Arrastre y suelte las imagenes:</Label>
                    {/* <Uploader
                        urls={urls}
                        setUrls={setUrls}
                        publicacion={ambiente}
                        setPublicacion={setAmbiente}
                    ></Uploader> */}
                </FormGroup>
                <Grid sx={{ m: 1, width: "100%" }}>
                    <Button
                        variant="contained"
                        sx={{ width: "100%", borderRadius: "0px" }}
                    >
                        Publicar
                    </Button>
                </Grid>
            </Container>
        </>
    );
}

export default GalleryAddComponent;