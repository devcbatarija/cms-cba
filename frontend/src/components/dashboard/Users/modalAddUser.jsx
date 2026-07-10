import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { getallusers } from "../../../redux-toolkit/actions/userActions";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { SuccessAlert } from "../../toastAlerts/success";

const FIELD_CLASS =
  "w-full px-3 py-2.5 text-sm border border-[#DEDEDE] rounded-xl focus:outline-none focus:border-[#002E5F] bg-white transition-colors";
const LABEL_CLASS = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";

export default function ModalUnstyledAdd({ open, handleClose }) {
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    correo: "",
    nombres: "",
    apellidos: "",
    celular: "",
    password: "",
    rol: "Client",
    estado: true,
    ci: "",
    fecha_Nacimiento: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      await axios.post("users", form);
      setTimeout(() => {
        toast.custom((t) => (
          <SuccessAlert t={t} w={"w-4/12"} message="Usuario registrado exitosamente" />
        ));
        dispatch(getallusers());
        handleClose();
      }, 1500);
    } catch (error) {
      toast.error("Ocurrió un error al registrar");
      setSpinner(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">

        {/* Header del modal */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#DEDEDE] bg-[#002E5F] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <PersonRoundedIcon sx={{ fontSize: 20, color: "white" }} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Nuevo usuario</h2>
              <p className="text-xs text-white/60">Completa los datos para registrar</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Fila 1: Nombres + Apellidos */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Nombres</label>
              <input
                className={FIELD_CLASS}
                name="nombres"
                type="text"
                placeholder="Ingrese su nombre"
                value={form.nombres}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>Apellidos</label>
              <input
                className={FIELD_CLASS}
                name="apellidos"
                type="text"
                placeholder="Ingrese su apellido"
                value={form.apellidos}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fila 2: Correo */}
          <div>
            <label className={LABEL_CLASS}>Correo electrónico</label>
            <input
              className={FIELD_CLASS}
              name="correo"
              type="email"
              placeholder="correo@ejemplo.com"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fila 3: CI + Celular */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Carnet de identidad</label>
              <input
                className={FIELD_CLASS}
                name="ci"
                type="text"
                placeholder="Número de CI"
                value={form.ci}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>Celular</label>
              <input
                className={FIELD_CLASS}
                name="celular"
                type="text"
                placeholder="Ej: 12345678"
                value={form.celular}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Fila 4: Fecha nacimiento */}
          <div>
            <label className={LABEL_CLASS}>Fecha de nacimiento</label>
            <input
              className={FIELD_CLASS}
              name="fecha_Nacimiento"
              type="date"
              value={form.fecha_Nacimiento}
              onChange={handleChange}
            />
          </div>

          {/* Fila 5: Password */}
          <div>
            <label className={LABEL_CLASS}>Contraseña</label>
            <div className="relative">
              <input
                className={FIELD_CLASS + " pr-10"}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: 18 }} />
                ) : (
                  <Visibility sx={{ fontSize: 18 }} />
                )}
              </button>
            </div>
          </div>

          {/* Fila 6: Rol + Estado */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Rol</label>
              <select
                className={FIELD_CLASS}
                name="rol"
                value={form.rol}
                onChange={handleChange}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
              </select>
            </div>
            <div>
              <label className={LABEL_CLASS}>Estado</label>
              <select
                className={FIELD_CLASS}
                name="estado"
                value={form.estado}
                onChange={(e) =>
                  setForm({ ...form, estado: e.target.value === "true" })
                }
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <option value="true">Activo</option>
                <option value="false">Baja</option>
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#DEDEDE]" />

          {/* Botones */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-[#DEDEDE] text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={spinner}
              className="flex-1 py-2.5 text-sm font-bold rounded-xl bg-[#D50032] text-white hover:bg-[#b8002a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {spinner ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registrando...
                </>
              ) : (
                "Registrar usuario"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}