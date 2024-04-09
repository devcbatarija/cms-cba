const express=require("express");
const { catchedAsync } = require("../utils");
const { generarQR, verificarQR } = require("../handlers/QRHandler");
const router= express();


router.post("/generarQR",catchedAsync(generarQR));
router.post("/verificarQR",catchedAsync(verificarQR));

module.exports=router;