const express=require('express');
const {getAllTestimonios,createTestimonio } = require('../handlers/testimoniosHandler');
const router=express();

router.get('/',getAllTestimonios);
router.post('/',createTestimonio);

module.exports=router;