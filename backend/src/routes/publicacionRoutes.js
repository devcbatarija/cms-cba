const express = require('express');
const { getAllPublicacion,
    addPublicacion,
    hiddenPublication,
    updatePublication,
    deletePublication,
    getPublication,
    deletePublicationSelect,
    getFilterPublications } = require('../handlers/publicacionHandler');
const router = express();

router.get('/', getAllPublicacion);
router.post('/create', addPublicacion);
router.put('/hidden/:id', hiddenPublication);
router.put('/update/:id', updatePublication);
router.delete('/delete/:id', deletePublication);
router.get('/getone/:id', getPublication);
router.post('/filters', getFilterPublications);
router.post('/delete/select', deletePublicationSelect);

module.exports = router;