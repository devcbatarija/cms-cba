import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getallusers = createAsyncThunk("/getallusers", async () => {
  try {
    const response=await axios.get('/users');
    console.log(response)
    return response.data.data;
  } catch (error) {
    return error.message;
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