// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import {
  Avatar,
  Button,
  Checkbox,
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { deselectAllAmbientes, deselectAmbiente, getAllAmbientes, selectAllAmbientes, selectAmbiente } from "../../../redux-toolkit/actions/galleryActions";

//Componente principal PublicationTable
export default function GalleryTable() {
  const dispatch = useDispatch(); //Obtiene la funcion dispatch de Redux para enviar acciones
  const data = useSelector((state) => state.gallery.ambient); //selectedPublications. Obtiene la lista de los usuarios del estado global de Redux
  const selectedAmbientes = useSelector(
    (state) => state.gallery.selectedAmbientes
  ); //Obtiene la lista de los seleccionados del estado global de Redux
  const [selectAll, setSelectAll] = useState(false); //Estado local para el control de seleccion de todos

  //Funcion para seleccionar/deseleccionar las publicaciones
  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllAmbientes(data.map((a) => a.id_ambiente))); //Activa la seleccion de todos las publicaciones
      setSelectAll(true); //Actualiza el estado local
    } else {
      dispatch(deselectAllAmbientes()); //Deselecciona todas las publicaciones
      setSelectAll(false); // Actualiza el estado local
    }
  };

  //funcion para eliminar publicaciones http://localhost:3001/api/publication/create
  const handleDelete = async () => {
    // const response = await axios.post("publication/delete/select", {
    //   ids: selectedPublications,
    // });
    // setTimeout(() => {
    //   dispatch(getAllA()); //Actualiza la lista de publicaciones despues de la eliminacion
    //   dispatch(deselectAllPublications()); //Deselecciona a todos los usuarios.
    //   dispatch(deleteStateAllPublications()); //Elimina el estado de los usuarios seleccionados
    //   toast.success("Borrado exitoso!"); //Muestra una notificacion de exito
    // }, 1500);
  };

  //funcion para seleccionar/deseleccionar un ambiente/imagen indidual
  const handleSelectAmbiente = (amId) => {
    if (selectedAmbientes.includes(amId)) {
      dispatch(deselectAmbiente(amId)); //Deselecciona
      setSelectAll(false); //actualiza el estado local
    } else {
      dispatch(selectAmbiente(amId)); //Selecciona la publicacion
    }
  };
  //Efecto para cargar la lista de los ambientes al cargar el componente
  useEffect(() => {
    dispatch(getAllAmbientes()); //Obtiene la lista de los ambientes al montar el componente
  }, [dispatch]);

  //Renderizado del componente
  return (
    <TableContainer
      sx={{ width: "100%", borderRadius: "0", height: "100vh%" }}
      component={Paper}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{ padding: "10px", gap: "10px" }}
      >
        {/*Boton para eliminar publicaciones*/}
        <Button
          // disabled={selectedAmbientes.length > 0 ? false : true}
          variant="contained"
          color="error"
          sx={{ borderRadius: "3px" }}
          // onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >borrar
          {/* Borrar {selectedAmbientes.length} */}
        </Button>
        {/*Boton para agregar nueva publicacion*/}
        {/* <Button
          variant="contained"
          sx={{ borderRadius: "0px" }}
          startIcon={<AddIcon sx={{ color: 'white' }} />}
          onClick={handleOpenAddPublication}
        >
          Añadir
        </Button> */}
      </Grid>
      {/*Tabla de publicaciones*/}
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Checkbox
                color="primary"
                inputProps={{
                  "aria-label": "select all users",
                }}
              />
            </TableCell>
            {/*Encabezado de las columnas*/}
            <TableCell align="center">Ambiente</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Imagen</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" padding="checkbox">
                <Checkbox
                  color="primary"
                  // checked={selectedAmbientes.includes(row.id_ambiente)}
                  // onChange={() => handleSelectAmbiente(row.id_ambiente)}
                />
              </TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell
                align="center"
                style={{
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {row.descripcion}
              </TableCell>
              <TableCell align="center" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }} >
                {/* { AYUDA!!
                  row.image.map((im) => {
                    return (
                      <Avatar key={im} alt="Remy Sharp" src={im ? im : null} />
                    )
                  })
                } */}
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "0px" }}
                  endIcon={<EditIcon></EditIcon>}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
