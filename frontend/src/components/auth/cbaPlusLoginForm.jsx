import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import { signin } from "../../redux-toolkit/actions/auth.Actions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import logo from "../../assets/vuexy-logo.png";
import { SuccessAlert } from "../toastAlerts/success";

const PlusLoginForm = ({ toggleLoginCbaPlus }) => {
  const [errorBack, setErrorBack] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleOnSubmit = async () => {
    try {
      await axios.post("users/loginCbaPlus", watch()).then((res) => {
        dispatch(signin(res.data));
        localStorage.setItem(
          "user",
          JSON.stringify({
            correo: res.data.correo,
            _profileImage: res.data._profileImage,
            nombres: res.data.nombres,
            apellidos: res.data.apellidos,
          })
        );
      });
      navigate("/");
      reset();
      toast.custom((t) => (
        <SuccessAlert t={t} w={"w-4/12"} message="Inicio de sesión exitoso" />
      ));
    } catch (error) {
      setErrorBack("Código o contraseña incorrectos");
      setTimeout(() => setErrorBack(""), 5000);
    }
  };

  const onSubmit = handleSubmit(() => handleOnSubmit());

  return (
    <div className="flex flex-col justify-center w-full sm:w-1/2 p-6 sm:p-8">
      <button
        onClick={toggleLoginCbaPlus}
        className="flex items-center text-[15px] hover:bg-gray-100 rounded-full p-2 w-fit -ml-2 mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="black">
          <path d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" />
        </svg>
      </button>

      <div className="flex flex-col items-center gap-y-3 mb-6">
        <img src={logo} alt="" className="h-9" />
        <h1 className="text-xl font-extrabold text-[#366BC0]">C.B.A. Plus</h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
        {errorBack ? <Alert severity="error">{errorBack}</Alert> : null}

        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1">
            Código Estudiante
          </label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 focus-within:border-[#366BC0] transition-colors">
            <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              className="w-full text-sm text-gray-700 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
              style={{ boxShadow: "none" }}
              type="text"
              placeholder="Código Estudiante"
              {...register("email", {
                required: { value: true, message: "Código Estudiante es requerido" },
                minLength: { value: 4, message: "Código Estudiante debe tener al menos 4 caracteres" },
                maxLength: { value: 50, message: "Código Estudiante debe tener máximo 30 caracteres" },
              })}
            />
          </div>
          {errors.email ? (
            <Alert severity="error" className="mt-1">{errors.email.message}</Alert>
          ) : null}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1">
            Contraseña
          </label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 focus-within:border-[#366BC0] transition-colors">
            <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z" />
            </svg>
            <input
              className="w-full text-sm text-gray-700 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
              style={{ boxShadow: "none" }}
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: { value: true, message: "Password es requerido" },
                minLength: { value: 2, message: "Password debe tener al menos 2 caracteres" },
                maxLength: { value: 30, message: "Password debe tener máximo 30 caracteres" },
              })}
            />
          </div>
          {errors.password ? (
            <Alert severity="error" className="mt-1">{errors.password.message}</Alert>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full rounded-full h-10 text-sm text-white font-semibold bg-[#366BC0] hover:bg-[#2d59a0] transition-colors mt-1"
        >
          INICIAR SESIÓN
        </button>
      </form>
    </div>
  );
};

export default PlusLoginForm;