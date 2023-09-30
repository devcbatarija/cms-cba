const { Usuario } = require("../db");

module.exports = {
    validateEvent: async (req, res, next) => {
        try {
            if (!req.body) {
                return res.status(400).json({ messageError: 'No event data' });
            }
            const datos = req.body;
            delete datos.id
            const propiedadesVacias = {};
            if (datos.allDay === true) {
                delete datos.start_Time;
                delete datos.end_Time;
                for (let propiedad in datos) {
                    if (datos[propiedad] === null || datos[propiedad] === '') {
                        propiedadesVacias[propiedad] = `El campo ${propiedad} es obligatorio`;
                    }
                }
            }
            else {
                for (let propiedad in datos) {
                    if (datos[propiedad] === null || datos[propiedad] === '') {
                        propiedadesVacias[propiedad] = `El campo ${propiedad} es obligatorio`;
                    }
                }
            }
            if (Object.keys(propiedadesVacias).length === 0) {
                return next();
            } else {
                return res.status(400).json({ Errors: propiedadesVacias });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    validateEventoPredefinido: async (req, res, next) => {
        try {
            if (!req.body) {
                return res.status(400).json({ messageError: 'No event data' });
            }
            const datos = {
                title: req.body.title,
                color: req.body.color,
                tipo: req.body.tipo,
                start_Time: req.body.start_Time,
                end_Time: req.body.end_Time,
                allDay: req.body.allDay
            };
            const propiedadesVacias = {};
            if (datos.allDay === true) {
                delete datos.start_Time;
                delete datos.end_Time;
                for (let propiedad in datos) {
                    if (datos[propiedad] === null || datos[propiedad] === '') {
                        propiedadesVacias[propiedad] = `El campo ${propiedad} es obligatorio`;
                    }
                }
            }
            else {
                for (let propiedad in datos) {
                    if (datos[propiedad] === null || datos[propiedad] === '') {
                        propiedadesVacias[propiedad] = `El campo ${propiedad} es obligatorio`;
                    }
                }
            }
            if (Object.keys(propiedadesVacias).length === 0) {
                return next();
            } else {
                return res.status(400).json({ Errors: propiedadesVacias });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
