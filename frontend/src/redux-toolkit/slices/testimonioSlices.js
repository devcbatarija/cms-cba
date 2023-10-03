import {createSlice} from "@reduxjs/toolkit";
import { getAllTestimonio } from "../actions/testimonioActions";

const initialState={
    testimonios:[],
}
const testimonioSlice=createSlice({
    name:"testimonios",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getAllTestimonio.pending, (state, action) => {
            state.status = "pending";
          });
          builder.addCase(getAllTestimonio.fulfilled, (state, action) => { //action.payload
              state.testimonios=action.payload
              state.status = "success";
          });
          builder.addCase(getAllTestimonio.rejected, (state, action) => {
              state.status = "rejected";
          });
      
    }
})
export default testimonioSlice.reducer;