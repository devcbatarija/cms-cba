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
    Skeleton,
    TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import { getEvents, getEventsPredefinidos } from "../../../redux-toolkit/actions/eventActions";
import Cookies from "js-cookie";
import Checkboxes from "./widgets/checkbox";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import SelectColorList from "./widgets/selectColor";

export default function ModalUpdateEvent({
    id,
    open,
    handleClose,
    tipoModal
}) {
    const [data, setData] = useState({
        id: "",
        title: "",
        start: "",
        end: "",
        color: "",
        tipo: "",
        start_Time: "",
        end_Time: "",
        allDay: true,
        state: ""
    })
    const [spinner, setSpinner] = useState(false);
    const [skelet, setSkelet] = useState(true);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [property]: value,
        });
    };
    const getById = async () => {
        const event = axios.get(`event/getById/${id}`)
            .then(response => {
                const event = response.data.results;
                setData({
                    ...data,
                    id: event.id,
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    color: event.color,
                    tipo: event.tipo,
                    start_Time: event.start_Time ? event.start_Time : '',
                    end_Time: event.end_Time ? event.end_Time : '',
                    allDay: event.allDay,
                    state: event.state
                });
            })
            .catch(error => {
                console.log(error)
                toast.error(error.message)
                handleClose();
            });
        setSkelet(false);
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
            const path = tipoModal == "Evento" ? "event/update/" : "eventpredefinido/update"
            const res = axios.put(path + id, data, config).then(res => {
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
                        allDay: true
                    })
                    // Si tipoModal es igual a "Evento", ejecuta getEvents(). De lo contrario, ejecuta getEventsPredefinidos().
                    tipoModal == "Evento" ? dispatch(getEvents()) : dispatch(getEventsPredefinidos())
                    handleClose();
                    setSpinner(false);
                }, 1500);
            }).catch(error => {
                console.log(error);
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
        setTimeout(() => {
            getById()
        }, 600);
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
                    {!skelet ? (
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                // display: "grid",
                                // gridTemplateColumns: "repeat(2,1fr)",
                                // gap: "10px",
                            }}
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
                                    </Select>
                                </Grid>
                                <Grid sx={{ m: 1, width: "40%" }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-color" >
                                        Color
                                    </InputLabel>
                                    <div style={{ display: 'flex' }} className=''>
                                        {data.id!=''?
                                        <SelectColorList
                                        data={data}
                                        setData={setData}
                                    />:null}
                                    </div>
                                </Grid>
                            </div>
                            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-estado">
                                    Estado
                                </InputLabel>
                                <Select
                                    sx={{ width: "100%" }}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={data.state}
                                    label="state"
                                    onChange={handleChange}
                                    name="state"
                                >
                                    <MenuItem value={true}>Activo</MenuItem>
                                    <MenuItem value={false}>Baja</MenuItem>
                                </Select>
                            </Grid>
                            <div className="grid grid-cols-2 gap-2">
                                <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                    {!spinner ? (
                                        <Button
                                            sx={{ width: "100%", borderRadius: "0px" }}
                                            type="submit"
                                            variant="contained"
                                        >
                                            ACTUALIZAR
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
                                            <span>Actualizando</span>
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
                    ) : (
                        <form>
                            <Grid variant="outlined">
                                <Skeleton variant="text" width="100%" height={90} />
                            </Grid>
                            <div className="flex flex-row">
                                {tipoModal === "Evento" ?
                                    <Grid sx={{ m: 1 }} variant="outlined">
                                        <Skeleton variant="text" sx={!data.allDay ? { width: !data.allDay ? "58%" : "100%", marginRight: "2%" } : { width: "100%" }} height={90} />
                                        {data.allDay === false ?
                                            <Skeleton variant="text" sx={{ width: "40%" }} height={90} />
                                            : null}
                                    </Grid>
                                    : null}
                                {tipoModal === "EventoPredifinido" && data.allDay === false ?
                                    <Grid sx={{ m: 1 }} variant="outlined">
                                        <Skeleton variant="text" width="100%" height={90} />
                                    </Grid>
                                    : null}
                                {tipoModal === "Evento" || data.allDay === false ?
                                    <div className="grid content-center">
                                        <ArrowRightAltRoundedIcon />
                                    </div>
                                    : null}
                                {tipoModal === "EventoPredifinido" && data.allDay === false ?
                                    <Grid sx={{ m: 1 }} variant="outlined">
                                        <Skeleton variant="text" width="100%" height={90} />
                                    </Grid>
                                    : null}
                                {tipoModal === "Evento" ?
                                    <Grid sx={{ m: 1 }} variant="outlined">
                                        {data.allDay === false ?
                                            <Skeleton variant="text" sx={{ width: "40%", marginRight: "2%" }} height={90} />
                                            : null}
                                        <Skeleton variant="text" sx={!data.allDay ? { width: "58%" } : { width: "100%" }} height={90} />
                                    </Grid>
                                    : null}
                                <div className="grid content-center">
                                    <Skeleton variant="text" width="100px" height={90} />
                                </div>
                            </div>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2,1fr)",
                                gap: "10px",
                            }}>
                                <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                    <Skeleton variant="text" width="100%" height={90} />
                                </Grid>
                                <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                    <Skeleton variant="text" width="40%" height={90} />
                                </Grid>
                            </div>
                            <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                <Skeleton variant="text" width="50%" height={90} />
                            </Grid>
                            <div className="grid grid-cols-2 gap-2">
                                <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                    <Skeleton variant="text" width="100%" height={70} />
                                </Grid>
                                <Grid sx={{ m: 1, width: "100%" }} variant="outlined">
                                    <Skeleton variant="text" width="100%" height={70} />
                                </Grid>
                            </div>
                        </form>
                    )}
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
    // borderRadius: "12px",
    padding: "16px 32px 24px 32px",
    backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
    boxShadow: `0px 2px 24px ${theme.palette.mode === "dark" ? "#000" : "#383838"
        }`,
});

const TriggerButton = styled("button")(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }
  `
);
