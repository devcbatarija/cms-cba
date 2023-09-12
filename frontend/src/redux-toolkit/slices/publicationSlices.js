import { createSlice } from "@reduxjs/toolkit";
import { deleteStateAllPublications, deselectAllPublications, deselectPublication, getAllPublication, selectAllPublications, selectPublication } from "../actions/publicationActions";

const initialState = {
    publications:[],
    selectedPublications:[]
};

const publicationSlices = createSlice({
  name: "publications",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPublication.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getAllPublication.fulfilled, (state, action) => { //action.payload
        state.publications=action.payload
        state.status = "success";
    });
    builder.addCase(getAllPublication.rejected, (state, action) => {
        state.status = "rejected";
    });


    builder.addCase(deleteStateAllPublications.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(deleteStateAllPublications.fulfilled, (state, action) => { //action.payload
          state.publications=action.payload
          state.status = "success";
      });
      builder.addCase(deleteStateAllPublications.rejected, (state, action) => {
          state.status = "rejected";
      });
      //checkbox
      builder.addCase(selectAllPublications.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(selectAllPublications.fulfilled, (state, action) => { //action.payload
          state.selectedPublications = action.payload;
          state.status = "success";
      });
      builder.addCase(selectAllPublications.rejected, (state, action) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectAllPublications.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(deselectAllPublications.fulfilled, (state, action) => { //action.payload
          state.selectedPublications = [];
          state.status = "success";
      });
      builder.addCase(deselectAllPublications.rejected, (state, action) => {
          state.status = "rejected";
      });
  
      builder.addCase(selectPublication.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(selectPublication.fulfilled, (state, action) => { //action.payload
         state.selectedPublications.push(action.payload);
          state.status = "success";
      });
      builder.addCase(selectPublication.rejected, (state, action) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectPublication.pending, (state, action) => {
        state.status = "pending";
      });
      builder.addCase(deselectPublication.fulfilled, (state, action) => { //action.payload
        state.selectedPublications = state.selectedPublications.filter(
          (publicationId) => publicationId !== action.payload
        );
          state.status = "success";
      });
      builder.addCase(deselectPublication.rejected, (state, action) => {
          state.status = "rejected";
      });
  },
});

export default publicationSlices.reducer;
