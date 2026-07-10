import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import { signin } from "../../redux-toolkit/actions/auth.Actions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import logoCba from "../../assets/cba_logo_horizontal.png"; 
import cbaBuilding from "../../assets/cba_foto.png"; 
import { SuccessAlert } from "../toastAlerts/success";
import PlusLoginForm from "./cbaPlusLoginForm";

const Login = () => {
  const [CbaPlusLogin, setCbaPlusLogin] = useState(false);
  const [errorBack, setErrorBack] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.login);

  const toggleLoginCbaPlus = () => setCbaPlusLogin(!CbaPlusLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleOnSubmit = async () => {
    try {
      await axios
        .post("users/login", watch(), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
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
      setErrorBack(error.response?.data);
      setTimeout(() => setErrorBack(""), 5000);
    }
  };

  const onSubmit = handleSubmit(() => handleOnSubmit());

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundColor: "#f4f4f7",
        backgroundImage: "radial-gradient(circle, #d9d9e0 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="flex flex-col sm:flex-row w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {CbaPlusLogin ? (
          <PlusLoginForm toggleLoginCbaPlus={toggleLoginCbaPlus} />
        ) : (
          <div className="flex flex-col justify-center w-full sm:w-1/2 p-6 sm:p-8">
            <img src={logoCba} alt="CBA" className="h-9 mb-5" />

            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-1">
              ACCEDE A TU CUENTA
            </h1>
            <p className="text-sm text-gray-500 mb-6">Gestiona actividades y reportes</p>

            <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
              {errorBack ? <Alert severity="error">{errorBack}</Alert> : null}

              {/* Correo */}
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">
                  Correo Electrónico
                </label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 focus-within:border-[#002E5F] transition-colors">
                  <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    className="w-full text-sm text-gray-700 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
                    style={{ boxShadow: "none" }}
                    type="text"
                    placeholder="correo@ejemplo.com"
                    {...register("correo", {
                      required: { value: true, message: "Correo es requerido" },
                      minLength: { value: 4, message: "Correo debe tener al menos 4 caracteres" },
                      maxLength: { value: 50, message: "Correo debe tener máximo 30 caracteres" },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ingrese un correo válido",
                      },
                    })}
                  />
                </div>
                {errors.correo ? (
                  <Alert severity="error" className="mt-1">{errors.correo.message}</Alert>
                ) : null}
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">
                  Contraseña
                </label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 focus-within:border-[#002E5F] transition-colors">
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
                className="w-full rounded-full h-10 text-sm text-white font-semibold bg-[#D50032] hover:bg-[#B8002B] transition-colors mt-1"
              >
                INICIAR SESIÓN
              </button>

              <div className="relative w-full mt-1">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-xs text-gray-400">O continuar con</span>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleLoginCbaPlus}
                className="w-full rounded-full h-10 text-sm text-[#366BC0] font-bold border-2 flex items-center justify-center gap-2"
              >
                <span>CBA Plus</span>
              </button>

              <p className="flex items-center justify-center gap-1 mt-4 text-center text-xs text-gray-500">
                Aún no posees una cuenta?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="font-semibold text-[#002E5F] hover:underline cursor-pointer"
                >
                  Registrar
                </span>
              </p>
            </form>
          </div>
        )}

        <div className="hidden sm:block relative w-1/2">
          <img src={cbaBuilding} alt="Centro Boliviano Americano" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#002E5F]/60 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
};

export default Login;