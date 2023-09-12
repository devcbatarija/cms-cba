const jwt = require("jsonwebtoken");
const { Usuario } = require("../db");

const keymaster = "token_jwt_login";

module.exports = {
  signIn: async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = {
          _userId: user.id_Usuario,
          nombre: user.nombres,
          ci: user.ci,
        };
        const tokengen = await jwt.sign(payload, keymaster);
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
  validToken: async (req, res) => {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];

      jwt.verify(token, keymaster, async (error, decoded) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const usLogin = await Usuario.findByPk(decoded._userId);
        const usResult = {
          _userId: usLogin.id_Usuario,
          _profileImage: usLogin.image,
          correo: usLogin.correo,
          rol: usLogin.rol,
        };
        return res.status(200).json({ user: usResult });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ messageError: error.message });
    }
  },
  isAdmin: async(req, res, next)=>{
    try {
      if(!req.headers.authorization){
        res.status(401).json({messageError:"Inautorizado"});
        return
      }
      const token = req.headers.authorization.split("Bearer ")[1];
      jwt.verify(token, keymaster, async (error, decoded) => {
        const usLogin = await Usuario.findByPk(decoded._userId);
        if(usLogin){
          if(usLogin.rol=="Admin"){
            next();
            return
          }
          res.status(401).json({messageError:"Usuario no autorizado"})
          return
        }
        res.status(404).json({messageError:"Usuario no encontrado"})
        return
      });
    } catch (error) {
      res.status(401).json({messageError:error.message})
    }
  }
};
