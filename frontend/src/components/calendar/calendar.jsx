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
dayjs.extend(localizedFormat);
dayjs.locale('es');

const views = [
    { id: 1, view: 'dayGridMonth', txt: 'Mes' },
    { id: 2, view: 'timeGridWeek', txt: 'Semana' },
    { id: 3, view: 'multiMonthYear', txt: 'Año' }
]

const CalendarioClient = () => {
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

    const handleEventClick = (e) => {
        
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

    return (
        <>
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