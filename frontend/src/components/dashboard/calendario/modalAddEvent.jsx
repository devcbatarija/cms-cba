// modalAddEvent.jsx  –  Rediseño CBA  |  estilo imagen referencia
// Header navy  |  labels mayúscula  |  botones con iconos
// Toda la lógica original se conserva intacta

import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    Fade,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import toast, { Toaster } from "react-hot-toast";
import { getEvents, getEventsPredefinidos } from "../../../redux-toolkit/actions/eventActions";
import Checkboxes from "./widgets/checkbox";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import SelectColorList from "./widgets/selectColor";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EventNoteIcon from "@mui/icons-material/EventNote";

/* ─── Paleta CBA ─── */
const CBA = {
    red:   "#D50032",
    navy:  "#002E5F",
    gray:  "#DEDEDE",
    white: "#FFFFFF",
};

/* ─── Estilos de campo reutilizables ─── */
const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        "& fieldset": { borderColor: "#e5e7eb" },
        "&:hover fieldset": { borderColor: CBA.navy },
        "&.Mui-focused fieldset": { borderColor: CBA.navy, borderWidth: 2 },
    },
};

const selectSx = {
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e5e7eb" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: CBA.navy },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: CBA.navy, borderWidth: 2 },
};

/* ─── Label ─── */
const Label = ({ children }) => (
    <p style={{
        fontSize: ".68rem",
        fontWeight: 700,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "#6b7280",
        margin: "0 0 6px",
    }}>
        {children}
    </p>
);

export default function ModalAddEvent({ setData, data, open, handleClose, tipoModal }) {
    const [spinner, setSpinner] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSpinner(true);
            const path = tipoModal === "Evento" ? "event/create" : "eventpredefinido/create";
            axios.post(path, data)
                .then(res => {
                    setTimeout(() => {
                        toast.success(res.data.successMessage);
                        setData({
                            ...data, id: "", title: "", start: "", end: "",
                            color: "", tipo: "", start_Time: "", end_Time: "",
                            state: true, allDay: true,
                        });
                        tipoModal === "Evento" ? dispatch(getEvents()) : dispatch(getEventsPredefinidos());
                        handleClose();
                        setSpinner(false);
                    }, 1500);
                })
                .catch(error => {
                    setTimeout(() => {
                        if (error.response?.status === 401) toast.error(error.response.data.messageError);
                        else toast.error(error.message);
                        setSpinner(false);
                    }, 1500);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { setTimeout(() => {}, 600); }, []);

    const modalTitle = tipoModal === "Evento" ? "Crear Evento" : "Crear Evento Predefinido";

    return (
        <div>
            <Toaster position="top-right" />
            <StyledModal
                aria-labelledby="modal-crear-evento"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >
                <Box sx={modalBox}>
                    {/* ── Header navy ── */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: CBA.navy,
                        borderRadius: "12px 12px 0 0",
                        padding: "16px 24px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <EventNoteIcon sx={{ color: "#fff", fontSize: 20 }} />
                            <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                                {modalTitle}
                            </span>
                        </div>
                        <button
                            onClick={handleClose}
                            style={{
                                background: "transparent", border: "none",
                                cursor: "pointer", color: "#fff", display: "flex",
                                alignItems: "center", padding: 4, borderRadius: 6,
                                transition: "background .15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.15)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            <CloseIcon sx={{ fontSize: 20 }} />
                        </button>
                    </div>

                    {/* ── Cuerpo ── */}
                    <form onSubmit={handleSubmit}>
                        <div style={{ padding: "24px 24px 20px" }}>

                            {/* Título */}
                            <div style={{ marginBottom: 20 }}>
                                <Label>Título</Label>
                                <TextField
                                    fullWidth
                                    onChange={handleChange}
                                    value={data.title}
                                    name="title"
                                    type="text"
                                    placeholder="Nombre del evento"
                                    variant="outlined"
                                    size="small"
                                    sx={inputSx}
                                />
                            </div>

                            {/* Fechas */}
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                                {/* Fecha inicio */}
                                {tipoModal === "Evento" && (
                                    <div style={{ flex: 1, minWidth: 140 }}>
                                        <Label>Fecha de inicio</Label>
                                        <div style={{ display: "flex", gap: 6 }}>
                                            <TextField
                                                onChange={handleChange}
                                                value={data.start}
                                                name="start"
                                                type="date"
                                                size="small"
                                                variant="outlined"
                                                sx={{ ...inputSx, flex: 1 }}
                                            />
                                            {data.allDay === false && (
                                                <Fade in={!data.allDay}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        value={data.start_Time}
                                                        name="start_Time"
                                                        type="time"
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ ...inputSx, width: 110 }}
                                                    />
                                                </Fade>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Hora inicio (predefinido) */}
                                {tipoModal !== "Evento" && data.allDay === false && (
                                    <div style={{ flex: 1, minWidth: 120 }}>
                                        <Label>Hora de inicio</Label>
                                        <TextField
                                            fullWidth onChange={handleChange}
                                            value={data.start_Time} name="start_Time"
                                            type="time" size="small" variant="outlined" sx={inputSx}
                                        />
                                    </div>
                                )}

                                {/* Flecha */}
                                {(tipoModal === "Evento" || data.allDay === false) && (
                                    <div style={{ paddingBottom: 6, color: "#9ca3af" }}>
                                        <ArrowRightAltRoundedIcon />
                                    </div>
                                )}

                                {/* Hora fin (predefinido) */}
                                {tipoModal !== "Evento" && data.allDay === false && (
                                    <div style={{ flex: 1, minWidth: 120 }}>
                                        <Label>Hora de fin</Label>
                                        <TextField
                                            fullWidth onChange={handleChange}
                                            value={data.end_Time} name="end_Time"
                                            type="time" size="small" variant="outlined" sx={inputSx}
                                        />
                                    </div>
                                )}

                                {/* Fecha fin */}
                                {tipoModal === "Evento" && (
                                    <div style={{ flex: 1, minWidth: 140 }}>
                                        <Label>Fecha de finalización</Label>
                                        <div style={{ display: "flex", gap: 6 }}>
                                            {data.allDay === false && (
                                                <TextField
                                                    onChange={handleChange}
                                                    value={data.end_Time} name="end_Time"
                                                    type="time" size="small" variant="outlined"
                                                    sx={{ ...inputSx, width: 110 }}
                                                />
                                            )}
                                            <TextField
                                                onChange={handleChange}
                                                value={data.end} name="end"
                                                type="date" size="small" variant="outlined"
                                                sx={{ ...inputSx, flex: 1 }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Checkbox todo el día */}
                                <div style={{ paddingBottom: 4 }}>
                                    <Checkboxes data={data} setData={setData} />
                                </div>
                            </div>

                            {/* Tipo + Color */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
                                <div>
                                    <Label>Tipo de evento</Label>
                                    <Select
                                        fullWidth
                                        value={data.tipo}
                                        onChange={handleChange}
                                        name="tipo"
                                        size="small"
                                        sx={selectSx}
                                    >
                                        <MenuItem value="Administrativo">Administrativo</MenuItem>
                                        <MenuItem value="Academico">Académico</MenuItem>
                                        {tipoModal === "Evento" && (
                                            <MenuItem value="General">General</MenuItem>
                                        )}
                                    </Select>
                                </div>
                                <div>
                                    <Label>Color</Label>
                                    <SelectColorList data={data} setData={setData} />
                                </div>
                            </div>

                            {/* Separador */}
                            <div style={{ height: 1, background: "#f3f4f6", marginBottom: 20 }} />

                            {/* Botones */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                {/* Registrar */}
                                {!spinner ? (
                                    <button
                                        type="submit"
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            gap: 8, padding: "10px 0",
                                            background: CBA.red, color: "#fff",
                                            border: "none", borderRadius: 8,
                                            fontWeight: 700, fontSize: ".82rem",
                                            cursor: "pointer", letterSpacing: ".05em",
                                            boxShadow: "0 2px 8px rgba(213,0,50,.3)",
                                            transition: "opacity .15s",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.opacity = ".88")}
                                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                                    >
                                        <SaveIcon sx={{ fontSize: 18 }} />
                                        REGISTRAR
                                    </button>
                                ) : (
                                    <LoadingButton
                                        loading size="small" variant="contained"
                                        loadingPosition="end" endIcon={<SaveIcon />}
                                        sx={{
                                            background: CBA.red, borderRadius: "8px",
                                            height: 42, fontWeight: 700, fontSize: ".82rem",
                                            "&.MuiLoadingButton-root.Mui-disabled": { background: "#f3a0b0" },
                                        }}
                                    >
                                        Registrando
                                    </LoadingButton>
                                )}

                                {/* Cancelar */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleClose();
                                        setData({
                                            ...data, id: "", title: "", start: "", end: "",
                                            color: "", tipo: "", start_Time: "", end_Time: "", allDay: true,
                                        });
                                    }}
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        gap: 8, padding: "10px 0",
                                        background: "transparent", color: "#374151",
                                        border: "1.5px solid #e5e7eb", borderRadius: 8,
                                        fontWeight: 700, fontSize: ".82rem",
                                        cursor: "pointer", letterSpacing: ".05em",
                                        transition: "border-color .15s, color .15s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = CBA.navy;
                                        e.currentTarget.style.color = CBA.navy;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "#e5e7eb";
                                        e.currentTarget.style.color = "#374151";
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: 18 }} />
                                    CANCELAR
                                </button>
                            </div>
                        </div>
                    </form>
                </Box>
            </StyledModal>
        </div>
    );
}

/* ─── Backdrop ─── */
const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return <div className={clsx({ "MuiBackdrop-open": open }, className)} ref={ref} {...other} />;
});
Backdrop.propTypes = { className: PropTypes.string.isRequired, open: PropTypes.bool };

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
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const modalBox = {
    width: 700,
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 8px 40px rgba(0,0,0,.18)",
    overflow: "hidden",
};