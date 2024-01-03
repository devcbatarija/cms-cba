// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import {
  deleteStateAllBecas,
  deselectAllBecas,
  deselectBeca,
  getAllBeca,
  selectAllBecas,
  selectBeca,
} from "../../../redux-toolkit/actions/becaActions";
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
import ModalUpdateBeca from "./modalUpdateBeca";
import axios from "axios";


export default function BecaTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.becas.becas); 
  const selectedBecas = useSelector(
    (state) => state.becas.selectedBecas
  );
  const [selectAll, setSelectAll] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedBecaModal, setSelectedBecaModal] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  const [openAddBeca, setOpenAddBeca] = useState(false);

  const handleOpenAddBeca = () => setOpenAddBeca(true);
  const handleCloseAddBeca = () => setOpenAddBeca(false);

  
  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllBecas(data.map((pub) => pub.id_Beca)));
      setSelectAll(true);
    } else {
      dispatch(deselectAllBecas());
      setSelectAll(false);
    }
  };

  const handleModal = (id) => {
    setSelectedBecaModal(id);
    handleOpen(true);
  };

  
  const handleDelete = async () => {
    const response = await axios.post("beca/delete/select", {
      ids: selectedBecas,
    });
    setTimeout(() => {
      dispatch(getAllBeca());
      dispatch(deselectAllBecas());
      dispatch(deleteStateAllBecas());
      toast.success("Borrado exitoso!");
    }, 1500);
  };

 
  const handleSelectBeca = (pubId) => {
    if (selectedBecas.includes(pubId)) {
      dispatch(deselectBeca(pubId));
      setSelectAll(false);
    } else {
      dispatch(selectBeca(pubId));
    }
  };

  useEffect(() => {
    dispatch(getAllBeca()); 
  }, [dispatch]);

  return (
    <TableContainer
      sx={{ width: "100%", borderRadius: "0", height: "100vh%" }}
      component={Paper}
    >
    
      {open ? (
        <ModalUpdateBeca
          id={selectedBecaModal}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        ></ModalUpdateBeca>
      ) : null}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{ padding: "10px", gap: "10px" }}
      >
       
        <Button
          disabled={selectedBecas.length > 0 ? false : true}
          variant="contained"
          color="error"
          sx={{ borderRadius: "3px" }}
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          Borrar {selectedBecas.length}
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
        
            <TableCell align="center">Titulo</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Imagenes</TableCell>
            <TableCell align="center">Opciones</TableCell>
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
                  checked={selectedBecas.includes(row.id_Beca)}
                  onChange={() => handleSelectBeca(row.id_Beca)}
                />
              </TableCell>
              <TableCell align="center">{row.titulo}</TableCell>
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
              <TableCell align="center">
                {row.estado ? "Visible" : "Oculto"}
              </TableCell>
              <TableCell align="center" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }} >
                {
                  row.multimedia.map((im) => {
                    return (
                      <Avatar key={im} alt="Remy Sharp" src={im ? im : null} />
                    )
                  })
                }
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleModal(row.id_Beca)}
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
