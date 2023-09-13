const {Evento_Predefinido}=require("../db")

module.exports={
    getAllEPredefinido: async ()=>{
        try {
            const res= await Evento_Predefinido.findAll();
            return res;
        } catch (error) {
            return error
        }
    },
    addEPredefinido: async (e)=>{
        try {
            const EPredefinido={
                title:e.title,
                color:e.color,
                UsuarioIdUsuario:e.UsuarioIdUsuario
            }
            const newEPredefinido=await Evento_Predefinido.create(EPredefinido);
            return newEPredefinido;
        } catch (error) {
            return error;
        }
    }
}