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
    deleteSelect
}=require("../handlers/usuarioHandler");

const { validToken } = require("../services/jwtservice");
const router=express();

router.get('/',getAllUsuarios); //http://localhost:3001/api/users/   GET
router.post('/',postUser); //http://localhost:3001/api/users/  POST
router.post('/valid/email',emailVerify) //Verificar email existente
router.delete('/delete/:id',deleteById); //Borrar usuario por id
router.put('/update/:id',updateById); //Actualizar usuairio por id
router.post('/login',authLogin) //Iniciar sesion
router.post('/valid/token',validToken) //Validar valides de token e iniciar sesion
router.get('/valid/token/email',emailVerifyToken)

router.put('/state/update/:id',updateState)
router.get('/get/by/:id',getById);

router.post('/delete/select',deleteSelect);

module.exports=router;