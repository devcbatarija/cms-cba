const { getAllTestimonios, createTestimonio, deleteTestimonioSelect } = require("../controllers/testimoniosController")

module.exports = {
    getAllTestimonios: async (req, res) => {
        try {
            const result = await getAllTestimonios();
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    createTestimonio: async (req, res) => {
        try {
            const result = await createTestimonio(req.body);
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    deleteTestimonioSelect: async (req, res) => {
        try {
            const result = await deleteTestimonioSelect(req.body.ids);
            res.status(200).json({ results: result })
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}