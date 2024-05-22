import axios from "axios";
import dayjs from "dayjs";
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SuccessAlert } from "../../toastAlerts/success";
import { ErrorAlert } from "../../toastAlerts/errorAlerts";
import NoData from "./widgets/noData";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../../redux-toolkit/actions/eventActions";
import { useDispatch } from "react-redux";
import TablePagination from "../widgets/tablePagination";
import EventsTable from "./eventsTable";
import InformationalEventsTable from "./informationalEventsTable";

const EventsCalendarTable = () => {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const [Events, setEvents] = useState(null)
    // const [selectedEvents, setSelectedEvents] = useState([])
    // // variables para paginacion
    // const [currentPage, setCurrentPage] = useState(0);
    // const [itemsPerPage, setItemsPerPage] = useState(10);
    // const [totalPages, setTotalPages] = useState(0)
    // const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda
    // const [filteredEvents, setFilteredEvents] = useState([])

    // const handleChangeItemsPerPage = (value) => {
    //     if (value < 1000 && value >= 0) {
    //         setItemsPerPage(value)
    //     }
    // }
    // // Función para manejar el cambio en el input de búsqueda
    // const handleSearchChange = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    // // Función para filtrar los eventos basándose en el término de búsqueda
    // const filterEvents = () => {
    //     if (searchTerm.trim() !== "") {
    //         const filter = Events.datosEvento.filter(event =>
    //             event.Evento.title.toLowerCase().includes(searchTerm.toLowerCase())
    //         );
    //         setFilteredEvents(filter);
    //     } else {
    //         // Si el input está vacío, cargar todos los eventos
    //         setFilteredEvents(Events?.datosEvento);
    //     }
    // };

    // // Llamada a filterEvents cada vez que searchTerm cambia
    // useEffect(() => {
    //     filterEvents();
    // }, [searchTerm]);

    // const handleDeleteEventById = (idEvent) => {
    //     axios.delete(`event/deleteEventoById/${idEvent}`).then(res => {
    //         setTimeout(() => {
    //             getAllEvents()
    //             dispatch(getEvents())
    //             toast.custom((t) => (
    //                 <SuccessAlert t={t} w={"w-4/12"} message={res.data.data.successMessage} />
    //             ));
    //         }, 1000);
    //     }).catch(err => {
    //         toast.custom((t) => (
    //             <ErrorAlert t={t} w={"w-4/12"} message='No se pudo borrar el evento' />
    //         ));
    //     })
    // }
    // const handleSelectAllEvent = () => {
    //     if (selectedEvents.length == Events.datosEvento.length) {
    //         setSelectedEvents([])
    //     }
    //     else {
    //         let allEvents = []
    //         Events.datosEvento.map(event => {
    //             allEvents.push(event.Evento.id)
    //         })
    //         setSelectedEvents(allEvents)
    //     }
    // }
    // const handleSelectEvent = (idEvent) => {
    //     if (selectedEvents.includes(idEvent)) {
    //         const newSelectedEvents = selectedEvents.filter(eventId => eventId !== idEvent);
    //         setSelectedEvents(newSelectedEvents);
    //     }
    //     else {
    //         setSelectedEvents([
    //             ...selectedEvents,
    //             idEvent
    //         ])
    //     }
    // }
    // const deleteSelectedEvents = () => {
    //     axios.post(`event/deleteSelectedEvents`, selectedEvents).then(res => {
    //         setTimeout(() => {
    //             getAllEvents()
    //             dispatch(getEvents())
    //             setSelectedEvents([])
    //             toast.custom((t) => (
    //                 <SuccessAlert t={t} w={"w-4/12"} message={res.data.data.message} />
    //             ));
    //         }, 500);
    //     }).catch(err => {
    //         setSelectedEvents([])
    //         toast.custom((t) => (
    //             <ErrorAlert t={t} w={"w-4/12"} message='Hubo un error al eliminar los eventos.' />
    //         ));
    //     })
    // }
    // const getAllEvents = async () => {
    //     await axios.get('datosevento').then(res => {
    //         if (res.data.results.datosEvento.length > 0) {
    //             setEvents(res.data.results)
    //             setFilteredEvents(res.data.results.datosEvento)
    //         }
    //         else {
    //             setEvents(null)
    //         }
    //         setTotalPages(Math.ceil(res.data.results.datosEvento.length / itemsPerPage))
    //         console.log(res.data.results)
    //     })
    // }
    // const handleEditEvent = async (id) => {
    //     await axios.get(`event/getById/${id}`).then(response => {
    //         const res = response.data.results
    //         if (res.General) {
    //             navigate('/dashboard/Calendario/updateEvent', { state: { prevPath: '/dashboard/Calendario/', data: res } })
    //         }
    //         else {

    //         }
    //     })
    // }
    // const onPageChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };
    // useEffect(() => {
    //     if (Events?.datosEvento.length > 0 && itemsPerPage > 0) {
    //         setTotalPages(Math.ceil(Events.datosEvento.length / itemsPerPage))
    //     }
    // }, [itemsPerPage])
    // useEffect(() => {
    //     getAllEvents()
    // }, [])
    const [showTable, setShowTable] = useState('EventsTable')
    const options = [
        { id: 1, table: 'EventsTable', text: 'Eventos' },
        { id: 2, table: 'InformationEventsTable', text: 'Eventos Informativos' },
        { id: 3, table: 'PredefinedEventsTable', text: 'Eventos Predefinidos' },
    ]
    return (
        <>
            <div className="bg-zinc-100 min-h-screen md:px-5 lg:px-2 xl:px-20 py-5">
                <div className="w-full flex flex-row items-center gap-x-2 mb-5 wrap">
                    {
                        options.map((obj) => (
                            <span key={obj.id}
                                onClick={() => setShowTable(obj.table)}
                                className={`${obj.table === showTable ? 'bg-violet-100 text-violet-700' : 'text-zinc-500 hover:bg-zinc-200'} rounded-full px-3 py-1.5 text-sm font-semibold cursor-pointer`}>
                                {obj.text}
                            </span>
                        ))
                    }
                </div>
                {
                    showTable === 'EventsTable' ?
                        <EventsTable /> :
                        <InformationalEventsTable />
                }
            </div>
        </>
    );
}

export default EventsCalendarTable;