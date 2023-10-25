import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProgram = createAsyncThunk("/getAllProgram", async () => {
    try {
        const response = await axios.get("program");
        return response.data.results;
    } catch (error) {
        return error.message;
    }
}); 
export const deleteStateAllPrograms = createAsyncThunk("/deleteStateAllPrograms", async () => {
    try {
        return [];
    } catch (error) {
        return error.message;
    }
});
export const selectAllPrograms = createAsyncThunk("/selectAllPrograms", async (programIds) => {
    return programIds;
});
export const deselectAllPrograms = createAsyncThunk("/deselectAllPrograms", async () => {
    return [];
});
export const selectProgram = createAsyncThunk("/selectProgram", async (programId) => {
    return programId;
});
export const deselectProgram = createAsyncThunk("/deselectProgram", async (programId) => {
    return programId;
});
