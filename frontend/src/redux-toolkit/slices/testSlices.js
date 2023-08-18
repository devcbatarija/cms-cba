import { createSlice } from "@reduxjs/toolkit";
import { test } from "../actions/testActions";

const initialState = {
  test: [],
};

const testSlices = createSlice({
  name: "test",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(test.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(test.fulfilled, (state, action) => { //action.payload
        state.test=action.payload
        state.status = "success";
    });
    builder.addCase(test.rejected, (state, action) => {
        state.status = "rejected";
    });
  },
});

export default testSlices.reducer;
