const {
  getAllUsuarios,
  postUsuario,
  deleteById,
  updateById,
  authLogin,
  emailVerify,
  emailVerifyToken,
  updateState,
  getById,
  deleteSelect,
  updateImage,
  getUserDetails,
} = require("../controllers/usuarioController");
const { ClientError } = require("../utils/errors");
const response = require("../utils/response");

module.exports = {
  getAllUsuarios: async (req, res) => {
    const result = await getAllUsuarios();
    response(res, 200, result);
  },
  getUserDetails: async (req, res) => {
    const result = await getUserDetails(req.params.id);
    response(res, 200, result);
  },
  postUser: async (req, res) => {
    if (!req.body) {
      throw new ClienteError("No hay datos para cargar", 400);
    }
    const result = await postUsuario(req.body);
    response(res, 200, result);
  },
  deleteById: async (req, res) => {
    if (!req.params.id) {
      throw new ClientError("Se necesita Id", 400);
    }
    const result = await deleteById(req.params.id);
    response(res, 200, result);
  },
  updateById: async (req, res) => {
    if (!req.params.id) {
      throw new ClientError("Se necesita Id", 400);
    }
    if (!req.body) {
      throw new ClientError("Se necesita datos", 400);
    }
    const result = await updateById(req.params.id, req.body);
    response(res, 200, result);
  },


  
  authLogin: async (req, res) => {
      const result = await authLogin(req.body);
      console.log(result)
        res.cookie("token", result.token);
        res.status(200).json(result.usLogin);
  },



  getById: async (req, res) => {
    response(res, 200, response);
  },
  emailVerify: async (req, res) => {
    //verificar si ya existe un email
      const result = await emailVerify(req.body);
      response(res,200,result);
  },
  emailVerifyToken: async (req, res) => {
    //verificar el registro mediante token con email
    try {
      const result = await emailVerifyToken(req.query.token);
      res.status(200).send(`
            <div 
            style="
            display:flex; 
            flex-direction:column;
            align-items:center; 
            justify-content:center; 
            margin:0 auto; 
            padding:20px; 
            text-align:center; 
            border:1px solid green; 
            color:green;
            background:#272C35;
            font-family:sans-serif;
            width:100%;
            height:100vh;
            ">  
                <h1>¡Verificación exitosa!</h1>
                <h2 style="
                    color:white;
                ">${result.user.correo}</h2>
                <p>Tu correo electrónico ha sido verificado correctamente.</p>
                <p>
                <a style="
                    font-family:sans-serif;
                    border:none;
                    border-radius:2px;
                    color:aqua;
                    cursor:pointes;
                    width:100px;
                    height:30px;
                " href="http://localhost:5173/login"
                >Iniciar secion</a>
                </p>
            </div>
            `);
    } catch (error) {
      res.status(500).send(`<h1>${error.message}</h1>`);
    }
  },
  updateState: async (req, res) => {
    try {
      const response = await updateState(req.params.id, req.body.estado);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ messageError: error.message });
    }
  },
  deleteSelect: async (req, res) => {
    try {
      const response = await deleteSelect(req.body.ids);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ messageError: error.message });
    }
  },
  updateImage: async (req, res) => {
    try {
      const response = await updateImage(req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ messageError: error.message });
    }
  },
};
//cambiar propertys colors primary secondary
