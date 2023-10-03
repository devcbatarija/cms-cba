import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { test } from "../../redux-toolkit/actions/testActions";
import NavBar from "../navBar/navBar";
import CarouselHome from "../dashboard/widgets/carruselHome";
import ComponentComunication from "./componentComunication";
import PublicationPreview from "../dashboard/Publications/PublicationPreview";
import { getAllPublication } from "../../redux-toolkit/actions/publicationActions";
import CuadroInscripcion from "../inscripcion/incripcion";
import { calcularTimestate } from "../../services/functions";
import Carousel from "../dashboard/widgets/carrousel";
import { StatisticsBanner } from "../statisticsBanner/statisticsBanner";
import { Link } from "react-router-dom";
import { Comments } from "../publications/comments";
import primera from "../../assets/1.jpeg";
import segunda from "../../assets/2.jpeg";
import tercera from "../../assets/3.jpeg";
import cuarta from "../../assets/4.jpeg";
import { TestimonioPreview } from "../testimonios/testimonioPreview";

const dataImage = [primera, segunda, tercera, cuarta];
 
const Home = () => {
  const [dataCalc, setDataCalc] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const multimediadata = useSelector(
    (state) => state.publications.publications
  ); 
  const testimonios=useSelector((state)=>state.testimonios.testimonios);
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
  }, []);

  useEffect(() => {
    if (multimediadata) {
      calc();
    }
  }, [multimediadata]); // Agrega multimediadata como dependencia

  useEffect(() => {
  }, []);

  const sortedPublications = [...multimediadata].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const latestPublications = sortedPublications.slice(0, 2);
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
          <h2 className="text-1xl ">Comunicados</h2>
          {latestPublications &&
            latestPublications.map((m, index) => {
              return (
                <div
                  key={m.descripcion}
                  className="
                grid grid-cols-1
                sm:grid-cols-1 md:grid-cols-2
                items-center justify-center bg-white"
                >
                  <div className="">
                    <Carousel multimedia={m.multimedia} type="home"></Carousel>
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
        <div className="flex flex-col md:w-4/12 w-full gap-4 p-4 rounded-lg bg-white shadow-md">
          Próximos eventos
        </div>
      </div>
      <StatisticsBanner></StatisticsBanner>
      <div className="flex flex-col w-full items-center">
        {
          !testimonios.length>0?(
            <div>Aqui se verán los testimonios</div>
          ):(
            null
          )
        }
        {
          testimonios && testimonios.map((t,index)=>{
            if(index==testimonios.length-1 )
            return(
              <TestimonioPreview 
              key={t.id_Testimonios}
              nombre={t.nombre} 
              apellidos={t.apellidos} 
              cargo={t.cargo} 
              comentario={t.comentario}
              type={"Home"}
              imagen={t.Usuario.image}
              ></TestimonioPreview>
            )
          })
        }
      </div>
      <CuadroInscripcion></CuadroInscripcion>
    </div>
  );
};

export default Home;
