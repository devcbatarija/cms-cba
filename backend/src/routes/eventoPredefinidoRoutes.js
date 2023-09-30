const express=require("express");
const { getAllEPredifinido, 
    addEPredefinido, 
    updateEventoPredefinido, 
    getEventPredefinidoById } = require("../handlers/eventoPredefinidoHandler");

const { validateEventoPredefinido } = require("../middlewares/eventoMiddleware");
const { isAdmin } = require("../services/jwtservice");
const router=express();

router.get("/",getAllEPredifinido);
router.post("/create",isAdmin,validateEventoPredefinido, addEPredefinido);
router.put("/update/:id",isAdmin,validateEventoPredefinido,updateEventoPredefinido);
router.get("/getById/:id",getEventPredefinidoById)

module.exports=router;