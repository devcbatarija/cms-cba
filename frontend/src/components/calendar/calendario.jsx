import daygrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timegrid from "@fullcalendar/timegrid";
import { useState } from "react";
import UseModal from "./modal";
import { Button } from '@mui/base/Button';
import { styled } from "@mui/system";
import { useSelector } from "react-redux";

const Calendario = () => {
    const events=useSelector((state)=>state.events.events);
    
    const userLogin=useSelector((state)=>state.login.user)
    const [open, setOpen]= useState(false);
    const handleOpen=()=>setOpen(true);
    const handleClose=()=>setOpen(false);
    const [data,setData]=useState({
        title:"",
        start:"",
        end:"",
        color:"",
        tipo:"",
        UsuarioIdUsuario:userLogin._userId
    })

    const handleDateSelect=(e)=>{
        const start=e.startStr;
        const end = e.endStr;
        setData({
            ...data,
            title:"",
            start:start,
            end:end,
            color:"",
            tipo:""
        })
        handleOpen()
    }

    const handleEventClick=(e)=>{
        console.log(e.event)
    }
    return (
        <>
            <TriggerButton onClick={handleOpen}>Open modal</TriggerButton>
        {
            <UseModal setData={setData} data={data} handleOpen={handleOpen} handleClose={handleClose} open={open}  ></UseModal>
        }
        <span>{data.title}</span>
        <div>
            <div className="calendar">
                <FullCalendar
                    headerToolbar={{
                        left:'dayGridMonth,timeGridWeek,timeGridDay',
                        center:'title',
                        right:'prev,today,next'
                    }}
                    plugins={[daygrid,interaction,timegrid]}
                    fixedWeekCount={false}
                    locales='es'
                    initialView="dayGridMonth"
                    // initialEvents={events}
                    events={events}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    // dateClick={handleDateSelect}
                />
            </div>
        </div>
        </>
     );
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
 
export default Calendario;