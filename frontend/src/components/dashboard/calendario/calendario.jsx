import Typography from '@mui/material/Typography';
import daygrid from "@fullcalendar/daygrid";
import interaction, { Draggable } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timegrid from "@fullcalendar/timegrid";
import { useRef, useState } from "react";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getEvents } from "../../../redux-toolkit/actions/eventActions";
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
import Dropdown from './dropdownButton';

const views = [
    { id: 1, view: 'dayGridMonth', txt: 'Mes' },
    { id: 2, view: 'timeGridWeek', txt: 'Semana' },
    { id: 3, view: 'multiMonthYear', txt: 'Año' }
]

const Calendario = () => {
    const calendarRef = useRef(null);
    const dispatch = useDispatch();
    const changeView = (view) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(view.view);
    };
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

    const [title, setTitle] = useState('');

    const updateTitle = (e) => {
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
        state: true,
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
                data.tipo == 'General' ? (
                    <ContarinerNewEvent
                        setData={setData}
                        data={data}
                    />
                ) : (
                    <>
                        {
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

                        <div className={"grid grid-cols-1 lg:grid-cols-5 min-h-full lg:gap-4 p-5 "}>
                            <div className="calendar col-span-4">
                                <div className='items-center mb-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 relative text-lg sm:text-xl md:text-2xl'>
                                    <div className='order-last flex justify-center sm:flex-row md:flex-row lg:flex-row xl:flex-row sm:order-none sm:justify-start'>
                                        <Button
                                            sx={{ minWidth: 'fit-content', padding: '0', borderRadius: '50%' }}
                                            onClick={prev}
                                        ><NavigateBeforeRoundedIcon /></Button>

                                        <h1 className='uppercase font-semibold' >{title}</h1>
                                        <Button onClick={next}
                                            sx={{ minWidth: 'fit-content', padding: '0', borderRadius: '50%' }}
                                        ><NavigateNextRoundedIcon /></Button>
                                    </div>
                                    <div className='flex justify-end  text-base'>
                                        <Button onClick={goToToday}>Hoy</Button>
                                        <Dropdown
                                            handleFunction={changeView}
                                            datos={views}
                                            initialSelected={views[0]}
                                            disabled={false}
                                        />
                                    </div>
                                </div>
                                <FullCalendar
                                    ref={calendarRef}
                                    headerToolbar={false}
                                    plugins={[daygrid, interaction, timegrid, multimonth]}
                                    fixedWeekCount={false}
                                    locales='es'
                                    initialView="dayGridMonth"
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
                                />
                            </div>
                            <div className="mt-5 lg:mt-0">
                                <div id="myeventlist" className="eventPred mb-3 bg-zinc-100 p-5 lg:h-80vh">
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

export default Calendario;