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
            const publication={
                titulo: p.titulo,
                descripcion : p.descripcion,
                multimedia : p.multimedia,
                estado: p.estado,
                tipo: p.tipo
            };
            const newPublication=await Publicacion.create(
                publication
            );     
            return newPublication;       
        } catch (error) {
            return error;
        }
    },
    hiddenPublication:async(id)=>{
        try {
            const publication =await Publicacion.findByPk(id);
            await publication.update({estado:false});
            publication.save();
            return publication;
        } catch (error) {
            return error;
        }
    },
    updatePublication:async(id,changes)=>{
        try {
            const publication= await Publicacion.findByPk(id);
            await publication.update(changes);
            publication.save();
            return publication;
        } catch (error) {
            return error;
        }
    },
    deletePublication:async(id)=>{
        try {
            const publication=await Publicacion.findByPk(id);
            Publicacion.delete(publication);
            return publication;
        } catch (error) {
            return error;
        }
    },
    getPublication:async(id)=>{
        try {
            const publication= await Publicacion.findByPk(id);
            return publication;
        } catch (error) {
            return error;
        }
    }
}