import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { useState } from "react";
import { Alert, Typography } from "@mui/material";
import axios from "axios";
import { signin } from "../../redux-toolkit/actions/auth.Actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.login);

  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };

  const handeSubmit = async (e) => {
    e.preventDefault();
    try {
      setForm({
        ...form,
        correo:"",
        password:""
      })
      const response = await axios.post("users/login", form,{ withCredentials: true });
      if (response.data.messageError) {
        setError(response.data.messageError);
        return;
      }
      toast.success("Inicio de sesion exitoso");
      dispatch(signin(response.data));
    } catch (error) {
      setError(error.response.data.messageError);
    }
  };

  useEffect(() => {
    if (auth.auth) {
      navigate("/");
    }
  }, [auth.auth, navigate]);

  return (
    <div className="flex">
      <div className="w-1/2 p-3">
        <div className="formDiv" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

        }} >
        <Typography variant="h5" component="h2">
          INICIO DE SESION
        </Typography>
          <form onSubmit={handeSubmit} className="formLogin" style={{
            padding:"0px",
            display:"flex",
            flexDirection:"column",
            width:"100%",
            justifyContent:"center",
            alignItems:"center",
            }}>
            {error ? (
            <Alert severity="error">{error}</Alert>
            ) : null}
            <TextField
              sx={{width:"80%"}}
              onChange={handleChange}
              value={form.correo}
              id="outlined-basic-correo"
              label="Correo"
              name="correo"
              type="txt"
              variant="outlined"
            />
            <TextField
              sx={{width:"80%"}}
              onChange={handleChange}
              value={form.password}
              id="outlined-basic-password"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
            />
            <Button type="submit">Iniciar sesion</Button>
            <Button onClick={() => navigate("/register")} sx={{ marginTop: 2 }}>
              Registrar
            </Button>
          </form>
        </div>
      </div>
      <div className="w-1/2 p-3">
        {/* Aquí puedes poner tu imagen */}
      </div>
    </div>
  );
};

export default Login;
