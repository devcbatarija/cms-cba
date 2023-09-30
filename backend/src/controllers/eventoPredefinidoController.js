const { Evento_Predefinido } = require("../db")

module.exports = {
    getAllEPredefinido: async () => {
        try {
            const res = await Evento_Predefinido.findAll();
            return res;
        } catch (error) {
            return error
        }
    },
    addEPredefinido: async (e) => {
        try {
            delete e.start;
            delete e.end;
            const EPredefinido = {
                title: e.title,
                color: e.color,
                state: e.state,
                tipo: e.tipo,
                start_Time: e.start_Time,
                end_Time: e.end_Time,
                allDay: e.allDay,
                UsuarioIdUsuario: e.UsuarioIdUsuario
            }
            const newEPredefinido = await Evento_Predefinido.create(EPredefinido);
            return newEPredefinido;
        } catch (error) {
            return error;
        }
    },
    getEventPredefinidoById: async (id) => {
        try {
            const event = await Evento_Predefinido.findByPk(id);
            if (!event) {
                throw new Error("Evento predifinido no encontrado!");
            }
            return event
        } catch (error) {
            return error;
        }
    },
    updateEventoPredefinido: async (id, changes) => {
        try {
            const event = await Evento_Predefinido.findByPk(id);
            if (!event) {
                return "User not found!";
            }
            const updatedEvent = await Evento_Predefinido.update(
                {
                    title: changes.title ? changes.title : event.title,
                    color: changes.color ? changes.color : event.color,
                    state: changes.state ? changes.state : event.state,
                    tipo: changes.tipo ? changes.tipo : event.tipo,
                    start_Time: changes.start_Time ? changes.start_Time : event.start_Time,
                    end_Time: changes.end_Time ? changes.end_Time : event.end_Time,
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