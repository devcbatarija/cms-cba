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
            delete e.start;
            delete e.end;
            const EPredefinido={
                title: e.title,
                color: e.color,
                state: e.state,
                tipo: e.tipo,
                start_Time: e.start_Time,
                end_Time: e.end_Time,
                allDay: e.allDay,
                UsuarioIdUsuario: e.UsuarioIdUsuario
            }
            const newEPredefinido=await Evento_Predefinido.create(EPredefinido);
            return newEPredefinido;
        } catch (error) {
            return error;
        }
    }
}