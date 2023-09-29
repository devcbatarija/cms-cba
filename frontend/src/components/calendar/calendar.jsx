import Typography from '@mui/material/Typography';
import daygrid from "@fullcalendar/daygrid";
import interaction, { Draggable } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timegrid from "@fullcalendar/timegrid";
import { useRef, useState } from "react";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
// import { Button } from '@mui/base/Button';
import { styled } from "@mui/system";
import {  useSelector } from "react-redux";
import multimonth from "@fullcalendar/multimonth";
import { Button } from "@mui/material";

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
    const changeView = (view) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(view);
    };
    const [title, setTitle] = useState('');

    const updateTitle = (e) => {
        //   let calendarApi = calendarRef.current.getApi();
        setTitle(e.view.title);
    }

    const handleEventClick= (e) => {
        let calendarApi = calendarRef.current.getApi();
        console.log(calendarApi)
        console.log(e);
    };


    const events = useSelector((state) => state.events.events);
    
    return (
        <>
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 min-h-full gap-4"}>
                <div className="calendar col-span-2">
                    {/* seo declarar para consultas slang */}
                    <div className='flex flex-row relative text-lg sm:text-xl md:text-2xl lg:text-2xl  '>
                        <Button 
                        sx={{width: '5px',margin:0, height: 'fit-content', backgroundColor: 'red', padding: 0}}
                        onClick={prev}
                        ><NavigateBeforeRoundedIcon /></Button>
                        <h1 >{title}</h1>
                        <Button onClick={next}><NavigateNextRoundedIcon /></Button>
                        <div className='absolute right-0'>
                            <Button onClick={goToToday}>Today</Button>
                            <select onChange={(e) => changeView(e.target.value)}>
                                <option value="dayGridMonth">Month</option>
                                <option value="timeGridWeek">Week</option>
                                <option value="multiMonthYear">Year</option>
                            </select>
                        </div>
                    </div>
                    <FullCalendar
                        ref={calendarRef}
                        headerToolbar={false}
                        // headerToolbar={{
                        //     left: 'title,prev,next',
                        //     // center: 'dayGridMonth,timeGridWeek,timeGridDay',
                        //     right: 'today,dayGridMonth,timeGridWeek,multiMonthYear' //'prev,today,next'
                        // }}
                        plugins={[daygrid, interaction, timegrid, multimonth]}
                        fixedWeekCount={false}
                        locales='es'
                        initialView="dayGridMonth"
                        // initialEvents={events}
                        events={events}
                        dayMaxEvents={true}
                        weekends={true}
                        datesSet={updateTitle}
                        eventClick={handleEventClick}
                    />
                </div>
                <div className=" mt-5 ">
                    <button onClick={handleEventClick}>select</button>
                </div>
            </div>
        </>
    );
}

export default CalendarioClient;