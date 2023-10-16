const express = require('express');
const { getAllGallery, addGallery, deleteGallery } = require('../handlers/galleryHandler');
const router = express();
router.get('/', getAllGallery)
router.post('/', addGallery)
router.delete('/:id', deleteGallery)

module.exports = router;