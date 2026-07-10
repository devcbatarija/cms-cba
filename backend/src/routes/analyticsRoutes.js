const express = require('express');
const router = express.Router();
const { getInteracciones, registrarVisita, getVisitasPorDia } = require('../controllers/analyticsController');

router.get('/interacciones', getInteracciones);
router.post('/visita', registrarVisita);
router.get('/visitas-dia', getVisitasPorDia);

module.exports = router;