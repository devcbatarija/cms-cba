// Importa la función `createSlice` de Redux Toolkit y las acciones definidas en "../actions/programActions".
import { createSlice } from "@reduxjs/toolkit";
import { deleteStateAllPrograms, deselectAllPrograms, deselectProgram, getAllProgram, selectAllPrograms, selectProgram } from "../actions/programActions";

// Define el estado inicial para este slice de Redux.
const initialState = {
    programs: [],              // Un array para almacenar programas.
    selectedPublications: []   // Un array para almacenar las publicaciones seleccionadas.
};

// Crea un slice de Redux llamado "programSlices" con su estado inicial.
const programSlices = createSlice({
  name: "programs",           // El nombre del slice.
  initialState,               // El estado inicial definido anteriormente.
  extraReducers: (builder) => {
    // Maneja las acciones asincrónicas relacionadas con `getAllProgram`.

    // Cuando la acción `getAllProgram` está en estado "pending" (en progreso).
    builder.addCase(getAllProgram.pending, (state) => {
      state.status = "pending";  // Establece el estado a "pending".
    });

    // Cuando la acción `getAllProgram` se resuelve exitosamente (fulfilled).
    builder.addCase(getAllProgram.fulfilled, (state, action) => {
      state.programs = action.payload;  // Actualiza el estado con los programas obtenidos.
      state.status = "success";            // Establece el estado a "success".
    });

    // Cuando la acción `getAllProgram` es rechazada (rejected).
    builder.addCase(getAllProgram.rejected, (state) => {
      state.status = "rejected";  // Establece el estado a "rejected".
    });


    builder.addCase(deleteStateAllPrograms.pending, (state) => {
        state.status = "pending";
      });
      builder.addCase(deleteStateAllPrograms.fulfilled, (state, action) => { //action.payload
          state.publications=action.payload
          state.status = "success";
      });
      builder.addCase(deleteStateAllPrograms.rejected, (state) => {
          state.status = "rejected";
      });
      //checkbox
      builder.addCase(selectAllPrograms.pending, (state) => {
        state.status = "pending";
      });
      builder.addCase(selectAllPrograms.fulfilled, (state, action) => { //action.payload
          state.selectedPublications = action.payload;
          state.status = "success";
      });
      builder.addCase(selectAllPrograms.rejected, (state) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectAllPrograms.pending, (state) => {
        state.status = "pending";
      });
      builder.addCase(deselectAllPrograms.fulfilled, (state) => { //action.payload
          state.selectedPublications = [];
          state.status = "success";
      });
      builder.addCase(deselectAllPrograms.rejected, (state) => {
          state.status = "rejected";
      });
  
      builder.addCase(selectProgram.pending, (state) => {
        state.status = "pending";
      });
      builder.addCase(selectProgram.fulfilled, (state, action) => { //action.payload
         state.selectedPublications.push(action.payload);
          state.status = "success";
      });
      builder.addCase(selectProgram.rejected, (state) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectProgram.pending, (state) => {
        state.status = "pending";
      });
      builder.addCase(deselectProgram.fulfilled, (state, action) => { //action.payload
        state.selectedPublications = state.selectedPublications.filter(
          (publicationId) => publicationId !== action.payload
        );
          state.status = "success";
      });
      builder.addCase(deselectProgram.rejected, (state) => {
          state.status = "rejected";
      });
  },
});

export default programSlices.reducer;
