const { getAllTestimonios, createTestimonio } = require("../controllers/testimoniosController")

module.exports={
    getAllTestimonios:async(req,res)=>{
        try {
            const result=await getAllTestimonios();
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    },
    createTestimonio:async(req,res)=>{
        try {
            const result=await createTestimonio();
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }
}