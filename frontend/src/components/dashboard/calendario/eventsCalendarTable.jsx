import axios from "axios";
import dayjs from "dayjs";
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SuccessAlert } from "../../toastAlerts/success";
import { ErrorAlert } from "../../toastAlerts/errorAlerts";
import NoData from "./widgets/noData";
import { useNavigate } from "react-router-dom";
import Pagination from "../widgets/pagination";

const EventsCalendarTable = () => {
    const navigate = useNavigate()
    const [Events, setEvents] = useState(null)
    const [selectedEvents, setSelectedEvents] = useState([])
    // variables para paginacion
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0)
    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleDeleteEventById = (idEvent) => {
        axios.delete(`event/deleteEventoById/${idEvent}`).then(res => {
            console.log(res)
            setTimeout(() => {
                getAllEvents()
                toast.custom((t) => (
                    <SuccessAlert t={t} w={"w-4/12"} message={res.data.data.successMessage} />
                ));
            }, 1000);
        }).catch(err => {
            toast.custom((t) => (
                <ErrorAlert t={t} w={"w-4/12"} message='No se pudo borrar el evento' />
            ));
        })
    }
    const handleSelectAllEvent = () => {
        if (selectedEvents.length == Events.datosEvento.length) {
            setSelectedEvents([])
        }
        else {
            let allEvents = []
            Events.datosEvento.map(event => {
                allEvents.push(event.Evento.id)
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
    const getAllEvents = async () => {
        await axios.get('datosevento').then(res => {
            setEvents(res.data.results)
            setTotalPages(Math.ceil(res.data.results.datosEvento.length / itemsPerPage))
            console.log(res.data.results)
        })
    }
    const handleEditEvent = async (id) => {
        await axios.get(`event/getById/${id}`).then(response => {
            const res = response.data.results
            if (res.General) {
                navigate('/dashboard/Calendario/updateEvent', { state: { prevPath: '/dashboard/Calendario/', data: res } })
            }
            else {

            }
        })
    }
    useEffect(() => {
        getAllEvents()
    }, [])
    return (
        <>
            <div className="bg-zinc-100 min-h-screen md:px-5 lg:px-2 xl:px-20 py-5">
                <div className="flex justify-between text-white mb-5">
                    <div className="rounded-full h-10 w-6/12 bg-white text-zinc-500 flex flex-row justify-center items-center border-[1px]">
                        <div className="px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input className="w-full h-full border-none rounded-r-full text-xs focus:text-sm" type="text" name="" id="" placeholder="Buscar evento" />
                    </div>
                    <div className="flex flex-row justify-center items-center gap-x-3">
                        <button disabled={selectedEvents.length == 0 ? true : false} className="font-semibold bg-cbaRed px-4 h-10 rounded-full text-sm flex flex-row justify-center items-center gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <span>Borrar {selectedEvents.length}</span>
                        </button>
                        <button onClick={() => navigate('/dashboard/Calendario/addEvent')} className="font-semibold bg-cbaBlue px-4 h-10 rounded-full text-sm flex flex-row justify-center items-center gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                            <span>Agregar Evento</span>
                        </button>
                    </div>
                </div>
                {
                    Events != null ?
                        <>
                            <div className="w-full text-sm flex flex-row text-zinc-500 font-bold py-2 h-16 mb-2 rounded-tl-2xl rounded-tr-2xl bg-[#F8FAFC] shadow shadow-teal-50">
                                <div className="group/Check w-[5%] flex justify-center items-center h-full p-2">
                                    <label htmlFor='DeleteAll' className=" flex items-center justify-center border-2 w-5 h-5 rounded-md border-zinc-300 has-[:checked]:bg-blue-200 has-[:checked]:border-blue-300">
                                        <input type="checkbox" name="" id='DeleteAll' className="hidden " onChange={handleSelectAllEvent} checked={selectedEvents.length == Events?.datosEvento.length ? true : false} />
                                        <span className="text-white hidden group-has-[:checked]/Check:block">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>

                                        </span>
                                    </label>
                                </div>
                                <div className="w-[5%] flex justify-center items-center h-full p-2">

                                </div>
                                <div className="w-[15%] h-full p-2 flex items-center">
                                    <span>Titulo</span>
                                </div>
                                <div className="w-[22%] h-full  p-2 flex items-center">
                                    <span>Descripcion y fecha de inicio</span>
                                </div>
                                <div className="w-[10%] flex flex-row justify-center items-center gap-x-[3px] p-2 h-full">
                                    <span>Horario</span>
                                </div>
                                <div className="w-[8%] h-full p-2 flex items-center justify-center">
                                    <span>Estado</span>
                                </div>
                                <div className="w-[10%] p-2 flex flex-col justify-center gap-y-[3px] items-center h-full">
                                    <span>Categoria</span>
                                    {/* <span className="text-xs text-zinc-400">Categoria</span> */}
                                </div>
                                <div className="w-[13%] flex items-center justify-center p-2 h-full">
                                    <span>Reportes</span>
                                </div>
                                <div className="w-[12%] h-full p-2 flex items-center justify-center gap-x-3 ">

                                </div>
                            </div>
                            <div className=" flex flex-col gap-y-2">
                                {
                                    Events?.datosEvento.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((event, index) => (
                                        <div
                                            key={index}
                                            className="w-full flex flex-row h-16 bg-white rounded-lg shadow- text-zinc-500 font-semibold text-xs transition ease-in-out delay-150 duration-500 hover:scale-[1.0070] hover:shadow-lg"
                                        >
                                            <div className="w-[5%] flex justify-center items-center h-full p-2 group/Check">
                                                <label htmlFor={event.Evento.id} className=" flex items-center justify-center border-2 w-5 h-5 rounded-md border-zinc-300 has-[:checked]:bg-blue-200 has-[:checked]:border-blue-300">
                                                    <input type="checkbox" name="" id={event.Evento.id} className="hidden "
                                                        checked={selectedEvents.includes(event.Evento.id) ? true : false}
                                                        onChange={() => handleSelectEvent(event.Evento.id)}
                                                    />
                                                    <span className="text-white hidden group-has-[:checked]/Check:block">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="w-[5%] flex justify-center items-center h-full p-2">
                                                <img className="h-full w-10 rounded-md" src={event.multimedia[0]} alt="" />
                                            </div>
                                            <div className="w-[15%] h-full p-2 flex items-center">
                                                <span className="text-xs">{event.Evento.title}</span>
                                            </div>
                                            <div className="w-[22%] h-full  p-2 flex flex-col justify-center">
                                                <span className="text-xs truncate">{event.descripcion}</span>
                                                <span className="text-xs text-zinc-400 mt-[3px] capitalize">
                                                    {dayjs(event.Evento.start).format(`dddd, D`)}
                                                    <span className="lowercase"> de </span>
                                                    {dayjs(event.Evento.start).format(`MMMM YYYY`)}</span>
                                            </div>
                                            <div className="w-[10%] flex flex-row justify-center items-center gap-x-[3px] p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                {
                                                    event.Evento.allDay ?
                                                        <span>Todo el dia</span>
                                                        :
                                                        <>
                                                            <span>{event.Evento.start_Time}</span> -
                                                            <span>{event.Evento.end_Time}</span>
                                                        </>
                                                }
                                            </div>
                                            <div className="w-[8%] h-full p-2 flex items-center justify-center">
                                                <span
                                                    className={`px-2 py-[4px] rounded-full border-[1.5px] text-[10px] ${event.Evento.state ? 'border-green-300 text-green-400 bg-green-100' : 'border-red-300 text-red-400 bg-red-100'}`}
                                                >{event.Evento.state ? 'Visible' : 'Oculto'}</span>
                                            </div>
                                            <div className="w-[10%] p-2 flex flex-col justify-center gap-y-[3px] items-center">
                                                <span>{event.categoria}</span>
                                            </div>
                                            <div className="w-[13%] flex items-center justify-center">
                                                {
                                                    event.referible ?
                                                        <button
                                                            onClick={() => navigate(`/dashboard/Calendario/Reports/${event.Evento.id}`)}
                                                            className="active:bg-cbaBlue/60 border-2 py-1.5 px-2 rounded-lg flex flex-row items-center justify-center transition duration-700 ease-in-out hover:bg-cbaBlue hover:text-white hover:border-0 ">
                                                            <InsightsRoundedIcon />
                                                            <span className="mx-2">Reportes</span>
                                                            <span className="relative flex h-3 w-3">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-3 w-3 text-green-400">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                        </button>
                                                        :
                                                        <div className="text-amber-300 flex gap-x-1 items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                            </svg>

                                                            <span>No tiene consigna</span>
                                                        </div>
                                                }
                                            </div>
                                            <div className="w-[12%] h-full p-[1px] flex items-center justify-center gap-x-1.5 text-zinc-400 ">
                                                <button
                                                    onClick={() => handleEditEvent(event.Evento.id)}
                                                    className="text-cbaBlue/60 hover:text-cbaBlue transition ease-in-out delay-150 duration-300 p-2 rounded-full hover:bg-zinc-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                                    </svg>
                                                </button>
                                                <div className="h-6 w-[1px] bg-zinc-300"></div>
                                                <button
                                                    onClick={() => handleDeleteEventById(event.Evento.id)}
                                                    className="text-cbaRed/40 hover:text-cbaRed/70 transition ease-in-out delay-150 duration-300 p-2 rounded-full hover:bg-zinc-200">
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
                                Events.datosEvento.length > itemsPerPage &&
                                <div>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={onPageChange}
                                        topRank={10}
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
            </div>
        </>
    );
}

export default EventsCalendarTable;