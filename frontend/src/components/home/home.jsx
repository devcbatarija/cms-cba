import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { test } from "../../redux-toolkit/actions/testActions";
import NavBar from "../navBar/navBar";
import CarouselHome from "../dashboard/widgets/carruselHome";
import ComponentComunication from "./componentComunication";

const dataImage = [
  "https://images.unsplash.com/photo-1543304216-b46be324b571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1581&q=80",
  "https://images.unsplash.com/photo-1509367851641-69176fc69f79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1576&q=80",
];
const Home = () => {
  const dispatch = useDispatch();
  const data = () => {
    dispatch(test());
  };
  return (
    <div className="flex flex-col h-auto gap-8">
      <CarouselHome multimedia={dataImage}></CarouselHome>
      <ComponentComunication></ComponentComunication>
      <div
      style={{ height: "50vh" }}
      className="flex flex-col md:flex-row min-h-full p-2 bg-white-100 gap-2"
      >
        <div className="shadow-2xl md:w-7/12 w-full">
            Comunicados
        </div>
        <div className="rounded-lg shadow-2xl md:w-5/12 w-full">
            Próximos eventos
        </div>
      </div>
    </div>
  );
};

export default Home;
