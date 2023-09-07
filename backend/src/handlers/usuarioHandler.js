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
    deleteSelect } = require("../controllers/usuarioController")

module.exports = {
    getAllUsuarios:async(req,res)=>{
        try {
            const result=await getAllUsuarios();
            res.status(200).json({result});
        } catch (error) {
            res.status(401).json({messageError:error.message});
        }
    },
    postUser:async(req,res)=>{
        try {
            if(!req.body){
                res.status(401).json({messageError:'No user data'});
            }
            const result=await postUsuario(req.body);
            console.log(result)
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
            res.status(401).json({messageError:error.message})
        }
    },
    deleteById:async(req,res)=>{
        try {
            if(!req.params.id){
                res.status(401).json({messageError:'No user id'});
            }
            const result=await deleteById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({messageError:error.message});
            
        }
    },
    updateById:async(req,res)=>{
        try {
            if(!req.params.id)res.status(401).json({messageError:'No user id'});
            if(!req.body)res.status(401).json({messageError:'No user data'});
            const result=await updateById(req.params.id,req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ messageError: error.message });
        }
    },
    authLogin:async(req,res)=>{
        try {
            if(!req.body.correo && !req.body.password )return res.status(400).json({messageError:'Todos los datos son necesarios'});
            if(!req.body.correo || req.body.correo===" ")return res.status(400).json({messageError:'Correo no puede estar vacío'});
            if(!req.body.password || req.body.password===" ")return res.status(400).json({messageError:'Password no puede estar vacío'});
        
            const result=await authLogin(req.body);
            if(result.messageError){
                res.status(200).json(result.messageError)
            }
            else{
                res.cookie('token',result.token)
                res.status(200).json(result.usLogin);
            }
        } catch (error) {
            res.status(500).json({messageError:error.message});
        }
    },
    getById:async(req,res)=>{
        try {
            const response=await getById(req.params.id);
            res.status(200).json(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    },
    emailVerify : async(req,res)=>{ //verificar si ya existe un email
        try {
            const result=await emailVerify(req.body);
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({messageError:error.message});
        }
    },
    emailVerifyToken : async(req,res)=>{ //verificar el registro mediante token con email
        console.log(req.query.token)
        try {
            const result=await emailVerifyToken(req.query.token);
            res.status(200).send(`
            <div 
            style="
            display:flex; 
            flex-direction:column;
            align-items:center; 
            justify-content:center; 
            margin:0 auto; 
            width:50%; 
            padding:20px; 
            text-align:center; 
            border:1px solid green; 
            color:green;
            background:#272C35;
            font-family:sans-serif;
            width:100%;
            heigth:100vh;
            ">  
                <h1>¡Verificación exitosa!</h1>
                <h2 style="
                    color:white;
                ">${result.user.correo}</h2>
                <p>Tu correo electrónico ha sido verificado correctamente.</p>
            </div>
            `)
        } catch (error) {
            res.status(500).json({messageError:error.message});
        }
    },
    updateState:async(req,res)=>{
        console.log(req.body.estado)
        try {
            const response=await updateState(req.params.id,req.body.estado);
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({messageError:error.message});
        }
    },
    deleteSelect:async(req,res)=>{
        try {
            const response=await deleteSelect(req.body.ids);
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({messageError:error.message});
        }
    }
}
//cambiar propertys colors primary secondary
