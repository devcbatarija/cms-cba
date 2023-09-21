const { getAllPrograms, getProgram, hiddenPrograma, deleteProgram, addPrograma, updatePrograma, deleteSelect } = require("../controllers/programController")

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
            if(!req.params.id)res.status(401).json({messageError:'No program id'});
            if(!req.body)res.status(401).json({messageError:'No user program'});
            const program=await updatePrograma(req.params.id, req.body);
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