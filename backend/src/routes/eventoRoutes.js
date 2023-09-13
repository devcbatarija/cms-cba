const express=require("express");
const { addEvento, getAllEvento, updateEvento } = require("../handlers/eventoHandler");
const { validateEvent } = require("../middlewares/eventoMiddleware");
const { isAdmin } = require("../services/jwtservice");
const router= express();

router.get("/",getAllEvento);
router.post("/create",isAdmin,validateEvent,addEvento);
router.put("/update/:id",updateEvento);

module.exports=router;