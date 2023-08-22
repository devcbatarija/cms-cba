const express=require('express');
const { getAllPublicacion,addPublicacion } = require('../handlers/publicacionHandler');
const router=express();

router.get('/',getAllPublicacion);
router.post('/create',addPublicacion);

module.exports=router;