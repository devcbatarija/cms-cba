const express = require('express');
const router = express.Router();
const {uploadImage}=require("../handlers/uploadHandler")
// const multer = require('multer');
// const uploadController = require('./uploadController'); // Importa el controlador

// // Configuración de multer para manejar la carga de archivos
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Ruta para la carga de archivos
// router.post('/upload', upload.single('image'), uploadController.uploadFile);

router.post("/upload",uploadImage) // "localhost:3001/api/files/upload"
module.exports = router;
