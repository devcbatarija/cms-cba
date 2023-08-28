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
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    select={handleDateSelect}
                />
            </div>
        </div>
     );
}
const handleDateSelect=(select)=>{
    console.log(select)
    select.view.calendar.unselect()
}
 
export default Calendario;