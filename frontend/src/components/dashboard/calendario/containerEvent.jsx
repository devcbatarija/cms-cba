import { useState } from "react";
import EventAdd from "./eventAdd";
import EventPreview from "./eventPreview";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getEvents } from "../../../redux-toolkit/actions/eventActions";


const ContarinerNewEvent = ({
  setData,
  data
}) => {
  const dispatch= useDispatch();
  const [Evento, setEvento] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    color: "",
    tipo: "General",
    start_Time: "",
    end_Time: "",
    state: true,
    allDay: true,
    UsuarioIdUsuario: ""
  })
  const [datosEvento, setDatosEvento] = useState({
    id_E: '',
    descripcion: "",
    multimedia: [],
    categoria: "Cine",
  });
  const idUser = useSelector((state) => state.login.user._userId);
  const navigate = useNavigate();
  const handleSubmitEvent = async (urls) => {
    try {
      const enviar = data ? data : Evento
      const response = await axios.post("datosevento/create", {
        evento: {
          title: enviar.title,
          start: enviar.start,
          end: enviar.end,
          color: enviar.color,
          tipo: enviar.tipo,
          start_Time: !enviar.allDay ? enviar.start_Time : '',
          end_Time: !enviar.allDay ? enviar.end_Time : '',
          state: enviar.state,
          allDay: enviar.allDay,
          UsuarioIdUsuario: enviar.UsuarioIdUsuario
        },
        datos_Evento: {
          descripcion: datosEvento.descripcion,
          multimedia: urls,
          categoria: datosEvento.categoria
        }
      });
      if (response.data) {
        toast.success("Registro exitoso.");
        setDatosEvento({
          ...datosEvento,
          descripcion: "",
          multimedia: [],
          categoria: "Cine",
        });
        if (data) {
          setData({
            ...data,
            id: "",
            title: "",
            start: "",
            end: "",
            color: "",
            tipo: "",
            start_Time: "",
            end_Time: "",
            allDay: true,
            state: true
          })
        navigate('/dashboard/Calendario/calendario')
      }
        else {
          setEvento({
            ...Evento,
            id: "",
            title: "",
            start: "",
            end: "",
            color: "",
            tipo: "General",
            start_Time: "",
            end_Time: "",
            state: true,
            allDay: true,
          })
        navigate('/dashboard/Calendario/addEvent')
      }
      dispatch(getEvents())
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    idUser ? setEvento({
      ...Evento,
      UsuarioIdUsuario: idUser
    }) : null
  }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 shadow border  gap-2 bg-zinc-100 p-2">
      <div>
        <EventAdd
          datosEvento={datosEvento}
          setDatosEvento={setDatosEvento}
          handleSubmitEvent={handleSubmitEvent}
          data={data ? data : Evento}
          setData={setData ? setData : setEvento}
        />
      </div>
      <div>
        <EventPreview
          titulo={data ? data.title : Evento.title}
          descripcion={datosEvento.descripcion}
          multimedia={datosEvento.multimedia}
        ></EventPreview>
      </div>
    </div>
  );
};

export default ContarinerNewEvent;
