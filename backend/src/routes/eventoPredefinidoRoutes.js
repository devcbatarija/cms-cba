const express=require("express");
const { getAllEPredifinido, addEPredefinido } = require("../handlers/eventoPredefinido");
const router=express();

router.get("/",getAllEPredifinido);
router.post("/create", addEPredefinido);

module.exports=router;