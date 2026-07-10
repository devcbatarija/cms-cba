import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselHome from "../dashboard/widgets/carruselHome";
import ComponentComunication from "./componentComunication";
import { getAllPublication } from "../../redux-toolkit/actions/publicationActions";
import CuadroInscripcion from "../inscripcion/incripcion";
import { calcularTimestate } from "../../services/functions";
import { StatisticsBanner } from "../statisticsBanner/statisticsBanner";
import { Link,useNavigate } from "react-router-dom";
import primera from "../../assets/carrusel6.jpg";
import segunda from "../../assets/8.jpg";
import cuarta from "../../assets/9.jpg";
import { TestimonioPreview } from "../testimonios/testimonioPreview";
import ImagenesEstilizadas from "../dashboard/widgets/imagenPublicacion";
import { getDatosEvents } from "../../redux-toolkit/actions/eventActions";
import MapComponent from "../../components/educationUSA/Maps";

const dataImage = [primera, segunda, cuarta];

/* ---------- Paleta institucional CBA (misma que About.jsx) ---------- */
const CBA_ROJO = "#D50032";
const CBA_NAVY = "#002E5F";
const CBA_GRIS = "#DEDEDE";

/* ---------- Wrapper liviano para animar al entrar en viewport ---------- */
const AlAparecer = ({ children, className = "", retraso = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      {children}
    </div>
  );
};

/* ---------- Encabezado de sección con acento, igual que en About ---------- */
const EncabezadoSeccion = ({ titulo, acento = CBA_NAVY }) => (
  <div className="flex flex-col mb-1">
    <h2 className="text-lg md:text-2xl font-bold" style={{ color: CBA_NAVY }}>
      {titulo}
    </h2>
    <div
      className="w-10 h-1 mt-2 rounded-full"
      style={{ backgroundColor: acento }}
    />
  </div>
);

/* ---------- Icono calendario / cine reutilizado como badge circular ---------- */
const IconoEvento = ({ esCine, acento }) => (
  <div
    className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center"
    style={{ backgroundColor: `${acento}1A`, color: acento }}
  >
    {esCine ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path d="m9,4c0,2.209-1.791,4-4,4S1,6.209,1,4,2.791,0,5,0s4,1.791,4,4ZM14,0c-2.209,0-4,1.791-4,4s1.791,4,4,4,4-1.791,4-4S16.209,0,14,0Zm5,14v6c0,2.209-1.791,4-4,4H4c-2.209,0-4-1.791-4-4v-6c0-2.209,1.791-4,4-4h11c2.209,0,4,1.791,4,4Zm2.765-2.114l-.765.765v7.75l.765.765c.825.825,2.235.241,2.235-.926v-7.429c0-1.166-1.41-1.75-2.235-.926Z" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path d="M1,24c-.552,0-1-.447-1-1V4C0,1.794,1.794,0,4,0H21.998c1.6-.055,2.604,1.958,1.598,3.203l-3.237,4.297,3.237,4.297c1.007,1.245,.003,3.258-1.598,3.203H2v8c0,.553-.448,1-1,1Z" />
      </svg>
    )}
  </div>
);

const Home = () => {
   const navigate = useNavigate();
  const [dataCalc, setDataCalc] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const multimediadata = useSelector(
    (state) => state.publications.publications
  );
  // Solo se muestran en el sitio web las publicaciones marcadas como "Visible" (estado: true)
  const publicacionesVisibles = multimediadata.filter((m) => m.estado);
  const events = useSelector((state) => state.events.datosEvents);
  const testimonios = useSelector((state) => state.testimonios.testimonios);

  const calc = () => {
    let calcData = [];
    for (let c of publicacionesVisibles) {
      const time = calcularTimestate(c.createdAt);
      calcData.push(time);
    }
    setDataCalc(calcData);
  };

  useEffect(() => {
    dispatch(getAllPublication());
    dispatch(getDatosEvents());
  }, []);

  useEffect(() => {
    if (multimediadata) {
      calc();
    }
  }, [multimediadata, events]); // Agrega multimediadata como dependencia

  useEffect(() => {}, []);
  const converFecha = (fech) => {
    const newFecha = new Date(fech);
    return newFecha.toLocaleString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const latestPublications = publicacionesVisibles.slice(0, 2);
  const latestEvents = events.slice(0, 3);

  const renderDescription = (descripcion) => {
    return {
      __html: descripcion.replace(/\n/g, "<br>"),
    };
  };
  const handleClick = (id) => {
    alert(id);
  };

  return (
    <div className="flex flex-col h-auto gap-8 bg-zinc-50 pb-4">
      <div className="w-full h-auto">
        <CarouselHome multimedia={dataImage}></CarouselHome>
      </div>

      <div className="flex flex-col md:flex-row min-h-full sm:px-12 px-4 bg-zinc-50 gap-6">
        {/* ---------- PUBLICACIONES ---------- */}
        <div className="flex flex-col md:w-8/12 w-full gap-5 p-5 md:p-7 bg-white rounded-2xl shadow-sm border border-gray-100">
          <EncabezadoSeccion titulo="Publicaciones" acento={CBA_ROJO} />

          {latestPublications &&
            latestPublications.map((m, index) => {
              const acento = index % 2 === 0 ? CBA_NAVY : CBA_ROJO;
              return (
                <AlAparecer
                  key={`${m.titulo}-${m.id_Publicacion}`}
                  retraso={index * 80}
                >
                  <div
                    className="group grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 items-center 
                    rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg 
                    transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <ImagenesEstilizadas multimedia={m.multimedia} />
                      {dataCalc[index] && (
                        <span
                          className="absolute top-3 left-3 text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm backdrop-blur-sm"
                          style={{ backgroundColor: `${acento}E6` }}
                        >
                          {dataCalc[index]}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col p-6">
                      <h2
                        onClick={() => handleClick(m.id_Publicacion)}
                        className="text-xl md:text-2xl font-bold hover:cursor-pointer transition-colors duration-200"
                        style={{ color: CBA_NAVY }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = acento)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = CBA_NAVY)}
                      >
                        {m.titulo}
                      </h2>
                      <div
                        className="w-8 h-0.5 my-3 rounded-full"
                        style={{ backgroundColor: acento }}
                      />
                      <p
                        className="text-gray-600 text-sm leading-relaxed line-clamp-4"
                        dangerouslySetInnerHTML={renderDescription(m.descripcion)}
                      ></p>
                    </div>
                  </div>
                </AlAparecer>
              );
            })}

          {latestPublications.length > 0 ? (
            <div className="flex flex-col pt-1">
              <Link
                to={"/publications"}
                className="inline-flex items-center gap-1.5 w-fit font-semibold text-sm transition-all duration-200 hover:gap-2.5"
                style={{ color: CBA_ROJO }}
              >
                Ver más publicaciones
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <span>Aún no hay comunicados</span>
            </div>
          )}
        </div>

        {/* ---------- EVENTOS PRÓXIMOS ---------- */}
        <div className="flex flex-col md:w-4/12 w-full gap-4 p-5 md:p-7 rounded-2xl bg-white shadow-sm border border-gray-100">
          <EncabezadoSeccion titulo="Eventos próximos" acento={CBA_NAVY} />

          {latestEvents.length > 0 ? (
            latestEvents.map((ev, index) => {
              const acento = index % 2 === 0 ? CBA_NAVY : CBA_ROJO;
              const esCine = ev.categoria == "Cine" && ev.Evento.tipo == "General";
              return (
                <AlAparecer key={index} retraso={index * 80}>
                  <div
                    onClick={() => navigate("/calendar")}
                    className="group flex items-start gap-3 w-full p-4 bg-white rounded-xl border border-gray-100
  shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    style={{ borderLeftWidth: "3px", borderLeftColor: acento }}
                  >
                    <IconoEvento esCine={esCine} acento={acento} />
                    <div className="flex flex-col min-w-0">
                      <p
                        title={ev.descripcion}
                        className="font-semibold text-gray-900 group-hover:underline decoration-2 underline-offset-2 truncate"
                      >
                        {ev.Evento.title}
                      </p>
                      <span
                        className="text-xs font-medium mt-0.5"
                        style={{ color: acento }}
                      >
                        {esCine ? "Cine" : "Evento general"}
                      </span>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="fixed z-50 inset-0 overflow-y-auto">
                      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                          aria-hidden="true"
                        ></div>
                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-[fadeIn_0.2s_ease-out]">
                          <div
                            className="h-1.5 w-full"
                            style={{ backgroundColor: acento }}
                          />
                          <div className="bg-white px-5 pt-6 pb-4 sm:p-7 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <IconoEvento esCine={esCine} acento={acento} />
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-bold" style={{ color: CBA_NAVY }}>
                                  {ev.Evento.title}
                                </h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    {ev.descripcion}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 space-y-2 sm:ml-[3.75rem]">
                              <p className="inline-flex text-sm items-center gap-1.5 text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="15"
                                  height="15"
                                  fill={CBA_NAVY}
                                >
                                  <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm2.5,16.33c-.157,.091-.329,.134-.499,.134-.346,0-.682-.179-.867-.5l-2-3.464c-.088-.152-.134-.324-.134-.5V6c0-.552,.447-1,1-1s1,.448,1,1v5.732l1.866,3.232c.276,.478,.112,1.09-.366,1.366Z" />
                                </svg>
                                <span>
                                  <strong className="font-semibold">Empieza:</strong>{" "}
                                  {converFecha(ev.Evento.start)}
                                </span>
                              </p>
                              <p className="inline-flex text-sm items-center gap-1.5 text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="15"
                                  height="15"
                                  fill={CBA_ROJO}
                                >
                                  <path d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm3.397,13.803l-2.397-4.076V5h-2v7.272l2.673,4.544,1.725-1.014Z" />
                                </svg>
                                <span>
                                  <strong className="font-semibold">Termina:</strong>{" "}
                                  {converFecha(ev.Evento.end)}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-5 py-3 sm:px-7 sm:flex sm:flex-row-reverse">
                            <button
                              onClick={() => setIsOpen(false)}
                              type="button"
                              className="mt-3 w-full inline-flex justify-center rounded-lg
                               border border-transparent shadow-sm px-5 py-2.5 text-white font-medium text-sm
                               transition-colors duration-200 hover:opacity-90
                               focus:outline-none focus:ring-2 focus:ring-offset-2
                               sm:mt-0 sm:ml-3 sm:w-auto"
                              style={{ backgroundColor: CBA_NAVY }}
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </AlAparecer>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              Aún no hay datos.
            </div>
          )}
        </div>
      </div>
      <div>
      <ComponentComunication></ComponentComunication>
      <StatisticsBanner></StatisticsBanner>
      </div>
      <div className="flex flex-col w-full items-center px-4">
        {!testimonios.length > 0 ? (
          <div className="text-gray-400">Aún no hay testimonios.</div>
        ) : null}
        {testimonios &&
          testimonios.map((t, index) => {
            if (index == testimonios.length - 1)
              return (
                <TestimonioPreview
                  key={t.id_Testimonios}
                  nombre={t.nombre}
                  apellidos={t.apellidos}
                  cargo={t.cargo}
                  comentario={t.comentario}
                  type={"Home"}
                  imagen={t.imagen}
                ></TestimonioPreview>
              );
          })}
      </div>
      <CuadroInscripcion/>
      {/* ---------- MAPA: Visítanos ---------- */}
      <div className="px-4 sm:px-12">
        <AlAparecer>
          <div className="rounded-2xl shadow-sm border border-gray-100 bg-white overflow-hidden">
            <div
              className="flex items-center gap-2 px-5 py-3"
              style={{ backgroundColor: CBA_NAVY }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-white text-sm font-semibold">
                Visítanos — Centro Boliviano Americano
              </span>
            </div>
            <div className="p-1">
              <MapComponent />
            </div>
          </div>
        </AlAparecer>
      </div>
    </div>
  );
};

export default Home;