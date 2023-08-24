import daygrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timegrid from "@fullcalendar/timegrid";

const Calendario = () => {
    return ( 
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
                />
            </div>
        </div>
     );
}
 
export default Calendario;