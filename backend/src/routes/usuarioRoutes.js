const express = require("express");
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
  getUserDetails,
  getUsersFromGraficsCookie,
  qrReader,
  authLoginCbaPlus
} = require("../handlers/usuarioHandler");

const { validToken, isAdmin, validTokenMobile } = require("../services/jwtservice");
const catchedAsync = require("../utils/catchedAsync");
const { formRegister } = require("../handlers/formHandler");
const { response } = require("../utils");
const router = express();

router.get('/', isAdmin, catchedAsync(getAllUsuarios)); //http://localhost:3001/api/users/   GET
router.get("/details/:id", catchedAsync(getUserDetails)); //http://localhost:3001/api/users/   GET

router.post("/", catchedAsync(postUser)); //http://localhost:3001/api/users/  POST
router.post("/valid/email", catchedAsync(emailVerify)); //Verificar email existente
router.delete('/delete/:id', deleteById); //Borrar usuario por id
router.put('/update/:id', updateById); //Actualizar usuairio por id
router.post('/login', catchedAsync(authLogin)) //Iniciar sesion
router.post('/loginCbaPlus', catchedAsync(authLoginCbaPlus)) //Iniciar sesion con CBA PLUS
router.post('/valid/token', validToken); //Validar valides de token e iniciar sesion
router.post("/valid/token/mobile", validTokenMobile); //Validar valides de token e iniciar sesion

router.get('/valid/token/email', emailVerifyToken)

router.put('/state/update/:id', catchedAsync(updateState))
router.get("/get/by/:id", catchedAsync(getById));

router.post("/delete/select", isAdmin, deleteSelect); //agregar a programas
router.put('/put/image', updateImage); //editar imagenes

router.post("/form/register", formRegister); //registrar formulario

router.get("/range/ages", catchedAsync(getUsersFromGraficsCookie));

router.post("/qr/reader/", catchedAsync(qrReader));
router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    // domain: 'http://localhost:5173', // Ajusta según sea necesario
    // path: '/', // Ajusta según sea necesario
    httpOnly: true, // Ajusta según sea necesario
  });
  response(res, 200, { success: 'logout successfully' })
})

module.exports = router;