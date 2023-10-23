// Importa la función `createSlice` de Redux Toolkit y las acciones definidas en "../actions/programActions".
import { createSlice } from "@reduxjs/toolkit";
import { deleteStateAllPrograms, deselectAllPrograms, deselectProgram, getAllProgram, selectAllPrograms, selectProgram } from "../actions/programActions";

// Define el estado inicial para este slice de Redux.
const initialState = {
    programs: [],   
    selectedPrograms: [],
    programPices:[]
};

// Crea un slice de Redux llamado "programSlices" con su estado inicial.
const programSlices = createSlice({
  name: "programs",
  initialState,
  extraReducers: (builder) => {

    builder.addCase(getAllProgram.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(getAllProgram.fulfilled, (state, action) => {
      state.programs = action.payload;
      state.status = "success";
    });

    builder.addCase(getAllProgram.rejected, (state) => {
      state.status = "rejected";
    });


    builder.addCase(deleteStateAllPrograms.pending, (state) => {
        state.status = "pending";
      });
      builder.addCase(deleteStateAllPrograms.fulfilled, (state, action) => { //action.payload
          state.programs=action.payload
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
          state.selectedPrograms = action.payload;
          state.status = "success";
      });
      builder.addCase(selectAllPrograms.rejected, (state) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectAllPrograms.pending, (state) => {
        state.status = "pending";
      });
      builder.addCase(deselectAllPrograms.fulfilled, (state) => { //action.payload
          state.selectedPrograms = [];
          state.status = "success";
      });
      builder.addCase(deselectAllPrograms.rejected, (state) => {
          state.status = "rejected";
      });
  
      builder.addCase(selectProgram.pending, (state) => {
        state.status = "pending";
      });
      builder.addCase(selectProgram.fulfilled, (state, action) => { //action.payload
         state.selectedPrograms.push(action.payload);
          state.status = "success";
      });
      builder.addCase(selectProgram.rejected, (state) => {
          state.status = "rejected";
      });
  
      builder.addCase(deselectProgram.pending, (state) => {
        state.status = "pending";
      });
      builder.addCase(deselectProgram.fulfilled, (state, action) => { //action.payload
        state.selectedPrograms = state.selectedPrograms.filter(
          (programId) => programId !== action.payload
        );
          state.status = "success";
      });
      builder.addCase(deselectProgram.rejected, (state) => {
          state.status = "rejected";
      });
  },
});

export default programSlices.reducer;
