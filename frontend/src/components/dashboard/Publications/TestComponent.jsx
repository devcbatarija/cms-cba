import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { handleUpload } from '../../../services/functions';
import ImageIcon from '@mui/icons-material/Image';
import {
    Button as Btn, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography
} from "@mui/material";
const UploadContainer = styled.div`
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 1px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: auto;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const PreviewContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Preview = styled.img`
  width: 100px;
  height: 100px;
`;

const Uploader = ({urls,setUrls}) => { //COMPONENT 
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("")
    const [uploaderFiles, setUploaderFiles] = useState([])
    const [isDragging, setIsDragging] = useState(false);

    const convertBase = async (e) => {
        e.preventDefault();

        // Convertir los archivos recibidos a base64 y formdata
        const files = Array.from(e.dataTransfer.files);
        let format = [];
        for (let [index,file] of files.entries()) {
            format.push({ name: file.name, type: file.type })
        }
        setImage(format);
        const promises = await handleUpload(files);

        // Usar Promise.all para esperar a que todas las promesas se resuelvan
        const base64DataArray = await Promise.all(promises);
        console.log(base64DataArray)
        // Pushear los datos base64 a los arrays de estado
        setUploaderFiles(base64DataArray)
        setUrls(base64DataArray)
        setIsDragging(false);
    };



    const handleUploadBack = async () => {
        try {
            const response = await axios.post('/files/upload', {
                filePath: image, type: "image"
            });
            console.log(response)
        } catch (error) {
            return error;
        }

    }

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    return (
        <UploadContainer>
            <InputContainer>
                <div
                    className={`flex items-center justify-center w-full ${isDragging
                        ? "border-red-500 border-4"
                        : "border-gray-300 border-2"
                        } border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={convertBase}
                >
                    <label className="flex flex-col items-center justify-center w-full h-64">
                        <div className="grid grid-cols-3 items-center justify-center pt-5 pb-6 gap-2 ">
                            {
                                image ? (
                                    image && image.map((img,index) => {
                                        return (
                                            <div
                                                key={img.name}
                                                className=''
                                            >
                                            {
                                                img.type=="image/jpeg" ||img.type=="image/png" ?(


                                                //<img  src={uploaderFiles[index]}></img>
                                                
                                                <Card sx={{ maxWidth: 345 }}>
                                                <CardActionArea>
                                                  <CardMedia
                                                    component="img"
                                                    height="500"
                                                    image={uploaderFiles[index]}{... <><button> Eliminar</button></>}
                                                    alt={img.name}
                                                  />
                                                  <CardContent>
                                                    <Typography gutterBottom variant="p" component="div">
                                                      {img.name}
                                                    </Typography>
                                                  </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                  <Button size="small" color="primary" onClick={() => handleDeleteImage(index)}>
                                                    Eliminar
                                                  </Button>
                                                </CardActions>
                                              </Card>
                                                )
                                                :<div>video</div>


                                                
                                                // img.type=="image/jpeg" ||img.type=="image/png" ?(
                                                // <img  src={uploaderFiles[index]}></img>)
                                                // :<div>video</div>
                                            }
                                            </div>
                                        )
                                    })
                                ) :
                                    <>
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>  
                                    </>
                                    
                            }
                            <button
                        onClick={() => (index)} // Reemplaza handleDeleteImage con tu función de eliminación
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    >
                    </button>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
            </InputContainer>
            {
                image ? (<Button onClick={handleUploadBack}>Subir</Button>
                ) : null
            }

        </UploadContainer>
    );
};

export default Uploader;