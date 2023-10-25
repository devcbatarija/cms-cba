const { getAllGallery, addGallery, deleteGallery, deleteGallerySelect, getGallery } = require("../controllers/galleryController")

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
    },
    getGallery: async (req, res) => {
        try {
            const program = await getGallery(req.params.id);
            res.status(200).json({
                results: program
            });
        } catch (error) {
            res.status(404).json({ error: "gallery no encontrado." });
        }
    },
    deleteGallerySelect: async (req, res) => {
        try {
            const result = await deleteGallerySelect(req.body.ids);
            res.status(200).json({ results: result })
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

}