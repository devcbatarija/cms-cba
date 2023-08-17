const express=require("express");
const {test,testRegister,testDelete}=require("../handelrs/testHandler")
const router=express();

router.get('/',test) //middlewares
router.post('/register',testRegister)
router.delete('/delete',testDelete)

module.exports=router;
