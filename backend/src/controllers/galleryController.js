const { Gallery } = require("../db")

module.exports = {
    getAllGallery: async () => {
        try {
            const data = await Gallery.findAll();
            return data;
        } catch (error) {
            return error;
        }
    },
    addGallery: async (g) => {
        try {
            const galleria = {
                image: g.imagen,
                AmbienteIdAmbiente: g.AmbienteIdAmbiente
            };
            const newGalleria = await Gallery.create(
                galleria
            );
            return newGalleria;
        } catch (error) {
            return error;
        }
    },
    deleteGallery: async (id) => {
        try {
            const gallery = await Gallery.findByPk(id);
            Gallery.destroy();
            return gallery;
        } catch (error) {
            return error;
        }
    }
}