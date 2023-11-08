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
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import logo from "../../assets/cba.png";
import { SuccessAlert } from "../toastAlerts/success";

const Login = () => {
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });
  const [errorBack, setErrorBack] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.login);

  const handleOnSubmit = async () => {
    try {
      setForm({
        ...form,
        correo: "",
        password: "",
      });
      const response = await axios.post("users/login", watch(), {
        withCredentials: true,
        contentType: "application/json"
      });
      navigate("/");
      reset();
      toast.custom((t) => (
        <SuccessAlert t={t} w={"w-4/12"} message="Inicio de sesión exitoso" />
      ));
      dispatch(signin(response.data));
    } catch (error) {
      setErrorBack(error.response.data);
      setTimeout(() => {
        setErrorBack("");
      }, 5000);
    }
  };
  useEffect(() => {
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm(); //useFormErrors
  const onSubmit = handleSubmit((data) => {
    handleOnSubmit();
  });
  return (
    <div
      className="flex flex-col sm:flex-row min-h-full"
      style={{ height: "100vh" }}
    >
      <div
        className="flex flex-col p-8 sm:p-4 md:p-12 lg:p-20 items-center  
        h-full md:h-auto w-full sm:w-6/12 md:w-12/12"
      >
        <div className="flex w-full">
          <button
            onClick={() => navigate("/")}
            className="flex flex-row items-center text-[15px] hover:bg-gray-300 rounded-[50%] p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="black"
            >
              <path d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="formLogin flex flex-col w-full  min-h-full justify-center"
          style={{
            color: "rgba(45,45,45,0.8)",
          }}
        >
          <div className="flex w-full items-center justify-center ">
            <h1
              className="mb-4 text-xl font-extrabold leading-none tracking-tight 
          text-gray-900 md:text-2xl lg:text-3xl dark:text-white"
            >
              INICIAR SESION
            </h1>
          </div>
          <div className="w-full">
            {errorBack ? <Alert severity="error">{errorBack}</Alert> : null}
            <input
              className="w-full px-3 py-2 outline-none border rounded-lg"
              type="text"
              id="outlined-basic-correo"
              name="correo"
              placeholder="Correo"
              {...register("correo", {
                required: {
                  value: true,
                  message: "Correo es requerido",
                },
                minLength: {
                  value: 4,
                  message: "Correo debe tener almenos 4 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Correo debe tener máximo 30 caracteres",
                },
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Ingrese un correo válido",
                },
              })}
            />
            {errors.correo ? (
              <Alert severity="error">{errors.correo.message}</Alert>
            ) : null}
          </div>
          {/* Campo de Contraseña */}
          <div className="w-full">
            <input
              className="w-full px-3 py-2 rounded-md outline-none border rounded-lg"
              type="password"
              id="outlined-basic-password"
              name="password"
              placeholder="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password es requerido",
                },
                minLength: {
                  value: 2,
                  message: "Password debe tener almenos 2 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "Password debe tener máximo 30 caracteres",
                },
              })}
            />
            {errors.password ? (
              <Alert severity="error">{errors.password.message}</Alert>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg h-10 text-white bg-[#33C398] hover:bg-[#33C378]"
            style={{ minHeight: "40px" }}
          >
            Iniciar sesión
          </button>
          <p className="flex flex-row items-center justify-center gap-1 mt-0 text-center text-sm text-gray-500">
            Aún no posee una cuenta?{" "}
            <p
              onClick={() => navigate("/register")}
              className="font-semibold leading-6 text-indigo-600 
              hover:text-indigo-500 cursor-pointer"
            >
              Registrar
            </p>
          </p>
        </form>
      </div>
      <section
        className="flex flex-col p-4 
        sm:p-0 sm:border-l md:p-0  
        items-center justify-center 
        sm:block
        w-6/12 sm:w-6/12 md:w-6/12
        h-full hidden "
      >
        <div
          className="flex flex-col h-full justify-center items-center
           w-full items-center text-scroll border shadow-zinc-500"
        >
          <h1
            className="mb-4 text-4xl font-extrabold leading-none 
          tracking-tight text-gray-800 md:text-5xl lg:text-6xl dark:text-white"
          >
            Bienvenido de{" "}
            <span
              className="underline underline-offset-3 decoration-8 
                text-cbaRed dark:decoration-blue-600 animated-text"
            >
              Vuelta
            </span>
          </h1>
          <div className="flex w-full items-center justify-center">
            <p className="text-lg font-normal lg:text-xl dark:text-gray-400">
              Centro Boliviano Americano
            </p>
          </div>
          <div className="w-full bg-red-500"></div>
        </div>
      </section>
    </div>
  );
};

export default Login;
