import { useState } from "react";
import PublicationAdd from "./PublicationAdd";
import PublicationPreview from "./PublicationPreview";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ContarinerNewPublication = () => {
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    multimedia: [],
    estado: false,
    tipo: "General",
    UsuarioIdUsuario: "",
  });
  const idUser = useSelector((state) => state.login.user._userId);
  const navigate=useNavigate();
  const handleSubmitPublication = async (urls) => {
    console.log("prueba de envio")
    try {
      const response = await axios.post("publication/create", {
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        multimedia: urls,
        estado: publicacion.estado,
        tipo: publicacion.estado,
        UsuarioIdUsuario: publicacion.UsuarioIdUsuario,
      });
      if (response.data) {
        toast.success("Registro exitoso.");
        setPublicacion({
          ...publicacion,
          titulo: "",
          descripcion: "",
          multimedia: [],
          estado: false,
          tipo: "",
          UsuarioIdUsuario: "",
        });
        navigate('/dashboard/publinav/table')
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(()=>{
    idUser?setPublicacion({
      ...publicacion,
      UsuarioIdUsuario:idUser
    }):null
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 shadow border  gap-2 bg-zinc-100 p-2">
      <div>
      <PublicationAdd
        publicacion={publicacion}
        setPublicacion={setPublicacion}
        handleSubmitPublication={handleSubmitPublication}
      />
      </div>
      <div>
      <PublicationPreview
        titulo={publicacion.titulo}
        descripcion={publicacion.descripcion}
        multimedia={publicacion.multimedia}
        estado={publicacion.estado}
        tipo={publicacion.tipo}
        UsuarioIdUsuario={publicacion.UsuarioIdUsuario}
      ></PublicationPreview>
      </div>
    </div>
  );
};

export default ContarinerNewPublication;
