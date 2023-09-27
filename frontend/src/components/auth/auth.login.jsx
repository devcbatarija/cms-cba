import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel"; // Importa el componente InputLabel
import { FormControl, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { useState } from "react";
import { Alert } from "@mui/material";
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
        correo: "",
        password: "",
      });
      const response = await axios.post("users/login", form, {
        withCredentials: true,
      });
      if (response.data.messageError) {
        setError(response.data.messageError);
        return;
      }
      toast.success("Inicio de sesión exitoso");
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
    <div className="flex flex-col md:flex-row min-h-full p-4 md:px-20  bg-gray-502" style={{ height: "90vh" }}>
      <div className="flex flex-col items-center justify-center w-full h-full md:h-auto md:w-6/12 shadow border">
        <div style={{ width: "80%", padding: "15px" }}>
          <Typography variant="h5" component="h2">
            Iniciar sesión
          </Typography>
        </div>
        <form
          onSubmit={handeSubmit}
          className="formLogin flex flex-col items-center"
          style={{ width: "100%", justifyContent: "center" }}
        >
          {error ? <Alert severity="error">{error}</Alert> : null}
          {/* Campo de Correo */}
          <FormControl sx={{ width: "80%" }}>
            <TextField
              onChange={handleChange}
              value={form.correo}
              id="outlined-basic-correo"
              name="correo"
              type="txt"
              label="Correo"
              variant="outlined"
            />
          </FormControl>
          {/* Campo de Contraseña */}
          <FormControl sx={{ width: "80%", mt: 2 }}>
            <TextField
              onChange={handleChange}
              value={form.password}
              id="outlined-basic-password"
              name="password"
              type="password"
              label="Contraseña"

              variant="outlined"
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "80%", background: "#002E5F" ,borderRadius:"0px" }}
          >
            Iniciar sesión
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "80%", borderColor: "#002E5F", color: "#002E5F",borderRadius:"0px" }}
            onClick={() => navigate("/register")}
            className="mt-2"
          >
            Registrar
          </Button>
        </form>
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

export default Login;
