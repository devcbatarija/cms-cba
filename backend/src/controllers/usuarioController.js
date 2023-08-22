const { Usuario } = require("../db");
const { generateToken } = require("../services/jwtservice");
function formatDate(dateString) {
    const parts = dateString.split('/');
    const year = parts[2];
    const month = parts[1].padStart(2, '0');
    const day = parts[0].padStart(2, '0');
    return `${year}-${month}-${day}`;
}
module.exports = {
  getAllUsuarios: async () => {
    try {
      const response = await Usuario.findAll();
      if (!response) {
        return "Users not found!";
      }
      return response;
    } catch (error) {}
  },
  postUsuario: async (user) => {
    try {
      const newUser = await Usuario.create({
        correo: user.correo,
        celular:user.celular,
        nombres: user.nombres,
        apellidos: user.apellidos,
        fecha_Nacimiento: user.fecha_Nacimiento,
        ci: user.ci,
        password: user.password,
        rol: user.rol,
      });
      if (!newUser) {
        return "Internal Error!";
      }
      return newUser;
    } catch (error) {}
  },
  
  deleteById: async (id) => {
    try {
      const deleteUSer = await Usuario.findOne({ where: { id_Usuario: id } });
      if (!deleteUSer) {
        return "User not found";
      }
      deleteUSer.estado=false;
      return `User with the id ${deleteUSer.id_Usuario}`;
    } catch (error) {}
  },
  updateById: async (id, user) => {
    try {
      const exist = await Usuario.findByPk(id);
      if (!exist) {
        return "User not found!";
      }
      const updateById = await Usuario.update(
        {
            correo: user.correo ? user.correo : updateById.correo,
            celular: user.celular ? user.celular : updateById.celular,
            nombres: user.nombres ? user.nombres : updateById.nombres,
            apellidos: user.apellidos ? user.apellidos : updateById.apellidos,
            fecha_Nacimiento: user.fecha_Nacimiento
              ? formatDate(user.fecha_Nacimiento)
              : updateById.fecha_Nacimiento,
            ci: user.ci ? user.ci : updateById.ci,
            password: user.password ? user.password : updateById.password,
            rol: "client",
            estado: true,
        },
        {
          where: {
            id_Usuario: id 
          },
        }
      );
      if(updateById[0]==1){
          return {message:"User update success"};
      }
      return "Error user update!"
    } catch (error) {}
  },
  validateUser:async(user)=>{
    try {
      if(!user.correo && !user.password){
        return {message:"Unknow data"}
      }
      const userExist=await Usuario.findOne({where:{correo:user.correo}});
      if(!userExist){
        return {message:"User not found"}
      }
      if(userExist.password!=user.password){
        return {message:"User apassword not valid"};
      }
      const tokengen=await generateToken(userExist)
      return tokengen;
    } catch (error) {
      
    }
  }
};