const { getAllPrograms, getProgram, hiddenPrograma, deleteProgram, addPrograma, updatePrograma } = require("../controllers/programController")

module.exports={
    getAllPrograms:async(req, res)=>{
        try {
            const response=await getAllPrograms();
            res.status(200).json({
                results:response
            })
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    },
    addPrograma :async(req,res)=>{
        try {
            const newp=await addPrograma(req.body);
            res.status(201).json(newp);
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    },
    hiddenPrograma:async(req,res)=>{
        try {
            const program = await hiddenPrograma(req.params.id);
            res.status(404).json(program);
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    updatePrograma:async(req,res)=>{
        try {
            const id=req.params.id;
            const changes=req.body;
            const program=await updatePrograma(id,changes);
            res.status(200).json(program);
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    deletePrograma:async(req,res)=>{
        try {
            const program =await deleteProgram(req.params.id);
            res.status(200).json({
                results:program
            })
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    },
    getProgram:async(req,res)=>{
        try {
            const program =await getProgram(req.params.id);
            res.status(200).json({
                results:program
            })
        } catch (error) {
            res.status(404).json({error:error.message});
        }
    }
}