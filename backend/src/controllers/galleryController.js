const { Gallery, Ambientes } = require("../db")

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
        console.log(g)
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
    },
    getGallery: async (id) => {
        try {
            const program = await Gallery.findByPk(id, {
                include: [{ model: Usuario }],
            });
            if (!program) {
                throw new Error("Gallery no encontrado");
            }
            return program;
        } catch (error) {
            throw new Error("Error al obtener Gallery");
        }
    },
    deleteGallerySelect: async (pubIds) => {
        try {
            for (let id of pubIds) {
                const progra = await Ambientes.findByPk(id);
                await progra.destroy();
            }
            const remainingProgram = await Ambientes.findAll();
            return remainingProgram;
        } catch (error) {
            return error;
        }
    }
}