const {
  generarQR,
  verificarQR,
  existsQR,
  reportEventQrParallels,
  reportStudentsQr,
} = require("../controllers/QRController");
const { response } = require("../utils");
const { ClientError } = require("../utils/errors");

module.exports = {
  generarQR: async (req, res) => {
    try {
      const result = await generarQR(req.body);
      response(res, 200, {
        successMessage: "Se registro correctamente",
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },
  verificarQR: async (req, res) => {
    try {
      const result = await verificarQR(req.body);
      response(res, 200, { successMessage: "Success", result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  existsQR: async (req, res) => {
    try {
      const result = await existsQR(req.body);
      response(res, 200, { successMessage: "Existe", result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  //reportes QR
  reportParallelsQr: async (req, res) => {
    const { idEv } = req.params;
    if ( idEv != undefined ) await reportEventQrParallels(res, idEv );
    else throw new ClientError("No se ha enviado el id del evento");
  },
  reportStudentsQr: async (req, res) => {
    const { idEv,paralelo } = req.params;
    if(paralelo != undefined) await reportStudentsQr(res,idEv, paralelo);
    else throw new ClientError("No se ha enviado el paralelo"); 
  },
};
