import Typography from '@mui/material/Typography';
import daygrid from "@fullcalendar/daygrid";
import interaction, { Draggable } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timegrid from "@fullcalendar/timegrid";
import { useRef, useState } from "react";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
// import { Button } from '@mui/base/Button';
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getEvents} from "../../../redux-toolkit/actions/eventActions";
import BasicStack from "./widgets/stack";
import multimonth from "@fullcalendar/multimonth";
import { Button } from "@mui/material";
import "./calendarStyles.css"
import ModalAddEvent from "./modalAddEvent";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import BasicPopover from "./widgets/popover";
import ModalUpdateEvent from './modalUpdateEvent';
import ContarinerNewEvent from './containerEvent';

const Calendario = () => {
    const calendarRef = useRef(null);
    const dispatch = useDispatch();
    const next = () => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.next();
    };

    const prev = () => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.prev();
    };
    const goToToday = () => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.today();
    };
    const changeView = (view) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(view);
    };
    const [title, setTitle] = useState('');

    const updateTitle = (e) => {
        //   let calendarApi = calendarRef.current.getApi();
        setTitle(e.view.title);
    }



    const [tipoModal, setTipoModal] = useState('Evento');
    const [myDraggable, setMyDraggable] = useState(null);
    const events = useSelector((state) => state.events.events);
    const eventsPredefinidos = useSelector((state) => state.events.eventsPredefinidos);
    const [containerEl, setContainerEl] = useState(null);
    const userLogin = useSelector((state) => state.login.user)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        limpiarDatos()
    }

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const handleOpenModalUpdate = () => setOpenModalUpdate(true);
    const handleCloseModalUpdate = () => setOpenModalUpdate(false);

    const [idEvent, setIdEvent] = useState(null);

    const [data, setData] = useState({
        id: "",
        title: "",
        start: "",
        end: "",
        color: "",
        tipo: "",
        start_Time: "",
        end_Time: "",
        state:true,
        allDay: true,
        UsuarioIdUsuario: userLogin._userId
    })
    useEffect(() => {
        setContainerEl(document.getElementById("myeventlist"));
        if (containerEl != null && myDraggable == null) {
            setMyDraggable(
                new Draggable(containerEl, {
                    itemSelector: '.fc-event'
                })
            )
        }

    }, [containerEl])
    const handleDateSelect = (e) => {
        setTipoModal("Evento");
        var start, end, horaInicio, horaFin
        if (e.allDay == false) {
            start = separarFechaYHora(e.startStr).fecha
            horaInicio = separarFechaYHora(e.startStr).hora
            end = separarFechaYHora(e.endStr).fecha
            horaFin = separarFechaYHora(e.endStr).hora
        } else {
            start = e.startStr;
            end = dayjs(e.endStr).subtract(1, 'day').format('YYYY-MM-DD');
        }
        setData({
            ...data,
            id: "",
            title: "",
            start: start,
            end: end,
            color: "",
            tipo: "Academico",
            start_Time: horaInicio ? horaInicio : "",
            end_Time: horaFin ? horaFin : "",
            allDay: e.allDay,
            UsuarioIdUsuario: userLogin._userId
        })
        handleOpen()
    }

    const handleEventClick = (e) => {
        setTipoModal("Evento");
        setIdEvent(e.event.id)
        handleOpenModalUpdate()
    }
    const handleEventDrop = async (e) => {
        const token = Cookies.get('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const eventDrop = e.event;
        const event = {
            id: eventDrop.id,
            start: eventDrop.start,
            end: eventDrop.allDay == false ? eventDrop.endStr : dayjs(eventDrop.endStr).subtract(1, 'day').format('YYYY-MM-DD')
        }
        axios.put(`event/update/${event.id}`, event, config).then(res => {
            setTimeout(() => {
                limpiarDatos();
                toast.success(res.data.successMessage)
                dispatch(getEvents())
            }, 1500);
        }).catch(error => {
            if (error.response.status == 401) {
                toast.error(error.response.data.messageError)
            }
            else {
                toast.error(error.message)
            }
            dispatch(getEvents())
        })
    }

    useEffect(() => {
        setData({
            ...data,
            UsuarioIdUsuario: userLogin._userId
        })
    }, [])
    const handleExternalEventDrop = async (e) => {
        const token = Cookies.get('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const eventDrop = JSON.parse(e.draggedEl.dataset.event);
        const newE = {
            title: eventDrop.title,
            start: e.dateStr,
            end: e.dateStr,
            color: eventDrop.color,
            tipo: eventDrop.tipo,
            start_Time: eventDrop.start_Time,
            end_Time: eventDrop.end_Time,
            allDay: eventDrop.allDay,
            UsuarioIdUsuario: userLogin._userId

        }
        axios.post("event/create", newE, config).then(res => {
            setTimeout(() => {
                toast.success(res.data.successMessage)
                dispatch(getEvents())
            }, 1500);
        }).catch(error => {
            if (error.response.status == 401) {
                toast.error(error.response.data.messageError)
            }
            else {
                toast.error(error.message)
            }
            dispatch(getEvents())
        })
    }

    const separarFechaYHora = (fechaTexto) => {
        const fecha = dayjs(fechaTexto);

        if (fecha.isValid()) {
            return {
                fecha: fecha.format('YYYY-MM-DD'),
                hora: fecha.format('HH:mm:ss')
            }
        } else {
            return {
                fecha: "",
                hora: ""
            }
        }
    }
    const limpiarDatos = () => {
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
    }
    return (
        <>
            {
                data.tipo=='General'?(
                    <ContarinerNewEvent
                        setData={setData}
                        data={data}
                    />
                ):(
                    <>
                        {
                        // <UseModal setData={setData} data={data} handleOpen={handleOpen} handleClose={handleClose} open={open}  ></UseModal>
                        <ModalAddEvent
                            setData={setData}
                            data={data}
                            open={open}
                            handleClose={handleClose}
                            tipoModal={tipoModal}
                        />
                    }
                    {
                        openModalUpdate ? <ModalUpdateEvent
                            id={idEvent}
                            open={openModalUpdate}
                            handleClose={handleCloseModalUpdate}
                            tipoModal={tipoModal}
                        /> : null
                    }
                    <div className={"flex flex-row"}>
                        <div className="calendar w-10/12 bg-zinc-100">
                            {/* seo declarar para consultas slang */}
                            <div className='flex flex-row mt-4 mb-3 relative'>
                                <Button onClick={prev}><NavigateBeforeRoundedIcon /></Button>
                                <Typography sx={{ fontSize: '25px' }}>{title}</Typography>
                                <Button onClick={next}><NavigateNextRoundedIcon /></Button>
                                <div className='absolute right-0'>
                                    <Button onClick={goToToday}>Today</Button>
                                    <select onChange={(e) => changeView(e.target.value)}>
                                        <option value="dayGridMonth">Month</option>
                                        <option value="timeGridWeek">Week</option>
                                        <option value="multiMonthYear">Year</option>
                                    </select>
                                </div>
                            </div>
                            <FullCalendar
                                ref={calendarRef}
                                headerToolbar={false}
                                // headerToolbar={{
                                //     left: 'title,prev,next',
                                //     // center: 'dayGridMonth,timeGridWeek,timeGridDay',
                                //     right: 'today,dayGridMonth,timeGridWeek,multiMonthYear' //'prev,today,next'
                                // }}
                                plugins={[daygrid, interaction, timegrid, multimonth]}
                                fixedWeekCount={false}
                                locales='es'
                                initialView="dayGridMonth"
                                // initialEvents={events}
                                events={events}
                                editable={true}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                weekends={true}
                                droppable={true}
                                eventDurationEditable={false}
                                datesSet={updateTitle}
                                select={handleDateSelect}
                                eventClick={handleEventClick}
                                eventDrop={handleEventDrop}
                                drop={handleExternalEventDrop}
                            // dateClick={handleDateSelect}
                            />
                        </div>
                        <div className="w-2/12 mt-5">
                            <div id="myeventlist" className="eventPred mb-3 bg-zinc-100">
                                <Typography sx={{}}>Eventos Predefinidos</Typography>
                                <BasicStack eventsPredefinidos={eventsPredefinidos}></BasicStack>
                            </div>
                            <BasicPopover
                                setData={setData}
                                data={data}
                                openModal={open}
                                handleCloseModal={handleClose}
                                tipoModal={tipoModal}
                                setTipoModal={setTipoModal}
                                handleOpen={handleOpen}
                                calendarRef={calendarRef}
                            ></BasicPopover>
                        </div>
                    </div>
                    </>
                )
            }
        </>
    );
}

const styles = {
    backgroundColor: "rgb(166, 167, 170)",
    borderRadius: "10px",
    padding: "15px",
    height: "80vh"
}

const blue = {
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};
const TriggerButton = styled(Button)(
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
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:focus-visible {
      border-color: ${blue[400]};
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
    `
);

export default Calendario;