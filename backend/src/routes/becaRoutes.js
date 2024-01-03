const express = require('express');
const { getAllBeca,
    addBeca,
    hiddenBeca,
    updateBeca,
    deleteBeca,
    getBeca,
    deleteBecaSelect,
    getFilterBecas } = require('../handlers/becaHandler');
const router = express();

router.get('/', getAllBeca);
router.post('/create', addBeca);
router.put('/hidden/:id', hiddenBeca);
router.put('/update/:id', updateBeca);
router.delete('/delete/:id', deleteBeca);
router.get('/getone/:id', getBeca);
router.post('/filters', getFilterBecas);
router.post('/delete/select', deleteBecaSelect);

module.exports = router;