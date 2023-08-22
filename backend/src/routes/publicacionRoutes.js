const express=require('express');
const { getAllPublicacion,addPublicacion,hiddenPublication,updatePublication, deletePublication,
getPublication} = require('../handlers/publicacionHandler');
const router=express();

router.get('/',getAllPublicacion);
router.post('/create',addPublicacion);
router.put('/hidden/:id', hiddenPublication);
router.put('/update/:id', updatePublication);
router.delete('/delete/:id', deletePublication);
router.get('/getOne/:id', getPublication);

module.exports=router;