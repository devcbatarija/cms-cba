import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteStateAllPrograms, deselectAllPrograms,
  deselectProgram, getAllProgram, selectAllPrograms,
  selectProgram
} from "../../../redux-toolkit/actions/programActions";
import toast from "react-hot-toast";
import {
  Avatar, Button, Checkbox, Grid, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

export default function ProgramTable() {
  const dispatch = useDispatch();
  const data =[]
  const selectedPrograms = useSelector((state) => state.programs.selectedPrograms);
  const [selectAll, setSelectAll] = useState(false);

  //funcion para seleccionar/deseleccionar los programas
  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllPrograms(data.map((pub) => pub.idPrograma)));
      setSelectAll(true);
    }
    else {
      dispatch(deselectAllPrograms());
      setSelectAll(false);
    }
  };
  const handModal = (id) => {
    setSelectedProgramModal(id);
    handleOpen(true);
  };
  //funcion para eliminar los programas
  const handleDelete = async () => {
    const response = await axios.post('program/delete/select', { ids: selectedPrograms });
    setTimeout(() => {
      dispatch(getAllProgram());
      dispatch(deselectAllPrograms());
      dispatch(deleteStateAllPrograms());
      toast.success("Borrado Exitoso");
    }, 1500);
  };
  //Funcion para seleccionar/deseleccionar una publicacion individual
  const handleSelectProgram = (idPrograma) => {
    if (selectedPrograms.includes(idPrograma)) {
      dispatch(deselectProgram(idPrograma));
      setSelectAll(false);
    } else {
      dispatch(selectProgram(idPrograma));
    }
  };
  useEffect(() => {
    dispatch(getAllProgram());
  }, []);
  //Reenderizado del componente
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
          disabled={selectedPrograms.length > 0 ? false : true}
          variant="contained"
          color="error"
          sx={{ borderRadius: "3px" }}
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          Borrar {selectedPrograms.length}
        </Button>
        {/*Boton para agregar nueva publicacion*/}
      </Grid>
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
            <TableCell align="center">Programa</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Requisitos</TableCell>
            <TableCell align="center">Imagen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/*Celda de seleccion de publicacion individual*/}
              <TableCell component="th" scope="row" padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedPrograms.includes(row.idPrograma)}
                  onChange={() => handleSelectProgram(row.idPrograma)}
                />
              </TableCell>
              {/*Datos de las publicaciones*/}
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.caracteristica}</TableCell>
              <TableCell align="center">{row.requisitos}</TableCell>
              <TableCell
                align="center"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {row.multimedia.map((im, index) => (
                  <Avatar
                    key={index}
                    alt="Remy Sharp"
                    src={im ? im : null}
                    sx={{ width: 102, height: 102 }}
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