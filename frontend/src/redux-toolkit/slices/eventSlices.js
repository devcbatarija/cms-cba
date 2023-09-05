import { createSlice } from "@reduxjs/toolkit";
import { getEvents } from "../actions/eventActions";


const initialState = {
    events:[]
}
const eventsSlices = createSlice({
    name:"events",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getEvents.pending,(state, action)=>{
            state.status = "pending";
        });
        builder.addCase(getEvents.fulfilled,(state, action)=>{
            state.events= action.payload;
            state.status= "success";
        });
        builder.addCase(getEvents.rejected, (state, action)=>{
            state.status = "rejected";
        });
    }
});
export default eventsSlices.reducer;