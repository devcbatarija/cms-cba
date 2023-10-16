import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { handleUpload } from "../../../services/functions";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Button as Btn, Card, CardActionArea, CardMedia } from "@mui/material";
const UploadContainer = styled.div`
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 1px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;
const Uploader = ({ setUrls, publicacion, setPublicacion }) => {
  //COMPONENT
  const [image, setImage] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef();
  const convertBase = async (e) => {
    e.preventDefault();

    const files = Array.from(e.target.files); // Obtén los archivos desde el input de tipo file
    let format = [];
    for (let [index, file] of files.entries()) {
      format.push({ name: file.name, type: file.type });
    }
    setImage(format);
    const promises = await handleUpload(files);

    const base64DataArray = await Promise.all(promises);
 
    setIsDragging(false);
    setPublicacion({
      ...publicacion,
      multimedia: base64DataArray,
    });
  };
const clearFileInput = () => {
  if (fileInputRef.current) {
    fileInputRef.current.value = ""; // Establece el valor del input a vacío
  }
};
  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const handleDelete = async (selectName) => {
    clearFileInput()
    const newImage = await image.filter((f) => f.name != selectName);
    const newUploaderFiles = await publicacion.multimedia.filter(
      (f, index) => image[index].name != selectName
    );
    setImage(newImage);
    setPublicacion({
      ...publicacion,
      multimedia: newUploaderFiles,
    });
  };
  useEffect(() => { 
  }, []);
  return (
    <UploadContainer>
      <InputContainer>
        <div
          className={`flex items-center justify-center w-full ${
            isDragging ? "border-red-500 border-4" : "border-gray-300 border-2"
          } border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={convertBase}
        >
          <label className="flex flex-col items-center justify-center w-full h-22">
            <div className="flex items-center justify-center pt-5 pb-6 gap-2 ">
              {image.length > 0 ? (
                image.map((img, index) => {
                  return (
                    <div key={img.name} className="">
                      {img.type == "image/jpeg" || img.type == "image/png" ? (
                        <Card
                          sx={{
                            maxWidth: 150,
                            maxHeight: 150,
                            position: "relative",
                          }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="200"
                              image={publicacion.multimedia[index]}
                              alt={img.name}
                            />
                          </CardActionArea>
                          <IconButton
                            onClick={() => {
                              handleDelete(img.name);
                            }}
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}
                            aria-label="delete"
                          >
                            <DeleteIcon
                              titleAccess="Eliminar credencial"
                              sx={{ color: "crimson", borderRadius: "50%" }}
                            />
                          </IconButton>
                        </Card>
                      ) : (
                        <div>video</div>
                      )}
                    </div>
                  );
                })
              ) : (
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
                  <span className="font-medium text-gray-600">Archivos</span>
                </>
              )}
            </div>
          </label>
        </div>
      </InputContainer>
      <input
        className="relative m-0 block w-full min-w-0 
        flex-auto rounded border border-solid border-neutral-300 
        bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 
        transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden 
        file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 
        file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 
        file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] 
        hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary
        focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 
        dark:file:text-neutral-100 dark:focus:border-primary"
        type="file"
        id="formFile"
        name="file"
        onChange={convertBase}
        ref={fileInputRef}
        multiple
      />
    </UploadContainer>
  );
};

export default Uploader;
