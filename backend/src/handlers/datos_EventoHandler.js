const { addDatosEvento, getAllDatosEvento, getEventsByMonth } = require("../controllers/datos_eventoController");
const { addEvento, getAllEvento, updateEvento, getEventById } = require("../controllers/eventoController")


module.exports={
    getAllDatosEvento: async(req, res)=>{
        try {
            const response=await getAllDatosEvento();
            res.status(200).json({
                results:response
            });
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    getEventsByMonth: async (req, res)=>{
        try {
            const date= req.params.date;
            const response= await getEventsByMonth(date);
            res.status(200).json({
                results: response
            });
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    getEventById: async(req, res)=>{
        try {
            const id=req.params.id;
            const response=await getEventById(id);
            res.status(200).json({
                results:response
            });
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    addDatosEvento:async(req, res)=>{
        try {
            const response = await addDatosEvento(req.body);
            res.status(202).json({
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
            res.status(200).json({
                results:response,
                successMessage:"Se actualizaron los datos del evento correctamente"
            })
            
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
}