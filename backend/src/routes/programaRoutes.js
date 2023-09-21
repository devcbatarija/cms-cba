const express = require('express');
const { getAllPrograms, addPrograma, hiddenPrograma,
     updatePrograma, deletePrograma, getProgram, deleteSelect } = require('../handlers/programaHandler');
const router=express();


router.get('/', getAllPrograms);
router.post('/create',addPrograma);
router.put('/hidden/:id',hiddenPrograma);
router.put('/update/:id',updatePrograma);
router.delete('/delete/:id',deletePrograma);
router.get('/getOne/:id',getProgram)

router.get('/state/update/:id');

router.post('/delete/select',deleteSelect); //agregar a programas
module.exports=router;