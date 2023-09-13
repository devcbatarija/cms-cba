import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";

export default function ModalAddPublication({
  open,
  handleOpen,
  handleClose,
}) {
  const [spinner, setSpinner] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const response = await axios.post(`/publications`, form); // Cambia la URL para hacer la solicitud de publicación
      setTimeout(() => {
        toast.success("Publicación exitosa!");
        // Agrega lógica adicional si es necesario después de crear la publicación
        handleClose();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Lógica adicional que puedas necesitar al abrir el modal
  }, []);

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Box sx={style}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "10px",
            }}
          >
            {/* Avatar o imagen si es necesario */}
            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-titulo">Título</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={form.titulo}
                id="outlined-basic-titulo"
                name="titulo"
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-descripcion">
                Descripción
              </InputLabel>
              <TextField
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={form.descripcion}
                id="outlined-basic-descripcion"
                name="descripcion"
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-estado">Estado</InputLabel>
              <TextField
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={form.estado}
                id="outlined-basic-estado"
                name="estado"
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-tipo">Tipo</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small-label"
                id="demo-select-small"
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
                  REGISTRAR
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
        </Box>
      </StyledModal>
    </div>
  );
}

// Resto del código para Backdrop, StyledModal, y estilos
const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  display: "flex",
  flexDirection: "column",
  width: 700,
  // borderRadius: "12px",
  padding: "16px 32px 24px 32px",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: `0px 2px 24px ${theme.palette.mode === "dark" ? "#000" : "#383838"
    }`,
});

const TriggerButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }
  `
);

