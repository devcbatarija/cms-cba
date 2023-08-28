import { createAsyncThunk } from "@reduxjs/toolkit";

export const signin = createAsyncThunk("/signin", async (payload) => {
  try {
    return payload
  } catch (error) {
    return error.message;
  }
});
export const authValid=createAsyncThunk("/authValid",async(payload)=>{
  try {
    return payload;
  } catch (error) {
    return error.message;
  }
})
export const logoutSession=createAsyncThunk("/logoutSession",async(option)=>{
  try {
    return option;
  } catch (error) {
    return error;
  }
})