const {Evento}= require("../db")

function formatDate(e) {
    let date = new Date(e).toISOString().replace(/T.*$/, '');
    return date;
}

module.exports={

    getAllEvento: async()=>{
        try {
            const eventos=await Evento.findAll();
            const clonedEventos = JSON.parse(JSON.stringify(eventos));
            clonedEventos.forEach(evento => {
                evento.start = formatDate(evento.start);
                evento.end = formatDate(evento.end);
            });
            return clonedEventos;
        } catch (error) {
            return error;
        }
    },
    addEvento:async(e)=>{
        try {
            const evento={
                title:e.title,
                start: e.start,
                end: e.end,
                color: e.color,
                state: e.state,
                tipo:e.tipo,
                UsuarioIdUsuario: e.UsuarioIdUsuario
            };
            const newEvento = await Evento.create(evento);
            return newEvento;
        } catch (error) {
            return error
        }
    }
}