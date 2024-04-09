import daygrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timegrid from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useSelector } from "react-redux";
import multimonth from "@fullcalendar/multimonth";
import { Button } from "@mui/material";
import Dropdown from '../dashboard/calendario/dropdownButton';
import dayjs from "dayjs";
import 'dayjs/locale/es';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import axios from "axios";
import EventList from './eventList';
import CuadroInscripcion from "../inscripcion/incripcion";
import ModalQR from "./modalqr";
dayjs.extend(localizedFormat);
dayjs.locale('es');

const views = [
    { id: 1, view: 'dayGridMonth', txt: 'Mes' },
    { id: 2, view: 'timeGridWeek', txt: 'Semana' },
    { id: 3, view: 'multiMonthYear', txt: 'Año' }
]

const CalendarioClient = () => {
    const [event, setEvent] = useState({})
    const [openModalQR, setOpenModalQR] = useState(false)
    const toggleOpenModalQr = () => {
        setOpenModalQR(!openModalQR)
        if (!openModalQR) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }


    const calendarRef = useRef(null);
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
        const response = axios.post('datosevento/getEventsByDate', {
            date: calendarApi.currentData.currentDate,
            type: 'day'
        }).then(res => {
            setEventsByMonth(res.data.results.Eventos);
            setTitleTable({
                ...titleTable,
                title: dayjs(calendarApi.currentData.currentDate).format('MMMM'),
                type: 'day',
                day: calendarApi.currentData.currentDate
            });
        }).catch(error => {
        })
    };
    const [title, setTitle] = useState('');
    const [titleTable, setTitleTable] = useState({
        title: '',
        type: '',
        day: ''
    });

    const updateTitle = (e) => {
        const viewType = e.view.type;
        let day = '';
        setTitle(e.view.title);
        let currentMonth;
        if (viewType == 'dayGridMonth') {
            currentMonth = dayjs(e.view.currentStart).format('MMMM')
        }
        else if (viewType == 'multiMonthYear') {
            currentMonth = dayjs(e.view.currentStart).format('YYYY')
        } else {
            currentMonth = dayjs(e.view.currentStart).format('MMMM')
            day = e.view.currentStart
        }
        setTitleTable({
            ...titleTable,
            title: currentMonth,
            type: viewType,
            day: day
        });
        const response = axios.post('datosevento/getEventsByDate', {
            date: e.view.currentStart,
            endDate: e.view.currentEnd,
            type: viewType
        }).then(res => {
            setEventsByMonth(res.data.results.Eventos);
        }).catch(error => {
        })
    }

    const handleEventClick = async (e) => {
        const result = await axios.get(`event/getById/${e.event.id}`).then(res => {
            setEvent(res.data.results)
        }).catch(err => {
            console.log(err)
        })
        toggleOpenModalQr()
    };

    const handleDateClick = (e) => {
        const currentMonth = dayjs(e.date).format('MMMM')
        const response = axios.post('datosevento/getEventsByDate', {
            date: e.date,
            type: 'day'
        }).then(res => {
            setEventsByMonth(res.data.results.Eventos);
            setTitleTable({
                ...titleTable,
                title: currentMonth,
                type: 'day',
                day: e.date
            });
        }).catch(error => {
        })
    };

    const events = useSelector((state) => state.events.events);
    const [eventsByMonth, setEventsByMonth] = useState([])

    const EventContent = (e) => {
        // console.log(e.event)
        return (
            <>
                <div class="notification items-center ">
                    <div class="notiglow bg-red-100 h-[20px] w-[5px] rounded-full"></div>
                    <div class="notititle">{e.event.title}</div>
                    {/* <div class="notibody">Contribute to Open Source UI Elements</div> */}
                </div>

                {/* <div className="w-full bg-white flex flex-row text-cbaBlue items-center justify-center bg-zinc-100">
                    <div className="w-1/5 p-1 h-full">
                        <span>{e.event.allDay ? 'true' : 'false'}</span>
                    </div>
                    <span className="h-5 w-1 bg-red-500"></span>
                    <div className="w-4/5 p-1 overflow-hidden">
                        <h1 className=" font-semibold"></h1>
                    </div>
                </div> */}
            </>
        )
    }

    return (
        <>
            {
                openModalQR &&
                <ModalQR
                    toggleOpenModalQr={toggleOpenModalQr}
                    event={event}
                />
            }
            <div className={"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 min-h-full lg:gap-10 p-5 sm:p-10"}>
                <div className="calendar col-span-2">
                    <div className='items-center mb-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 relative text-lg sm:text-xl md:text-2xl lg:text-2xl '>
                        <div className='items-center order-last flex justify-center sm:flex-row md:flex-row lg:flex-row xl:flex-row sm:order-none sm:justify-start'>
                            <Button
                                sx={{ minWidth: 'fit-content', borderRadius: '50%' }}
                                onClick={prev}
                            ><NavigateBeforeRoundedIcon /></Button>

                            <h1 className='uppercase font-semibold text-cbaBlue' >{title}</h1>
                            <Button onClick={next}
                                sx={{ minWidth: 'fit-content', borderRadius: '50%' }}
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
                        dayMaxEvents={true}
                        weekends={true}
                        datesSet={updateTitle}
                        eventClick={handleEventClick}
                        dateClick={handleDateClick}
                    // eventContent={EventContent}
                    />
                </div>
                <div className="mt-5 lg:mt-0">
                    <EventList
                        title={titleTable}
                        eventsByMonth={eventsByMonth}
                    ></EventList>
                </div>
            </div>
            <CuadroInscripcion />
        </>
    );
}

export default CalendarioClient;