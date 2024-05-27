const { PreRegistro } = require("../db");
const { ClientError } = require("../utils/errors");

module.exports = {
  formRegister: async (form) => {
    const response = await PreRegistro.create({
      correo: form.correo,
      celular: form.celular,
      nombres: form.nombres,
      apellidos: form.apellidos,
      fecha_Nacimiento: form.fecha_Nacimiento,
      ci:form.ci,
      estado:true
    });
    if(!response){
        throw new ClientError("No se pudo completar el registro.",401);
    }
    return response;
  },
};
