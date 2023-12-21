import { createSlice } from "@reduxjs/toolkit";
import { deleteStateAllBecas, deselectAllBecas, deselectBeca, getAllBeca, selectAllBecas, selectBeca } from "../actions/becaActions";

const initialState = {
    becas:[],
    selectedBecas:[]
};

const becaSlices = createSlice({
  name: "becas",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllBeca.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getAllBeca.fulfilled, (state, action) => { //action.payload
        state.becas=action.payload
        state.status = "success";
    });
    builder.addCase(getAllBeca.rejected, (state, action) => {
        state.status = "rejected";
    });


    builder.addCase(deleteStateAllBecas.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(deleteStateAllBecas.fulfilled, (state, action) => { //action.payload
          state.becas=action.payload
          state.status = "success";
      });
      builder.addCase(deleteStateAllBecas.rejected, (state, action) => {
          state.status = "rejected";
      });
      //checkbox
      builder.addCase(selectAllBecas.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(selectAllBecas.fulfilled, (state, action) => { //action.payload
          state.selectedBecas = action.payload;
          state.status = "success";
      });
      builder.addCase(selectAllBecas.rejected, (state, action) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectAllBecas.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(deselectAllBecas.fulfilled, (state, action) => { //action.payload
          state.selectedBecas = [];
          state.status = "success";
      });
      builder.addCase(deselectAllBecas.rejected, (state, action) => {
          state.status = "rejected";
      });
  
      builder.addCase(selectBeca.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(selectBeca.fulfilled, (state, action) => { //action.payload
         state.selectedBecas.push(action.payload);
          state.status = "success";
      });
      builder.addCase(selectBeca.rejected, (state, action) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectBeca.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(deselectBeca.fulfilled, (state, action) => { //action.payload
        state.selectedBecas = state.selectedBecas.filter(
          (publicationId) => publicationId !== action.payload
        );
          state.status = "success";
      });
      builder.addCase(deselectBeca.rejected, (state, action) => {
          state.status = "rejected";
      });
  },
});

export default becaSlices.reducer;
