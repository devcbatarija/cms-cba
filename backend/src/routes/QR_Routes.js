const express=require("express");
const { catchedAsync } = require("../utils");
const { generarQR, verificarQR } = require("../handlers/QRHandler");
const router= express();


router.post("/generarQR",generarQR);
router.post("/verificarQR",verificarQR);

module.exports=router;