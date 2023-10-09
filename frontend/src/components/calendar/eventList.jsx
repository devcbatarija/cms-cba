import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import dayjs from "dayjs";
import 'dayjs/locale/es';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { createRef, useEffect, useRef, useState } from 'react';
import '../dashboard/calendario/calendarStyles.css';
dayjs.extend(localizedFormat);
dayjs.locale('es');


export default function EventList({
  title,
  eventsByMonth
}) {


  return (
    <div className='overflow-auto h-screen relative'>
      <div className="px-4 sm:px-0 flex flex-row justify-center">
        <h1 className='uppercase leading-7 text-base font-light text-gray-900'>Eventos para {title}</h1>
      </div>
      <div className="mt-6 border-t border-gray-300">
        <div className="divide-y divide-gray-300">
          {eventsByMonth.length > 0 ? eventsByMonth.map((event) => (
            <Event key={event.Evento ? event.id_Evento : event.id} event={event} />
          )) : <div></div>}

        </div>

      </div>
    </div>
  )
}

function Event({ event }) {

  const formatDate = (event) => {
    let eventData = event.Evento || event;

    // Si allDay es true
    if (eventData.allDay) {
      // Si start y end son diferentes
      if (eventData.start !== eventData.end) {
        return <>{`${eventData.start}`}<ArrowRightAltRoundedIcon /> {` ${eventData.end}`}</>;
      }
      // Si start y end son iguales
      else {
        return ` ${eventData.start}`;
      }
    }
    // Si allDay es false
    else {
      // Si start y end son diferentes
      if (eventData.start !== eventData.end) {
        return <>{` ${eventData.start_Time} ${eventData.start}`}<ArrowRightAltRoundedIcon /> {` ${eventData.end_Time} ${eventData.end}`}</>;
      }
      // Si start y end son iguales
      else {
        return <>{` ${eventData.start_Time}`}<ArrowRightAltRoundedIcon /> {` ${eventData.end_Time} ${eventData.start}`}</>;
      }
    }
  }
  const generateDescription = (event) => {
    let eventData = event.Evento || event;

    // Si start y end son diferentes
    if (eventData.start !== eventData.end) {
      return `Este evento comienza el ${dayjs(eventData.start).format('D [de] MMMM [de] YYYY')} y termina el ${dayjs(eventData.end).format('D [de] MMMM [de] YYYY')}.`;
    }
    // Si start y end son iguales
    else {
      return `Este evento se llevará a cabo el ${dayjs(eventData.start).format('D [de] MMMM [de] YYYY')}.`;
    }
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };
  useEffect(() => {

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={divRef}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative transition-all duration-700 px-4 py-6 grid grid-cols-4 gap-4 sm:px-0  ${isExpanded ? 'h-auto bg-blue-100' : 'h-32 text-ellipsis overflow-hidden'}`}>
      <div className="grid justify-items-center">{event.Evento ? <img className='h-20 w-20' src={event.multimedia[0]} alt="" /> : <EventNoteRoundedIcon sx={{ width: '80px', height: '80px', color: '#002E5F' }} />}</div>
      <div className='mt-1 text-sm leading-6 text-gray-700 col-span-3 sm:mt-0'>
        <span className='flex items-center text-xs text-azulClaro font-medium'><AccessTimeIcon sx={{ width: '15px' }} /> {formatDate(event)}</span>
        <h1 className=" uppercase font-medium">{event.Evento ? event.Evento.title : event.title}</h1>
        <span>{event.Evento ? event.descripcion : generateDescription(event)}</span>
      </div>
    </div>
  );
}