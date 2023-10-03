// Importa la biblioteca Day.js
const dayjs = require('dayjs');
const { Dato_Evento, Evento } = require("../db")
const Sequelize = require('sequelize');

module.exports = {

    getAllDatosEvento: async () => {
        try {
            
            const datosEvento = await Dato_Evento.findAll({
                include:[{
                    model:Evento
                    
                }]
            });
            console.log("aqui")

            const eventos = await Evento.findAll({
                where: {
                    id: {
                        [Sequelize.Op.notIn]: datosEvento.map(dato => dato.EventoId)
                    }
                }
            });
            const clonedEventos = JSON.parse(JSON.stringify(eventos));
            clonedEventos.forEach(evento => {

                evento.start = dayjs(evento.start).format('YYYY-MM-DD');
                evento.end = dayjs(evento.end).format('YYYY-MM-DD');

            });
            return {Eventos:clonedEventos,datosEvento};
        } catch (error) {
            return error;
        }
    },
    getDatosEventoById: async (id) => {
        try {
            const event = await Evento.findByPk(id);
            if (!event) {
                throw new Error("Evento no encontrado!");
            }
            const clonedEvento = JSON.parse(JSON.stringify(event));
            clonedEvento.start = dayjs(clonedEvento.start).format("YYYY-MM-DD");
            clonedEvento.end = dayjs(clonedEvento.end).format("YYYY-MM-DD");
            return clonedEvento
        } catch (error) {
            return error;
        }
    },
    addDatosEvento: async (e) => {
        try {
            const evento = {
                title: e.evento.title,
                start: dayjs(e.evento.start),
                end: dayjs(e.evento.end),
                color: e.evento.color,
                state: e.evento.state,
                tipo: e.evento.tipo,
                start_Time: e.evento.start_Time,
                end_Time: e.evento.end_Time,
                allDay: e.evento.allDay,
                UsuarioIdUsuario: e.evento.UsuarioIdUsuario
            };
            const newEvento = await Evento.create(evento);
            const datosEvento = {
                descripcion: e.datos_Evento.descripcion,
                multimedia: e.datos_Evento.multimedia,
                categoria: e.datos_Evento.categoria,
                EventoId: newEvento.id,
            }
            const newDatosEvento = Dato_Evento.create(datosEvento);
            return newDatosEvento;
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