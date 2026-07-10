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
import ModalQR from "./modalQR";
import toast from "react-hot-toast";
import { ErrorAlert } from "../toastAlerts/errorAlerts";
import ModalEventDestils from "./modalEventDestails";
import './calendarClientStyles.css';
dayjs.extend(localizedFormat);
dayjs.locale('es');

const CBA_NAVY = "#002E5F";
const CBA_ROJO = "#D50032";

const views = [
    { id: 1, view: 'dayGridMonth', txt: 'Mes' },
    { id: 2, view: 'timeGridWeek', txt: 'Semana' },
    { id: 3, view: 'multiMonthYear', txt: 'Año' }
];

/* CSS del calendario — mismo que el dashboard */
const calendarCSS = `
  .cba-cal .fc-toolbar { display: none !important; }
  .cba-cal .fc-col-header-cell {
    background: #f3f4f6;
    border-color: #e5e7eb !important;
    padding: 10px 0;
  }
  .cba-cal .fc-col-header-cell-cushion {
    color: #6b7280 !important;
    font-size: .68rem !important;
    font-weight: 700 !important;
    letter-spacing: .1em;
    text-decoration: none !important;
    text-transform: uppercase;
  }
  .cba-cal .fc-daygrid-day-number {
    color: #111827;
    font-size: .82rem;
    font-weight: 600;
    padding: 6px 8px;
    text-decoration: none !important;
  }
  .cba-cal .fc-day-today {
    background: transparent !important;
    outline: 2.5px solid #002E5F !important;
    outline-offset: -2px;
  }
  .cba-cal .fc-day-today .fc-daygrid-day-number {
    color: #002E5F !important;
    font-weight: 700;
  }
  .cba-cal .fc-day-sat,
  .cba-cal .fc-day-sun { background: #fce8ec !important; }
  .cba-cal .fc-day-other {
    background: repeating-linear-gradient(
      -45deg, transparent, transparent 4px, #f3f4f6 4px, #f3f4f6 8px
    ) !important;
  }
  .cba-cal .fc-day-other .fc-daygrid-day-number { color: #9ca3af !important; }
  .cba-cal .fc-day-other.fc-day-sat,
  .cba-cal .fc-day-other.fc-day-sun {
    background: repeating-linear-gradient(
      -45deg, transparent, transparent 4px, #fce8ec 4px, #fce8ec 8px
    ) !important;
  }
  .cba-cal .fc-event {
    border-radius: 4px !important;
    border: none !important;
    font-size: .72rem;
    font-weight: 600;
    padding: 2px 6px;
    cursor: pointer;
  }
  .cba-cal .fc-daygrid-event-dot { display: none; }
  .cba-cal .fc-highlight { background: rgba(0,46,95,.08) !important; }
  .cba-cal .fc-scrollgrid { border-color: #e5e7eb !important; }
  .cba-cal td, .cba-cal th { border-color: #e5e7eb !important; }
  .cba-cal .fc-multimonth-title {
    color: #002E5F !important;
    font-weight: 700 !important;
    font-size: .85rem !important;
    text-transform: capitalize;
    padding: 8px 0 4px;
  }
  @media (max-width: 640px) {
    .cba-cal .fc-view { font-size: 10px !important; }
  }
`;

const CalendarioClient = () => {
    const [event, setEvent] = useState({})
    const [openModalQR, setOpenModalQR] = useState(false)
    const [openModalEventDetails, setOpenModalEventDetails] = useState(false)

    const toggleOpenModalQr = () => {
        setOpenModalQR(!openModalQR)
        if (!openModalQR) { document.body.style.overflow = 'hidden'; }
        else { document.body.style.overflow = 'auto'; }
    }
    const toggleOpenModalEventDetails = () => {
        setOpenModalEventDetails(!openModalEventDetails)
        if (!openModalEventDetails) { document.body.style.overflow = 'hidden'; }
        else { document.body.style.overflow = 'auto'; }
    }

    const calendarRef = useRef(null);

    /* ── Todos los handlers originales, sin tocar ── */
    const changeView = (view) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(view.view);
        setCurrentView(view.view);
    };
    const next = () => { calendarRef.current.getApi().next(); };
    const prev = () => { calendarRef.current.getApi().prev(); };
    const goToToday = () => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.today();
        axios.post('datosevento/getEventsByDate', {
            date: calendarApi.currentData.currentDate,
            type: 'day'
        }).then(res => {
            setEventsByMonth(res.data.results.Eventos);
            setTitleTable({ ...titleTable, title: dayjs(calendarApi.currentData.currentDate).format('MMMM'), type: 'day', day: calendarApi.currentData.currentDate });
        }).catch(() => {});
    };

    const [title, setTitle] = useState('');
    const [currentView, setCurrentView] = useState('dayGridMonth');
    const [titleTable, setTitleTable] = useState({ title: '', type: '', day: '' });

    const updateTitle = (e) => {
        const viewType = e.view.type;
        let day = '';
        setTitle(e.view.title);
        let currentMonth;
        if (viewType == 'dayGridMonth') { currentMonth = dayjs(e.view.currentStart).format('MMMM'); }
        else if (viewType == 'multiMonthYear') { currentMonth = dayjs(e.view.currentStart).format('YYYY'); }
        else { currentMonth = dayjs(e.view.currentStart).format('MMMM'); day = e.view.currentStart; }
        setTitleTable({ ...titleTable, title: currentMonth, type: viewType, day });
        axios.post('datosevento/getEventsByDate', {
            date: e.view.currentStart,
            endDate: e.view.currentEnd,
            type: viewType
        }).then(res => { setEventsByMonth(res.data.results.Eventos); }).catch(() => {});
    };

    const handleEventClick = async (e) => {
        const res = await handleChangeEvent(e.event.id)
        if (res.data) {
            if (res.isGeneral === 'General') { toggleOpenModalQr(); }
            else { toggleOpenModalEventDetails(); }
        }
    };

    const handleChangeEvent = async (id) => {
        try {
            const res = await axios.get(`event/getById/${id}`)
            setEvent(res.data.results)
            if (res.data.results.datosEvento) { return { data: true, isGeneral: 'General' }; }
            else { return { data: true }; }
        } catch (error) {
            toast.custom((t) => (<ErrorAlert t={t} w={'w-4/12'} message={'Hubo un error al mostrar el evento'} />));
            return { data: false };
        }
    };

    const handleDateClick = (e) => {
        axios.post('datosevento/getEventsByDate', { date: e.date, type: 'day' })
            .then(res => {
                setEventsByMonth(res.data.results.Eventos);
                setTitleTable({ ...titleTable, title: dayjs(e.date).format('MMMM'), type: 'day', day: e.date });
            }).catch(() => {});
    };

    const [events, setEvents] = useState([]);
    const [eventsByMonth, setEventsByMonth] = useState([]);

    useEffect(() => {
        axios.get(`event/getActiveEvents`).then(res => { setEvents(res.data.results); });
    }, []);

    return (
        <>
            <style>{calendarCSS}</style>

            {openModalQR && (
                <ModalQR
                    toggleOpenModalQr={toggleOpenModalQr}
                    event={event}
                    handleChangeEvent={handleChangeEvent}
                />
            )}
            {openModalEventDetails && (
                <ModalEventDestils
                    toggleOpenModalEventDetails={toggleOpenModalEventDetails}
                    event={event}
                    handleChangeEvent={handleChangeEvent}
                />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 min-h-full lg:gap-8 p-5 sm:p-8"
                style={{ background: "#f1f4f8" }}>

                {/* ── Tarjeta calendario ── */}
                <div className="col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden"
                    style={{ boxShadow: "0 2px 20px rgba(0,0,0,.07)" }}>

                    {/* Barra de navegación — mismo diseño que el dashboard */}
                    <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-4"
                        style={{ borderBottom: "1px solid #e5e7eb" }}>

                        {/* Botón Hoy */}
                        <button
                            onClick={goToToday}
                            style={{
                                background: "transparent", border: `1.5px solid ${CBA_NAVY}`,
                                color: CBA_NAVY, borderRadius: 8,
                                fontSize: ".82rem", fontWeight: 700,
                                padding: "5px 14px", cursor: "pointer",
                                transition: "all .2s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = CBA_NAVY; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = CBA_NAVY; }}
                        >
                            Hoy
                        </button>

                        {/* ‹ Título › */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prev}
                                style={{ background: "transparent", border: "none", fontSize: "1.4rem", color: "#374151", cursor: "pointer", padding: "0 4px", lineHeight: 1 }}
                            >
                                <NavigateBeforeRoundedIcon />
                            </button>
                            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", minWidth: 160, textAlign: "center", textTransform: "capitalize" }}>
                                {title}
                            </span>
                            <button
                                onClick={next}
                                style={{ background: "transparent", border: "none", fontSize: "1.4rem", color: "#374151", cursor: "pointer", padding: "0 4px", lineHeight: 1 }}
                            >
                                <NavigateNextRoundedIcon />
                            </button>
                        </div>

                        {/* Toggle vistas: Mes / Semana / Año */}
                        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden" }}>
                            {views.map((v, i) => (
                                <button
                                    key={v.id}
                                    onClick={() => changeView(v)}
                                    style={{
                                        padding: "6px 16px",
                                        fontSize: ".78rem",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        border: "none",
                                        background: currentView === v.view ? CBA_ROJO : CBA_NAVY,
                                        color: "#fff",
                                        transition: "background .2s",
                                        letterSpacing: ".03em",
                                        borderRight: i < views.length - 1 ? "1px solid rgba(255,255,255,.2)" : "none",
                                    }}
                                >
                                    {v.txt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FullCalendar — solo se agrega className="cba-cal" */}
                    <div className="p-4">
                        <FullCalendar
                            ref={calendarRef}
                            headerToolbar={false}
                            plugins={[daygrid, interaction, timegrid, multimonth]}
                            fixedWeekCount={false}
                            locale="es"
                            initialView="dayGridMonth"
                            events={events}
                            dayMaxEvents={true}
                            weekends={true}
                            datesSet={updateTitle}
                            eventClick={handleEventClick}
                            dateClick={handleDateClick}
                            className="cba-cal"
                            height="auto"
                        />
                    </div>
                </div>

                {/* ── Panel lateral de eventos ── */}
                <div className="mt-5 lg:mt-0 bg-white rounded-2xl overflow-hidden"
                    style={{ boxShadow: "0 2px 20px rgba(0,0,0,.07)" }}>
                    <EventList
                        title={titleTable}
                        eventsByMonth={eventsByMonth}
                    />
                </div>
            </div>

            <CuadroInscripcion />
        </>
    );
};

export default CalendarioClient;