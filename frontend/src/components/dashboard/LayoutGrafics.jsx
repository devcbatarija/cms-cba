import React, { useState, useEffect } from "react";
import VisitasChart from "./VisitasChart";
import axios from "axios";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";

// quita las etiquetas HTML que guardan los editores de texto enriquecido (Quill, TinyMCE, etc.)
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

const STAT_CARDS = [
  {
    key: "usuarios",
    label: "Usuarios registrados",
    icon: PeopleAltRoundedIcon,
    iconBg: "#002E5F1A",
    iconColor: "#002E5F",
    accent: "#002E5F",
  },
  {
    key: "programas",
    label: "Programas activos",
    icon: SchoolRoundedIcon,
    iconBg: "#D500321A",
    iconColor: "#D50032",
    accent: "#D50032",
  },
  {
    key: "interacciones",
    label: "Visitas hoy",
    icon: TouchAppRoundedIcon,
    iconBg: "#002E5F1A",
    iconColor: "#002E5F",
    accent: "#002E5F",
  },
];

function StatCard({ config, value, loading }) {
  const Icon = config.icon;
  return (
    <div
      className="bg-white rounded-2xl border border-[#DEDEDE] shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: config.iconBg }}
      >
        <Icon sx={{ fontSize: 24, color: config.iconColor }} />
      </div>
      <div className="min-w-0">
        {loading ? (
          <div className="h-7 w-16 bg-[#DEDEDE] rounded animate-pulse mb-1" />
        ) : (
          <p className="text-2xl font-bold leading-none" style={{ color: config.accent }}>
            {value ?? "—"}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1 truncate font-medium">{config.label}</p>
      </div>
    </div>
  );
}

// Card especial: próximo evento (no es un número, es información accionable)
function NextEventCard({ event, loading }) {
  const formatRelative = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);
    const diffDays = Math.round((eventDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    if (diffDays > 1) return `En ${diffDays} días`;
    return eventDate.toLocaleDateString("es-BO", { day: "numeric", month: "long" });
  };

  return (
    <div
      className="bg-white rounded-2xl border border-[#DEDEDE] shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "#D500321A" }}
      >
        <EventRoundedIcon sx={{ fontSize: 24, color: "#D50032" }} />
      </div>
      <div className="min-w-0 flex-1">
        {loading ? (
          <div className="h-5 w-32 bg-[#DEDEDE] rounded animate-pulse mb-1" />
        ) : event ? (
          <>
            <p className="text-sm font-bold text-[#002E5F] truncate">{event.title}</p>
            <p className="text-xs text-[#D50032] font-semibold mt-0.5">
              {formatRelative(event.start)}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-400 italic">Sin próximos eventos</p>
        )}
        <p className="text-xs text-gray-400 mt-0.5 truncate">Próximo evento</p>
      </div>
    </div>
  );
}

export const LayoutGrafics = () => {
  const [stats, setStats] = useState({
    usuarios: null,
    programas: null,
    interacciones: null,
  });
  const [nextEvent, setNextEvent] = useState(null);
  const [ultimasPublicaciones, setUltimasPublicaciones] = useState([]);
  const [visitasPorDia, setVisitasPorDia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          usersRes,
          interaccionesRes,
          programasRes,
          eventosRes,
          publicacionesRes,
          visitasDiaRes,
        ] = await Promise.allSettled([
          axios.get("/users"),
          axios.get("/analytics/interacciones"),
          axios.get("program"),
          axios.get("event/getActiveEvents"),
          axios.get("publication"),
          axios.get("analytics/visitas-dia?dias=14"),
        ]);

        if (usersRes.status === "fulfilled") {
          const total = usersRes.value?.data?.total ?? usersRes.value?.data?.data?.length ?? null;
          setStats((s) => ({ ...s, usuarios: total }));
        }

        if (interaccionesRes.status === "fulfilled") {
          const visitas = interaccionesRes.value?.data?.visitasHoy ?? null;
          setStats((s) => ({ ...s, interacciones: visitas }));
        }

        // Programas activos: contamos el total de programas publicados
        if (programasRes.status === "fulfilled") {
          const programas = programasRes.value?.data?.results ?? programasRes.value?.data ?? [];
          setStats((s) => ({ ...s, programas: Array.isArray(programas) ? programas.length : null }));
        }

        // Próximo evento: filtramos los que están activos y son a futuro, tomamos el más cercano
        if (eventosRes.status === "fulfilled") {
          const eventos = eventosRes.value?.data?.results ?? eventosRes.value?.data ?? [];
          if (Array.isArray(eventos)) {
            const now = new Date();
            const futuros = eventos
              .filter((e) => new Date(e.start) >= now)
              .sort((a, b) => new Date(a.start) - new Date(b.start));
            setNextEvent(futuros[0] || null);
          }
        }

        // Últimas publicaciones: tomamos las 3 más recientes
        if (publicacionesRes.status === "fulfilled") {
          const publicaciones = publicacionesRes.value?.data?.results ?? publicacionesRes.value?.data ?? [];
          if (Array.isArray(publicaciones)) {
            const ordenadas = [...publicaciones].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setUltimasPublicaciones(ordenadas.slice(0, 3));
          }
        }

        // Visitas por día: para el gráfico de tendencia
        if (visitasDiaRes.status === "fulfilled" && visitasDiaRes.value?.data?.data) {
          setVisitasPorDia(visitasDiaRes.value.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const today = new Date().toLocaleDateString("es-BO", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="p-6 space-y-6 bg-[#F5F6FA] min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-[#002E5F] tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-400 capitalize mt-0.5">{today}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border"
          style={{ background: "#002E5F0D", color: "#002E5F", borderColor: "#002E5F30" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#002E5F] animate-pulse" />
          Sistema activo
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard config={STAT_CARDS[0]} value={stats.usuarios} loading={loading} />
        <StatCard config={STAT_CARDS[1]} value={stats.programas} loading={loading} />
        <NextEventCard event={nextEvent} loading={loading} />
        <StatCard config={STAT_CARDS[2]} value={stats.interacciones} loading={loading} />
      </div>

      {/* Gráfico de visitas + últimas publicaciones */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-[#DEDEDE] shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-base font-semibold text-[#002E5F]">
                Visitas al sitio web
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Últimos 14 días</p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-2 text-gray-300">
              <div className="w-8 h-8 border-2 border-[#DEDEDE] border-t-[#D50032] rounded-full animate-spin" />
              <span className="text-sm text-gray-400">Cargando datos...</span>
            </div>
          ) : (
            <VisitasChart data={visitasPorDia} />
          )}
        </div>

        {/* Últimas publicaciones */}
        <div className="bg-white rounded-2xl border border-[#DEDEDE] shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <ArticleRoundedIcon sx={{ fontSize: 20, color: "#002E5F" }} />
            <h2 className="text-base font-semibold text-[#002E5F]">Últimas publicaciones</h2>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-[#F5F6FA] rounded-lg animate-pulse" />
              ))}
            </div>
          ) : ultimasPublicaciones.length === 0 ? (
            <p className="text-sm text-gray-400 italic">Aún no hay publicaciones.</p>
          ) : (
            <div className="space-y-3">
              {ultimasPublicaciones.map((pub) => (
                <div
                  key={pub.id_Publicacion}
                  className="flex items-start gap-3 pb-3 border-b border-[#F0F0F0] last:border-0 last:pb-0"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D50032] mt-2 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#002E5F] truncate">{pub.titulo}</p>
                    <p className="text-xs text-gray-400 truncate">{stripHtml(pub.descripcion)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayoutGrafics;