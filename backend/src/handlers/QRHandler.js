const { generarQR, verificarQR } = require("../controllers/QRController");
const { response } = require("../utils");


module.exports={
    
    generarQR:async(req, res)=>{
        try {
            const result = await generarQR(req.body);
            response(res,200,{successMessage:"Se registro correctamente",result});
        } catch (error) {
            console.log(error);
            res.status(400).json({error:error.message});
        }
    },
    verificarQR:async(req, res)=>{
        try {
            const result = await verificarQR(req.body);
            response(res,200,{successMessage:"Success",result});
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    },
}