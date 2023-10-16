const { ProgramPrices } = require("../db");

module.exports = {
    // Crear un nuevo programa de precios
    crearProgramaPrecios: async (p) => {
        try {
            const nuevoPrograma = await ProgramPrices.create({
                columns: p.columns,
                rows: p.rows,
                ProgramaIdPrograma: p.ProgramaIdPrograma
            });
            return nuevoPrograma;
        } catch (error) {
            throw error;
        }
    },

    // Obtener todos los programas de precios
    obtenerTodosLosProgramasPrecios: async () => {
        try {
            const programas = await ProgramPrices.findAll();
            return programas;
        } catch (error) {
            throw error;
        }
    },

    // Actualizar un programa de precios existente por su ID
    actualizarProgramaPrecios: async (id,{columns, rows}) => {
        try {
            const programaExistente = await ProgramPrices.findByPk(id);
            if (!programaExistente) {
                throw new Error("Programa de precios no encontrado");
            }
            // Actualizar las columnas y las filas
            programaExistente.columns = columns;
            programaExistente.rows = rows;
            await programaExistente.save();
            const res=await ProgramPrices.findAll();
            return res;
        } catch (error) {
            throw error;
        }
    },

    // Eliminar un programa de precios por su ID
    eliminarProgramaPrecios: async (id) => {
        try {
            const programaExistente = await ProgramPrices.findByPk(id);
            if (!programaExistente) {
                throw new Error("Programa de precios no encontrado");
            }
            await programaExistente.destroy();
            return programaExistente;
        } catch (error) {
            throw error;
        }
    }
};
