const express = require('express');
const { getAllPrograms, addPrograma, hiddenPrograma, updatePrograma, deletePrograma, getProgram } = require('../handlers/programaHandler');
const router=express();


router.get('/', getAllPrograms);
router.post('/create',addPrograma);
router.put('/hidden/:id',hiddenPrograma);
router.put('/update/:id',updatePrograma);
router.delete('/delete/:id',deletePrograma);
router.get('/getOne/:id',getProgram)

module.exports=router;