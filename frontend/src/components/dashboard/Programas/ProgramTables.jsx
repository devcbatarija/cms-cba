import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStateAllPrograms, deselectAllPrograms, deselectProgram, getAllProgram, selectAllPrograms, selectProgram } from "../../../redux-toolkit/actions/programActions";
import toast from "react-hot-toast";
import { Button, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
/* eslint-disable react/no-unknown-property */

function ProgramTable() {
    const dispatch=useDispatch();
    const data=useSelector((state)=>state.programs.programs);
    const selectedPrograms=useSelector((state)=>state.programs.selectedPrograms);
    const [selectAll, setSelectAll]=useState(false);
    
    //Variables y funciones para controlar el modal de agregar un nuevo programa
    const [openAddProgram, setOpenAddProgram]=useState(false);

    const handleOpenAddProgram= () =>setOpenAddProgram(true);
    const handleCloseAddProgram= () =>setOpenAddProgram(false);

    //funcion para seleccionar/deseleccionar los programas
    const handleSelectAll=()=>{
        if (!selectAll) {
            dispatch(selectAllPrograms(data.map((pub)=>pub.id_Program)));
            setSelectAll(true);
        }
        else{
            dispatch(deselectAllPrograms());
            setSelectAll(false);
        }
    };
    //funcion para eliminar los programas
    const handleDelete=async()=>{
        setTimeout(() => {
            dispatch(getAllProgram());
            dispatch(deselectAllPrograms());
            dispatch(deleteStateAllPrograms());
            toast.success("Borrado Exitoso");
        }, 1500);
    };
    //Funcion para seleccionar/deseleccionar una publicacion individual
    const handleSelectProgram=(id_Program)=>{
        if (selectedPrograms.includes(id_Program)) {
            dispatch(deselectProgram(id_Program));
            setSelectAll(false);
        } else {
            dispatch(selectProgram(id_Program));
        }
    };
    useEffect(() => {
      dispatch(getAllProgram());
    }, [dispatch]);
    //Reenderizado del componente
    <TableContainer
      sx={{ width: "100%", borderRadius: "0", height: "100vh%" }}
      component={Paper}>
        {
        openAddProgram ? <modalAddProgram
          open={openAddProgram}
          handleOpen={handleOpenAddProgram}
          handleClose={handleCloseAddProgram}
        ></modalAddProgram> : null
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
          disabled={selectedPrograms.length>0?false:true}
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
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Imagen</TableCell>
            <TableCell align="center">Turno</TableCell>
            <TableCell align="center">Modalidad</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Usuario</TableCell>


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
                  checked={selectedPrograms.includes(row.id_Publicacion)}
                  onChange={() => handleSelectProgram(row.id_Publicacion)}
                />
              </TableCell>
              {/*Datos de las publicaciones*/}
              <TableCell align="center">{row.id_Publicacion}</TableCell>
              <TableCell align="center">{row.titulo}</TableCell>
              <TableCell align="center">{row.descripcion}</TableCell>
              <TableCell align="center">{row.estado ? "Visible" : "Oculto"}</TableCell>
              <TableCell align="center">{row.tipo}</TableCell>
              {/*Boton para editar publicacion*/}
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
}
export default ProgramTable;