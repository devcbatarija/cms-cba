const {Router} =require("express");
const testRouter=require("./testRouter");
const publicacionRoutes=require('./publicacionRoutes');
const router=Router();

router.use('/test',testRouter) //"http:localhost:3001/api/test"
router.use('/publication',publicacionRoutes);
module.exports=router;

