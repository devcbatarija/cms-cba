const { getAllEPredefinido, addEPredefinido } = require("../controllers/eventoPredefinidoController")


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
            res.status(200).json({
                results:response,
                successMessage:"Se registro el evento predefinido correctamente"
            });
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    }
}