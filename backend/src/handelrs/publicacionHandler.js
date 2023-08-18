const{getAllPublicacion, addPublicacion}=require('../controllers/publicacionController');
module.exports={
    getAllPublicacion:async(req,res)=>{
        try {
            const response=await getAllPublicacion();
            res.status(200).json({
                results:response
            })
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    },
    addPublicacion:async(req,res)=>{
        try {
            const newp=await addPublicacion(req.body);
            res.status(201).json(newp);
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    }
}