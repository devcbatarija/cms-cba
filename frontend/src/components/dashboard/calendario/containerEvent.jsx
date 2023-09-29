import { useState } from "react";
import EventAdd from "./eventAdd";
import EventPreview from "./eventPreview";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ContarinerNewEvent = ({
  setData,
  data
}) => {
  const [Evento, setEvento] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    color: "",
    tipo: "",
    start_Time: "",
    end_Time: "",
    allDay: true,
    UsuarioIdUsuario:""
  })
  const [datosEvento, setDatosEvento] = useState({
    id_E: '',
    descripcion: "",
    multimedia: [],
    state: true,
    tipo: "Cine",
  });
  const idUser = useSelector((state) => state.login.user._userId);
  const navigate = useNavigate();
  const handleSubmitEvent = async (urls) => {
    console.log("prueba de envio")
    try {
      const response = await axios.post("publication/create", {
        descripcion: datosEvento.descripcion,
        multimedia: urls,
        state: datosEvento.state,
        tipo: datosEvento.state
      });
      if (response.data) {
        toast.success("Registro exitoso.");
        setDatosEvento({
          ...datosEvento,
          descripcion: "",
          multimedia: [],
          state: true,
          tipo: "Cine",
        });
        navigate('/dashboard/publinav/table')
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    idUser?setEvento({
      ...Evento,
      UsuarioIdUsuario:idUser
    }):null
  }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 shadow border  gap-2 bg-zinc-100 p-2">
      <div>
        <EventAdd
          datosEvento={datosEvento}
          setDatosEvento={setDatosEvento}
          handleSubmitEvent={handleSubmitEvent}
          data={data?data:Evento}
          setData={setData?setData:setEvento}
        />
      </div>
      <div>
        <EventPreview
          titulo={data.title}
          descripcion={datosEvento.descripcion}
          multimedia={datosEvento.multimedia}
          state={datosEvento.state}
          tipo={datosEvento.tipo}
          UsuarioIdUsuario={data.UsuarioIdUsuario}
        ></EventPreview>
      </div>
    </div>
  );
};

export default ContarinerNewEvent;
