import { useState } from "react";
import EventAdd from "./eventAdd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getEvents } from "../../../redux-toolkit/actions/eventActions";


const ContarinerNewEvent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
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
      const enviar = Evento
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
        navigate('/dashboard/Calendario/calendario')
        dispatch(getEvents())
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    if (location.state?.prevPath === '/dashboard/Calendario/calendario' && location.state?.data) {
      setEvento(location.state.data)
      location.state = null
    }
    else {
      idUser ? setEvento({
        ...Evento,
        UsuarioIdUsuario: idUser
      }) : null
    }
  }, [])
  return (
    <div className="grid shadow border bg-zinc-100 lg:py-5 ">
      <div className="w-full flex justify-center">
        <EventAdd
          datosEvento={datosEvento}
          setDatosEvento={setDatosEvento}
          handleSubmitEvent={handleSubmitEvent}
          data={location.state?.data ? location.state.data : Evento}
          setData={setEvento}
        />
      </div>
    </div>
  );
};

export default ContarinerNewEvent;
