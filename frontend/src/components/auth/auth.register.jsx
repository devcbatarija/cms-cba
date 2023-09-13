import { TextField, Typography, Button, TextareaAutosize, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
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
  const [spinner,setSpinner] = useState(false);
  const [emailValid,setEmailValid] = useState(false);
  const [error, setError] = useState({
    z_errorForm:"",
    z_errorEmail:""
  });

  const handleChange = async (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };
  const dispatch=useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const response = await axios.post("http://localhost:3001/api/users", form); ///valid/email
      if(response.status === 200){
        setSpinner(false);
        toast.success("Registro exitoso")
        navigate("/login");
      }
      if (response.data.messageError) {
        setError({
          ...error,
          z_errorForm:response.data.messageError
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
      const response = await axios.post("http://localhost:3001/api/users/valid/email", {
        correo:form.correo
      });
      if (response.status===200 && response.data) {
        toast.success("Correo validado exitosamente")
        setEmailValid(true);
        return;
      }
      console.log(response);
    } catch (error) {
      setError({
        ...error,
        z_errorEmail:error.response.data.messageError
      })
    }
  };
  return (
    <div className="containerForm">
      <Typography variant="h5" component="h2">
        Register
      </Typography>
      <div className="formDiv">
        {
          emailValid?(
            <form onSubmit={handleSubmit} className="formLogin">
              <TextField
            onChange={handleChange}
            value={form.celular}
            id="outlined-basic-celular"
            label="celular"
            name="celular"
            type="number"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={form.nombres}
            id="outlined-basic-nombres"
            label="nombres"
            name="nombres"
            type="txt"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={form.apellidos}
            id="outlined-basic-apellidos"
            label="apellidos"
            name="apellidos"
            type="txt"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={form.fecha_Nacimiento}
            id="outlined-basic-fecha_Nacimiento"
            name="fecha_Nacimiento"
            type="date"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={form.ci}
            id="outlined-basic-ci"
            label="ci"
            name="ci"
            type="number"
            variant="outlined"
          />
          {
            spinner?<Box sx={{ display: 'flex',justifyContent:'center' }}>
            <CircularProgress />
          </Box>:<Button type="submit">
            Registrar
          </Button>
          }
            </form>
          ):
          <form onSubmit={handeSubmitVerify} className="formLogin">
            {
              error.z_errorEmail?<Alert severity="error">{error.z_errorEmail}</Alert>:null
            }
          <TextField
            onChange={handleChange}
            value={form.correo}
            id="outlined-basic-correo"
            label="Correo"
            name="correo"
            type="txt"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={form.password}
            id="outlined-basic-password"
            label="password"
            name="password"
            type="password"
            variant="outlined"
          />
          <Button type="submit">
            Verificar
          </Button>
        </form>
        }
      </div>
    </div>
  );
};

export default Register;
