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
  //reportes QR
  reportEventQrParallels: async (res, idEv) => { //http://localhost:3001/appi/QR/report/parallels/5fee4503-805a-4ef0-8a45-8535278425a1   =PARAMS [idEv]
    const qrData = await findAllDataEvent(idEv);
    const parallels = [];

    qrData.forEach(qr => {
        const existingParallel = parallels.find(p => p.nombre_paralelo === qr.paralelo);
        if (existingParallel) {
            existingParallel.cantidad_uso += qr.cantidad_uso;
        } else {
            parallels.push({
                nombre_paralelo: qr.paralelo,
                cantidad_uso: qr.cantidad_uso,
                profesor: qr.profesor,
                mes:qr.mes_literal
            });
        }
    });
    const orderDesc = parallels.sort((a, b) => b.cantidad_uso - a.cantidad_uso);
    response(res, 200, orderDesc);
  },
  reportStudentsQr: async (res,idEv,pr) => { //http://localhost:3001/appi/QR/report/students/3b3a65ec-6a4e-4590-a440-23ca0dea5300/A    =PARAMS [idEv,paralelo]
    const qrData = await findAllDataEvent(idEv);
    const students = qrData.filter(qr => qr.paralelo === pr);
    if (!students.length) throw new ClientError("No hay datos de QRs con este paralelo");
    const orderDesc = students.sort((a, b) => b.cantidad_uso - a.cantidad_uso);
    response(res, 200, orderDesc)
  },
};
const findAllDataEvent = async (idEv) => {
  const datos_evento = await Dato_Evento.findByPk(idEv, {
    include: [{
      model: QR,
    }],
  }).catch((error) => {
    throw new ClientError("Error al buscar el evento, verifique el id del evento");
  });
  
  if (!datos_evento) throw new ClientError("Datos evento no encontrado");
  else if(datos_evento.QRs.length == 0) throw new ClientError("No hay QRs para mostrar");
  return datos_evento.QRs;
};