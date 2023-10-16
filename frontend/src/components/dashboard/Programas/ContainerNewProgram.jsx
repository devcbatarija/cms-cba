import { useState } from "react";
import PublicationAdd from "./ProgramAdd";
import PublicationPreview from "./ProgramsPreview";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ContarinerNewPrograma = () => {
  const [programa, setPrograma] = useState({
    aprendizaje: "",
    imagen1:"",
    caracteristicas:"",
    requisitos:""
  });
  const idUser = useSelector((state) => state.login.user._userId);
  const user = useSelector((state) => state.login.user);

  const navigate=useNavigate();
  const handleSubmitPrograma = async (urls) => {
    try {
      const response = await axios.post("program/create", {
        nombre: programa.nombre.nombre,
        aprendizaje: programa.aprendizaje,
        imagen: programa.descripcion,
        caracteristicas: programa.caracteristicas,
        requisitos: programa.requisitos
      });
      if (response.data) {
        toast.success("Registro exitoso.");
        setPrograma({
          ...programa,
          nombre:"",
          Aprendizaje: "",
          imagen: "",
          caracteristicas: "",
          requisitos: ""
        });
        navigate('/dashboard/publinav/table')
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="grid  shadow border  gap-2 bg-zinc-100 p-2">
      <div>
      <PublicationAdd
        programa={programa}
        setPrograma={setPrograma}
        handleSubmitPrograma={handleSubmitPrograma}
      />
      </div>
      <div>
      {/* <PublicationPreview
        titulo={programa.titulo}
        descripcion={programa.descripcion}
        multimedia={programa.multimedia}
        estado={programa.estado}
        tipo={programa.tipo}
        UsuarioIdUsuario={programa.UsuarioIdUsuario}
        fecha="Hace un momento"
        user={user}
      ></PublicationPreview> */}
      </div>
    </div>
  );
};

export default ContarinerNewPrograma;
