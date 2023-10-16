const express=require("express");
const { EventEmitter } = require("events");
const {  
    getPodcastsBd,
    addPodcastAws,
    addPodcastBd
} = require("../handlers/podcastHandler");
const { isAdmin } = require("../services/jwtservice");
const { emitter } = require("../services/aws_s3");
const catchedAsync = require("../utils/catchedAsync");
const router= express();

router.get('/songs/',catchedAsync(getPodcastsBd))
router.post('/song/upload',catchedAsync(addPodcastAws))

router.post('/song/upload/database',catchedAsync(addPodcastBd))

router.get('/song/events',(req,res)=>{
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    emitter.on("progress", (percentage) => {
        res.write(`data: ${percentage}\n\n`);
    });

     req.on('close', () => {
        emitter.removeAllListeners("progress");
     });
})



module.exports=router;