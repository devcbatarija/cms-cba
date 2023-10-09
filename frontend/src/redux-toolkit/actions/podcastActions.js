import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPodcastSongs = createAsyncThunk("/getPodcastSongs", async ()=>{
    try {
        const podcasts= await axios.get("podcast/songs/");
        console.log(podcasts.data.results)
        return podcasts.data.results;
    } catch (error) {
        return error;
    }
})
export const postPodcastSongsSpotify = createAsyncThunk("/postPodcastSongsSpotify", async (obj)=>{
    try {
        const podcasts= await axios.post("/song/upload",obj);
        return podcasts.data;
    } catch (error) {
        return error;
    }
})