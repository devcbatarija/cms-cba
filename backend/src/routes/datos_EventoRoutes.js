const express=require("express");
const { isAdmin } = require("../services/jwtservice");
const { addDatosEvento, getAllDatosEvento, getEventsByDate, updateDatosEvento, generarQr } = require("../handlers/datos_EventoHandler");
const { catchedAsync } = require("../utils");
const router= express();

router.get("/",getAllDatosEvento);
router.post("/create",addDatosEvento);
router.post("/getEventsByDate",getEventsByDate);
router.put("/update/:id",updateDatosEvento);
router.post("/generarQR",catchedAsync(generarQr));
// router.get("/getById/:id",getEventById);

module.exports=router;