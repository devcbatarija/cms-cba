const { getAllEPredefinido, addEPredefinido } = require("../controllers/EventoPredefinido")


module.exports={
    getAllEPredifinido: async(req, res)=>{
        try {
            const response = await getAllEPredefinido();
            res.status(200).json({
                results:response
            });
        } catch (error) {
            res.status(404).json({error: error.message})
        }
    },
    addEPredefinido:async(req, res)=>{
        try {
            const response = await addEPredefinido(req.body);
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    }
}