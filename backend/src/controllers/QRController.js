// Importa la biblioteca Day.js
const dayjs = require('dayjs');
const { Dato_Evento, Evento, QR } = require("../db")
const Sequelize = require('sequelize');
const { ClientError } = require('../utils/errors');

module.exports = {

    generarQR: async (data) => {
        const verificar = await QR.findOne({
            where: {
                id_Evento: data.id_Evento,
                id_Estudiante: data.id_Estudiante
            }
        })
        if (verificar == null) {
            const qr = await QR.create(data);
            return qr;
        }
        throw new ClientError("El QR ya existe!", 401);

    },
    verificarQR: async (data) => {
        const verificar = await QR.findOne({
            where: {
                id_Evento: data.id_Evento,
                id_Estudiante: data.id_Estudiante
            }
        })
        // if (verificar != null) {
        //     return verificar;
        // }
        return verificar;
    },
}