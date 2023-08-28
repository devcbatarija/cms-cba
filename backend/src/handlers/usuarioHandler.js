const { getAllUsuarios,postUsuario,deleteById,updateById, authLogin } = require("../controllers/usuarioController")

module.exports = {
    getAllUsuarios:async(req,res)=>{
        try {
            const result=await getAllUsuarios();
            res.status(200).json({result});
        } catch (error) {
            res.status(401).json({messageError:error.message});
        }
    },
    postUser:async(req,res)=>{
        try {
            if(!req.body){
                res.status(401).json({messageError:'No user data'});
            }
            const result=await postUsuario(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.stats(401).json({messageError:error.message})
        }
    },
    deleteById:async(req,res)=>{
        try {
            if(!req.params.id){
                res.status(401).json({messageError:'No user id'});
            }
            const result=await deleteById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            
        }
    },
    updateById:async(req,res)=>{
        try {
            if(!req.params.id)res.status(401).json({messageError:'No user id'});
            if(!req.body)res.status(401).json({messageError:'No user data'});

            const result=await updateById(req.params.id,req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({messageError:error.message});
        }
    },
    authLogin:async(req,res)=>{
        try {
            if(!req.body.correo && !req.body.password )return res.status(400).json({messageError:'Todos los datos son necesarios'});
            if(!req.body.correo || req.body.correo===" ")return res.status(400).json({messageError:'Correo no puede estar vacío'});
            if(!req.body.password || req.body.password===" ")return res.status(400).json({messageError:'Password no puede estar vacío'});
        
            const result=await authLogin(req.body);
            if(result.messageError){
                res.status(200).json(result.messageError)
            }
            else{
                res.cookie('token',result.token)
                res.status(200).json(result.usLogin);
            }
        } catch (error) {
            res.status(500).json({messageError:error.message});
        }
    }
}
//cambiar propertys colors primary secondary
