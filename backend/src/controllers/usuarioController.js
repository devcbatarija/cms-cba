const { Usuario } = require("../db");
const { signIn } = require("../services/jwtservice");
const { sentTokenVerify } = require("../services/nodemailerservice");
const { response } = require("../utils");
const { ClientError } = require("../utils/errors");
const { uploadImage } = require("./uploadController");

function formatDate(dateString) {
  const parts = dateString.split("/");
  const year = parts[2];
  const month = parts[1].padStart(2, "0");
  const day = parts[0].padStart(2, "0");
  return `${year}-${month}-${day}`;
}
module.exports = {
  getAllUsuarios: async () => {
    const response = await Usuario.findAll();
    console.log(response);
    return response;
  },
  postUsuario: async (user) => {
    let upload = "";
    if (user.image) {
      upload = await uploadImage({ filePath: [user.image], type: "image" });
    }
    const newUser = await Usuario.create({
      correo: user.correo,
      celular: user.celular,
      nombres: user.nombres,
      image: user.image ? upload.results[0] : "",
      apellidos: user.apellidos,
      fecha_Nacimiento: user.fecha_Nacimiento,
      ci: user.ci,
      password: user.password,
      rol: user.rol,
      estado: false,
    });
    if (!newUser) {
      throw new ClientError("No se pudo completar el registro.");
    }
    try {
      const emailsend = await sentTokenVerify(
        newUser.verificacion,
        newUser.correo
      );
      return { emailsend };
    } catch (error) {
      await newUser.destroy();
      throw new ClientError(emailsend, 401);
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
      const updateUserById = await Usuario.update(user, {
        where: {
          id_Usuario: id,
        },
      });
      if (updateUserById[0] === 1) {
        const dataUpdate = await Usuario.findAll();
        return { message: "User update success", results: dataUpdate };
      }
      return "Error user update!";
    } catch (error) {
      return error;
    }
  },
  //model to update
  authLogin: async (user) => {
    const userExist = await Usuario.findOne({
      where: { correo: user.correo },
    });
    if (!userExist) {
      throw new ClientError("Usuario no encontrado.", 400);
    }
    if (userExist.password !== user.password) {
      throw new ClientError("La contraseña es incorrecta.", 401);
    }
    if (!userExist.estado) {
      throw new ClientError("El usuario no tiene acceso.", 401);
    }
    const tokengen = await signIn(userExist);
    const usLogin = {
      _userId: userExist.id_Usuario,
      _profileImage: userExist.image,
      correo: userExist.correo,
      nombres: userExist.nombres,
      apellidos: userExist.apellidos,
      rol: userExist.rol,
    };
    console.log({ usLogin: usLogin, token: tokengen });
    return { usLogin: usLogin, token: tokengen };
  },

  getById: async (id) => {
    try {
      const us = await Usuario.findByPk(id);
      if (!us) {
        throw new Error("Usuario no encontrado.");
      }
      return us;
    } catch (error) {
      error.statusCode = 404;
      throw error;
    }
  },
  emailVerify: async (body) => {
    const user = await Usuario.findOne({ where: { correo: body.correo } });
    if (!user) {
      console.log(user);
      return "Email valido";
    }
    throw new ClientError("El usuario ya existe.");
  },
  emailVerifyToken: async (token) => {
    try {
      const user = await Usuario.findOne({ where: { verificacion: token } });
      if (!user) {
        throw new Error("El token de usuario no encontrado.");
      }
      if (user.estado == true) {
        throw new Error("El token ya a sido usado.");
      }
      user.estado = true;
      await user.save();
      return { user: user, verificacion: "Success!" };
    } catch (error) {
      throw error;
    }
  },
  updateState: async (id, estado) => {
    try {
      const update = await Usuario.findByPk(id);
      if (!update) {
        throw new Error("El token no se encontró.");
      }

      update.dataValues.estado = estado;
      return update;
    } catch (error) {}
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
  },
  updateImage: async ({ image, id }) => {
    try {
      const user = await Usuario.findByPk(id);
      user.update({ image: image });
      user.save();
      return user;
    } catch (error) {
      return error;
    }
  },
  getUserDetails: async (idUser) => {
    const user = await Usuario.findByPk(idUser);
    return user;
  },
  getUsersFromGraficsCookie: async () => {
    try {
      // Obtener todos los usuarios
      const users = await Usuario.findAll();

      const usersFormatDate = []; //aqui llenare todo

      for (const [index, date] of users.entries()) {
        if (usersFormatDate.length == 0) {
          //aqui comprobare
          const comprobar = calculateAge(data.fecha_Nacimiento);
          usersFormatDate.push({ comprobar, count: 1 });
        } else {
          for (const [indextwo, datetwo] of usersFormatDate.entries()) {
            if (calculateAge(date.fecha_Nacimiento) == datetwo[indextwo].age) {
              usersFormatDate[index].age = +1;
            } else {
              const comprobar = calculateAge(data.fecha_Nacimiento);
              usersFormatDate.push({ comprobar, count: 1 });
            }
          }
        }
      }
      console.log(usersFormatDate);
      const usuariosActivos = users.filter((user) => user.estado === true);
      const usuariosInactivos = users.filter((user) => user.estado === false);

      const usuariosPorRol = {};
      users.forEach((user) => {
        if (usuariosPorRol[user.rol]) {
          usuariosPorRol[user.rol]++;
        } else {
          usuariosPorRol[user.rol] = 1;
        }
      });

      // Ahora tienes los datos clasificados, puedes enviarlos para graficar
      return {
        usuariosActivos,
        usuariosInactivos,
        usuariosPorRol,
        usersFormatDate,
      };
    } catch (error) {
      return error;
    }
  },
  qrReader:async(data)=>{
    try { 
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
const calculateAge = (dateString) => {
  const userDate = new Date(dateString);
  const currentDate = new Date();

  const ageInMilliseconds = currentDate - userDate;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  return Math.floor({ageInYears:ageInYears,count:1});
}
// const comprobar = (data,usersFormat) => {
//   const test = usersFormat.find((user) => user.ageInYears==);
// }