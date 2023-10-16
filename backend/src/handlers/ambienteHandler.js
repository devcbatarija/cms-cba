const { getAmbientes, addAmbiente } = require("../controllers/ambienteController")

module.exports={
    getAmbientes : async (req, res)=>{
        try {
            const result = await getAmbientes()
            res.status(200).json(result)
        } catch (error) {
            res.status(401).json({error: error.message})
        }
    },
    addAmbiente : async (req, res)=>{
        try {
            const result=await addAmbiente(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(401).json({error: error.message})

        }
    }
}
