const { getAllEPredefinido, 
    addEPredefinido, 
    getEventPredefinidoById,
    updateEventoPredefinido } = require("../controllers/eventoPredefinidoController")


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
    },
    getEventPredefinidoById: async(req, res)=>{
        try {
            const id=req.params.id;
            const response=await getEventPredefinidoById(id);
            res.status(200).json({
                results:response
            });
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    updateEventoPredefinido:async(req, res)=>{
        try {
            const id=req.params.id;
            const changes=req.body;
            const response= await updateEventoPredefinido(id, changes);
            res.status(200).json({
                results:response,
                successMessage:"Se actualizaron los datos del evento predefinido correctamente"
            })
            
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
}