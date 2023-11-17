import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
    Button,
    Fade,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import toast, { Toaster } from "react-hot-toast";
import { getEvents, getEventsPredefinidos } from "../../../redux-toolkit/actions/eventActions";
import Cookies from "js-cookie";
import Checkboxes from "./widgets/checkbox";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import SelectColorList from "./widgets/selectColor";

export default function ModalAddEvent({
    setData,
    data,
    open,
    handleClose,
    tipoModal
}) {
    const [spinner, setSpinner] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [property]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            setSpinner(true);
            // Determinar la ruta en base al valor de tipoModal
            const path = tipoModal == "Evento" ? "event/create" : "eventpredefinido/create"
            const res = axios.post(path, data, config).then(res => {
                setTimeout(() => {
                    toast.success(res.data.successMessage)
                    setData({
                        ...data,
                        id: "",
                        title: "",
                        start: "",
                        end: "",
                        color: "",
                        tipo: "",
                        start_Time: "",
                        end_Time: "",
                        state: true,
                        allDay: true
                    })
                    // Si tipoModal es igual a "Evento", ejecuta getEvents(). De lo contrario, ejecuta getEventsPredefinidos().
                    tipoModal == "Evento" ? dispatch(getEvents()) : dispatch(getEventsPredefinidos())
                    handleClose();
                    setSpinner(false);
                }, 1500);
            }).catch(error => {
                setTimeout(() => {
                    if (error.response.status == 401) {
                        toast.error(error.response.data.messageError)
                    }
                    else {
                        toast.error(error.message)
                    }
                    setSpinner(false);
                }, 1500);

            })
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        setTimeout(() => { }, 600);
    }, []);

    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >
                <Box sx={style}>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-title">
                                Titulo
                            </InputLabel>
                            <TextField
                                sx={{ width: "100%" }}
                                onChange={handleChange}
                                value={data.title}
                                id="outlined-basic-title"
                                name="title"
                                type="text"
                                variant="outlined"
                            />
                        </Grid>
                        <div className="flex flex-row">
                            {tipoModal === "Evento" ?
                                <Grid sx={{ m: 1 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-start">
                                        Fecha de Inicio
                                    </InputLabel>
                                    <TextField
                                        sx={!data.allDay ? { width: "58%", marginRight: "2%" } : { width: "100%" }}
                                        onChange={handleChange}
                                        value={data.start}
                                        id="outlined-basic-start"
                                        name="start"
                                        type="date"
                                        size="small"
                                        variant="outlined" />
                                    {data.allDay === false ?
                                        <Fade in={!data.allDay}>
                                            <TextField
                                                sx={{ width: "40%" }}
                                                onChange={handleChange}
                                                value={data.start_Time}
                                                id="outlined-basic-start_Time"
                                                name="start_Time"
                                                type="time"
                                                size="small"
                                                variant="outlined" />
                                        </Fade>
                                        : null}
                                </Grid>
                                : null}
                            {tipoModal === "EventoPredifinido" && data.allDay === false ?
                                <Grid sx={{ m: 1 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-start_Time">
                                        Hora de Inicio
                                    </InputLabel>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        onChange={handleChange}
                                        value={data.start_Time}
                                        id="outlined-basic-start_Time"
                                        name="start_Time"
                                        type="time"
                                        size="small"
                                        variant="outlined" />
                                </Grid>
                                : null}
                            {tipoModal === "Evento" || data.allDay === false ?
                                <div className="grid content-center">
                                    <ArrowRightAltRoundedIcon />
                                </div>
                                : null}
                            {tipoModal === "EventoPredifinido" && data.allDay === false ?
                                <Grid sx={{ m: 1 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-end_Time">
                                        Hora de finalizacion
                                    </InputLabel>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        onChange={handleChange}
                                        value={data.end_Time}
                                        id="outlined-basic-end_Time"
                                        name="end_Time"
                                        type="time"
                                        size="small"
                                        variant="outlined" />
                                </Grid>
                                : null}
                            {tipoModal === "Evento" ?
                                <Grid sx={{ m: 1 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-end">
                                        Fecha de finalizacion
                                    </InputLabel>
                                    {data.allDay === false ?
                                        <TextField
                                            sx={{ width: "40%", marginRight: "2%" }}
                                            onChange={handleChange}
                                            value={data.end_Time}
                                            id="outlined-basic-end_Time"
                                            name="end_Time"
                                            type="time"
                                            size="small"
                                            variant="outlined" />
                                        : null}
                                    <TextField
                                        sx={!data.allDay ? { width: "58%" } : { width: "100%" }}
                                        onChange={handleChange}
                                        value={data.end}
                                        id="outlined-basic-end"
                                        name="end"
                                        type="date"
                                        size="small"
                                        variant="outlined" />
                                </Grid>
                                : null}
                            <div className="grid content-center">
                                <Checkboxes
                                    data={data}
                                    setData={setData}
                                />
                            </div>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            gap: "10px",
                        }}>
                            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-tipo">Tipo de evento</InputLabel>
                                <Select
                                    sx={{ width: "100%" }}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={data.tipo}
                                    label="Tipo"
                                    onChange={handleChange}
                                    name="tipo"
                                >
                                    <MenuItem value="Administrativo">Administrativo</MenuItem>
                                    <MenuItem value="Academico">Academico</MenuItem>
                                    {tipoModal === "Evento" ?
                                        <MenuItem value="General">General</MenuItem> : null
                                    }
                                </Select>
                            </Grid>
                            <Grid sx={{ m: 1, width: "40%" }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-color" >
                                    Color
                                </InputLabel>
                                <div style={{ display: 'flex' }} className=''>
                                    <SelectColorList
                                        data={data}
                                        setData={setData}
                                    />
                                </div>
                            </Grid>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                {!spinner ? (
                                    <Button
                                        sx={{ width: "100%", borderRadius: "0px" }}
                                        type="submit"
                                        variant="contained"
                                    >
                                        REGISTRAR
                                    </Button>
                                ) : (
                                    <LoadingButton
                                        size="small"
                                        endIcon={<SendIcon />}
                                        loading={true}
                                        loadingPosition="end"
                                        variant="contained"
                                        sx={{ width: "100%", height: "35px" }}
                                    >
                                        <span>Registrando</span>
                                    </LoadingButton>
                                )}
                            </Grid>
                            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                <Button
                                    variant="outlined"
                                    sx={{ width: "100%", borderRadius: "0px" }}
                                    onClick={() => {
                                        handleClose()
                                        setData({
                                            ...data,
                                            id: "",
                                            title: "",
                                            start: "",
                                            end: "",
                                            color: "",
                                            tipo: "",
                                            start_Time: "",
                                            end_Time: "",
                                            allDay: true
                                        })
                                    }}
                                >
                                    CANCELAR
                                </Button>
                            </Grid>
                        </div>
                    </form>
                </Box>
            </StyledModal>
        </div>
    );
}

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

const blue = {
    200: "#99CCF3",
    400: "#3399FF",
    500: "#007FFF",
};

const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
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
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
    display: "flex",
    flexDirection: "column",
    width: 780,
    padding: "16px 32px 24px 32px",
    backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
    boxShadow: `0px 2px 24px ${theme.palette.mode === "dark" ? "#000" : "#383838"
        }`,
});

