const { getAllGallery, addGallery, deleteGallery } = require("../controllers/galleryController")

module.exports = {
    getAllGallery: async (req, res) => {
        try {
            const results = await getAllGallery();
            res.status(200).json(results)
        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    },
    addGallery: async (req, res) => {
        try {
            const results = await addGallery(req.body);
            res.status(200).json(results)
        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    },
    deleteGallery: async (req, res) => {
        try {
            const results = await deleteGallery(req.params.id);
            res.status(200).json(results)
        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    }

}