import { useState } from "react";
import BecaAdd from "./BecaAdd";
import BecaPreview from "./BecaPreview";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ContarinerNewBeca = () => {
  const [beca, setBeca] = useState({
    titulo: "",
    descripcion: "",
    multimedia: [],
    estado: false,
    tipo: "Academico",
    UsuarioIdUsuario: "",
  });
  const idUser = useSelector((state) => state.login.user._userId);
  const user = useSelector((state) => state.login.user);

  const navigate=useNavigate();
  const handleSubmitBeca = async (urls) => {
    try {
      const response = await axios.post("beca/create", {
        titulo: beca.titulo,
        descripcion: beca.descripcion,
        multimedia: urls,
        estado: beca.estado,
        tipo: beca.estado,
        UsuarioIdUsuario: beca.UsuarioIdUsuario,
      });
      if (response.data) {
        toast.success("Registro exitoso.");
        setBeca({
          ...beca,
          titulo: "",
          descripcion: "",
          multimedia: [],
          estado: false,
          tipo: "",
          UsuarioIdUsuario: "",
        });
        navigate('/dashboard/becanav/table')
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(()=>{
    idUser?setBeca({
      ...beca,
      UsuarioIdUsuario:idUser
    }):null
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 shadow border  gap-2 bg-zinc-100 p-2">
      <div>
      <BecaAdd
        beca={beca}
        setBeca={setBeca}
        handleSubmitBeca={handleSubmitBeca}
      />
      </div>
      <div>
      <BecaPreview
        titulo={beca.titulo}
        descripcion={beca.descripcion}
        multimedia={beca.multimedia}
        estado={beca.estado}
        tipo={beca.tipo}
        UsuarioIdUsuario={beca.UsuarioIdUsuario}
        fecha="Hace un momento"
        user={user}
      ></BecaPreview>
      </div>
    </div>
  );
};

export default ContarinerNewBeca;
