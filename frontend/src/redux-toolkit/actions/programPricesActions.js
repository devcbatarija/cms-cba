import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllProgramPrices = createAsyncThunk("/getAllProgramPrices", async () => {
  try {
    const response = await axios.get("programPrices");
    return response.data.resultsprogramPrices
  } catch (error) {
    return error.message;
  }
});

export const deleteStateAllProgramPrices = createAsyncThunk("/deleteStateAllProgramPrices", async (payload) => {
  try {
    return [];
  } catch (error) {
    return error.message;
  }
});
export const selectAllProgramPrices = createAsyncThunk("/selectAllProgramPrices", async (programIds) => {
  return programIds;
});

export const deselectAllProgramPrices = createAsyncThunk("/deselectAllProgramPrices", async () => {
  return [];
});

export const selectProgramPrice = createAsyncThunk("/selectProgramPrice", async (programId) => {
  return programId;
});

export const deselectProgramPrice = createAsyncThunk("/deselectProgramPrice", async (programId) => {
  return programId;
});