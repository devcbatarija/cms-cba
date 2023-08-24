const jwt =require("jsonwebtoken");
const {Usuario}=require("../db");

const keymaster="token_jwt_login";

module.exports={
    signIn:async(user)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const payload={
                    _userId:user.id_Usuario,
                    nombre:user.nombres,
                    ci:user.ci
                }
                const options={
                    expiresIn:'2h'
                }
                const tokengen=await jwt.sign(payload,keymaster,options);
                resolve(tokengen);            
            } catch (error) {
                reject(error)
            }
        })
    },
    requireToken:async(req,res,next)=>{
        const user=await req.headers.authorization;
        try {
            if(!user)res.status(401).json({messageError: 'Invalid authorization'});
            req.user=user;
            next()
        } catch (error) {
            res.status(400).json({messageError:error.message});
        }
    }
}