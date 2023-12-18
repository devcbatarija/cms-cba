import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenGet } from "../../services/functions";


export const getallusers = createAsyncThunk("/getallusers", async () => {
  try {
    const config = await tokenGet();
    const response = await axios.get("users", config); 
    return response.data.data;
  } catch (error) {
    console.log(error)
  }
});

export const deleteStateAllUsers = createAsyncThunk("/deleteStateAllUsers", async (payload) => {
  try {
    return [];
  } catch (error) {
    return error.message;
  }
});
export const selectAllUsers = createAsyncThunk("/selectAllUsers", async (userIds) => {
  return userIds;
});

export const deselectAllUsers = createAsyncThunk("/deselectAllUsers", async () => {
  return [];
});

export const selectUser = createAsyncThunk("/selectUser", async (userId) => {
  return userId;
});

export const deselectUser = createAsyncThunk("/deselectUser", async (userId) => {
  return userId;
});