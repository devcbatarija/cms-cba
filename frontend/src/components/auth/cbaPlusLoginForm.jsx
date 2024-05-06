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
import logo from "../../assets/vuexy-logo.png";
import { SuccessAlert } from "../toastAlerts/success";

const PlusLoginForm = ({
    toggleLoginCbaPlus
}) => {
    const [errorBack, setErrorBack] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.login);

    const handleOnSubmit = async () => {
        try {
            // console.log(watch())
            const response = await axios.post("users/loginCbaPlus", watch()).then(res => {
                dispatch(signin(res.data));
                localStorage.setItem("user", JSON.stringify({
                    correo: res.data.correo,
                    _profileImage: res.data._profileImage,
                    nombres: res.data.nombres,
                    apellidos: res.data.apellidos
                }))
                console.log(res)
            });
            navigate("/");
            reset();
            toast.custom((t) => (
                <SuccessAlert t={t} w={"w-4/12"} message="Inicio de sesión exitoso" />
            ));
            console.log('llego bien')
        } catch (error) {
            console.log('dio error')
            // setErrorBack(error.response.data);
            setTimeout(() => {
                setErrorBack("");
            }, 5000);
        }
    };
    useEffect(() => { }, []);
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
            className="flex flex-col p-8 sm:p-4 md:p-12 lg:p-20 items-center h-full md:h-auto w-full sm:w-6/12 md:w-12/12"
        >
            <div className="flex w-full">
                <button
                    onClick={toggleLoginCbaPlus}
                    // onClick={() => navigate("/")}
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
                <div className="flex flex-col w-full items-center justify-center gap-y-5 mb-10">
                    <img src={logo} alt="" />
                    <h1
                        className="text-xl font-bold leading-none tracking-tight text-[#366BC0] md:text-2xl lg:text-3xl"
                    >
                        C.B.A. Plus
                    </h1>
                </div>
                <div className="w-full">
                    {errorBack ? <Alert severity="error">{errorBack}</Alert> : null}
                    <input
                        className="w-full px-3 py-2 outline-none border rounded-lg"
                        type="text"
                        id="outlined-basic-email"
                        name="email"
                        placeholder="Codigo Estudiante"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Codigo Estudiante es requerido",
                            },
                            minLength: {
                                value: 4,
                                message: "Codigo Estudiante debe tener almenos 4 caracteres",
                            },
                            maxLength: {
                                value: 50,
                                message: "Codigo Estudiante debe tener máximo 30 caracteres",
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
                <div className="flex flex-col items-center gap-y-5">
                    <button
                        type="submit"
                        className="w-full rounded-lg h-10 text-white bg-[#7F9FD0] hover:bg-[#7F9FD08]/30"
                        style={{ minHeight: "40px" }}
                    >
                        Iniciar sesión
                    </button>

                    <p className="flex flex-row items-center justify-center gap-1 mt-0 text-center text-sm text-gray-500">
                        Aún no posee una cuenta?{" "}
                        <p
                            onClick={() => navigate("/register")}
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        >
                            Registrar
                        </p>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default PlusLoginForm;