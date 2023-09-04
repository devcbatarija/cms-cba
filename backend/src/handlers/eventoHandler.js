const { addEvento, getAllEvento } = require("../controllers/eventoController")


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
                results:response
            });
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
}