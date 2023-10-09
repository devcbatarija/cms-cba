const { Usuario } = require("../db");
const { signIn } = require("../services/jwtservice");
const { sentTokenVerify } = require("../services/nodemailerservice");

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
    } catch (error) {
      return error;
    }
  },
  postUsuario: async (user) => {
    try {
      
      const newUser = await Usuario.create({
        correo: user.correo,
        celular:user.celular,
        nombres: user.nombres,
        apellidos: user.apellidos,
        fecha_Nacimiento:  user.fecha_Nacimiento,
        ci: user.ci,
        password: user.password,
        rol: user.rol,
        estado:false
      });
      if (!newUser) {
        return "Internal Error!";
      }
      const emailsend=await sentTokenVerify(newUser.verificacion,newUser.correo)
      if(emailsend.error){
        console.log(error)
        throw new Error(emailsend.error);
      }
      console.log(emailsend)
      return {user:newUser,emailState:emailsend.success};
    } catch (error) {
      throw error;
    }
  },
  
  deleteById: async (id) => {
    try {
      const deleteUSer = await Usuario.findOne({ where: { id_Usuario: id } });
      if (!deleteUSer) {
        return "Usuario no encontrado.";
      }
      deleteUSer.destroy();
      return `User with the id ${deleteUSer.id_Usuario}`;
    } catch (error) {
      return error;
    }
  },
  updateById: async (id, user) => {
    try {
      const exist = await Usuario.findByPk(id);
      if (!exist) {
        return "Usuario no encontrado.";
      }
      const updateUserById = await Usuario.update(
        user,
        {
          where: {
            id_Usuario: id 
          },
        }
      );
      if (updateUserById[0] === 1) {
        const dataUpdate=await Usuario.findAll();
        return { message: "User update success",results:dataUpdate};
      }
      return "Error user update!"
    } catch (error) {
      return error;
    }
  },
  authLogin: async (user) => {
    try {
      const userExist = await Usuario.findOne({ where: { correo: user.correo } });
      if (!userExist) {
        throw new Error("Usuario no encontrado.");
      }
      if (userExist.password !== user.password) {
        throw new Error("La contraseña es incorrcta.");
      }
      if (!userExist.estado) {
        throw new Error("El usuario no tiene acceso.");
      }
      const tokengen = await signIn(userExist);
      const usLogin = {
        _userId: userExist.id_Usuario,
        _profileImage:userExist.image,
        correo: userExist.correo,
        rol: userExist.rol,
      };
      return { usLogin: usLogin, token: tokengen };
    } catch (error) {
      throw error;
    }
  },
  getById:async(id)=>{
    try {
      const us=await Usuario.findByPk(id);
      if(!us){
        throw new Error("Usuario no encontrado.");
      }
      return us;
    } catch (error) {
      error.statusCode=404;
      throw error;
    }
  },
  emailVerify : async(body)=>{
      try {
      const user=await Usuario.findOne({ where: { correo: body.correo }})
      if(!user){
        return "Email valido"
      }
      throw new Error("El usuario ya existe.");
    } catch (error) {
      throw error;
    }
  },
  emailVerifyToken : async(token)=>{
       try {
      const user=await Usuario.findOne({ where: { verificacion: token }})
      if(!user){
        throw new Error("El token de usuario no encontrado.");
      }
      user.estado=true;
      await user.save();
      return { user:user,verificacion:"Success!"};
    } catch (error) {
      throw error;
    }
  },
  updateState:async(id,estado)=>{

    try {
      const update=await Usuario.findByPk(id);
      if(!update){
        throw new Error("El token no se encontró.");
      }
    
      update.dataValues.estado=estado;
      return update;
    } catch (error) {
         }
  },
  deleteSelect: async (userIds) => {
    try {
      for (let id of userIds) {
        const user = await Usuario.findByPk(id);
        await user.destroy();
      }
      const remainingUsers = await Usuario.findAll();
      return remainingUsers;
    } catch (error) {
      return error;
    }
  }  
};
