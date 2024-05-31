const express = require("express");
const { catchedAsync } = require("../utils");
const { generarQR, verificarQR, existsQR, reportParallelsQr, reportStudentsQr, downloadReportParalels, downloadReportStudents, readQrCode } = require("../handlers/QRHandler");
const router = express();


router.post("/generarQR", generarQR);
router.post("/verificarQR", verificarQR);
router.post("/existsQR", existsQR);
//rutas reportes de qr
router.get("/report/parallels/:idEv", catchedAsync(reportParallelsQr));
router.get("/report/students/:idEv/:paralelo", catchedAsync(reportStudentsQr));
router.post("/report/downloadReportParalels", downloadReportParalels);
router.post("/report/downloadReportStudents", downloadReportStudents);
router.post("/reader",catchedAsync(readQrCode));

module.exports = router;