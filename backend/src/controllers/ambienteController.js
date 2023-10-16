const { Gallery, Ambientes } = require("../db")

module.exports = {
    getAmbientes: async () => {
        try {
            const result = await Ambientes.findAll(
                {
                    include: [{ model: Gallery }]
                }
            );
            if (!result) {
                throw new Error("Data not found")
            }
            return result;
        } catch (error) {
            return error;
        }
    },
    addAmbiente: async (a) => {
        try {
            const obj = {
                nombre: a.nombre,
                descripcion: a.descripcion,
                UsuarioIdUsuario: a.UsuarioIdUsuario

            }
            const newAmbiente = await Ambientes.create(
                obj
            );
            return newAmbiente;
        } catch (error) {
            return error;
        }
    }
    

}