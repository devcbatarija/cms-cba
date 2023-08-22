const jwt =require("jsonwebtoken");
const {Usuario}=require("../db");

const keymaster="token_jwt_login";

module.exports={
    generateToken:async(user)=>{
        console.log(user+"Usuario recibido")
        try {
            const payload={
                userId:user.id_Usuario,
                nombre:user.nombres,
                ci:user.ci
            }
            const options={
                expiresIn:'1h'
            }
            const tokengen=await jwt.sign(payload,keymaster,options);
            console.log(tokengen);
            return tokengen;
        } catch (error) {
            
        }
    },
    validateToken:async(token)=>{
        try {
            
        } catch (error) {
            
        }
    },
    deleteToken:async(token)=>{

    },
    validateUser:async(req,res,next)=>{
        try {
            const user=req.body;
            next()
        } catch (error) {
            res.status(401).json({error:error.message});
        }
    }
    //lucio sollit
}