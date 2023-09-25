import { useState } from "react";
import PublicationAdd from "./PublicationAdd";
import PublicationPreview from "./PublicationPreview";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ContarinerNewPublication = () => {
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    multimedia: [],
    estado: false,
    tipo: "",
    UsuarioIdUsuario: "",
  });
  const idUser = useSelector((state) => state.login.user._userId);

  const handleSubmitPublication = async () => {
    try {
      const response = await axios.post("publication/create", {
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        multimedia: publicacion.multimedia,
        estado: publicacion.estado,
        tipo: publicacion.estado,
        UsuarioIdUsuario: idUser,
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
      }
    } catch (error) {}
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <PublicationAdd
        publicacion={publicacion}
        setPublicacion={setPublicacion}
        handleSubmitPublication={handleSubmitPublication}
      />
      <PublicationPreview
        titulo={publicacion.titulo}
        descripcion={publicacion.descripcion}
        multimedia={publicacion.multimedia}
        estado={publicacion.estado}
        tipo={publicacion.tipo}
        UsuarioIdUsuario={publicacion.UsuarioIdUsuario}
      ></PublicationPreview>
    </div>
  );
};

export default ContarinerNewPublication;
