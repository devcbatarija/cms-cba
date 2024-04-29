const { addEvento, getAllEvento, updateEvento, getEventById, getActiveEvents, deleteEventoById } = require("../controllers/eventoController");
const { response } = require("../utils");


module.exports = {
    getAllEvento: async (req, res) => {
        try {
            const response = await getAllEvento();
            res.status(200).json({
                results: response
            });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    getActiveEvents: async (req, res) => {
        try {
            const response = await getActiveEvents();
            res.status(200).json({
                results: response
            });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    getEventById: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await getEventById(id);
            res.status(200).json({
                results: response
            });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    deleteEventoById: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await deleteEventoById(id);
            response(res, 200, { successMessage: "Evento eliminado exitosamente", result });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    addEvento: async (req, res) => {
        try {
            const response = await addEvento(req.body);
            res.status(200).json({
                results: response,
                successMessage: "Se registro el evento correctamente"
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    updateEvento: async (req, res) => {
        try {
            const id = req.params.id;
            const changes = req.body;
            const response = await updateEvento(id, changes);
            res.status(200).json({
                results: response,
                successMessage: "Se actualizaron los datos del evento correctamente"
            })

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}