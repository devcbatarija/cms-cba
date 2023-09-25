// Importa la biblioteca Day.js
const dayjs= require('dayjs');
const { Evento } = require("../db")

module.exports = {

    getAllEvento: async () => {
        try {
            const eventos = await Evento.findAll();
            const clonedEventos = JSON.parse(JSON.stringify(eventos));
            clonedEventos.forEach(evento => {
                if (evento.allDay == false) {
                    evento.start = (dayjs(evento.start).format('YYYY-MM-DD') + "T" + evento.start_Time);
                    evento.end = (dayjs(evento.end).format('YYYY-MM-DD') + "T" + evento.end_Time);
                }
                else {
                    evento.start = dayjs(evento.start).format('YYYY-MM-DD');
                    evento.end = dayjs(evento.end).add(1,'day').format('YYYY-MM-DD');
                }
            });
            return clonedEventos;
        } catch (error) {
            return error;
        }
    },
    getEventById: async (id)=>{
        try {
            const event= await Evento.findByPk(id);
            if(!event) {
                throw new Error ("Evento no encontrado!");
            }
            const clonedEvento = JSON.parse(JSON.stringify(event));
            clonedEvento.start=dayjs(clonedEvento.start).format("YYYY-MM-DD");
            clonedEvento.end=dayjs(clonedEvento.end).format("YYYY-MM-DD");
            return clonedEvento
        } catch (error) {
            return error;
        }
    },
    addEvento: async (e) => {
        try {
            const evento = {
                title: e.title,
                start: dayjs(e.start),
                end: dayjs(e.end),
                color: e.color,
                state: e.state,
                tipo: e.tipo,
                start_Time: e.start_Time,
                end_Time: e.end_Time,
                allDay: e.allDay,
                UsuarioIdUsuario: e.UsuarioIdUsuario
            };
            const newEvento = await Evento.create(evento);
            return newEvento;
        } catch (error) {
            return error
        }
    },
    updateEvento: async (id, changes) => {
        try {
          const event = await Evento.findByPk(id);
          if (!event) {
            return "User not found!";
          }
          const updatedEvent = await Evento.update(
            {
              title: changes.title ? changes.title : event.title,
              color: changes.color ? changes.color : event.color,
              state: changes.state ? changes.state : event.state,
              tipo: changes.tipo ? changes.tipo : event.tipo,
              start_Time: changes.start_Time ? changes.start_Time : event.start_Time,
              end_Time: changes.end_Time ? changes.end_Time : event.end_Time,
              start: changes.start ? dayjs(changes.start) : event.start,
              end: changes.end ? dayjs(changes.end) : event.end,
              allDay: changes.allDay ? changes.allDay : event.allDay,
            },
            {
              where: {
                id: id,
              },
            }
          );
          if (updatedEvent[0] == 1) {
            return event;
          }
          return "Error event update!";
        } catch (error) {
          return error;
        }
      }      
}