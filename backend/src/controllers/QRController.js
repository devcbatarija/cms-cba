// Importa la biblioteca Day.js
const dayjs = require("dayjs");
const { Dato_Evento, Evento, QR } = require("../db");
const Sequelize = require("sequelize");
const { ClientError } = require("../utils/errors");
const { response } = require("../utils");

module.exports = {
  generarQR: async (data) => {
    console.log(data);
    const verificar = await QR.findOne({
      where: {
        id_Evento: data.id_Evento,
        id_Estudiante: data.id_Estudiante,
      },
    });
    if (verificar == null) {
      const qr = await QR.create(data);
      return qr;
    }
    return verificar;
  },
  verificarQR: async ({ id_QR }) => {

    const qr = await QR.findByPk(id_QR)
    if (qr == null) {
      throw new ClientError("QR no encontrado");
    }
    qr.update({ cantidad_uso: qr.cantidad_uso + 1 })
    return qr;
  },
  existsQR: async (data) => {
    const verificar = await QR.findOne({
      where: {
        id_Evento: data.id_Evento,
        id_Estudiante: data.id_Estudiante
      }
    })
    return verificar;
  },
};
