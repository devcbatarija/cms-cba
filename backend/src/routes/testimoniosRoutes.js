const express=require('express');
const {getAllTestimonios,createTestimonio, deleteTestimonioSelect } = require('../handlers/testimoniosHandler');
const router=express();

router.get('/',getAllTestimonios);
router.post('/',createTestimonio);

router.post('/delete/select', deleteTestimonioSelect);

module.exports=router;