const {Router} =require("express");
const testRouter=require("./testRouter");
const router=Router();

router.use('/test',testRouter) //"http:localhost:3001/api/" "/test"

module.exports=router;

