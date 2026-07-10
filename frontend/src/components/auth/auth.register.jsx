import { Typography, Alert, Avatar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { handleUpload } from "../../services/functions";
import { SuccessAlert } from "../toastAlerts/success";
import { ErrorAlert } from "../toastAlerts/errorAlerts";
import logoCba from "../../assets/cba_logo_horizontal.png"; 
import cbaBuilding from "../../assets/cba_foto.png"; 

const Register = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [error, setError] = useState({
    z_errorForm: "",
    z_errorEmail: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const handleOnSubmit = async () => {
    try {
      setSpinner(true);
      await axios.post("users", {
        correo: watch("correo"),
        celular: watch("celular"),
        nombres: watch("nombres"),
        image: watch("image"),
        apellidos: watch("apellidos"),
        fecha_Nacimiento: watch("fecha_Nacimiento"),
        ci: watch("ci"),
        password: watch("password"),
        rol: "Client",
      });
      setSpinner(false);
      toast.custom(<SuccessAlert w={"w-4/12"} message={"Registro exitoso."}></SuccessAlert>);
      navigate("/login");
    } catch (error) {
      setSpinner(false);
      toast.custom(<ErrorAlert w={"w-4/12"} message={error.message}></ErrorAlert>);
      console.log(error);
    }
  };

  const handleSubmitVerify = async () => {
    try {
      const response = await axios.post("users/valid/email", {
        correo: watch("correo"),
      });
      if (response.status === 200 && response.data) {
        setEmailValid(true);
        return;
      }
    } catch (error) {
      setError({ ...error, z_errorEmail: error.response.data });
    }
  };

  const convertBase = async (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    const promises = await handleUpload(files);
    const base64DataArray = await Promise.all(promises);
    setValue("image", base64DataArray[0]);
  };

  const onSubmitVerify = handleSubmit(() => handleSubmitVerify());
  const onSubmitFinal = handleSubmit(async () => handleOnSubmit());

  const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

  const step2Complete =
    watch("ci") &&
    watch("image") &&
    watch("correo") &&
    watch("celular") &&
    watch("password") &&
    watch("apellidos") &&
    watch("fecha_Nacimiento") &&
    isObjectEmpty(errors);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundColor: "#f4f4f7",
        backgroundImage: "radial-gradient(circle, #d9d9e0 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="flex flex-col sm:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col w-full sm:w-1/2 p-8 sm:p-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[15px] hover:bg-gray-100 rounded-full p-2 w-fit -ml-2 mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="black">
              <path d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" />
            </svg>
          </button>

          <img src={logoCba} alt="CBA" className="h-12 mb-6" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
            DATOS COMPLEMENTARIOS
          </h1>
          <p className="text-gray-500 mb-8">Completa tu registro en dos pasos</p>

          {emailValid ? (
            <form onSubmit={onSubmitFinal} className="flex flex-col gap-4">
              <div className="flex justify-center mb-2">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Avatar sx={{ width: "90px", height: "90px" }} src={watch("image")} alt="perfil-image" />
                </label>
                <input className="hidden" type="file" id="file-upload" name="image" onChange={convertBase} />
              </div>
              {errors.image ? <Alert severity="error">{errors.image.message}</Alert> : null}

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Celular</label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:border-[#002E5F]">
                  <input
                    className="w-full outline-none text-gray-700 bg-transparent"
                    type="number"
                    placeholder="Celular"
                    {...register("celular", {
                      required: { value: true, message: "El campo celular es requerido" },
                      minLength: { value: 3, message: "Celular debe tener al menos 3 caracteres" },
                      maxLength: { value: 8, message: "Celular debe tener máximo 8 caracteres" },
                      validate: (value) => (value <= 0 ? "Celular debe ser mayor a -1" : true),
                    })}
                  />
                </div>
                {errors.celular ? <Alert severity="error" className="mt-1">{errors.celular.message}</Alert> : null}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Nombres</label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:border-[#002E5F]">
                  <input
                    className="w-full outline-none text-gray-700 bg-transparent"
                    type="text"
                    placeholder="Nombres"
                    {...register("nombres", {
                      required: { value: true, message: "El campo nombres es requerido" },
                      minLength: { value: 3, message: "Nombres debe tener al menos 3 caracteres" },
                      maxLength: { value: 20, message: "Nombres debe tener máximo 20 caracteres" },
                    })}
                  />
                </div>
                {errors.nombres ? <Alert severity="error" className="mt-1">{errors.nombres.message}</Alert> : null}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Apellidos</label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:border-[#002E5F]">
                  <input
                    className="w-full outline-none text-gray-700 bg-transparent"
                    type="text"
                    placeholder="Apellidos"
                    {...register("apellidos", {
                      required: { value: true, message: "El campo apellidos es requerido" },
                      minLength: { value: 3, message: "Apellidos debe tener al menos 3 caracteres" },
                      maxLength: { value: 20, message: "Apellidos debe tener máximo 20 caracteres" },
                    })}
                  />
                </div>
                {errors.apellidos ? <Alert severity="error" className="mt-1">{errors.apellidos.message}</Alert> : null}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Fecha de nacimiento</label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:border-[#002E5F]">
                  <input
                    className="w-full outline-none text-gray-700 bg-transparent"
                    type="date"
                    {...register("fecha_Nacimiento", {
                      required: { value: false, message: "El campo fecha de nacimiento no es requerido" },
                    })}
                  />
                </div>
                {errors.fecha_Nacimiento ? (
                  <Alert severity="error" className="mt-1">{errors.fecha_Nacimiento.message}</Alert>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">CI</label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:border-[#002E5F]">
                  <input
                    className="w-full outline-none text-gray-700 bg-transparent"
                    type="number"
                    placeholder="CI"
                    {...register("ci", {
                      required: { value: true, message: "El campo ci es requerido" },
                      minLength: { value: 4, message: "CI debe tener al menos 4 caracteres" },
                      maxLength: { value: 20, message: "CI debe tener máximo 20 caracteres" },
                    })}
                  />
                </div>
                {errors.ci ? <Alert severity="error" className="mt-1">{errors.ci.message}</Alert> : null}
              </div>

              {spinner ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-full h-12 text-white font-semibold bg-[#D50032] hover:bg-[#B8002B] transition-colors mt-2"
                >
                  COMPLETAR REGISTRO
                </button>
              )}
            </form>
          ) : (
            <form onSubmit={onSubmitVerify} className="flex flex-col gap-5">
              {error.z_errorEmail ? <Alert severity="error">{error.z_errorEmail}</Alert> : null}

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Correo Electrónico</label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:border-[#002E5F]">
                  <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    className="w-full outline-none text-gray-700 bg-transparent"
                    type="text"
                    placeholder="correo@ejemplo.com"
                    {...register("correo", {
                      required: { value: true, message: "El campo correo es requerido" },
                      minLength: { value: 4, message: "Correo debe tener al menos 4 caracteres" },
                      maxLength: { value: 50, message: "Correo debe tener máximo 30 caracteres" },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ingrese un correo válido",
                      },
                    })}
                  />
                </div>
                {errors.correo ? <Alert severity="error" className="mt-1">{errors.correo.message}</Alert> : null}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Contraseña</label>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:border-[#002E5F]">
                  <svg className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z" />
                  </svg>
                  <input
                    className="w-full outline-none text-gray-700 bg-transparent"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: { value: true, message: "Password es requerido" },
                      minLength: { value: 5, message: "Password debe tener al menos 5 caracteres" },
                      maxLength: { value: 30, message: "Password debe tener máximo 30 caracteres" },
                    })}
                  />
                </div>
                {errors.password ? <Alert severity="error" className="mt-1">{errors.password.message}</Alert> : null}
              </div>

              <button
                type="submit"
                className="w-full rounded-full h-12 text-white font-semibold bg-[#D50032] hover:bg-[#B8002B] transition-colors mt-2"
              >
                CONTINUAR
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-gray-500">
            Ya posees una cuenta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-[#002E5F] hover:underline"
            >
              Iniciar sesión
            </button>
          </p>
        </div>

        {/* Panel derecho: foto + stepper */}
        <div className="hidden sm:flex relative w-1/2 flex-col justify-center">
          <img src={cbaBuilding} alt="Centro Boliviano Americano" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#002E5F]/70 mix-blend-multiply" />

          <div className="relative z-10 px-10 text-white">
            <ol className="relative border-l border-white/30">
              <li className="mb-10 ml-6">
                <span
                  className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-[#002E5F] ${
                    emailValid ? "bg-green-400" : "bg-white/30"
                  }`}
                >
                  {emailValid ? (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                  ) : (
                    <span className="w-2 h-2 bg-white rounded-full" />
                  )}
                </span>
                <h3 className="font-semibold leading-tight">Verificación Email</h3>
                <p className="text-sm text-white/80">Verificación email existente</p>
              </li>

              <li className="mb-10 ml-6">
                <span
                  className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-[#002E5F] ${
                    step2Complete ? "bg-green-400" : "bg-white/30"
                  }`}
                >
                  {step2Complete ? (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                  ) : (
                    <span className="w-2 h-2 bg-white rounded-full" />
                  )}
                </span>
                <h3 className="font-semibold leading-tight">Completar Formulario</h3>
                <p className="text-sm text-white/80">Completar datos personales</p>
              </li>

              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-white/20 rounded-full -left-4 ring-4 ring-[#002E5F]">
                  <span className="w-2 h-2 bg-white rounded-full" />
                </span>
                <h3 className="font-semibold leading-tight">Confirmación</h3>
                <p className="text-sm text-white/80">Cuenta lista para usar</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;