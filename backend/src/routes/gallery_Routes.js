const express = require('express');
const { getAllGallery, addGallery, deleteGallery, deleteGallerySelect } = require('../handlers/galleryHandler');
const router = express();
router.get('/', getAllGallery)
router.post('/', addGallery)
router.delete('/:id', deleteGallery)

router.post('/delete/select', deleteGallerySelect);

module.exports = router;