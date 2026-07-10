const express = require('express');
const router = express.Router();

const {
  obtenerSaludo,
  responderConsulta,
  responderSugerencia,
} = require('../controllers/chatbotController');

router.get('/saludo', obtenerSaludo);
router.post('/consulta', responderConsulta);
router.post('/sugerencia', responderSugerencia);

module.exports = router;