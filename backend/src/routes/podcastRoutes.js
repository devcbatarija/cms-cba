const express=require("express");
const { 
    getCredentials, 
    createCredentials, 
    editCredentials, 
    deleteCredentials, 
    getPodcasts,
    getPodcastsBd
} = require("../handlers/podcastHandler");
const { isAdmin } = require("../services/jwtservice");
const router= express();

router.get('/',getCredentials)
router.post('/',createCredentials)
router.put('/:id',editCredentials)
router.delete('/:id',deleteCredentials)
router.post('/songs',getPodcasts)
router.get('/songs/mgr',getPodcastsBd)

module.exports=router;