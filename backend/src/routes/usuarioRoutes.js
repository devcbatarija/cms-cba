const express=require("express");
const {getAllUsuarios,postUser, deleteById, updateById,validateUser}=require("../handelrs/usuarioHandler");
const router=express();

router.get('/',getAllUsuarios); //http://localhost:3001/api/users/   GET
router.post('/',postUser); //http://localhost:3001/api/users/  POST
router.delete('/delete/:id',deleteById);
router.put('/update/:id',updateById);
router.post('/access',validateUser)

module.exports=router;