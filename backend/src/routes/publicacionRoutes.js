const express=require('express');
const { getAllPublicacion,addPublicacion } = require('../handelrs/publicacionHandler');
const router=express();
router.get('/',getAllPublicacion);
router.post('/create',addPublicacion);

module.exports=router;