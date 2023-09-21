const { Programa, Usuario } = require("../db")
module.exports = {
    getAllPrograms: async () => {
        try {
            const data = await Programa.findAll({
                include:
                    [{ model: Usuario }]
            });
            return data;
        } catch (error) {
            return error
        }
    },
    addPrograma: async (p) => {
        try {
            const Program = {
                nombre: p.nombre,
                descripcion: p.descripcion,
                imagen: p.imagen,
                turno: p.turno,
                modalidad: p.modalidad,
                estado: p.estado,
                UsuarioIdUsuario: p.UsuarioIdUsuario
            };
            const newPrograma = await Programa.create(Program);
            return newPrograma;
        } catch (error) {
            return error;
        }
    },
    hiddenPrograma: async (id) => {
        try {
            const program = await Programa.findByPk(id);
            await program.update({ estado: false });
            program.save();
            return program;
        } catch (error) {
            return error;
        }
    },
    updatePrograma: async (id, progr) => {
        try {
            const exist = await Programa.findByPk(id);
            if (!exist) {
                return "Programa no encontrado"
            }
            const updateProgramById=await Programa.update(
                progr,
                {
                    where: {
                        id_Programa: id
                    },
                }
            );
            if(updateProgramById[0]===1){
                const dataUpdate=await Programa.findAll();
                return { message: "Program Updated", results:dataUpdate };
            }
            return "Error program update!"
        } catch (error) {
            return error;
        }
    },
    deleteProgram: async (id) => {
        try {
            const program = await Programa.findByPk(id);
            program.destroy(program);
            return program;
        } catch (error) {
            return error;
        }
    },
    getProgram: async (id) => {
        try {
            const program = await Programa.findByPk(id);
            if (!program) {
                throw new Error("Programa no encontrado");
            }
            return program;
        } catch (error) {
            error.statusCode = 404;
            return error;
        }
    },
    deleteSelect: async (Ids) => {
        try {
          for (let id of Ids) {
            const program = await Programa.findByPk(id);
            await program.destroy();
          }
          const remainingProgram = await Programa.findAll();
          return remainingProgram;
        } catch (error) {
          return error;
        }
      }  

};