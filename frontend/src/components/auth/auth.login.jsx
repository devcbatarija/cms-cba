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
import { useForm } from "react-hook-form";
const Login = () => {
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });
  const [errorBack, setErrorBack] = useState("");

  const {
    register,
    handleSubmit,
    formState: { error },
    watch,
    setValue,
    reset,
  } = useForm(); //useFormErrors

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
      toast.success("Inicio de sesión exitoso");
      dispatch(signin(response.data));
    } catch (error) {
      setErrorBack(error.response.data.messageError);
    }
  };
  useEffect(() => {
    if (auth.auth) {
      navigate("/");
    }
  }, [auth.auth, navigate]);

  return (
    <div
      className="flex flex-col md:flex-row min-h-full p-4 md:px-20  bg-gray-502"
      style={{ height: "90vh" }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full md:h-auto md:w-6/12 shadow border">
        <div style={{ width: "80%", padding: "15px" }}>
          <Typography variant="h5" component="h2">
            Iniciar sesión
          </Typography>
        </div>
        <form
          onSubmit={handeSubmit}
          className="formLogin flex flex-col items-center w-4/5"
          style={{
            justifyContent: "center",
            color: "rgba(45,45,45,0.8)",
          }}
        >
          {errorBack ? <Alert severity="error">{errorBack}</Alert> : null}
          {/* Campo de Correo */}
          <div className="w-full">
            <input
              className="w-full px-3 py-2 border rounded-md outline-none"
              type="text"
              id="outlined-basic-correo"
              name="correo"
              onChange={handleChange}
              value={form.correo}
              placeholder="Correo"
            />
          </div>
          {/* Campo de Contraseña */}
          <div className="w-full">
            <input
              className="w-full px-3 py-2 border rounded-md outline-none"
              type="password"
              id="outlined-basic-correo"
              name="password"
              onChange={handleChange}
              value={form.password}
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 rounded-lg h-10 text-white"
            style={{ minHeight: "40px" }}
          >
            Iniciar sesión
          </button>

          <button
            className="w-full bg-white-900 rounded-lg h-10 text-blue-900 border"
            style={{ minHeight: "40px" }}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
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
