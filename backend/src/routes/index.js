const {Router} =require("express");
const testRouter=require("./testRouter");
const userRouter=require("./usuarioRoutes.js");
const publicacionRoutes=require('./publicacionRoutes');
const eventoRoutes=require("./eventoRoutes");
const EPredefinido=require("./eventoPredefinidoRoutes")
const programaRoutes=require('./programaRoutes');
const uploadRoutes=require('./uploadRoutes');
const podcastRoutes=require('./podcastRoutes');
const testimonioRoutes=require('./testimoniosRoutes');
const datos_EventoRoutes = require('./datos_EventoRoutes');
const galleryRoutes=require('./gallery_Routes');
const ambienteRoutes=require('./ambiente_Routes');
const programPrices=require('./programPriceRoute')

const router=Router();

router.use('/test',testRouter); //"http:localhost:3001/api/test"
router.use('/users',userRouter);
router.use('/publication',publicacionRoutes);
router.use('/event',eventoRoutes);
router.use('/eventpredefinido',EPredefinido);
router.use('/program', programaRoutes); // http
router.use("/files",uploadRoutes)
router.use('/podcast',podcastRoutes)
router.use('/testimonios',testimonioRoutes)
router.use('/datosevento',datos_EventoRoutes)
router.use('/gallery', galleryRoutes)
router.use('/environment', ambienteRoutes)
router.use('/programPrices', programPrices)


module.exports=router;

