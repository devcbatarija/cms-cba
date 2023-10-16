import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllAmbientes = createAsyncThunk("/getAllAmbientes", async () => {
  try {
    const response=await axios.get("environment");
    return response.data
  } catch (error) {
    return error.message;
  }
});

export const deleteStateAllAmbientes = createAsyncThunk("/deleteStateAllAmbientes", async (payload) => {
  try {
    return [];
  } catch (error) {
    return error.message;
  }
});
export const selectAllAmbientes = createAsyncThunk("/selectAllAmbientes", async (AmbienteIds) => {
  return AmbienteIds;
});

export const deselectAllAmbientes = createAsyncThunk("/deselectAllAmbientes", async () => {
  return [];
});

export const selectAmbiente = createAsyncThunk("/selectAmbiente", async (AmbienteId) => {
  return AmbienteId;
});

export const deselectAmbiente = createAsyncThunk("/deselectAmbiente", async (AmbienteId) => {
  return AmbienteId;
});