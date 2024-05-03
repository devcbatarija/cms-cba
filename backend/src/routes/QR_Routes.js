const express = require("express");
const { catchedAsync } = require("../utils");
const { generarQR, verificarQR, existsQR, reportParallelsQr, reportStudentsQr } = require("../handlers/QRHandler");
const router = express();


router.post("/generarQR", generarQR);
router.post("/verificarQR", verificarQR);
router.post("/existsQR", existsQR);
//rutas reportes de qr
router.get("/report/parallels", catchedAsync(reportParallelsQr));
router.get("/report/students", catchedAsync(reportStudentsQr));

module.exports = router;