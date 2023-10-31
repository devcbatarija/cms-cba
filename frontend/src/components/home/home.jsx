import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselHome from "../dashboard/widgets/carruselHome";
import ComponentComunication from "./componentComunication";
import { getAllPublication } from "../../redux-toolkit/actions/publicationActions";
import CuadroInscripcion from "../inscripcion/incripcion";
import { calcularTimestate } from "../../services/functions";
import { StatisticsBanner } from "../statisticsBanner/statisticsBanner";
import { Link } from "react-router-dom";
import primera from "../../assets/1.jpeg";
import segunda from "../../assets/2.jpeg";
import tercera from "../../assets/3.jpeg";
import cuarta from "../../assets/4.jpeg";
import { TestimonioPreview } from "../testimonios/testimonioPreview";
import ImagenesEstilizadas from "../dashboard/widgets/imagenPublicacion";
import { getDatosEvents } from "../../redux-toolkit/actions/eventActions";

const dataImage = [primera, segunda, tercera, cuarta];

const Home = () => {
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
  const events = useSelector((state) => state.events.datosEvents);
  const testimonios = useSelector((state) => state.testimonios.testimonios);

  const calc = () => {
    let calcData = [];
    for (let c of multimediadata) {
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
  const latestPublications = multimediadata.slice(0, 2);
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
    <div className="flex flex-col h-auto gap-6 bg-zinc-50">
      <div className="w-full h-auto">
        <CarouselHome multimedia={dataImage}></CarouselHome>
      </div>
      <ComponentComunication></ComponentComunication>
      <div className="flex flex-col md:flex-row min-h-full  sm:px-12 bg-zinc-50 gap-2 gap-2 ">
        <div className="flex flex-col md:w-8/12 w-full gap-4 p-4 bg-white shadow-md">
          <h2 className="mt-1 text-lg font-semibold text-cbaBlue md:text-2xl dark:sm:text-white">
            Publicaciones
          </h2>
          {latestPublications &&
            latestPublications.map((m, index) => {
              return (
                <div
                  key={`${m.titulo}-${m.id_Publicacion}`}
                  className="
                grid grid-cols-1
                sm:grid-cols-1 lg:grid-cols-2
                items-center justify-center bg-white"
                >
                  <div className="h-72 px-8">
                    <ImagenesEstilizadas multimedia={m.multimedia} />
                    {/* <Carousel multimedia={m.multimedia} type="home"></Carousel> */}
                  </div>
                  <div className="flex flex-col p-6">
                    <h2
                      onClick={() => handleClick(m.id_Publicacion)}
                      className="text-2xl text-blue-900 hover:cursor-pointer"
                    >
                      {m.titulo}
                    </h2>
                    <p
                      className="text-gray-700"
                      dangerouslySetInnerHTML={renderDescription(m.descripcion)}
                    ></p>
                  </div>
                </div>
              );
            })}
          {latestPublications.length > 0 ? (
            <div className="flex flex-col text-blue-900">
              <Link to={"/publications"}>Ver mas....</Link>
            </div>
          ) : (
            <div className="flex flex-col text-blue-900">
              <a>No hay comunicados</a>
            </div>
          )}
        </div>
        <div className="flex flex-col md:w-4/12 w-full gap-4 p-2 rounded-lg bg-white shadow-md">
          <h2 className="mt-1 text-lg font-semibold text-cbaBlue md:text-2xl dark:sm:text-white">
            Eventos próximos
          </h2>

          {latestEvents.length > 0 ? (
            latestEvents.map((ev, index) => {
              return (
                <div
                  className="flex flex-col w-full p-6 bg-white border 
          border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  {ev.categoria == "Cine" && ev.Evento.tipo == "General" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      width="30"
                      height="30"
                      fill="#3b50b2"
                    >
                      <path d="m9,4c0,2.209-1.791,4-4,4S1,6.209,1,4,2.791,0,5,0s4,1.791,4,4ZM14,0c-2.209,0-4,1.791-4,4s1.791,4,4,4,4-1.791,4-4S16.209,0,14,0Zm5,14v6c0,2.209-1.791,4-4,4H4c-2.209,0-4-1.791-4-4v-6c0-2.209,1.791-4,4-4h11c2.209,0,4,1.791,4,4Zm2.765-2.114l-.765.765v7.75l.765.765c.825.825,2.235.241,2.235-.926v-7.429c0-1.166-1.41-1.75-2.235-.926Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      width="30"
                      height="30"
                      fill="#3b50b2"
                    >
                      <path d="M1,24c-.552,0-1-.447-1-1V4C0,1.794,1.794,0,4,0H21.998c1.6-.055,2.604,1.958,1.598,3.203l-3.237,4.297,3.237,4.297c1.007,1.245,.003,3.258-1.598,3.203H2v8c0,.553-.448,1-1,1Z" />
                    </svg>
                  )}
                  <p>
                    <h5
                      onClick={openModal}
                      title={ev.descripcion}
                      class="mb-2 text-xl font-semibold tracking-tight text-gray-900 
                      dark:text-white cursor-pointer hover:underline hover:text-blue-600"
                    >
                      {ev.Evento.title}
                    </h5>
                  </p>
                  {isOpen && (
                    <div class="fixed z-10 inset-0 overflow-y-auto">
                      <div
                        class="flex items-end justify-center min-h-screen 
                      pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                      >
                        <div
                          class="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                          class="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>
                        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">
                                  {ev.Evento.title}
                                </h3>
                                <div class="mt-2">
                                  <p class="text-sm text-gray-500">
                                    {ev.descripcion}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="sm:ml-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Layer_1"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                                width="15"
                                height="15"
                              >
                                <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm2.5,16.33c-.157,.091-.329,.134-.499,.134-.346,0-.682-.179-.867-.5l-2-3.464c-.088-.152-.134-.324-.134-.5V6c0-.552,.447-1,1-1s1,.448,1,1v5.732l1.866,3.232c.276,.478,.112,1.09-.366,1.366Z" />
                              </svg>
                              <p className="inline-flex text-sm items-center text-gray-600 hover:underline">
                                {"Empieza: " + converFecha(ev.Evento.start)}
                              </p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Layer_1"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                                width="15"
                                height="15"
                              >
                                <path d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm3.397,13.803l-2.397-4.076V5h-2v7.272l2.673,4.544,1.725-1.014Z" />
                              </svg>

                              <p className="inline-flex text-sm items-center text-gray-600 hover:underline">
                                {"Termina: " + converFecha(ev.Evento.end)}
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              onClick={() => setIsOpen(false)}
                              type="button"
                              class="mt-3 w-full inline-flex justify-center rounded-md
                               border border-transparent shadow-sm px-4 py-2 bg-cbaBlue 
                               text-base font-medium text-white hover:bg-blue-700 
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                               sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div>Aún no hay datos.</div>
          )}
        </div>
      </div>
      <StatisticsBanner></StatisticsBanner>
      <div className="flex flex-col w-full items-center">
        {!testimonios.length > 0 ? <div>Aún no hay testimonios.</div> : null}
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
      <CuadroInscripcion></CuadroInscripcion>
    </div>
  );
};

export default Home;
