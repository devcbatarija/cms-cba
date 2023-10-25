import { createSlice } from "@reduxjs/toolkit";
import { deleteStateAllProgramPrices, deselectAllProgramPrices, deselectProgramPrice, getAllProgramPrices, selectAllProgramPrices, selectProgramPrice } from "../actions/programPricesActions";

const initialState = {
    programPices:[],
    selectedProgramPrices:[]
};

const programSlices = createSlice({
  name: "programPice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProgramPrices.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getAllProgramPrices.fulfilled, (state, action) => { //action.payload
        state.programPice=action.payload
        state.status = "success";
    });
    builder.addCase(getAllProgramPrices.rejected, (state, action) => {
        state.status = "rejected";
    });


    builder.addCase(deleteStateAllProgramPrices.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(deleteStateAllProgramPrices.fulfilled, (state, action) => { //action.payload
          state.programPice=action.payload
          state.status = "success";
      });
      builder.addCase(deleteStateAllProgramPrices.rejected, (state, action) => {
          state.status = "rejected";
      });
      //checkbox
      builder.addCase(selectAllProgramPrices.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(selectAllProgramPrices.fulfilled, (state, action) => { //action.payload
          state.selectedProgramPrices = action.payload;
          state.status = "success";
      });
      builder.addCase(selectAllProgramPrices.rejected, (state, action) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectAllProgramPrices.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(deselectAllProgramPrices.fulfilled, (state, action) => { //action.payload
          state.selectedProgramPrices = [];
          state.status = "success";
      });
      builder.addCase(deselectAllProgramPrices.rejected, (state, action) => {
          state.status = "rejected";
      });
  
      builder.addCase(selectProgramPrice.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(selectProgramPrice.fulfilled, (state, action) => { //action.payload
         state.selectedProgramPrices.push(action.payload);
          state.status = "success";
      });
      builder.addCase(selectProgramPrice.rejected, (state, action) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectProgramPrice.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(deselectProgramPrice.fulfilled, (state, action) => { //action.payload
        state.selectedProgramPrices = state.selectedProgramPrices.filter(
          (programPriceId) => programPriceId !== action.payload
        );
          state.status = "success";
      });
      builder.addCase(deselectProgramPrice.rejected, (state, action) => {
          state.status = "rejected";
      });
  },
});

export default programSlices.reducer;
