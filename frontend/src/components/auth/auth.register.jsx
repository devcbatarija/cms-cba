import {
  TextField,
  Typography,
  Button,
  TextareaAutosize,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    correo: "",
    celular: "",
    nombres: "",
    apellidos: "",
    fecha_Nacimiento: "",
    ci: "",
    password: "",
    rol: "Client",
  });
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [error, setError] = useState({
    z_errorForm: "",
    z_errorEmail: "",
  });

  const handleChange = async (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const response = await axios.post(
        "http://localhost:3001/api/users",
        form
      ); ///valid/email
      if (response.status === 200) {
        setSpinner(false);
        toast.success("Registro exitoso");
        navigate("/login");
      }
      if (response.data.messageError) {
        setError({
          ...error,
          z_errorForm: response.data.messageError,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handeSubmitVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/valid/email",
        {
          correo: form.correo,
        }
      );
      if (response.status === 200 && response.data) {
        toast.success("Correo validado exitosamente");
        setEmailValid(true);
        return;
      }
      console.log(response);
    } catch (error) {
      setError({
        ...error,
        z_errorEmail: error.response.data.messageError,
      });
    }
  };
  return (
    <div
      className="flex flex-col md:flex-row min-h-full p-4 md:px-20  bg-gray-502"
      style={{ height: "90vh" }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full md:h-auto md:w-6/12 shadow border">
        <div style={{ width: "80%", padding: "15px" }}>
          <Typography variant="h5" component="h2">
            Register
          </Typography>
        </div>
        {emailValid ? (
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", justifyContent: "center" }}
            className="formLogin flex flex-col items-center"
          >
            <TextField
              sx={{ width: "80%" }}
              onChange={handleChange}
              value={form.celular}
              id="outlined-basic-celular"
              label="celular"
              name="celular"
              type="number"
              variant="outlined"
            />
            <TextField
              sx={{ width: "80%" }}
              onChange={handleChange}
              value={form.nombres}
              id="outlined-basic-nombres"
              label="nombres"
              name="nombres"
              type="txt"
              variant="outlined"
            />
            <TextField
              sx={{ width: "80%" }}
              onChange={handleChange}
              value={form.apellidos}
              id="outlined-basic-apellidos"
              label="apellidos"
              name="apellidos"
              type="txt"
              variant="outlined"
            />
            <TextField
              sx={{ width: "80%" }}
              onChange={handleChange}
              value={form.fecha_Nacimiento}
              id="outlined-basic-fecha_Nacimiento"
              name="fecha_Nacimiento"
              type="date"
              variant="outlined"
            />
            <TextField
              sx={{ width: "80%" }}
              onChange={handleChange}
              value={form.ci}
              id="outlined-basic-ci"
              label="ci"
              name="ci"
              type="number"
              variant="outlined"
            />
            {spinner ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button 
              variant="contained"
            sx={{ width: "80%", background: "#002E5F" ,borderRadius:"0px" }}
          
              type="submit">Registrar</Button>
            )}
          </form>
        ) : (
          <form
            onSubmit={handeSubmitVerify}
            className="formLogin flex flex-col items-center"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {error.z_errorEmail ? (
              <Alert severity="error">{error.z_errorEmail}</Alert>
            ) : null}
            <TextField
              onChange={handleChange}
              value={form.correo}
              id="outlined-basic-correo"
              label="Correo"
              name="correo"
              type="txt"
              variant="outlined"
              sx={{ width: "80%" }}
            />
            <TextField
              onChange={handleChange}
              value={form.password}
              id="outlined-basic-password"
              label="password"
              name="password"
              type="password"
              variant="outlined"
              sx={{ width: "80%" }}
            />
            <Button
              variant="contained"
              sx={{ width: "80%", background: "#002E5F", borderRadius: "0px" }}
              type="submit"
            >
              Verificar
            </Button>
          </form>
        )}
      </div>
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1588912914017-923900a34710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1519&q=80")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="w-full h-full md:h-auto md:w-6/12 shadow border"
      ></div>
    </div>
  );
};

export default Register;
