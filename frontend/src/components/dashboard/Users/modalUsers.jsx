import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Skeleton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { getallusers } from "../../../redux-toolkit/actions/userActions";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { SuccessAlert } from "../../toastAlerts/success";

// ─── CBA Brand Colors ──────────────────────────────────────────────
const CBA = {
  red: "#D50032",
  redHover: "#B8002A",
  navy: "#002E5F",
  navyHover: "#001E3F",
  grey: "#DEDEDE",
  white: "#FFFFFF",
  labelGrey: "#5A6474",
  borderGrey: "#C8CDD5",
  bgGrey: "#F5F6F8",
};

// ─── Field wrapper ─────────────────────────────────────────────────
const FieldGroup = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <span
      style={{
        fontSize: "0.70rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: CBA.labelGrey,
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

// ─── Shared sx for all inputs ──────────────────────────────────────
const inputSx = {
  borderRadius: "8px",
  backgroundColor: CBA.white,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": { borderColor: CBA.borderGrey },
    "&:hover fieldset": { borderColor: CBA.navy },
    "&.Mui-focused fieldset": { borderColor: CBA.navy, borderWidth: 2 },
  },
  "& .MuiSelect-select": { borderRadius: "8px" },
};

// ─── Main Component ────────────────────────────────────────────────
export default function ModalEditUsuario({ id, open, handleClose }) {
  const [spinner, setSpinner] = useState(false);
  const [skelet, setSkelet] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Estado plano, sin anidación en .data
  const [form, setForm] = useState({
    correo: "",
    nombres: "",
    apellidos: "",
    celular: "",
    password: "",
    rol: "",
    estado: "",
  });

  const dispatch = useDispatch();

  const getById = async () => {
    try {
      const response = await axios.get(`users/get/by/${id}`);
      // ✅ Normalizar respuesta: soporta tanto { data: {...} } como el objeto directo
      const user = response.data?.data ?? response.data;
      setForm({
        correo: user.correo ?? "",
        nombres: user.nombres ?? "",
        apellidos: user.apellidos ?? "",
        celular: user.celular ?? "",
        password: user.password ?? "",
        rol: user.rol ?? "",
        estado: user.estado ?? "",
      });
    } catch (error) {
      toast.error("No se pudo cargar el usuario");
    } finally {
      setSkelet(false);
    }
  };

  useEffect(() => {
    getById();
  }, [id]);

  // ✅ handleChange genérico funciona para TextField, Select y OutlinedInput
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      await axios.put(`users/update/${id}`, form);
      setTimeout(() => {
        toast.custom((t) => (
          <SuccessAlert t={t} w={"w-4/12"} message="Edición exitosa" />
        ));
        dispatch(getallusers());
        setSpinner(false);
        handleClose();
      }, 1500);
    } catch (error) {
      toast.error(`Ocurrió un error: ${error?.response?.data?.message ?? error.message}`);
      setSpinner(false);
    }
  };

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalBox>
        {/* ── Header ── */}
        <ModalHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <AvatarWrapper>
              <PersonIcon sx={{ color: CBA.white, fontSize: 22 }} />
            </AvatarWrapper>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem", color: CBA.white }}>
                Editar usuario
              </p>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.65)" }}>
                Modifica los datos del usuario
              </p>
            </div>
          </div>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: CBA.white } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </ModalHeader>

        {/* ── Body ── */}
        <ModalBody>
          {!skelet ? (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Fila 1: Nombres | Apellidos */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                  <FieldGroup label="Nombres">
                    <TextField
                      fullWidth size="small" name="nombres" type="text"
                      value={form.nombres}
                      onChange={handleChange}
                      placeholder="Ingrese su nombre"
                      sx={inputSx}
                    />
                  </FieldGroup>
                  <FieldGroup label="Apellidos">
                    <TextField
                      fullWidth size="small" name="apellidos" type="text"
                      value={form.apellidos}
                      onChange={handleChange}
                      placeholder="Ingrese su apellido"
                      sx={inputSx}
                    />
                  </FieldGroup>
                </div>

                {/* Fila 2: Correo */}
                <FieldGroup label="Correo electrónico">
                  <TextField
                    fullWidth size="small" name="correo" type="email"
                    value={form.correo}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    sx={inputSx}
                  />
                </FieldGroup>

                {/* Fila 3: Celular | Contraseña */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                  <FieldGroup label="Celular">
                    <TextField
                      fullWidth size="small" name="celular" type="text"
                      value={form.celular}
                      onChange={handleChange}
                      placeholder="Ej: 70123456"
                      sx={inputSx}
                    />
                  </FieldGroup>
                  <FieldGroup label="Contraseña">
                    <OutlinedInput
                      fullWidth size="small" name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Mínimo 8 caracteres"
                      sx={inputSx}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((s) => !s)}
                            edge="end" size="small"
                            sx={{ color: CBA.labelGrey }}
                          >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FieldGroup>
                </div>

                {/* Fila 4: Rol | Estado */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                  <FieldGroup label="Rol">
                    {/* ✅ value={form.rol} — lee del estado plano, no de form.data */}
                    <Select
                      fullWidth size="small" name="rol"
                      value={form.rol}
                      onChange={handleChange}
                      sx={inputSx}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Client">Client</MenuItem>
                    </Select>
                  </FieldGroup>
                  <FieldGroup label="Estado">
                    {/* ✅ value como string para evitar mismatch con MenuItem */}
                    <Select
                      fullWidth size="small" name="estado"
                      value={String(form.estado)}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          estado: e.target.value === "true",
                        }))
                      }
                      sx={inputSx}
                    >
                      <MenuItem value="true">Activo</MenuItem>
                      <MenuItem value="false">Baja</MenuItem>
                    </Select>
                  </FieldGroup>
                </div>

              </div>

              {/* ── Botones ── */}
              <Divider />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    padding: "10px 0",
                    borderRadius: 8,
                    border: `1.5px solid ${CBA.borderGrey}`,
                    background: CBA.white,
                    color: "#374151",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = CBA.navy)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = CBA.borderGrey)}
                >
                  Cancelar
                </button>

                {!spinner ? (
                  <button
                    type="submit"
                    style={{
                      padding: "10px 0",
                      borderRadius: 8,
                      border: "none",
                      background: CBA.red,
                      color: CBA.white,
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = CBA.redHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = CBA.red)}
                  >
                    Guardar cambios
                  </button>
                ) : (
                  <LoadingButton
                    loading
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: CBA.red,
                      "&.MuiLoadingButton-loading": { backgroundColor: CBA.red, opacity: 0.7 },
                    }}
                  >
                    Guardando
                  </LoadingButton>
                )}
              </div>
            </form>
          ) : (
            /* ── Skeleton ── */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <Skeleton variant="text" width="40%" height={16} sx={{ mb: 0.5 }} />
                  <Skeleton variant="rounded" width="100%" height={40} />
                </div>
              ))}
              <Skeleton variant="rounded" width="100%" height={40} />
              <Skeleton variant="rounded" width="100%" height={40} />
            </div>
          )}
        </ModalBody>
      </ModalBox>
    </StyledModal>
  );
}

// ─── Styled Components ─────────────────────────────────────────────

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});
Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
  -webkit-tap-highlight-color: transparent;
`;

const ModalBox = styled(Box)`
  width: 640px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: ${CBA.navy};
  border-radius: 12px 12px 0 0;
`;

const AvatarWrapper = styled("div")`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled("div")`
  padding: 24px;
  background: ${CBA.bgGrey};
`;

const Divider = styled("div")`
  height: 1px;
  background: ${CBA.grey};
  margin: 20px 0;
`;