import { useState } from "react";
import PublicationAdd from "./PublicationAdd";
import PublicationPreview from "./PublicationPreview";

const ContarinerNewPublication = () => {

    const [publicacion, setPublicacion]=useState({
        titulo:"",
        descripcion:"",
        multimedia:"",
        estado:false,
        tipo:"",
        UsuarioIdUsuario:""
    })

    return ( 
        <div className="grid grid-cols-2">
            <PublicationAdd
            publicacion={publicacion}
            setPublicacion={setPublicacion}
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
}
 
export default ContarinerNewPublication;