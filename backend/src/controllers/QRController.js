// Importa la biblioteca Day.js
const dayjs = require("dayjs");
const { Dato_Evento, Evento, QR } = require("../db");
const Sequelize = require("sequelize");
const { ClientError } = require("../utils/errors");
const { response } = require("../utils");
const ExcelJs = require("exceljs");
const { formatImage } = require("./uploadController");
const Jimp = require("jimp");
const QrCode  = require("qrcode-reader");
module.exports = {
  readQrCode : async (bd) => { 
    if (bd.type === "image") {
      try {
        const buffer = Buffer.from(bd.filePath, 'base64'); 
        const image = await Jimp.read(buffer); 
        const qr = new QrCode(); 
        return new Promise((resolve, reject) => {
          qr.callback = (err, value) => {
            if (err) {
              console.log(err)
              return reject('Error reading QR code.');
            }
            resolve(value);
          }; 
          qr.decode(image.bitmap);
        });
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred while reading the QR code.');
      }
    } else {
      throw new Error("Tipo de archivo no soportado.");
    }
  },
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
  reportEventQrParallels: async (res, idEv) => {
    //http://localhost:3001/appi/QR/report/parallels/5fee4503-805a-4ef0-8a45-8535278425a1   =PARAMS [idEv]
    const qrData = await findAllDataEvent(idEv);
    const parallels = [];

    qrData.forEach((qr) => {
      const existingParallel = parallels.find(
        (p) => p.nombre_paralelo === qr.paralelo
      );
      if (existingParallel) {
        existingParallel.cantidad_uso += qr.cantidad_uso;
      } else {
        parallels.push({
          nombre_paralelo: qr.paralelo,
          cantidad_uso: qr.cantidad_uso,
          profesor: qr.profesor,
          mes: qr.mes_literal,
          gestion: qr.gestion,
          inicio_modulo: qr.inicio_modulo,
          fin_modulo: qr.fin_modulo,
          horario: qr.horario,
        });
      }
    });
    const orderDesc = parallels.sort((a, b) => b.cantidad_uso - a.cantidad_uso);
    response(res, 200, orderDesc);
  },
  reportStudentsQr: async (res, idEv, pr) => {
    //http://localhost:3001/appi/QR/report/students/3b3a65ec-6a4e-4590-a440-23ca0dea5300/A    =PARAMS [idEv,paralelo]
    const qrData = await findAllDataEvent(idEv);
    const students = qrData.filter((qr) => qr.paralelo === pr);
    if (!students.length)
      throw new ClientError("No hay datos de QRs con este paralelo");
    const orderDesc = students.sort((a, b) => b.cantidad_uso - a.cantidad_uso);
    response(res, 200, orderDesc);
  },

  downloadReportParalels: async (res, data) => {
    const evento = await Dato_Evento.findByPk(data.eventId, {
      include: {
        model: Evento,
      },
    });
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("Referidos_Paralelos");
    const rowsWithText = [
      [
        "Modulo",
        `${data.paralels[0].mes} - ${dayjs(data.paralels[0].gestion).year()}`,
        "",
        "Evento:",
        evento.Evento.title,
      ],
      [
        "Inicio de modulo",
        dayjs(data.paralels[0].inicio_modulo).format("DD/MM/YYYY"),
        "",
        "Fecha del evento:",
        dayjs(evento.Evento.start).format("DD/MM/YYYY"),
      ],
      [
        "Fin de modulo",
        dayjs(data.paralels[0].fin_modulo).format("DD/MM/YYYY"),
      ],
      // Puedes agregar más filas aquí si es necesario
    ];
    // Insertar datos adicionales
    rowsWithText.map((row) => {
      worksheet.addRow(row);
    });
    // Insertar una fila vacía
    worksheet.addRow();
    // Agregar encabezados
    worksheet.addRow([
      "Nro",
      "Paralelo",
      "Profesor",
      "Horario",
      "Cantidad de Referidos",
    ]);
    data.paralels.map((p, index) => {
      // Agregar filas de datos
      worksheet.addRow([
        index + 1,
        p.nombre_paralelo,
        p.profesor,
        p.horario,
        p.cantidad_uso,
      ]);
    });
    worksheet.getRow(5).font = {
      name: "Calibri",
      family: 4,
      size: 12,
      bold: true,
    };
    applyStyleToCellRange(worksheet, "A1", "A3", {
      font: { bold: true, size: 12 },
    });
    applyStyleToCellRange(worksheet, "D1", "D2", {
      font: { bold: true, size: 12 },
    });
    applyStyleToCellRange(worksheet, "E6", `E${data.paralels.length + 6}`, {
      alignment: { horizontal: "center" },
      font: { bold: true, size: 12 },
    });
    autoFitColumnWidth(worksheet);
    worksheet.getColumn("E").eachCell(function (cell, rowNumber) {
      // Verificar si la celda cumple con la validación
      if (cell.value > 0) {
        // Aplicar estilos a las celdas que cumplen con la validación
        cell.font = { ...cell.font, color: { argb: "22c55e" } }; // Color verde
      } else if (cell.value == 0) {
        // Aplicar estilos a las celdas que no cumplen con la validación
        cell.font = { ...cell.font, color: { argb: "f87171" } }; // Color rojo
      }
    });
    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=Report.xlsx");
    res.send(buffer);
  },

  downloadReportStudents: async (res, students) => {
    const evento = await Dato_Evento.findByPk(students[0].id_Evento, {
      include: {
        model: Evento,
      },
    });
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("Referidos_Por_Estudiante");
    const rowsWithText = [
      ["Paralelo:", students[0].paralelo, "", "Evento:", evento.Evento.title],
      [
        "Profesor:",
        students[0].profesor,
        "",
        "Fecha del evento:",
        dayjs(evento.Evento.start).format("DD/MM/YYYY"),
      ],
      ["Gestion:", students[0].gestion],
      [
        "Inicio del modulo:",
        dayjs(students[0].inicio_modulo).format("DD/MM/YYYY"),
      ],
      ["Fin del modulo:", dayjs(students[0].fin_modulo).format("DD/MM/YYYY")],
      ["Horario:", students[0].horario],
      // Puedes agregar más filas aquí si es necesario
    ];
    // Insertar datos adicionales
    rowsWithText.map((row) => {
      worksheet.addRow(row);
    });

    // Insertar una fila vacía
    worksheet.addRow();

    // Agregar encabezados
    worksheet.addRow([
      "Nro",
      "Estudiante",
      "Paralelo",
      "Modulo",
      "Cantidad de Referidos",
    ]);

    students.map((std, index) => {
      // Agregar filas de datos
      worksheet.addRow([
        index + 1,
        std.nombre_estudiante,
        std.paralelo,
        `${std.mes_literal} - ${std.gestion}`,
        std.cantidad_uso,
      ]);
    });
    worksheet.getRow(8).font = {
      name: "Calibri",
      family: 4,
      size: 12,
      bold: true,
    };
    applyStyleToCellRange(worksheet, "A1", "A6", {
      font: { bold: true, size: 12 },
    });
    applyStyleToCellRange(worksheet, "D1", "D2", {
      font: { bold: true, size: 12 },
    });
    applyStyleToCellRange(worksheet, "E9", `E${students.length + 9}`, {
      alignment: { horizontal: "center" },
      font: { bold: true, size: 12 },
    });
    autoFitColumnWidth(worksheet);
    worksheet.getColumn("E").eachCell(function (cell, rowNumber) {
      // Verificar si la celda cumple con la validación
      if (cell.value > 0) {
        // Aplicar estilos a las celdas que cumplen con la validación
        cell.font = { ...cell.font, color: { argb: "22c55e" } }; // Color verde
      } else if (cell.value == 0) {
        // Aplicar estilos a las celdas que no cumplen con la validación
        cell.font = { ...cell.font, color: { argb: "f87171" } }; // Color rojo
      }
    });
    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=Report.xlsx");
    res.send(buffer);
  },
};
const findAllDataEvent = async (idEv) => {
  const datos_evento = await Dato_Evento.findByPk(idEv, {
    include: [
      {
        model: QR,
      },
    ],
  }).catch((error) => {
    throw new ClientError(
      "Error al buscar el evento, verifique el id del evento"
    );
  });

  if (!datos_evento) throw new ClientError("Datos evento no encontrado");
  else if (datos_evento.QRs.length == 0)
    throw new ClientError("No hay QRs para mostrar");
  return datos_evento.QRs;
};

const autoFitColumnWidth = (worksheet, minimalWidth = 5) => {
  worksheet.columns.forEach((column) => {
    let maxColumnLength = 0;
    if (column && typeof column.eachCell === "function") {
      column.eachCell((cell) => {
        maxColumnLength = Math.max(
          maxColumnLength,
          minimalWidth,
          cell.value ? cell.value.toString().length : 0
        );
      });
      column.width = maxColumnLength + 1;
    }
  });
  // return worksheet; // for chaining.
};

const applyStyleToCellRange = (worksheet, startCell, endCell, styleOptions) => {
  // Convertir las celdas de inicio y fin a objetos de celda
  const startRow = worksheet.getCell(startCell).row;
  const startCol = worksheet.getCell(startCell).col;
  const endRow = worksheet.getCell(endCell).row;
  const endCol = worksheet.getCell(endCell).col;

  // Iterar sobre el rango de celdas y aplicar el estilo
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      const cell = worksheet.getCell(row, col);
      // Aplicar el estilo a la celda
      Object.assign(cell, styleOptions);
    }
  }
};
