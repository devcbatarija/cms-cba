const { Usuario } = require("../db");

module.exports = {
    validateEvent: async (req, res, next) => {
        try {
            if (!req.body){
                return res.status(400).json({ messageError: 'No event data' });
            } 
            const datos = req.body;
            const propiedadesVacias = [];

            for (let propiedad in datos) {
                if (datos[propiedad] === null || datos[propiedad] === '' && propiedad!= "id") {
                    propiedadesVacias.push(`El campo ${propiedad} es obligatorio`);
                }
            }

            if (propiedadesVacias.length === 0) {
                return next();
            } else {
                return res.status(400).json({ Errors:propiedadesVacias});
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
