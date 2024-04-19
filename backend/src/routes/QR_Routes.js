const express = require("express");
const { catchedAsync } = require("../utils");
const { generarQR, verificarQR, existsQR } = require("../handlers/QRHandler");
const router = express();


router.post("/generarQR", generarQR);
router.post("/verificarQR", verificarQR);
router.post("/existsQR", existsQR);

module.exports = router;