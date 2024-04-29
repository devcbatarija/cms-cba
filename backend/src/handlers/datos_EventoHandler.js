const { addDatosEvento, getAllDatosEvento, getEventsByDate, updateDatosEvento } = require("../controllers/datos_eventoController");
const { getEventById } = require("../controllers/eventoController");
const { response } = require("../utils");


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
    getEventsByDate: async (req, res)=>{
        try {
            
            const date= req.body;
            const response= await getEventsByDate(date);
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
            console.log(response);
            res.status(202).json({
                results:response,
                successMessage:"Se registro el evento correctamente"
            });
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    },
    updateDatosEvento:async(req, res)=>{
        try {
            const id=req.params.id;
            const changes=req.body;
            const response= await updateDatosEvento(id, changes);
            res.status(200).json({
                results:response,
                successMessage:"Se actualizaron los datos del evento correctamente"
            })
            
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
}