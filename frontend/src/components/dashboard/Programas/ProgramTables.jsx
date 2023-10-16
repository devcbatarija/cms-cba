import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteStateAllPrograms, deselectAllPrograms, 
  deselectProgram, getAllProgram, selectAllPrograms, 
  selectProgram } from "../../../redux-toolkit/actions/programActions";
import toast from "react-hot-toast";
import { Avatar, Button, Checkbox, Grid, Paper, Table, 
  TableBody, TableCell, TableContainer, TableHead, 
  TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import ModalUpdateProgram from './modalUpdateProgram';
import ModalAddProgram from "./modalAddProgram";

export default function ProgramTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.programs.programs);
  const selectedPrograms = useSelector((state) => state.programs.selectedPrograms);
  const [selectAll, setSelectAll] = useState(false);

  //variables y funciones para controlar un modal de detalles del programa
  const [open, setOpen]=useState(false);
  const [selectedProgramModal, setSelectedProgramModal]=useState("");

  const handleOpen=()=>setOpen(true);
  const handleClose=()=>setOpen(false);
  //Variables y funciones para controlar el modal de agregar un nuevo programa
  const [openAddProgram, setOpenAddProgram] = useState(false);

  const handleOpenAddProgram = () => setOpenAddProgram(true);
  const handleCloseAddProgram = () => setOpenAddProgram(false);

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
console.log(data);
  const handModal=(id)=>{
    setSelectedProgramModal(id);
    handleOpen(true);
  };
  //funcion para eliminar los programas
  const handleDelete = async () => {
    const response=await axios.post('program/delete/select', {ids: selectedPrograms});
    setTimeout(() => {
      dispatch(getAllProgram());
      dispatch(deselectAllPrograms());
      dispatch(deleteStateAllPrograms());
      toast.success("Borrado Exitoso");
    }, 1500);
  };
  //Funcion para seleccionar/deseleccionar una publicacion individual
  const handleSelectProgram = (id_Programa) => {
    if (selectedPrograms.includes(id_Programa)) {
      dispatch(deselectProgram(id_Programa));
      setSelectAll(false);
    } else {
      dispatch(selectProgram(id_Programa));
    }
  };
  useEffect(() => {
    dispatch(getAllProgram());
  }, []);
  //Reenderizado del componente
  return (

    <TableContainer
      sx={{ width: "100%", borderRadius: "0", height: "100vh%" }}
      component={Paper}>
      {
        open ? <ModalUpdateProgram
          id={selectedProgramModal}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        ></ModalUpdateProgram> : null
      }
      {/*Renderizar el modal de agregar programa*/}
      {
        openAddProgram?<ModalAddProgram
        open={openAddProgram}
        handleOpen={handleOpenAddProgram}
        handleClose={handleCloseAddProgram}
        ></ModalAddProgram> : null
      }
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
            startIcon={<DeleteIcon />}>
            Borrar {selectedPrograms.length}
          </Button>
        {/*Boton para agregar nueva publicacion*/}
        <Button
          variant="contained"
          sx={{ borderRadius: "0px" }}
          startIcon={<AddIcon sx={{ color: 'white' }} />}
          onClick={handleOpenAddProgram}
        >
          Añadir
        </Button>
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
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/*Celda de seleccion de publicacion individual*/}
              <TableCell component="th" scope="row" padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedPrograms.includes(row.id_Programa)}
                  onChange={() => handleSelectProgram(row.id_Programa)}
                />
              </TableCell>
              {/*Datos de las publicaciones*/}
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.caracteristica}</TableCell>            
              <TableCell align="center">{row.requisitos}</TableCell>
              <TableCell align="center">
                <Avatar alt="Remy Sharp" src={row.imagen ? row.imagen : null} />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="success"
                  onClick={()=>handModal(row.id_Programa)}
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