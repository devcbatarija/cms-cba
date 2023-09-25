const express=require("express");
const { addEvento, getAllEvento, updateEvento, getEventById } = require("../handlers/eventoHandler");
const { validateEvent } = require("../middlewares/eventoMiddleware");
const { isAdmin } = require("../services/jwtservice");
const router= express();

router.get("/",getAllEvento);
router.post("/create",isAdmin,validateEvent,addEvento);
router.put("/update/:id",isAdmin,validateEvent,updateEvento);
router.get("/getById/:id",getEventById);

module.exports=router;