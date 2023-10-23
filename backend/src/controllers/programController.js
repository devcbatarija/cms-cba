const { Programa, Usuario, ProgramPrices } = require("../db");

module.exports = {
    getAllPrograms: async () => {
        try {
            const data = await Programa.findAll({
                include: [{ model: Usuario }],
                include: [{ model: ProgramPrices }]
            });
            return data;
        } catch (error) {
            throw new Error("Error al obtener los programas");
        }
    },
    addPrograma: async (p) => {
        console.log(p)
        try {
            const nuevoPrograma = await Programa.create({
                nombre: p.nombre,
                caracteristica: p.caracteristica,
                requisitos: p.requisitos,
                multimedia: p.multimedia,
                UsuarioIdUsuario: p.UsuarioIdUsuario,
            });
            console.log(nuevoPrograma)
            return nuevoPrograma;
        } catch (error) {
            throw new Error("Error al agregar el programa");
        }
    },
    updatePrograma: async (id, progr) => {
        try {
            const exist = await Programa.findByPk(id);
            if (!exist) {
                throw new Error("Programa no encontrado");
            }

            await Programa.update(progr, {
                where: {
                    id_Programa: id,
                },
            });

            return { message: "Programa actualizado correctamente" };
        } catch (error) {
            throw new Error("Error al actualizar el programa");
        }
    },
    deleteProgram: async (id) => {
        try {
            const program = await Programa.findByPk(id);
            if (!program) {
                throw new Error("Programa no encontrado");
            }
            await program.destroy();
            return { message: "Programa eliminado correctamente" };
        } catch (error) {
            throw new Error("Error al eliminar el programa");
        }
    },
    getProgram: async (id) => {
        try {
            const program = await Programa.findByPk(id, {
                include: [{ model: Usuario }],
            });
            if (!program) {
                throw new Error("Programa no encontrado");
            }
            return program;
        } catch (error) {
            throw new Error("Error al obtener el programa");
        }
    },
    deleteProgramSelect: async (pubIds) => {
        try {
            for (let id of pubIds) {
                const progra = await Programa.findByPk(id);
                await progra.destroy();
            }
            const remainingProgram = await Programa.findAll();
            return remainingProgram;
        } catch (error) {
            return error;
        }
    }
};
