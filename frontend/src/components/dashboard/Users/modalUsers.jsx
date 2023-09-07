import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  FormControl,
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
import { getallusers } from "../../../redux-toolkit/actions/userActions";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import toast, { Toaster } from "react-hot-toast";

export default function ModalUnstyled({ id, open, handleOpen, handleClose }) {
  const [spinner, setSpinner] = useState(false);
  const [skelet, setSkelet] = useState(true);
  const [form, setForm] = useState({
    correo: "",
    nombres: "",
    apellidos: "",
    celular: "",
    password: "",
    rol: "",
    estado: "",
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };

  const getById = async () => {
    const response = await axios.get(`users/get/by/${id}`);
    setForm(response.data);
    setSkelet(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const response = await axios.put(`users/update/${id}`, form);
      setTimeout(() => {
        toast.success("Actualización exitosa!");
        dispatch(getallusers());
        setSpinner(false);
        handleClose();
      }, 1500);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getById();
    }, 600);
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
          {!skelet ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "10px",
              }}
            >
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <Avatar alt="Remy Sharp" src={form.image} />
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-celular">
                  Correo
                </InputLabel>
                <TextField
                  sx={{ width: "100%" }}
                  onChange={handleChange}
                  value={form.correo}
                  id="outlined-basic-correo"
                  name="correo"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-celular">
                  Nombres
                </InputLabel>
                <TextField
                  sx={{ width: "100%" }}
                  onChange={handleChange}
                  value={form.nombres}
                  id="outlined-basic-nombres"
                  name="nombres"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-celular">
                  Apellidos
                </InputLabel>
                <TextField
                  sx={{ width: "100%" }}
                  onChange={handleChange}
                  value={form.apellidos}
                  id="outlined-basic-apellidos"
                  name="apellidos"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-celular">
                  Celular
                </InputLabel>
                <TextField
                  sx={{ width: "100%" }}
                  onChange={handleChange}
                  value={form.celular}
                  id="outlined-basic-celular"
                  name="celular"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  sx={{ width: "100%" }}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  value={form.password}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Rol
                </InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={form.rol}
                  label="rol"
                  onChange={handleChange}
                  name="rol"
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Client">Client</MenuItem>
                </Select>
              </Grid>
              <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-estado">
                  Estado
                </InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
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
  boxShadow: `0px 2px 24px ${
    theme.palette.mode === "dark" ? "#000" : "#383838"
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
