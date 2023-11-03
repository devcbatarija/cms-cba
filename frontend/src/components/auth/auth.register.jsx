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
  const {
    register,
    handleSubmit,
    formState: { errors }, //errors:{correo.message:}
    watch,
    setValue,
    reset,
  } = useForm(); //useFormErrors
  const dispatch = useDispatch();
  const handleOnSubmit = async () => {
    try {
      setSpinner(true);
      const response = await axios.post("users", {
        correo: watch("correo"),
        celular: watch("celular"),
        nombres: watch("nombres"),
        image: watch("image"),
        apellidos: watch("apellidos"),
        fecha_Nacimiento: watch("fecha_Nacimiento"),
        ci: watch("ci"),
        password: watch("password"),
        rol: watch("rol"),
      }); ///valid/email
      if (response.status === 200) {
        setSpinner(false);
        toast.custom(
          <SuccessAlert
            w={"w-4/12"}
            message={"Registro exitoso."}
          ></SuccessAlert>
        );
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
  const handleSubmitVerify = async () => {
    try {
      const response = await axios.post(
        "users/valid/email",
        {
          correo: watch("correo"),
        }
      );
      if (response.status === 200 && response.data) {
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
  const convertBase = async (e) => {
    e.preventDefault();
    console.log(e);
    const files = Array.from(e.target.files); // Obtén los archivos desde el input de tipo file
    let format = [];
    for (let [index, file] of files.entries()) {
      format.push({ name: file.name, type: file.type });
    }
    const promises = await handleUpload(files);

    const base64DataArray = await Promise.all(promises);
    console.log(base64DataArray);
    setValue("image", base64DataArray[0]);
  };
  const onSubmitVerify = handleSubmit(() => {
    handleSubmitVerify();
  });
  const onSubmitFinal = handleSubmit(async () => {
    handleOnSubmit();
  });
  const isObjectEmpty = (obj)=> {
    return Object.keys(obj).length === 0;
  }
  return (
    <div className="flex flex-col sm:flex-row min-h-full">
      <div
        className="flex flex-col p-8 sm:p-4 md:p-12 lg:p-20 items-center justify-between 
        h-full md:h-auto w-full sm:w-6/12 md:w-12/12"
      >
        <div className="flex w-full">
          <button
            onClick={() => navigate(-1)}
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
        <div className="flex w-full items-center justify-center">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
            DATOS COMPLEMENTARIOS
          </h1>
        </div>
        {emailValid ? (
          <form
            onSubmit={onSubmitFinal}
            style={{ width: "100%", justifyContent: "center" }}
            className="flex formLogin flex flex-col items-center justify-center"
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                src={watch("image")}
                alt="perfil-image"
              />
            </label>
            <input
              className="hidden"
              type="file"
              id="file-upload"
              name="image"
              onChange={convertBase}
            />
            <div className="w-9/12">
              {errors.image ? (
                <Alert severity="error">{errors.image.message}</Alert>
              ) : null}
            </div>
            <input
              className="w-9/12 text-gray-700 px-3 py-2 outline-none border rounded-lg"
              type="number"
              id="outlined-basic-celular"
              name="celular"
              placeholder="celular"
              {...register("celular", {
                required: {
                  value: true,
                  message: "El campo celular es requerido",
                },
                minLength: {
                  value: 3,
                  message: "Celular debe tener almenos 3 caracteres",
                },
                maxLength: {
                  value: 8,
                  message: "Celular debe tener máximo 8 caracteres",
                },
                validate:(value)=>{
                  if (value <= 0) {
                    return "Celular debe ser mayor a -1";
                  }
                }
              })}
            />
            <div className="w-9/12">
              {errors.celular ? (
                <Alert severity="error">{errors.celular.message}</Alert>
              ) : null}
            </div>
            <input
              className="w-9/12 text-gray-700 px-3 py-2 outline-none border rounded-lg"
              type="text"
              id="outlined-basic-nombre"
              name="nombres"
              placeholder="nombres"
              {...register("nombres", {
                required: {
                  value: true,
                  message: "El campo nombres es requerido",
                },
                minLength: {
                  value: 3,
                  message: "Nombres debe tener almenos 3 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "Nombres debe tener máximo 20 caracteres",
                },
              })}
            />
            <div className="w-9/12">
              {errors.nombres ? (
                <Alert severity="error">{errors.nombres.message}</Alert>
              ) : null}
            </div>
            <input
              className="w-9/12 text-gray-700 px-3 py-2 outline-none border rounded-lg"
              type="text"
              id="outlined-basic-apellidos"
              name="apellidos"
              placeholder="apellidos"
              {...register("apellidos", {
                required: {
                  value: true,
                  message: "El campo apellidos es requerido",
                },
                minLength: {
                  value: 3,
                  message: "Apellidos debe tener almenos 3 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "Apellidos debe tener máximo 20 caracteres",
                },
              })}
            />
            <div className="w-9/12">
              {errors.apellidos ? (
                <Alert severity="error">{errors.apellidos.message}</Alert>
              ) : null}
            </div>
            <input
              className="w-9/12 text-gray-700 px-3 py-2 outline-none border rounded-lg"
              type="date"
              id="outlined-basic-nacimiento"
              name="fecha_Nacimiento"
              placeholder="fecha nacimiento"
              {...register("fecha_Nacimiento", {
                required: {
                  value: false,
                  message: "El campo fecha de nacimiento no es requerido",
                },
              })}
            />
            <div className="w-9/12">
              {errors.fecha_Nacimiento ? (
                <Alert severity="error">
                  {errors.fecha_Nacimiento.message}
                </Alert>
              ) : null}
            </div>
            <input
              className="w-9/12 text-gray-700 px-3 py-2 outline-none border rounded-lg"
              type="number"
              id="outlined-basic-ci"
              name="ci"
              placeholder="CI"
              {...register("ci", {
                required: {
                  value: true,
                  message: "El campo ci es requerido",
                },
                minLength: {
                  value: 4,
                  message: "CI debe tener almenos 4 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "CI debe tener máximo 20 caracteres",
                },
              })}
            />
            <div className="w-9/12">
              {errors.ci ? (
                <Alert severity="error">{errors.ci.message}</Alert>
              ) : null}
            </div>
            {spinner ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
                hola
              </Box>
            ) : (
              <button
                type="submit"
                className="w-9/12 rounded-lg h-10 text-white"
                style={{ minHeight: "40px", background: "#33C398" }}
              >
                Completar registro
              </button>
            )}
          </form>
        ) : (
          <form
            onSubmit={onSubmitVerify}
            className="formLogin flex flex-col items-center"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {error.z_errorEmail ? (
              <Alert severity="error">{error.z_errorEmail}</Alert>
            ) : null}
            <input
              className="w-9/12 text-gray-700 px-3 py-2 outline-none border rounded-lg"
              type="text"
              id="outlined-basic-correo"
              name="correo"
              {...register("correo", {
                required: {
                  value: true,
                  message: "El campo correo es requerido",
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
              placeholder="Correo"
            />
            <div className="w-9/12">
              {errors.correo ? (
                <Alert severity="error">{errors.correo.message}</Alert>
              ) : null}
            </div>
            <input
              className="w-9/12 text-gray-700 px-3 py-2 rounded-md outline-none border rounded-lg"
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
                  value: 5,
                  message: "Password debe tener almenos 5 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "Password debe tener máximo 30 caracteres",
                },
              })}
            />
            <div className="w-9/12">
              {errors.password ? (
                <Alert severity="error">{errors.password.message}</Alert>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-9/12 rounded-lg h-10 text-white"
              style={{ minHeight: "40px", background: "#33C398" }}
            >
              Registrar
            </button>
          </form>
        )}
        <p className="mt-10 text-center text-sm text-gray-500">
          Ya posee una cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Iniciar sesion
          </button>
        </p>
      </div>
      <section
        className="flex flex-col p-4 
        sm:p-0 sm:border-l md:p-0
        items-center justify-center 
        sm:block
        min-h-full
        w-6/12 sm:w-6/12 md:w-6/12
        hidden bg-cbaBlue"
      >
        <div
          className="flex flex-col h-full justify-center items-center
           w-full items-center text-scroll bg-white border shadow-zinc-500"
        >
          <div
            className="flex flex-col h-full  mt-[30%]
           w-full items-center text-scroll shadow-zinc-500"
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
            <div className="mt-10">
              <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ml-6">
                  {!emailValid ? (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-red-300 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                      <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </span>
                  ) : (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-300 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                      <svg
                        className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                  )}
                  <h3 className="font-medium leading-tight">
                    Verificación Email
                  </h3>
                  <p className="text-sm">verificación email existente</p>
                </li>
                <li className="mb-10 ml-6">
                  {watch("ci") &&
                  watch("image") &&
                  watch("correo") &&
                  watch("celular") &&
                  watch("password") &&
                  watch("apellidos") &&
                  watch("fecha_Nacimiento") &&
                  isObjectEmpty(errors) ? (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-300 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                      <svg
                        className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-red-300 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                      <svg
                        className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                  )}
                  <h3 className="font-medium leading-tight">
                    Completar Formulario
                  </h3>
                  <p className="text-sm">Completar datos personales</p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg
                      className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                    </svg>
                  </span>
                  <h3 className="font-medium leading-tight">Confirmation</h3>
                  <p className="text-sm">Step details here</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
