import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllBeca = createAsyncThunk("/getAllBeca", async () => {
  try {
    const response = await axios.get("beca");
    return response.data.results
  } catch (error) {
    return error.message;
  }
});

export const deleteStateAllBecas = createAsyncThunk("/deleteStateAllBecas", async (payload) => {
  try {
    return [];
  } catch (error) {
    return error.message;
  }
});
export const selectAllBecas = createAsyncThunk("/selectAllBecas", async (becaIds) => {
  return becaIds;
});

export const deselectAllBecas = createAsyncThunk("/deselectAllBecas", async () => {
  return [];
});

export const selectBeca = createAsyncThunk("/selectBeca", async (becaId) => {
  return becaId;
});

export const deselectBeca = createAsyncThunk("/deselectBeca", async (becaId) => {
  return becaId;
});