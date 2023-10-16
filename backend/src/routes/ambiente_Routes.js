const express = require('express');
const { getAmbientes, addAmbiente } = require('../handlers/ambienteHandler');

const router = express();

router.get('/', getAmbientes)
router.post('/', addAmbiente)

module.exports = router;