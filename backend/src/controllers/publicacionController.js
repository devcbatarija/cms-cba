const {Publicacion} = require("../db")

module.exports={
    getAllPublicacion:async()=>{
        try {
            const data=await Publicacion.findAll();
            return data; 
        } catch (error) {
            return error;
        }
    },
    addPublicacion:async(p)=>{
        try {
            const newp=await Publicacion.create(
                p
            )     
            return newp;       
        } catch (error) {
            return error;
        }
    }
}