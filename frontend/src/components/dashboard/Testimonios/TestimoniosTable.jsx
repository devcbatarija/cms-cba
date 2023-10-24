import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Avatar, Button, Checkbox, Grid, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { deleteStateAllTestimonio, deselectAllTestimonio, deselectTestimonio, getAllTestimonio, selectAllTestimonio, selectTestimonio } from "../../../redux-toolkit/actions/testimonioActions";

export default function TestimonioTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.testimonios.testimonios);
  const selectedTestimonios = useSelector((state) => state.testimonios.selectedTestimonios);
  const [selectAll, setSelectAll] = useState(false);

  console.log(data)
  //funcion para seleccionar/deseleccionar los programas
  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllTestimonio(data.map((pub) => pub.id_Testimonios)));
      setSelectAll(true);
    }
    else {
      dispatch(deselectAllTestimonio());
      setSelectAll(false);
    }
  };
  const handModal = (id) => {
    setSelectedProgramModal(id);
    handleOpen(true);
  };
  //funcion para eliminar los programas
  const handleDelete = async () => {
    const response = await axios.post('testimonios/delete/select', { ids: selectedTestimonios });
    setTimeout(() => {
      dispatch(getAllTestimonio());
      dispatch(deselectAllTestimonio());
      dispatch(deleteStateAllTestimonio());
      toast.success("Borrado Exitoso");
    }, 1500);
  };
  //Funcion para seleccionar/deseleccionar una publicacion individual
  const handleSelectProgram = (id_Testimonios) => {
    if (selectedTestimonios.includes(id_Testimonios)) {
      dispatch(deselectTestimonio(id_Testimonios));
      setSelectAll(false);
    } else {
      dispatch(selectTestimonio(id_Testimonios));
    }
  };
  useEffect(() => {
    dispatch(getAllTestimonio());
  }, []);
  //Reenderizado del componente
  return (
    <TableContainer
      sx={{ width: "100%", borderRadius: "0", height: "100vh%" }}
      component={Paper}>

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{ padding: "10px", gap: "10px" }}
      >
        {/*Boton para eliminar publicaciones*/}
        <Button
          disabled={selectedTestimonios.length > 0 ? false : true}
          variant="contained"
          color="error"
          sx={{ borderRadius: "3px" }}
          onClick={handleDelete}
          startIcon={<DeleteIcon />}>
          Borrar {selectedTestimonios.length}
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
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Cargo</TableCell>
            <TableCell align="center">Comentario</TableCell>
            <TableCell align="center">Imagen</TableCell>
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
                  checked={selectedTestimonios.includes(row.id_Testimonios)}
                  onChange={() => handleSelectProgram(row.id_Testimonios)}
                />
              </TableCell>
              {/*Datos de las publicaciones*/}
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.apellidos}</TableCell>
              <TableCell align="center">{row.cargo}</TableCell>
              <TableCell align="center">{row.comentario}</TableCell>
              <TableCell align="center" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Avatar
                  alt="Remy Sharp"
                  src={row.imagen ? row.imagen : null}
                  sx={{ width: 50, height: 50 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}