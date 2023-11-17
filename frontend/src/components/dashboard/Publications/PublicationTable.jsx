// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import {
  deleteStateAllPublications,
  deselectAllPublications,
  deselectPublication,
  getAllPublication,
  selectAllPublications,
  selectPublication,
} from "../../../redux-toolkit/actions/publicationActions";
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
import ModalUpdatePublication from "./modalUpdatePublication";
import axios from "axios";


export default function PublicationTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.publications.publications); 
  const selectedPublications = useSelector(
    (state) => state.publications.selectedPublications
  );
  const [selectAll, setSelectAll] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedPublicationModal, setSelectedPublicationModal] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  const [openAddPublication, setOpenAddPublication] = useState(false);

  const handleOpenAddPublication = () => setOpenAddPublication(true);
  const handleCloseAddPublication = () => setOpenAddPublication(false);

  
  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllPublications(data.map((pub) => pub.id_Publicacion)));
      setSelectAll(true);
    } else {
      dispatch(deselectAllPublications());
      setSelectAll(false);
    }
  };

  const handleModal = (id) => {
    setSelectedPublicationModal(id);
    handleOpen(true);
  };

  
  const handleDelete = async () => {
    const response = await axios.post("publication/delete/select", {
      ids: selectedPublications,
    });
    setTimeout(() => {
      dispatch(getAllPublication());
      dispatch(deselectAllPublications());
      dispatch(deleteStateAllPublications());
      toast.success("Borrado exitoso!");
    }, 1500);
  };

 
  const handleSelectPublication = (pubId) => {
    if (selectedPublications.includes(pubId)) {
      dispatch(deselectPublication(pubId));
      setSelectAll(false);
    } else {
      dispatch(selectPublication(pubId));
    }
  };

  useEffect(() => {
    dispatch(getAllPublication()); 
  }, [dispatch]);

  return (
    <TableContainer
      sx={{ width: "100%", borderRadius: "0", height: "100vh%" }}
      component={Paper}
    >
    
      {open ? (
        <ModalUpdatePublication
          id={selectedPublicationModal}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        ></ModalUpdatePublication>
      ) : null}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{ padding: "10px", gap: "10px" }}
      >
       
        <Button
          disabled={selectedPublications.length > 0 ? false : true}
          variant="contained"
          color="error"
          sx={{ borderRadius: "3px" }}
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          Borrar {selectedPublications.length}
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
                  checked={selectedPublications.includes(row.id_Publicacion)}
                  onChange={() => handleSelectPublication(row.id_Publicacion)}
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
                  onClick={() => handleModal(row.id_Publicacion)}
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
