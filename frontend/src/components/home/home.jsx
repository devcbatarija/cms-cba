import { useEffect, useState } from "react";
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

const dataImage = [
  "https://images.unsplash.com/photo-1543304216-b46be324b571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1581&q=80",
  "https://images.unsplash.com/photo-1509367851641-69176fc69f79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1576&q=80",
];
const Home = () => {
  const [dataCalc, setDataCalc] = useState([]);
  const dispatch = useDispatch();
  const multimediadata = useSelector(
    (state) => state.publications.publications
  );

  const calc = () => {
    let calcData = [];
    for (let c of multimediadata) {
      const time = calcularTimestate(c.createdAt);
      calcData.push(time);
    }
    setDataCalc(calcData);
  };

  const data = () => {
    dispatch(test());
  };
  useEffect(() => {
    dispatch(getAllPublication());
  }, []);

  useEffect(() => {
    if (multimediadata) {
      calc();
    }
  }, [multimediadata]); // Agrega multimediadata como dependencia

  const sortedPublications = [...multimediadata].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const latestPublications = sortedPublications.slice(0, 2);
  const renderDescription = (descripcion) => {
    return {
      __html: descripcion.replace(/\n/g, "<br>"),
    };
  };
  return (
    <div className="flex flex-col h-auto gap-8">
      <CarouselHome multimedia={dataImage}></CarouselHome>
      <ComponentComunication></ComponentComunication>
      <div className="flex flex-col md:flex-row min-h-full p-6 bg-white-100 gap-2 gap-2">
        <div 
        style={{
          boxShadow:"1px 1px 5px 1px"
        }}
        className="flex flex-col shadow-2xl md:w-8/12 w-full gap-4 box-shadow border p-4 ">
          <h2 className="text-1xl ">Comunicados</h2>
          {latestPublications.map((m, index) => {
            return (
              <div
                key={m.descripcion}
                className="
                grid grid-cols-1
                sm:grid-cols-1 md:grid-cols-2
                items-center justify-center "
              >
                <div className="">
                  <Carousel multimedia={m.multimedia} type="home" ></Carousel>
                </div>
                <div className="flex flex-col gap-5 p-6">
                  <h2 className="text-2xl text-blue-900">{m.titulo}</h2>
                  <p
                    className="text-gray-700"
                    dangerouslySetInnerHTML={renderDescription(m.descripcion)}
                  ></p>
                </div>
              </div>
            );
          })}
          {
            latestPublications.length>0?
            <div className="flex flex-col text-blue-900">
              <a>Ver mas....</a>
            </div>:
            <div className="flex flex-col text-blue-900">
              <a>No hay comunicados</a>
            </div>
          }
        </div>
        <div 
        style={{
          boxShadow:"1px 1px 5px 1px"
        }}
        className="flex flex-col shadow-2xl md:w-4/12 w-full gap-4 box-shadow border p-4 rounded-lg">
          Próximos eventos
        </div>
      </div>
      <CuadroInscripcion></CuadroInscripcion>
      <ComponentComunication></ComponentComunication>
    </div>
  );
};

export default Home;

{
  /* <PublicationPreview
                  key={m.titulo+"index"}
                  titulo={m.titulo}
                  descripcion={m.descripcion}
                  multimedia={m.multimedia}
                  estado={m.estado}
                  tipo={m.tipo}
                  fecha={dataCalc[index]}
                  user={m.Usuario}
                ></PublicationPreview> */
}
