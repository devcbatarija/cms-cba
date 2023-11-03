const express=require("express");
const {
  getAllUsuarios,
  postUser,
  deleteById,
  updateById,
  authLogin,
  emailVerify,
  emailVerifyToken,
  updateState,
  getById,
  deleteSelect,
  updateImage,
  getUserDetails
} = require("../handlers/usuarioHandler");

const { validToken } = require("../services/jwtservice");
const catchedAsync = require("../utils/catchedAsync");
const { formRegister } = require("../handlers/formHandler");
const router=express();

router.get('/',getAllUsuarios); //http://localhost:3001/api/users/   GET
router.get('/details/:id',getUserDetails); //http://localhost:3001/api/users/   GET

router.post('/',postUser); //http://localhost:3001/api/users/  POST
router.post('/valid/email',emailVerify); //Verificar email existente
router.delete('/delete/:id',deleteById); //Borrar usuario por id
router.put('/update/:id',updateById); //Actualizar usuairio por id
router.post('/login',authLogin) //Iniciar sesion
router.post('/valid/token',validToken); //Validar valides de token e iniciar sesion
router.get('/valid/token/email',emailVerifyToken)

router.put('/state/update/:id',catchedAsync(updateState))
router.get("/get/by/:id", catchedAsync(getById));

router.post('/delete/select',deleteSelect); //agregar a programas
router.put('/put/image',updateImage); //editar imagenes

router.post("/form/register", formRegister); //registrar formulario
module.exports=router;