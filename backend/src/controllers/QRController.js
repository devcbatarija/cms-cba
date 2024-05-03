// Importa la biblioteca Day.js
const dayjs = require("dayjs");
const { Dato_Evento, Evento, QR } = require("../db");
const Sequelize = require("sequelize");
const { ClientError } = require("../utils/errors");
const { response } = require("../utils");

module.exports = {
  generarQR: async (data) => {
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
    const qr = await QR.findByPk(id_QR);
    if (qr == null) {
      throw new ClientError("QR no encontrado");
    }
    qr.update({ cantidad_uso: qr.cantidad_uso + 1 });
    return qr;
  },
  existsQR: async (data) => {
    const verificar = await QR.findOne({
      where: {
        id_Evento: data.id_Evento,
        id_Estudiante: data.id_Estudiante,
      },
    });
    return verificar;
  },
  reportEventQrParallels: async (res, gestion, mes) => {
    try {
      const filteredQRs = await QR.findAll({
        where: {
          gestion: gestion,
          mes_literal: mes,
        },
      });

      if (filteredQRs.length === 0) {
        throw new Error(
          "No hay registros de QR para la gestión y mes especificados"
        );
      }
      const groupedAndSummed = await filteredQRs.reduce((acc, qr) => {
        const key = `${qr.paralelo}-${qr.gestion}-${qr.mes_literal}`;

        if (!acc[key]) {
          acc[key] = {
            paralelo: qr.paralelo,
            cantidad_uso: 0,
            profesor: qr.profesor,
          };
        }
        acc[key].cantidad_uso += qr.cantidad_uso;
        return acc;
      }, {});
      const result = Object.values(groupedAndSummed);

      response(res, 200, result);
    } catch (error) {
      response(res, 500, { error: "Error interno del servidor" });
    }
  },
  reportStudentsQr: async () => {},
};
