import daygrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timegrid from "@fullcalendar/timegrid";
import { useRef, useState } from "react";
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
dayjs.extend(localizedFormat);
dayjs.locale('es');

const CalendarioClient = () => {
    const calendarRef = useRef(null);
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
    const [titleTable, setTitleTable] = useState('');

    const updateTitle = (e) => {
        setTitle(e.view.title);
        const currentMonth = dayjs(e.view.currentStart).format('MMMM')
        setTitleTable(currentMonth);
        const response = axios.get(`datosevento/getEventsByMonth/${e.view.currentStart}`).then(res => {
            setEventsByMonth(res.data.results.Eventos);
        }).catch(error => {
            console.log(error)
        })
    }

    const handleEventClick = (e) => {
        let calendarApi = calendarRef.current.getApi();
        console.log(calendarApi)
        console.log(e);
    };

    const handleDateClick =(e) => {
        console.log(e);
    };

    const events = useSelector((state) => state.events.events);
    const [eventsByMonth, setEventsByMonth] = useState([])

    return (
        <>
            <div className={"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 min-h-full lg:gap-10 p-5 sm:p-10"}>
                <div className="calendar col-span-2">
                    <div className='items-center mb-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 relative text-lg sm:text-xl md:text-2xl lg:text-2xl '>
                        <div className='order-last flex justify-center sm:flex-row md:flex-row lg:flex-row xl:flex-row sm:order-none sm:justify-start'>
                            <Button
                                sx={{ minWidth: 'fit-content', borderRadius: '50%' }}
                                onClick={prev}
                            ><NavigateBeforeRoundedIcon /></Button>
                            <Button onClick={next}
                                sx={{ minWidth: 'fit-content', borderRadius: '50%' }}
                            ><NavigateNextRoundedIcon /></Button>

                            <h1 className='uppercase font-semibold' >{title}</h1>
                        </div>
                        <div className='flex justify-end  text-base'>
                            <Button onClick={goToToday}>Hoy</Button>
                            <Dropdown
                                calendarRef={calendarRef}
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
        </>
    );
}

export default CalendarioClient;