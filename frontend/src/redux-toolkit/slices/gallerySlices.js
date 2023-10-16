import { createSlice } from "@reduxjs/toolkit";
import { getAllAmbientes } from "../actions/galleryActions";

const initialState = {
    ambient:[],
};

const gallerySlices = createSlice({
  name: "gallery",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllAmbientes.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getAllAmbientes.fulfilled, (state, action) => { //action.payload
        state.ambient=action.payload
        state.status = "success";
    });
    builder.addCase(getAllAmbientes.rejected, (state, action) => {
        state.status = "rejected";
    });

  },
});

export default gallerySlices.reducer;
