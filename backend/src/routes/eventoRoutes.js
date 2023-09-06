const express=require("express");
const { addEvento, getAllEvento, updateEvento } = require("../handlers/eventoHandler");
const router= express();

router.get("/",getAllEvento);
router.post("/create",addEvento);
router.put("/update/:id",updateEvento);

module.exports=router;