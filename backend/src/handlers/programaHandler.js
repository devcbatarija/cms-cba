const { getAllPrograms, getProgram, deleteProgram, addPrograma, updatePrograma, deleteProgramSelect } = require("../controllers/programController")

module.exports = {
    getAllPrograms: async (req, res) => {
        try {
            const response = await getAllPrograms();
            res.status(200).json({
                results: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los programas." });
        }
    },
    addPrograma: async (req, res) => {
        try {
            if (!req.body.nombre || !req.body.caracteristica) {
                return res.status(400).json({ error: "Nombre y característica son obligatorios." });
            }
            const newp = await addPrograma(req.body);
            res.status(201).json(newp);
        } catch (error) {
            res.status(500).json({ error: "Error al agregar el programa." });
        }
    },
    updatePrograma: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({ error: "El ID del programa es obligatorio." });
            }
            const program = await updatePrograma(req.params.id, req.body);
            res.status(200).json(program);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el programa." });
        }
    },
    deletePrograma: async (req, res) => {
        try {
            const program = await deleteProgram(req.params.id);
            res.status(200).json({
                results: program
            });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el programa." });
        }
    },
    getProgram: async (req, res) => {
        try {
            const program = await getProgram(req.params.id);
            res.status(200).json({
                results: program
            });
        } catch (error) {
            res.status(404).json({ error: "Programa no encontrado." });
        }
    },
    deleteProgramSelect: async (req, res) => {
        // console.log(req.body)
        try {
            const result = await deleteProgramSelect(req.body.ids);
            res.status(200).json({ results: result })
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};