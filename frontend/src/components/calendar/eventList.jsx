import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import dayjs from "dayjs";
import 'dayjs/locale/es';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { createRef, useEffect, useRef, useState } from 'react';
import '../dashboard/calendario/calendarStyles.css';
import calendarIcon from '../../assets/calendar.png'
import NoData from '../dashboard/calendario/widgets/noData';
dayjs.extend(localizedFormat);
dayjs.locale('es');
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import toast from 'react-hot-toast';
import { ErrorAlert } from '../toastAlerts/errorAlerts';
import ModalQR from './modalQR';
import axios from 'axios';

export default function EventList({
  title,
  eventsByMonth,
}) {
  const convertDate = (fech) => {
    const newFecha = new Date(fech);
    return newFecha.toLocaleString("es-ES", {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <>
      <div className={''}>
        <div className="px-4 sm:px-0 flex flex-col items-center justify-center">
          <h1 className='uppercase leading-7 text-base sm:text-lg font-mono text-cbaBlue font-bold'>Eventos para {title.title}</h1>
          {
            title.type == 'timeGridWeek' ?
              <div className={`items-center justify-center flex border-2 border-cbaBlue h-10 sm:h-12 rounded-lg ${title.type == 'timeGridWeek' ? 'sm:w-16 w-14' : 'w-10 sm:w-12'}`}>
                <span className={'text-base sm:text-lg  font-bold text-cbaBlue'}>{dayjs(title.day).format('DD')}{title.type == 'timeGridWeek' && `-${dayjs(title.day).add(6, 'days').format('DD')}`}</span>
              </div> : null
          }
          {
            title.type == 'day' &&
            <div className='w-full flex justify-between items-center font-bold text-zinc-600'>
              <span className='capitalize '>{dayjs(title.day).format('dddd')}</span>
              <span className='uppercase font-mono'>{convertDate(title.day)}</span>
            </div>
          }
        </div>
        <div className="mt-5 border-t border-gray-300 max-h-80vh overflow-auto md:max-h-screen lg:max-h-[440px] xl:max-h-[97vh]">
          <div className="divide-y divide-gray-300">
            {eventsByMonth.length > 0 ? eventsByMonth.map((event) => (
              <div key={event.Evento ? event.id_Evento : event.id} className='py-2'>
                <Event event={event} />
              </div>
            )) : <div className="w-full h-96 px-5 py-8">
              <NoData
                text={'Aun no hay eventos para este mes'}
                fontSize={'text-sm'}
              />
            </div>}
          </div>

        </div>
      </div>
    </>
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
      return `Este evento inicia el ${dayjs(eventData.start).format('D [de] MMMM [de] YYYY')} y termina el ${dayjs(eventData.end).format('D [de] MMMM [de] YYYY')}.`;
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
  const arrowHandleClick = (event) => {
    event.stopPropagation(); // Detiene la propagación del evento de clic
    setIsExpanded(!isExpanded);
  }

  const [Evento, setEvent] = useState({})
  const [openModalQR, setOpenModalQR] = useState(false)
  const toggleOpenModalQr = () => {
    setOpenModalQR(!openModalQR)
    if (!openModalQR) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  const handleEventClick = async (id) => {
    const res = await handleChangeEvent(id)
    if (res.data) {
      if (res.isGeneral === 'General') {
        toggleOpenModalQr()
      }
    }
  };

  const handleChangeEvent = async (id) => {
    try {
      const res = await axios.get(`event/getById/${id}`)
      setEvent(res.data.results)
      if (res.data.results.datosEvento) {
        return { data: true, isGeneral: 'General' }
      }
      else {
        return { data: true }
      }
    } catch (error) {
      toast.custom((t) => (
        <ErrorAlert t={t} w={'w-4/12'} message={'Hubo un error al mostrar el evento'} />
      ))
      return { data: false }
    }
  }
  return (
    <>
      {
        openModalQR &&
        <ModalQR
          toggleOpenModalQr={toggleOpenModalQr}
          event={Evento}
          handleChangeEvent={handleChangeEvent}
        />
      }
      <div
        ref={divRef}
        onClick={() => setIsExpanded(true)}
        className={`cursor-pointer relative transition-all duration-500 px-4 py-6 grid grid-cols-4 gap-4 sm:px-2 rounded-lg ${isExpanded ? 'h-auto bg-blue-50' : 'h-32 text-ellipsis overflow-hidden hover:bg-zinc-100'}`}>
        <div className="grid justify-items-center">{event.Evento ? <img className='h-20 w-20 rounded-lg' src={event.multimedia[0]} alt="" /> : <img className='rounded-lg h-20 w-20' src={calendarIcon} />}</div>
        <div className='mt-1 text-sm leading-6 text-zinc-600 col-span-3 sm:mt-0 flex flex-col'>
          <span className='flex items-center text-xs text-azulClaro font-medium'><AccessTimeIcon sx={{ width: '15px' }} /> {formatDate(event)}</span>
          <div className={`flex justify-between items-center`}>
            <h1 className="uppercase font-medium text-cbaBlue grow">{event.Evento ? event.Evento.title : event.title}</h1>
            <button className={`ml-2 rounded-lg hover:bg-zinc-200 w-6 h-6 flex justify-center items-center`}
              type={'button'}
              onClick={(event) => arrowHandleClick(event)}
            >
              {
                isExpanded ?
                  <ArrowDropUpRoundedIcon sx={{ fontSize: 30 }} /> :
                  <ArrowRightRoundedIcon sx={{ fontSize: 30 }} />
              }
            </button>
          </div>
          <span className={`text-zinc-500 `}>{event.Evento ? event.descripcion : generateDescription(event)}</span>
          {
            event.Evento && isExpanded &&
            <div className={``}>
              <button onClick={() => handleEventClick(event.Evento ? event.Evento.id : event.id)} className={`bg-cbaBlue text-white h-8 px-8 rounded-md mt-2`}>
                Ver mas
              </button>
            </div>
          }
        </div>
      </div>
    </>
  );
}