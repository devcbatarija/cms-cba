const { addEvento, getAllEvento, updateEvento } = require("../controllers/eventoController")


module.exports={
    getAllEvento: async(req, res)=>{
        try {
            const response=await getAllEvento();
            res.status(200).json({
                results:response
            });
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    addEvento:async(req, res)=>{
        try {
            const response = await addEvento(req.body);
            res.status(200).json({
                results:response,
                successMessage:"Se registro el evento correctamente"
            });
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    },
    updateEvento:async(req, res)=>{
        try {
            const id=req.params.id;
            const changes=req.body;
            const response= await updateEvento(id, changes);
            res.status(200).json(response)
            
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
}