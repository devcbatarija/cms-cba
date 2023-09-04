const express=require("express");
const { addEvento, getAllEvento } = require("../handlers/eventoHandler");
const router= express();

router.get("/",getAllEvento);
router.post("/create",addEvento);

module.exports=router;