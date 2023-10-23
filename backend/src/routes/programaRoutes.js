const express = require('express');
const router = express.Router();
const {
     getAllPrograms,
     addPrograma,
     updatePrograma,
     deletePrograma,
     getProgram,
     deleteProgramSelect
} = require('../handlers/programaHandler');

// Obtener todos los programas y agregar un nuevo programa
router.get('/', getAllPrograms);
router.post('/', addPrograma);

// Actualizar, eliminar y obtener un solo programa por su ID
router.put('/:id', updatePrograma);
router.delete('/:id', deletePrograma);
router.get('/:id', getProgram);


router.post('/delete/select', deleteProgramSelect);
module.exports = router;
