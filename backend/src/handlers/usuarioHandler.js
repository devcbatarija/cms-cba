const { getAllUsuarios,postUsuario,deleteById,updateById, validateUser } = require("../controllers/usuarioController")

module.exports = {
    getAllUsuarios:async(req,res)=>{
        try {
            const result=await getAllUsuarios();
            res.status(200).json({result});
        } catch (error) {
            res.status(401).json({error:error.message});
        }
    },
    postUser:async(req,res)=>{
        try {
            const result=await postUsuario(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.stats(401).json({error:error.message})
        }
    },
    deleteById:async(req,res)=>{
        try {
            const result=await deleteById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            
        }
    },
    updateById:async(req,res)=>{
        try {
            const result=await updateById(req.params.id,req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({erorr:error.message});
        }
    },
    validateUser:async(req,res)=>{
        try {
            const result=await validateUser(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({erorr:error.message});
        }
    }
}