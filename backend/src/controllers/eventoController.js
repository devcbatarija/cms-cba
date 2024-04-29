// Importa la biblioteca Day.js
const dayjs = require('dayjs');
const { Evento, Dato_Evento, Consigna_Evento } = require("../db")
const { Op } = require('sequelize');
const { ClientError } = require('../utils/errors');

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
          evento.end = dayjs(evento.end).add(1, 'day').format('YYYY-MM-DD');
        }
      });
      return clonedEventos;
    } catch (error) {
      return error;
    }
  },
  getActiveEvents: async () => {
    try {
      const eventos = await Evento.findAll({
        where: {
          state: true,
        }
      });
      const clonedEventos = JSON.parse(JSON.stringify(eventos));
      clonedEventos.forEach(evento => {
        if (evento.allDay == false) {
          evento.start = (dayjs(evento.start).format('YYYY-MM-DD') + "T" + evento.start_Time);
          evento.end = (dayjs(evento.end).format('YYYY-MM-DD') + "T" + evento.end_Time);
        }
        else {
          evento.start = dayjs(evento.start).format('YYYY-MM-DD');
          evento.end = dayjs(evento.end).add(1, 'day').format('YYYY-MM-DD');
        }
      });
      return clonedEventos;
    } catch (error) {
      return error;
    }
  },
  getEventById: async (id) => {
    try {
      const event = await Evento.findByPk(id);
      if (!event) {
        throw new Error("Evento no encontrado!");
      }
      const clonedEvento = JSON.parse(JSON.stringify(event));
      clonedEvento.start = dayjs(clonedEvento.start).format("YYYY-MM-DD");
      clonedEvento.end = dayjs(clonedEvento.end).format("YYYY-MM-DD");

      // Fecha del evento actual
      const currentEventDate = dayjs(clonedEvento.start);

      if (event.tipo == 'General') {
        const datosEvento = await Dato_Evento.findOne({
          where: {
            EventoId: id
          },
          include: {
            model: Consigna_Evento
          }
        })

        // Buscar el evento anterior (prev)
        const prevEvent = await Evento.findOne({
          include: {
            model: Dato_Evento,
            where: {
              categoria: datosEvento.categoria
            },
            required: true
          },
          where: {
            start: {
              [Op.lt]: currentEventDate.toISOString() // Fechas anteriores
            },
            tipo: 'General'
          },

          order: [['start', 'DESC']], // Ordenar por fecha descendente
          limit: 1
        });

        // Buscar el evento siguiente (next)
        const nextEvent = await Evento.findOne({
          include: {
            model: Dato_Evento,
            where: {
              categoria: datosEvento.categoria
            },
            required: true
          },
          where: {
            start: {
              [Op.gt]: currentEventDate.toISOString() // Fechas futuras
            },
            tipo: 'General'
          },
          order: [['start', 'ASC']], // Ordenar por fecha ascendente
          limit: 1
        });

        const next = nextEvent != null ? {
          id: nextEvent.id,
          title: nextEvent.title,
          descripcion: nextEvent.Dato_Eventos[0].descripcion,
          image: nextEvent.Dato_Eventos[0].multimedia[0]
        } : null
        const prev = prevEvent != null ? {
          id: prevEvent.id,
          title: prevEvent.title,
          descripcion: prevEvent.Dato_Eventos[0].descripcion,
          image: prevEvent.Dato_Eventos[0].multimedia[0]
        } : null
        return { General: clonedEvento, datosEvento, prev, next };
      }
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
  deleteEventoById: async (id) => {
    try {
      const deletedEvent = await Evento.destroy({
        where: {
          id: id
        },
        cascade: true,
      })
      if (deletedEvent === 0) {
        throw new ClientError("No se encontró ningún evento con el ID proporcionado", 400);
      } else {
        return `Evento eliminado exitosamente.`
      }
    } catch (error) {
      return error
    }
  },
  updateEvento: async (id, changes) => {
    try {
      const event = await Evento.findByPk(id);
      if (!event) {
        return "Event not found!";
      }
      const updatedEvent = await Evento.update(
        {
          title: changes.title ? changes.title : event.title,
          color: changes.color ? changes.color : event.color,
          tipo: changes.tipo ? changes.tipo : event.tipo,
          start_Time: changes.start_Time ? changes.start_Time : event.start_Time,
          end_Time: changes.end_Time ? changes.end_Time : event.end_Time,
          start: changes.start ? dayjs(changes.start) : event.start,
          end: changes.end ? dayjs(changes.end) : event.end,
          allDay: changes.allDay,
          state: changes.state,
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