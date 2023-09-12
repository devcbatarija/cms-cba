import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define una acción asíncrona llamada `getAllProgram`.
export const getAllProgram = createAsyncThunk("/getAllProgram", async () => {
    try {
        // Realiza una solicitud GET a "program" utilizando axios.
        const response = await axios.get("program");
        // Imprime los resultados de la solicitud en la consola.
        console.log(response.data.results);
        // Retorna los resultados de la solicitud (normalmente, un array de programas).
        return response.data.results;
    } catch (error) {
        // En caso de error (por ejemplo, una falla en la solicitud), retorna el mensaje de error.
        return error.message;
    }
});

// Define una acción asíncrona llamada `deleteStateAllPrograms`.
export const deleteStateAllPrograms = createAsyncThunk("/deleteStateAllPrograms", async () => {
    try {
        // Retorna un array vacío, no se realiza ninguna solicitud HTTP real en esta acción.
        return [];
        // eslint-disable-next-line no-unreachable
    } catch (error) {
        // En caso de error, retorna el mensaje de error.
        return error.message;
    }
});

// Define una acción asíncrona llamada `selectAllPrograms`.
export const selectAllPrograms = createAsyncThunk("/selectAllPrograms", async (programIds) => {
    // Retorna el array `programIds` tal como está, no se realiza ninguna solicitud HTTP real en esta acción.
    return programIds;
});

// Define una acción asíncrona llamada `deselectAllPrograms`.
export const deselectAllPrograms = createAsyncThunk("/deselectAllPrograms", async () => {
    // Retorna un array vacío, no se realiza ninguna solicitud HTTP real en esta acción.
    return [];
});

// Define una acción asíncrona llamada `selectProgram`.
export const selectProgram = createAsyncThunk("/selectProgram", async (programId) => {
    // Retorna el valor `programId` tal como está, no se realiza ninguna solicitud HTTP real en esta acción.
    return programId;
});

// Define una acción asíncrona llamada `deselectProgram`.
export const deselectProgram = createAsyncThunk("/deselectProgram", async (programId) => {
    // Retorna el valor `programId` tal como está, no se realiza ninguna solicitud HTTP real en esta acción.
    return programId;
});
