import { createSlice } from "@reduxjs/toolkit";
import { signin } from "../actions/auth.Actions";

const initialState = {
    auth:false,
    user:""
};

const loginSlices = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(signin.fulfilled, (state, action) => { //action.payload
        state.auth=true;
        state.user=action.payload
        state.status = "success";
    });
    builder.addCase(signin.rejected, (state, action) => {
        state.status = "rejected";
    });
  },
});

export default loginSlices.reducer;
