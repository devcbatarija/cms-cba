const {Router} =require("express");
const testRouter=require("./testRouter");
const userRouter=require("./usuarioRoutes.js");
const router=Router();

router.use('/test',testRouter); //"http:localhost:3001/api/test"
router.use('/users',userRouter);
module.exports=router;

