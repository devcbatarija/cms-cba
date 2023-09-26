import { useState } from "react";
import PublicationAdd from "./PublicationAdd";
import PublicationPreview from "./PublicationPreview";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ContarinerNewPublication = () => {
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    multimedia: [],
    estado: false,
    tipo: "",
    UsuarioIdUsuario: "",
  });
  const idUser = useSelector((state) => state.login.user);
  const navigate=useNavigate();
  const handleSubmitPublication = async (urls) => {
    try {
      const response = await axios.post("publication/create", {
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        multimedia: urls,
        estado: publicacion.estado,
        tipo: publicacion.estado,
        UsuarioIdUsuario: idUser._userId,
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
    } catch (error) {}
  };

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
