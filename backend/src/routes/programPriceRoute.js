
const express = require('express');
const { obtenerTodosLosProgramasPrecios, crearProgramaPrecios, actualizarProgramaPrecios, eliminarProgramaPrecios } = require('../handlers/programPricesHandler');

const router = express();
router.get('/', obtenerTodosLosProgramasPrecios)
router.post('/add', crearProgramaPrecios)
router.put('/', actualizarProgramaPrecios)
router.delete('/:id', eliminarProgramaPrecios)

module.exports = router;