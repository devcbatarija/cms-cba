const {Router} =require("express");
const testRouter=require("./testRouter");
const userRouter=require("./usuarioRoutes.js");
const publicacionRoutes=require('./publicacionRoutes');
const eventoRoutes=require("./eventoRoutes");
const EPredefinido=require("./eventoPredefinidoRoutes")
const programaRoutes=require('./programaRoutes');
const router=Router();

router.use('/test',testRouter); //"http:localhost:3001/api/test"
router.use('/users',userRouter);
router.use('/publication',publicacionRoutes);
router.use("/event",eventoRoutes);
router.use("/eventpredefinido",EPredefinido);
router.use('/programa', programaRoutes); // http


module.exports=router;

