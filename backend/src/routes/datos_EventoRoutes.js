const express=require("express");
const { isAdmin } = require("../services/jwtservice");
const { addDatosEvento, getAllDatosEvento, getEventsByDate } = require("../handlers/datos_EventoHandler");
const router= express();

router.get("/",getAllDatosEvento);
router.post("/create",addDatosEvento);
router.post("/getEventsByDate",getEventsByDate);
// router.put("/update/:id",isAdmin,validateEvent,updateEvento);
// router.get("/getById/:id",getEventById);

module.exports=router;