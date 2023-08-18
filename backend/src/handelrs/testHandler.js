const { test,testRegister,testDelete } = require("../controllers/testController")

module.exports={
    test:async(req,res)=>{
        try {
            //req.body {}   req.params {}   req.query.id 
            const response=await test();
            res.status(200).send(response)
        } catch (error) {
            res.status(401).json({error:error.message})
        }
    },
    testRegister:async(req,res)=>{
        try {
            const response=await testRegister(req.body.user);
            res.status(200).json({message:response})
        } catch (error) {
            res.status(401).json({error:error.message})
        }
    },
    testDelete:async(req,res)=>{
        try {
            console.log(req.query.page)
            const response=await testDelete(req.query.page)
            res.status(200).json({message:response})
        } catch (error) {
            res.status(401).json({error:error.message})
            
        }
    }
}