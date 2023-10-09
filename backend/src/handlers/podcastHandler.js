const { getPodcastsBd, addPodcastAws,addPodcastBd } = require("../controllers/podcastController") 
const fs=require('fs');

 
module.exports={
    getPodcastsBd:async(req,res)=>{
        try {
            const result=await getPodcastsBd();
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json(error);
        }
    },
    addPodcastAws:async(req,res)=>{
        const filePath=req.files.media;
        try {
            console.log(filePath)
            const result = await addPodcastAws(filePath);
            fs.unlink(filePath.tempFilePath, err => {
                if (err) console.error(`Error deleting temp file ${filePath.tempFilePath}:`, err);
            }); 
            res.status(200).json(result);
        } catch (error) {
            res.status(409).json({error:error.message});
        }
    }, 
    addPodcastBd:async(req,res)=>{ 
        try { 
            const result = await addPodcastBd(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(409).json({error:error.message});
        }
    },
}