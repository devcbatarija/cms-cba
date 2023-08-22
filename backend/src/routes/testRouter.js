const express=require("express");
const {test,testRegister,testDelete}=require("../handlers/testHandler")
const router=express();

router.get('/',test) //middlewares     //"http:localhost:3001/api/test/"
router.post('/register',testRegister)  //"http:localhost:3001/api/test/resgister"
router.delete('/delete',testDelete)    //"http:localhost:3001/api/test/delete"

module.exports=router;
