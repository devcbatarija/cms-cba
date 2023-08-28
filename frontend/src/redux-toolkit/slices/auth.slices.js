import { createSlice } from "@reduxjs/toolkit";
import { authValid, logoutSession, signin } from "../actions/auth.Actions";

const initialState = {
    auth:false,
    user:{}
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

    builder.addCase(authValid.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(authValid.fulfilled, (state, action) => { //action.payload
        state.auth=true;
        state.user=action.payload
        state.status = "success";
    });
    builder.addCase(authValid.rejected, (state, action) => {
        state.status = "rejected";
    });

    builder.addCase(logoutSession.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(logoutSession.fulfilled, (state, action) => { //action.payload
        state.auth=action.payload;
        state.user={};
        state.status = "success";
    });
    builder.addCase(logoutSession.rejected, (state, action) => {
        state.status = "rejected";
    });
  },
});

export default loginSlices.reducer;
