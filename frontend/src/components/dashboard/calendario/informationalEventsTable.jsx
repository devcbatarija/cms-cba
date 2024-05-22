import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SuccessAlert } from "../../toastAlerts/success";
import { ErrorAlert } from "../../toastAlerts/errorAlerts";
import NoData from "./widgets/noData";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../../redux-toolkit/actions/eventActions";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "../widgets/tablePagination";
import OpacityRoundedIcon from '@mui/icons-material/OpacityRounded';
import ModalAddEvent from "./modalAddEvent";
import ModalUpdateEvent from "./modalUpdateEvent";

const InformationalEventsTable = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [Events, setEvents] = useState([])
    const [selectedEvents, setSelectedEvents] = useState([])
    // variables para paginacion
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0)
    const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda
    const [filteredEvents, setFilteredEvents] = useState([])
    const [open, setOpen] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const userLogin = useSelector((state) => state.login.user)
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const handleOpenModalUpdate = (id) => {
        setIdEvent(id)
        setOpenModalUpdate(true)
    };
    const handleCloseModalUpdate = () => setOpenModalUpdate(false);
    useEffect(() => {
        if (data.tipo == 'General') {
            navigate('/dashboard/Calendario/addEvent', { state: { prevPath: '/dashboard/Calendario/', data: data } })
        }
    }, [data])

    const handleChangeItemsPerPage = (value) => {
        if (value < 1000 && value >= 0) {
            setItemsPerPage(value)
        }
    }
    // Función para manejar el cambio en el input de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Función para filtrar los eventos basándose en el término de búsqueda
    const filterEvents = () => {
        if (searchTerm.trim() !== "") {
            const filter = Events.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEvents(filter);
        } else {
            // Si el input está vacío, cargar todos los eventos
            setFilteredEvents(Events);
        }
    };

    // Llamada a filterEvents cada vez que searchTerm cambia
    useEffect(() => {
        filterEvents();
    }, [searchTerm]);

    const handleDeleteEventById = (idEvent) => {
        axios.delete(`event/deleteEventoById/${idEvent}`).then(res => {
            setTimeout(() => {
                getAllEvents()
                dispatch(getEvents())
                toast.custom((t) => (
                    <SuccessAlert t={t} w={"w-4/12"} message={res.data.data.successMessage} />
                ));
            }, 500);
        }).catch(err => {
            toast.custom((t) => (
                <ErrorAlert t={t} w={"w-4/12"} message='No se pudo borrar el evento' />
            ));
        })
    }
    const handleSelectAllEvent = () => {
        if (selectedEvents.length == Events.length) {
            setSelectedEvents([])
        }
        else {
            let allEvents = []
            Events.map(event => {
                allEvents.push(event.id)
            })
            setSelectedEvents(allEvents)
        }
    }
    const handleSelectEvent = (idEvent) => {
        if (selectedEvents.includes(idEvent)) {
            const newSelectedEvents = selectedEvents.filter(eventId => eventId !== idEvent);
            setSelectedEvents(newSelectedEvents);
        }
        else {
            setSelectedEvents([
                ...selectedEvents,
                idEvent
            ])
        }
    }
    const deleteSelectedEvents = () => {
        axios.post(`event/deleteSelectedEvents`, selectedEvents).then(res => {
            setTimeout(() => {
                getAllEvents()
                dispatch(getEvents())
                setSelectedEvents([])
                toast.custom((t) => (
                    <SuccessAlert t={t} w={"w-4/12"} message={res.data.data.message} />
                ));
            }, 500);
        }).catch(err => {
            setSelectedEvents([])
            toast.custom((t) => (
                <ErrorAlert t={t} w={"w-4/12"} message='Hubo un error al eliminar los eventos.' />
            ));
        })
    }
    const getAllEvents = async () => {
        await axios.get('datosevento').then(res => {
            if (res.data.results.Eventos.length > 0) {
                setEvents(res.data.results.Eventos)
                setFilteredEvents(res.data.results.Eventos)
            }
            else {
                setEvents(null)
            }
            setTotalPages(Math.ceil(res.data.results.Eventos.length / itemsPerPage))
            // console.log(res.data.results)
        })
    }
    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    useEffect(() => {
        if (Events.length > 0 && itemsPerPage > 0) {
            setTotalPages(Math.ceil(Events.length / itemsPerPage))
        }
    }, [itemsPerPage])
    useEffect(() => {
        getAllEvents()
    }, [])
    return (
        <>
            {
                <ModalAddEvent
                    setData={setData}
                    data={data}
                    open={open}
                    handleClose={handleClose}
                    tipoModal={'Evento'}
                />
            }
            {
                openModalUpdate ? <ModalUpdateEvent
                    id={idEvent}
                    open={openModalUpdate}
                    handleClose={handleCloseModalUpdate}
                    tipoModal={'Evento'}
                /> : null
            }
            <div className="flex justify-between text-white mb-5">
                <div className="group/search rounded-full h-10 w-6/12 bg-white text-zinc-500 flex flex-row justify-center items-center border-[1px]">
                    {
                        searchTerm === '' &&
                        <div className="px-3 group-has-[:focus]/search:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    }
                    <input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={`w-full h-full border-none ${searchTerm === '' ? 'rounded-r-full' : 'rounded-full'} text-sm focus:rounded-full focus:px-5`} type="text" name="" id="" placeholder="Buscar evento..." />
                </div>
                <div className="flex flex-row justify-center items-center gap-x-3">
                    <button onClick={deleteSelectedEvents} disabled={selectedEvents.length == 0 ? true : false} className="font-semibold bg-cbaRed px-4 h-10 rounded-full text-sm flex flex-row justify-center items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        <span>Borrar {selectedEvents.length}</span>
                    </button>
                    <button onClick={handleOpen} className="font-semibold bg-cbaBlue px-4 h-10 rounded-full text-sm flex flex-row justify-center items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <span>Agregar Evento</span>
                    </button>
                </div>
            </div>
            {
                Events.length > 0 ?
                    <>
                        <div className="w-full text-sm flex flex-row text-zinc-500 font-bold py-2 h-16 mb-2 rounded-tl-2xl rounded-tr-2xl bg-blue-50 shadow">
                            <div className="group/Check w-[5%] flex justify-center items-center h-full p-2">
                                <label htmlFor='DeleteAll' className=" flex items-center justify-center border-2 w-5 h-5 rounded-md border-zinc-500 has-[:checked]:bg-blue-200 has-[:checked]:border-blue-300">
                                    <input type="checkbox" name="" id='DeleteAll' className="hidden " onChange={handleSelectAllEvent} checked={selectedEvents.length == Events.length ? true : false} />
                                    <span className="text-white hidden group-has-[:checked]/Check:block">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>

                                    </span>
                                </label>
                            </div>
                            <div className="w-[20%] h-full p-2 flex items-center">
                                <span>Titulo</span>
                            </div>
                            <div className="w-[22%] h-full  p-2 flex items-center">
                                <span className="text-center">Fecha de inicio y fin</span>
                            </div>
                            <div className="w-[13%] flex flex-row justify-center items-center gap-x-[3px] p-2 h-full">
                                <span>Horario</span>
                            </div>
                            <div className="w-[8%] h-full p-2 flex items-center justify-center">
                                <span>Estado</span>
                            </div>
                            <div className="w-[10%] p-2 flex flex-col justify-center gap-y-[3px] items-center h-full">
                                <span>Tipo</span>
                            </div>
                            <div className="w-[10%] flex items-center justify-center p-2 h-full">
                                <span>Color</span>
                            </div>
                            <div className="w-[12%] h-full p-2 flex items-center justify-center">
                                <span>Acciones</span>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-y-2">
                            {
                                filteredEvents.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((event, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex flex-row h-16 bg-white rounded-lg shadow- text-zinc-500 font-semibold text-xs transition ease-in-out delay-150 duration-500 hover:scale-[1.0070] hover:shadow-lg"
                                    >
                                        <div className="w-[5%] flex justify-center items-center h-full p-2 group/Check">
                                            <label htmlFor={event.id} className=" flex items-center justify-center border-2 w-5 h-5 rounded-md border-zinc-300 has-[:checked]:bg-blue-200 has-[:checked]:border-blue-300">
                                                <input type="checkbox" name="" id={event.id} className="hidden "
                                                    checked={selectedEvents.includes(event.id) ? true : false}
                                                    onChange={() => handleSelectEvent(event.id)}
                                                />
                                                <span className="text-white hidden group-has-[:checked]/Check:block">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="w-[20%] h-full p-2 flex items-center">
                                            <span className="text-xs">{event.title}</span>
                                        </div>
                                        <div className="w-[22%] h-full  p-2 flex flex-col justify-center">
                                            <span className="text-xs text-zinc-400 mt-[3px] capitalize">
                                                {dayjs(event.start).format(`dddd, D`)}
                                                <span className="lowercase"> de </span>
                                                {dayjs(event.start).format(`MMMM YYYY`)}</span>
                                            <span className="text-xs text-zinc-400 mt-[3px] capitalize">
                                                {dayjs(event.end).format(`dddd, D`)}
                                                <span className="lowercase"> de </span>
                                                {dayjs(event.end).format(`MMMM YYYY`)}</span>
                                        </div>
                                        <div className="w-[13%] flex flex-row justify-center items-center gap-x-[3px] p-2">
                                            {
                                                event.allDay ?
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        <span>Todo el dia</span>
                                                    </>
                                                    :
                                                    <>
                                                        <span>{event.start_Time}</span> -
                                                        <span>{event.end_Time}</span>
                                                    </>
                                            }
                                        </div>
                                        <div className="w-[8%] h-full p-2 flex items-center justify-center">
                                            <span
                                                className={`px-2 py-[4px] rounded-full border-[1.5px] text-[10px] ${event.state ? 'border-green-300 text-green-400 bg-green-100' : 'border-red-300 text-red-400 bg-red-100'}`}
                                            >{event.state ? 'Visible' : 'Oculto'}</span>
                                        </div>
                                        <div className="w-[10%] p-2 flex flex-col justify-center gap-y-[3px] items-center">
                                            <span>{event.tipo}</span>
                                        </div>
                                        <div className="w-[10%] flex items-center justify-center">
                                            <OpacityRoundedIcon sx={{ color: event.color }} />
                                        </div>
                                        <div className="w-[12%] h-full p-[1px] flex items-center justify-center gap-x-1.5 text-zinc-400 ">
                                            <button
                                                onClick={() => handleOpenModalUpdate(event.id)}
                                                className="text-cbaBlue transition ease-in-out delay-150 duration-300 p-2 rounded-full hover:bg-zinc-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                                </svg>
                                            </button>
                                            <div className="h-6 w-[1px] bg-zinc-300"></div>
                                            <button
                                                onClick={() => handleDeleteEventById(event.id)}
                                                className="text-cbaRed transition ease-in-out delay-150 duration-300 p-2 rounded-full hover:bg-zinc-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            Events.length > 4 &&
                            <div>
                                <TablePagination
                                    classes={`h-16 bg-blue-50 rounded-bl-2xl rounded-br-2xl`}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={onPageChange}
                                    topRank={5}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={Events.length}
                                    handleChangeItemsPerPage={handleChangeItemsPerPage}
                                />
                            </div>
                        }
                    </> :
                    <div className="w-full h-96">
                        <NoData
                            text={'Aun no hay eventos'}
                            fontSize={''}
                        />
                    </div>
            }
        </>
    );
}

export default InformationalEventsTable;