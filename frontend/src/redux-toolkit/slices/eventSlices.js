import { createSlice } from "@reduxjs/toolkit";
import { getEvents, getEventsPredefinidos } from "../actions/eventActions";


const initialState = {
    events:[],
    eventsPredefinidos:[]
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

        builder.addCase(getEventsPredefinidos.pending,(state, action)=>{
            state.status = "pending";
        });
        builder.addCase(getEventsPredefinidos.fulfilled,(state, action)=>{
            state.eventsPredefinidos= action.payload;
            state.status= "success";
        });
        builder.addCase(getEventsPredefinidos.rejected, (state, action)=>{
            state.status = "rejected";
        });
    }
});
export default eventsSlices.reducer;