import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPodcasts = createAsyncThunk("/getPodcasts", async ()=>{
    try {
        const podcasts= await axios.get("podcast");
        return podcasts.data.results;
    } catch (error) {
        return error;
    }
})
export const getPodcastSongs = createAsyncThunk("/getPodcastSongs", async ()=>{
    try {
        const podcasts= await axios.get("podcast/songs/mgr");
        return podcasts.data.results;
    } catch (error) {
        return error;
    }
})
export const getPodcastSongsSpotify = createAsyncThunk("/getPodcastSongsSpotify", async ({selec,accesToken,usId})=>{
    const obj={
        artistName:selec,
        token:accesToken,
        idUsuario:usId
    }
    try {
        const podcasts= await axios.post("podcast/songs",obj);
        console.log(podcasts.data)
        return podcasts.data;
    } catch (error) {
        return error;
    }
})