const express = require('express');
const{getAllPublicacion, addPublicacion, hiddenPublication,updatePublication, deletePublication,
getPublication}=require('../controllers/publicacionController');
module.exports={
    getAllPublicacion:async(req,res)=>{
        try {
            const response=await getAllPublicacion();
            res.status(200).json({
                results:response
            })
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    },
    addPublicacion:async(req,res)=>{
        try {
            const newp=await addPublicacion(req.body);
            res.status(201).json(newp);
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    },
    hiddenPublication:async(req,res)=>{
        try {
            const publication=await hiddenPublication(req.params.id);
            res.status(404).json(publication);
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    updatePublication:async(req,res)=>{
        try {
            const id= req.params.id;
            const changes=req.body;
            const publication =await updatePublication (id,changes);
            res.status(200).json(publication);
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    deletePublication:async(req, res)=>{
        try {
            const publication= await deletePublication(req.params.id);
            res.status(200).json(publication);
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    getPublication:async(req,res)=>{
        try {
            const publication = await getPublication(req.params.id);
            res.status(200).json({
                results:publication
            })
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    }
}