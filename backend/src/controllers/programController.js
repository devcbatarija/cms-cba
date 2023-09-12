const { Programa } = require("../db")
module.exports = {
    getAllPrograms: async () => {
        try {
            const data = await Programa.findAll();
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
                UsuarioIdUsuario : p.UsuarioIdUsuario
            };
            const newPrograma = await Programa.create(Program);
            return newPrograma;
        } catch (error) {
            return error;
        }
    },
    hiddenPrograma:async(id)=>{
        try {
            const program = await Programa.findByPk(id);
            await program.update({estado:false});
            program.save();
            return program;
        } catch (error) {
            return error;
        }
    },
    updatePrograma:async(id, changes)=>{
        try {
            const program=await Programa.findByPk(id);
            await program.update({changes});
            program.save();
            return program;
        } catch (error) {
            return error;
        }
    },
    deleteProgram:async(id)=>{
        try {
            const program=await Programa.findByPk(id);
            program.destroy(program);
            return program;
        } catch (error) {
            return error;
        }
    },
    getProgram:async(id)=>{
        try {
            const program = await Programa.findByPk(id);
            return program;
        } catch (error) {
            return error;
        }
    }
};