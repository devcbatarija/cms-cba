import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getallusers = createAsyncThunk("/getallusers", async (payload) => {
  try {
    const response=await axios.get('/users');
    return response.data.result;
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