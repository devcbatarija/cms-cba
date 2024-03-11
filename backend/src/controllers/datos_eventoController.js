// Importa la biblioteca Day.js
const dayjs = require('dayjs');
const { Dato_Evento, Evento } = require("../db")
const Sequelize = require('sequelize');

module.exports = {

    getAllDatosEvento: async () => {
        try {

            const datosEvento = await Dato_Evento.findAll({
                include: [{
                    model: Evento

                }]
            });

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
            return { Eventos: clonedEventos, datosEvento };
        } catch (error) {
            return error;
        }
    },
    getEventsByDate: async (obj) => {
        try {
            const date = obj.date;
            let startOfMonth, endOfMonth;
            if (obj.type == 'multiMonthYear') {
                startOfMonth = dayjs(date).startOf('year').toDate();
                endOfMonth = dayjs(date).endOf('year').toDate();
            } else if (obj.type == 'dayGridMonth') {
                startOfMonth = dayjs(date).startOf('month').toDate();
                endOfMonth = dayjs(date).endOf('month').toDate();
            } else if (obj.type == 'timeGridWeek') {
                startOfMonth = dayjs(date).toDate();
                endOfMonth = dayjs(obj.endDate).toDate();
            } else if (obj.type == 'day') {
                startOfMonth = dayjs(date).startOf('day').toDate();
                endOfMonth = dayjs(date).endOf('day').toDate();
            }

            const datosEvento = await Dato_Evento.findAll({
                include: [{
                    model: Evento,
                    where: {
                        start: {
                            [Sequelize.Op.between]: [startOfMonth, endOfMonth]
                        }
                    }

                }]
            });
            const eventos = await Evento.findAll({
                where: {
                    id: {
                        [Sequelize.Op.notIn]: datosEvento.map(dato => dato.EventoId)
                    },
                    start: {
                        [Sequelize.Op.between]: [startOfMonth, endOfMonth]
                    }
                }
            });
            const clonedEventos = JSON.parse(JSON.stringify(eventos));
            clonedEventos.forEach(evento => {

                evento.start = dayjs(evento.start).format('YYYY-MM-DD');
                evento.end = dayjs(evento.end).format('YYYY-MM-DD');

            });
            const clonedDatosEvento = JSON.parse(JSON.stringify(datosEvento));
            clonedDatosEvento.forEach(datos => {

                datos.Evento.start = dayjs(datos.Evento.start).format('YYYY-MM-DD');
                datos.Evento.end = dayjs(datos.Evento.end).format('YYYY-MM-DD');

            });
            const combinedArray = clonedEventos.concat(clonedDatosEvento);
            const sortedArray = [...combinedArray].sort((a, b) => {
                const dateA = new Date(a.Evento ? a.Evento.start : a.start);
                const dateB = new Date(b.Evento ? b.Evento.start : b.start);
                return dateA - dateB;
            });

            return { Eventos: sortedArray };
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
    updateDatosEvento: async (id, changes) => {
        try {
            const event = await Evento.findByPk(changes.datosEvento.EventoId);
            const datosEvento = await Dato_Evento.findByPk(id);
            if (!event) {
                return "Event not found!";
            }
            const updatedEvent = await Evento.update(
                {
                    title: changes.Evento.title ? changes.Evento.title : event.title,
                    color: changes.Evento.color ? changes.Evento.color : event.color,
                    state: changes.Evento.state ? changes.Evento.state : event.state,
                    tipo: changes.Evento.tipo ? changes.Evento.tipo : event.tipo,
                    start_Time: changes.Evento.start_Time ? changes.Evento.start_Time : event.start_Time,
                    end_Time: changes.Evento.end_Time ? changes.Evento.end_Time : event.end_Time,
                    start: changes.Evento.start ? dayjs(changes.Evento.start) : event.start,
                    end: changes.Evento.end ? dayjs(changes.Evento.end) : event.end,
                    allDay: changes.Evento.allDay ? changes.Evento.allDay : event.allDay,
                },
                {
                    where: {
                        id: changes.datosEvento.EventoId,
                    },
                }
            );

            const updatedDatosEvento = await Dato_Evento.update(
                {
                    descripcion: changes.datosEvento.descripcion ? changes.datosEvento.descripcion : datosEvento.descripcion,
                    multimedia: changes.datosEvento.multimedia ? changes.datosEvento.multimedia : datosEvento.multimedia,
                    categoria: changes.datosEvento.categoria ? changes.datosEvento.categoria : datosEvento.categoria,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
            if (updatedEvent[0] == 1) {
                return event;
            }
            return "Error event update!";
        } catch (error) {
            return error;
        }
    }
}