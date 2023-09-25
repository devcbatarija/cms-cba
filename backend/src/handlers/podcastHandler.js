const { getCredentials, createCredentials, editCredentials, deleteCredentials, getPodcasts, getPodcastsBd, addPodcastBd } = require("../controllers/podcastController")

module.exports={
    getCredentials:async(req,res)=>{
        try {
            const result=await getCredentials();
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json(error);
        }
    },
    createCredentials:async(req,res)=>{
        try {
            const result=await createCredentials(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json(error);
        }
    },
    editCredentials:async(req,res)=>{
        try {
            const result=await editCredentials(req.params.id,req.body);
            res.status(200).json(result);
        } catch (error) {
            
        }
    },
    deleteCredentials:async(req,res)=>{
        try {
            const result=await deleteCredentials(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json(error);
        }
    },
    getPodcasts:async(req,res)=>{
        try {
            const result=await getPodcasts(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json(error);
        }
    },
    getPodcastsBd:async(req,res)=>{
        try {
            const result=await getPodcastsBd();
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json(error);
        }
    },
    addPodcastBd:async(req,res)=>{
        try {
            const result = await addPodcastBd(req.body.song);
            res.status(200).json(result);
        } catch (error) {
            res.status(409).json({error:error.message});
        }
    }
}