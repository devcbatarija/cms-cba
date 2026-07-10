import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEvents, getEventsPredefinidos } from "../../../redux-toolkit/actions/eventActions";
import ModalAddEvent from "./modalAddEvent";
import ModalUpdateEvent from "./modalUpdateEvent";

/* ─────────── CSS OVERRIDE ─────────── */
const calendarCSS = `
  .cba-cal .fc-toolbar { display: none !important; }

  /* ── Cabecera días (gris suave) ── */
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

  /* ── Números de día ── */
  .cba-cal .fc-daygrid-day-number {
    color: #111827;
    font-size: .82rem;
    font-weight: 600;
    padding: 6px 8px;
    text-decoration: none !important;
  }

  /* ── Hoy: borde navy, fondo limpio ── */
  .cba-cal .fc-day-today {
    background: transparent !important;
    outline: 2.5px solid #002E5F !important;
    outline-offset: -2px;
  }
  .cba-cal .fc-day-today .fc-daygrid-day-number {
    color: #002E5F !important;
    font-weight: 700;
  }

  /* ── Fin de semana: rojo bajito ── */
  .cba-cal .fc-day-sat,
  .cba-cal .fc-day-sun {
    background: #fce8ec !important;
  }

  /* ── Días fuera del mes ── */
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

  /* ── Eventos ── */
  .cba-cal .fc-event {
    border-radius: 4px !important;
    border: none !important;
    font-size: .72rem;
    font-weight: 600;
    padding: 2px 6px;
    cursor: pointer;
  }
  .cba-cal .fc-daygrid-event-dot { display: none; }

  /* ── Highlight ── */
  .cba-cal .fc-highlight { background: rgba(0,46,95,.08) !important; }

  /* ── Bordes grilla ── */
  .cba-cal .fc-scrollgrid { border-color: #e5e7eb !important; }
  .cba-cal td, .cba-cal th { border-color: #e5e7eb !important; }

  /* ── Vista año multimonth ── */
  .cba-cal .fc-multimonth-title {
    color: #002E5F !important;
    font-weight: 700 !important;
    font-size: .85rem !important;
    text-transform: capitalize;
    padding: 8px 0 4px;
  }
  .cba-cal .fc-multimonth-daygrid-table .fc-day-today {
    outline: 2px solid #002E5F !important;
  }

  @media (max-width: 640px) {
    .cba-cal .fc-view { font-size: 10px !important; }
  }
`;

const arrowBtn = {
  background: "transparent", border: "none",
  fontSize: "1.3rem", lineHeight: 1,
  color: "#374151", cursor: "pointer", padding: "0 6px",
};

export default function CalendarioView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calRef   = useRef(null);

  const events           = useSelector((s) => s.events.events)             ?? [];
  const eventsPredefined = useSelector((s) => s.events.eventsPredefinidos) ?? [];

  const [view,       setView]       = useState("dayGridMonth");
  const [modalAdd,   setModalAdd]   = useState(false);
  const [modalUpd,   setModalUpd]   = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [tipoModal,  setTipoModal]  = useState("Evento");
  const [calTitle,   setCalTitle]   = useState("");
  const [newEvData,  setNewEvData]  = useState({
    id: "", title: "", start: "", end: "",
    color: "#002E5F", tipo: "General",
    start_Time: "", end_Time: "",
    state: true, allDay: true,
  });

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getEventsPredefinidos());
  }, []);

  // Mes / Semana / Año
  const views = [
    { key: "dayGridMonth",   label: "Mes"    },
    { key: "timeGridWeek",   label: "Semana" },
    { key: "multiMonthYear", label: "Año"    },
  ];

  const handleDateClick  = (info) => {
    navigate("/dashboard/Calendario/addEvent", {
      state: { prevPath: "/dashboard/Calendario/", data: { ...newEvData, start: info.dateStr, end: info.dateStr } },
    });
  };
  const handleEventClick = (info) => {
    setSelectedId(info.event.id);
    setTipoModal("Evento");
    setModalUpd(true);
  };

  const updateTitle = () => setCalTitle(calRef.current?.getApi().view.title ?? "");
  const goToday     = () => { calRef.current?.getApi().today(); setTimeout(updateTitle, 50); };
  const goPrev      = () => { calRef.current?.getApi().prev();  setTimeout(updateTitle, 50); };
  const goNext      = () => { calRef.current?.getApi().next();  setTimeout(updateTitle, 50); };
  const changeView  = (v) => { setView(v); calRef.current?.getApi().changeView(v); setTimeout(updateTitle, 50); };

  const openCreate = (tipo) => {
    setTipoModal(tipo);
    setNewEvData({ id: "", title: "", start: "", end: "", color: "#002E5F",
      tipo: tipo === "Evento" ? "General" : "Administrativo",
      start_Time: "", end_Time: "", state: true, allDay: true });
    setModalAdd(true);
  };

  // estilos botones toggle
  const toggleBtn = (isActive) => ({
    padding: "6px 18px",
    fontSize: ".78rem",
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    background: isActive ? "#D50032" : "#002E5F",
    color: "#fff",
    transition: "background .2s",
    letterSpacing: ".03em",
  });

  return (
    <>
      <style>{calendarCSS}</style>

      <div style={{ background: "#f1f4f8", minHeight: "100vh", padding: "28px 32px" }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", marginBottom: 20 }}>
          Calendario
        </h1>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

          {/* ── Tarjeta calendario ── */}
          <div style={{
            flex: 1,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 20px rgba(0,0,0,.07)",
            padding: "20px 24px 24px",
          }}>
            {/* Barra navegación */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16, flexWrap: "wrap", gap: 10,
            }}>
              {/* Hoy */}
              <button onClick={goToday} style={{
                background: "transparent", border: "none",
                fontSize: ".85rem", fontWeight: 600,
                color: "#374151", cursor: "pointer", padding: "4px 0",
              }}>
                Hoy
              </button>

              {/* ‹ Título › */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={goPrev} style={arrowBtn}>‹</button>
                <span style={{
                  fontSize: "1.15rem", fontWeight: 700, color: "#111827",
                  minWidth: 160, textAlign: "center", textTransform: "capitalize",
                }}>
                  {calTitle}
                </span>
                <button onClick={goNext} style={arrowBtn}>›</button>
              </div>

              {/* Toggle Mes / Semana / Año — navy con activo rojo */}
              <div style={{ display: "flex", borderRadius: 8, overflow: "hidden" }}>
                {views.map((v, i) => (
                  <button
                    key={v.key}
                    onClick={() => changeView(v.key)}
                    style={{
                      ...toggleBtn(view === v.key),
                      borderRight: i < views.length - 1 ? "1px solid rgba(255,255,255,.25)" : "none",
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FullCalendar */}
            <FullCalendar
              ref={calRef}
              plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin]}
              initialView={view}
              locale={esLocale}
              headerToolbar={false}
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              height="auto"
              className="cba-cal"
              dayMaxEvents={3}
              datesSet={updateTitle}
            />
          </div>

          {/* ── Sidebar ── */}
          <div style={{
            width: 240,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 20px rgba(0,0,0,.07)",
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            flexShrink: 0,
          }}>
            <p style={{
              fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em",
              textTransform: "uppercase", color: "#6b7280", margin: 0,
            }}>
              Eventos Predefinidos
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 60 }}>
              {eventsPredefined.length === 0 ? (
                <p style={{ fontSize: ".78rem", color: "#9ca3af", margin: 0 }}>No hay datos</p>
              ) : (
                eventsPredefined.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => { setSelectedId(ev.id); setTipoModal("EventoPredifinido"); setModalUpd(true); }}
                    style={{
                      padding: "8px 10px", borderRadius: 8,
                      background: "#f3f4f6",
                      borderLeft: `3px solid ${ev.color ?? "#002E5F"}`,
                      cursor: "pointer",
                    }}
                  >
                    <p style={{ fontSize: ".78rem", fontWeight: 700, color: "#111827", margin: 0 }}>{ev.title}</p>
                    {ev.start && (
                      <p style={{ fontSize: ".7rem", color: "#6b7280", margin: "2px 0 0" }}>
                        {new Date(ev.start).toLocaleDateString("es-BO", { day: "numeric", month: "short" })}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            <div style={{ height: 1, background: "#e5e7eb" }} />

            {/* ── Botones crear ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>

              {/* Evento Predefinido — navy, hover rojo */}
              <button
                onClick={() => openCreate("EventoPredefinido")}
                style={{
                  width: "100%", padding: "9px 0",
                  background: "#002E5F", color: "#fff",
                  border: "none", borderRadius: 8,
                  fontWeight: 700, fontSize: ".78rem",
                  cursor: "pointer", letterSpacing: ".04em",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#D50032")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#002E5F")}
              >
                + Evento Predefinido
              </button>

              {/* Evento — navy, hover rojo */}
              <button
                onClick={() => openCreate("Evento")}
                style={{
                  width: "100%", padding: "9px 0",
                  background: "#002E5F", color: "#fff",
                  border: "none", borderRadius: 8,
                  fontWeight: 700, fontSize: ".78rem",
                  cursor: "pointer", letterSpacing: ".04em",
                  boxShadow: "0 2px 8px rgba(0,46,95,.25)",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#D50032")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#002E5F")}
              >
                + Evento
              </button>

            </div>
          </div>
        </div>
      </div>

      {modalAdd && (
        <ModalAddEvent
          data={newEvData} setData={setNewEvData}
          open={modalAdd} handleClose={() => setModalAdd(false)}
          tipoModal={tipoModal}
        />
      )}
      {modalUpd && (
        <ModalUpdateEvent
          id={selectedId} open={modalUpd}
          handleClose={() => setModalUpd(false)}
          tipoModal={tipoModal}
        />
      )}
    </>
  );
}