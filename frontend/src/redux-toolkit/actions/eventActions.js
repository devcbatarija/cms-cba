import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvents = createAsyncThunk("/getEvents", async ()=>{
    try {
        const events= await axios.get("event");
        return events.data.results;
    } catch (error) {
        return error;
    }
})