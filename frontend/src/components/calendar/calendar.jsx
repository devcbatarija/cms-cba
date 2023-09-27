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
            <div className={"flex flex-row"}>
                <div className="calendar w-8/12 bg-zinc-100">
                    {/* seo declarar para consultas slang */}
                    <div className='flex flex-row mt-4 mb-3 relative'>
                        <Button onClick={prev}><NavigateBeforeRoundedIcon /></Button>
                        <Typography sx={{ fontSize: '25px' }}>{title}</Typography>
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
                <div className="w-4/12 mt-5 bg-zinc-100 calendar">
                    <button onClick={handleEventClick}>select</button>
                </div>
            </div>
        </>
    );
}

const styles = {
    backgroundColor: "rgb(166, 167, 170)",
    borderRadius: "10px",
    padding: "15px",
    height: "80vh"
}

const blue = {
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};
const TriggerButton = styled(Button)(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    border-radius: 12px;
    padding: 6px 12px;
    line-height: 1.5;
    background: transparent;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:focus-visible {
      border-color: ${blue[400]};
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
    `
);

export default CalendarioClient;