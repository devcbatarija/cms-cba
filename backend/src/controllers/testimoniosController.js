const {Testimonios} = require("../db")

module.exports={
    getAllTestimonios:async()=>{
        try {
            const response=await Testimonios.findAll();
            return response;
        } catch (error) {
            return error;
        }
    },
    createTestimonio:async(testimonio)=>{
        try {
            const response=await Testimonios.create(testimonio);
            return response;
        } catch (error) {
            return error;
        }
    },
    updateTestimonio:async(id,testimonios)=>{
        try {
            const response=await Testimonios.findByPk(id);
        } catch (error) {
            
        }
    },
    deleteTestimonio:async()=>{
        try {
            
        } catch (error) {
            
        }
    }
}