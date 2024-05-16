const jwt = require("jsonwebtoken");
const { Usuario } = require("../db");
const axios = require("axios");
const {
  JWT_KEY_MASTER,
  CBAPLUS_BASE_URL
} = process.env

module.exports = {
  signIn: async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        let payload = {
          _userId: user.id_Usuario,
          nombre: user.nombres,
          from: user.from,
          accessToken: user.accessToken
        };
        if (user.from) {
          payload.from = user.from;
        }
        const tokengen = await jwt.sign(payload, JWT_KEY_MASTER);
        resolve(tokengen);
      } catch (error) {
        reject(error);
      }
    });
  },
  requireToken: async (req, res, next) => {
    const user = await req.headers.authorization;
    try {
      if (!user)
        res.status(401).json({ messageError: "Invalid authorization" });
      req.user = user;
      next();
    } catch (error) {
      res.status(400).json({ messageError: error.message });
    }
  },
  validToken: async (req, res) => {        //para validar el inicio de sesion
    try {
      if (req.cookies.token) {
        let usResult;
        const token = req.cookies.token;
        jwt.verify(token, JWT_KEY_MASTER, async (error, decoded) => {
          const currentTime = Math.floor(Date.now() / 1000);
          if (decoded.from) { 
            await axios.post(`${CBAPLUS_BASE_URL}/api/auth/validate`, {
                id: decoded._userId,
              }, {
                headers: {
                  'Authorization': `Bearer ${decoded.accessToken}`
                }
              })
              .then((res) => {
                usResult = {
                  _userId: res.data.userData.id,
                  _profileImage: res.data.userData.avatar,
                  correo: res.data.userData.username,
                  nombres: res.data.userData.fullName,
                  apellidos: "",
                  rol: 'Client',
                  from: 'CBA PLUS',
                  accessTokenCbaPlus: res.data.accessToken,
                  token
                };
              });
          } else {
            const usLogin = await Usuario.findByPk(decoded._userId);
            if (!usLogin) {
              return res
                .status(404)
                .json({ messageError: "El usuario no existe." });
            }
            usResult = {
              _userId: usLogin.id_Usuario,
              _profileImage: usLogin.image,
              correo: usLogin.correo,
              nombres: usLogin.nombres,
              apellidos: usLogin.apellidos,
              rol: usLogin.rol,
              token,
            };
          }
          return res.status(200).json({ user: usResult });
        });
      }
      else {
        return res.status(200).json({ message: 'Dont login' });
      }
    } catch (error) {
      return res.status(400).json({ messageError: error.message });
    }
  },
  validTokenMobile: async (req, res) => {
    try {
      const { token } = req.body;
      // if(!token){
      //   return res.status(200).json({ user: usResult });
      // }
      jwt.verify(token, JWT_KEY_MASTER, async (error, decoded) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const usLogin = await Usuario.findByPk(decoded._userId);
        if (!usLogin) {
          return res
            .status(404)
            .json({ messageError: "El usuario no existe." });
        }
        const usResult = {
          _userId: usLogin.id_Usuario,
          _profileImage: usLogin.image,
          correo: usLogin.correo,
          nombres: usLogin.nombres,
          apellidos: usLogin.apellidos,
          rol: usLogin.rol,
          token,
        };
        return res.status(200).json({ user: usResult });
      });
    } catch (error) {
      return res.status(400).json({ messageError: error.message });
    }
  },
  isAdmin: async (req, res, next) => {
    try {
      if (!req.cookies.token) {
        return res.status(401).json({ messageError: "Usuario no autorizado" });
      }
      const token = req.cookies.token;
      jwt.verify(token, JWT_KEY_MASTER, async (error, decoded) => {
        const usLogin = await Usuario.findByPk(decoded._userId);
        if (usLogin) {
          if (usLogin.rol == "Admin") {
            return next();
          }
          return res
            .status(401)
            .json({ messageError: "Usuario no autorizado" });
        }
        return res.status(404).json({ messageError: "Usuario no encontrado" });
      });
    } catch (error) {
      return res.status(401).json({ messageError: error.message });
    }
  },
  validTokenPlus: async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token || !token.startsWith("Bearer ")) {
        res.status(401).json({ error: "Token no proporcionado" });
      }
      const tokenBearer = token.split(" ")[1];
      jwt.verify(tokenBearer, JWT_KEY_MASTER, async (error, decoded) => {
        const usLogin = await Usuario.findByPk(decoded._userId);
        if (usLogin) {
          if (usLogin.rol == "Admin") {
            res.status(200).json({ MessageChannel: "User successfully valid" });
            return
          }
          res.status(401).json({ MessageChannel: "Usuario no autorizado" });
          return
        }
        res.status(404).json({ MessageChannel: "Usuario no encontrado" });
        return
      });
    } catch (error) {
      res.status(401).json({ error: "Token inválido" });
    }
  },
};
