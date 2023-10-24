import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTestimonio = createAsyncThunk("/getAllTestimonio", async () => {
  try {
    const response = await axios.get('testimonios/');
    return response.data
  } catch (error) {
    return error.message;
  }
});
export const deleteStateAllTestimonio = createAsyncThunk("/deleteStateAllTestimonio", async () => {
  try {
    return [];
  } catch (error) {
    return error.message;
  }
});
export const selectAllTestimonio = createAsyncThunk("/selectAllTestimonio", async (testimonioIDs) => {
  return testimonioIDs;
});
export const deselectAllTestimonio = createAsyncThunk("/deselectAllTestimonio", async () => {
  return [];
});
export const selectTestimonio = createAsyncThunk("/selectTestimonio", async (testimonioID) => {
  return testimonioID;
});
export const deselectTestimonio = createAsyncThunk("/deselectTestimonio", async (testimonioID) => {
  return testimonioID;
});
