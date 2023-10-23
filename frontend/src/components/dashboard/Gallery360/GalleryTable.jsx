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
import { deleteStateAllAmbientes, deselectAllAmbientes, deselectAmbiente, getAllAmbientes, selectAllAmbientes, selectAmbiente } from "../../../redux-toolkit/actions/galleryActions";
import axios from "axios";
import { toast } from "react-hot-toast";


//Componente principal PublicationTable
export default function GalleryTable() {
  const dispatch = useDispatch();
  const ambient = useSelector((state) => state.gallery.ambient);

  const selectedAmbientes = useSelector(
    (state) => state.gallery.selectedAmbients
  );
  const [selectAll, setSelectAll] = useState(false);
  console.log(ambient);

  //Funcion para seleccionar/deseleccionar
  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllAmbientes(ambient.map((a) => a.id_ambiente)));
      setSelectAll(true);
    } else {
      dispatch(deselectAllAmbientes());
      setSelectAll(false);
    }
  };

  //funcion para eliminar
  const handleDelete = async () => {
    const response = await axios.post("gallery/delete/select", { ids: selectedAmbientes,
    });
    setTimeout(() => {
      dispatch(getAllAmbientes());
      dispatch(deselectAllAmbientes());
      dispatch(deleteStateAllAmbientes());
      toast.success("Borrado exitoso!");
    }, 1500);
  };

  //funcion para seleccionar/deseleccionar un ambiente/imagen indidual
  const handleSelectAmbiente = (amId) => {
    if (selectedAmbientes.includes(amId)) {
      dispatch(deselectAmbiente(amId));
      setSelectAll(false);
    } else {
      dispatch(selectAmbiente(amId));
    }
  };
  useEffect(() => {
    dispatch(getAllAmbientes());
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
          disabled={selectedAmbientes.length > 0 ? false : true}
          variant="contained"
          color="error"
          sx={{ borderRadius: "3px" }}
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        > 
          Borrar {selectedAmbientes.length}
        </Button>

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
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </TableCell>
            {/*Encabezado de las columnas*/}
            <TableCell align="center">Ambiente</TableCell>
            <TableCell align="center">Imagen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ambient.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAmbientes.includes(row.id_ambiente)}
                  onChange={() => handleSelectAmbiente(row.id_ambiente)}
                />
              </TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {row.Galleries.map((gallery, index) => (
                  <Avatar
                    key={index}
                    alt={`Image ${index + 1}`}
                    src={gallery.image}
                    sx={{ width: 102, height: 102, marginRight: 2 }}
                  />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}