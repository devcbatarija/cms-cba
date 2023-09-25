const express=require("express");
const { getAllEPredifinido, addEPredefinido } = require("../handlers/eventoPredefinidoHandler");
const { validateEvent } = require("../middlewares/eventoMiddleware");
const { isAdmin } = require("../services/jwtservice");
const router=express();

router.get("/",getAllEPredifinido);
router.post("/create",isAdmin,validateEvent, addEPredefinido);

module.exports=router;