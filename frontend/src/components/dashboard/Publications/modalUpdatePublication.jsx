import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Skeleton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import axios from "axios";

export default function ModalUpdatePublication({ id, open, handleClose }) {
  const [spinner, setSpinner] = useState(false);
  const [skeleton, setSkeleton] = useState(true);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    estado: true,
    tipo: "",
    url: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };

  const getPublicationById = async () => {
    try {
      const response = await axios.get(`/publications/${id}`);
      setForm(response.data);
      setSkeleton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const response = await axios.put(`/publications/${id}`, form);
      setTimeout(() => {
        toast.success("Actualización exitosa!");
        //dispatch(updatePublication(response.data)); // Actualizar el estado global
        setSpinner(false);
        handleClose();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPublicationById();
  }, []);

  return (
    <div>
      <StyledModal
        aria-labelledby="modal-update-publication-title"
        aria-describedby="modal-update-publication-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Box sx={style}>
          {!skeleton ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "10px",
              }}
            >
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <Avatar alt="Publication Image" src={form.url} />
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-basic-title">Titulo</InputLabel>
                <TextField
                  sx={{ width: "100%" }}
                  onChange={handleChange}
                  value={form.titulo}
                  id="outlined-basic-title"
                  name="titulo"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-basic-description">
                  Descripcion
                </InputLabel>
                <TextField
                  sx={{ width: "100%" }}
                  onChange={handleChange}
                  value={form.descripcion}
                  id="outlined-basic-description"
                  name="descripcion"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-estado">Estado</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="select-estado-label"
                  id="select-estado"
                  value={form.estado}
                  label="estado"
                  onChange={handleChange}
                  name="estado"
                >
                  <MenuItem value={true}>Activo</MenuItem>
                  <MenuItem value={false}>Baja</MenuItem>
                </Select>
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-basic-tipo">Tipo</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="select-tipo-label"
                  id="select-tipo"
                  value={form.tipo}
                  label="tipo"
                  onChange={handleChange}
                  name="tipo"
                >
                  <MenuItem value="Cartelera">Cartelera</MenuItem>
                  <MenuItem value="Evento">Evento</MenuItem>
                </Select>
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                {!spinner ? (
                  <Button
                    sx={{ width: "100%", borderRadius: "0px" }}
                    type="submit"
                    variant="contained"
                  >
                    GUARDAR
                  </Button>
                ) : (
                  <LoadingButton
                    size="small"
                    endIcon={<SendIcon />}
                    loading={true}
                    loadingPosition="end"
                    variant="contained"
                    sx={{ width: "100%", height: "35px" }}
                  >
                    <span>Actualizando</span>
                  </LoadingButton>
                )}
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <Button
                  variant="outlined"
                  sx={{ width: "100%", borderRadius: "0px" }}
                  onClick={handleClose}
                >
                  CANCELAR
                </Button>
              </Grid>
            </form>
          ) : (
            <form
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "10px",
              }}
            >
              <Grid variant="outlined">
                <Skeleton variant="circular" width={40} height={40} />
              </Grid>
              <Grid variant="outlined">
                <Skeleton variant="text" width="100%" height={90} />
              </Grid>
              <Grid variant="outlined">
                <Skeleton variant="text" width="100%" height={90} />
              </Grid>
              <Grid variant="outlined">
                <Skeleton variant="text" width="100%" height={90} />
              </Grid>
              <Grid variant="outlined">
                <Skeleton variant="text" width="100%" height={90} />
              </Grid>
              <Grid variant="outlined">
                <Skeleton variant="text" width="100%" height={90} />
              </Grid>
              <Grid variant="outlined">
                <Skeleton variant="text" width="100%" height={90} />
              </Grid>
              <Grid variant="outlined">
                <Skeleton variant="text" width="100%" height={90} />
              </Grid>
              <Grid variant="outlined">
                <Skeleton variant="rectangular" width="100%" height={36} />
              </Grid>
              <Grid variant="outlined">
                <Skeleton variant="rectangular" width="100%" height={36} />
              </Grid>
            </form>
          )}
        </Box>
      </StyledModal>
    </div>
  );
}

ModalUpdatePublication.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const Backdrop = styled("div")((props) => ({
  ...props.theme.backdrop,
}));

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const style = (theme) => ({
  display: "flex",
  flexDirection: "column",
  width: 700,
  padding: "16px 32px 24px 32px",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: `0px 2px 24px ${
    theme.palette.mode === "dark" ? "#000" : "#383838"
  }`,
});
