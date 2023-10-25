import { createSlice } from "@reduxjs/toolkit";
import { deleteStateAllAmbientes, deselectAllAmbientes, deselectAmbiente, getAllAmbientes, selectAllAmbientes, selectAmbiente } from "../actions/galleryActions";

const initialState = {
    ambient:[],
    selectedAmbients:[]
};

const gallerySlices = createSlice({
  name: "gallery",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllAmbientes.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getAllAmbientes.fulfilled, (state, action) => { //action.payload
        state.ambient=action.payload
        state.status = "success";
    });
    builder.addCase(getAllAmbientes.rejected, (state, action) => {
        state.status = "rejected";
    });
    builder.addCase(deleteStateAllAmbientes.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteStateAllAmbientes.fulfilled, (state, action) => { //action.payload
        state.gallery=action.payload
        state.status = "success";
    });
    builder.addCase(deleteStateAllAmbientes.rejected, (state) => {
        state.status = "rejected";
    });
    //checkbox
    builder.addCase(selectAllAmbientes.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(selectAllAmbientes.fulfilled, (state, action) => { //action.payload
        state.selectedAmbients = action.payload;
        state.status = "success";
    });
    builder.addCase(selectAllAmbientes.rejected, (state) => {
        state.status = "rejected";
    });

    builder.addCase(deselectAllAmbientes.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deselectAllAmbientes.fulfilled, (state) => { //action.payload
        state.selectedAmbients = [];
        state.status = "success";
    });
    builder.addCase(deselectAllAmbientes.rejected, (state) => {
        state.status = "rejected";
    });

    builder.addCase(selectAmbiente.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(selectAmbiente.fulfilled, (state, action) => { //action.payload
       state.selectedAmbients.push(action.payload);
        state.status = "success";
    });
    builder.addCase(selectAmbiente.rejected, (state) => {
        state.status = "rejected";
    });

    builder.addCase(deselectAmbiente.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deselectAmbiente.fulfilled, (state, action) => { //action.payload
      state.selectedAmbients = state.selectedAmbients.filter(
        (programId) => programId !== action.payload
      );
        state.status = "success";
    });
    builder.addCase(deselectAmbiente.rejected, (state) => {
        state.status = "rejected";
    });
  },
});

export default gallerySlices.reducer;













// import { createSlice } from "@reduxjs/toolkit";
// import { deleteStateAllAmbientes, deselectAllAmbientes, deselectAmbiente, getAllAmbientes, selectAllAmbientes, selectAmbiente } from "../actions/galleryActions";

// const initialState = {
//     gallery:[],
//     selectedImages:[],
//     ambients:[]

// };

// const gallerySlices = createSlice({
//   name: "galleries",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getAllAmbientes.pending, (state, action) => {
//       state.status = "pending";
//     });
//     builder.addCase(getAllAmbientes.fulfilled, (state, action) => { //action.payload
//         state.gallery=action.payload //[dawdawd,awd]   áwdawd
//         state.status = "success";
//     });
//     builder.addCase(getAllAmbientes.rejected, (state, action) => {
//         state.status = "rejected";
//     });
    
//     builder.addCase(deleteStateAllAmbientes.pending, (state) => {
//       state.status = "pending";
//     });
//     builder.addCase(deleteStateAllAmbientes.fulfilled, (state, action) => { //action.payload
//         state.gallery=action.payload
//         state.status = "success";
//     });
//     builder.addCase(deleteStateAllAmbientes.rejected, (state) => {
//         state.status = "rejected";
//     });
//     //checkbox
//     builder.addCase(selectAllAmbientes.pending, (state) => {
//       state.status = "pending";
//     });
//     builder.addCase(selectAllAmbientes.fulfilled, (state, action) => { //action.payload
//         state.selectedImagesy = action.payload;
//         state.status = "success";
//     });
//     builder.addCase(selectAllAmbientes.rejected, (state) => {
//         state.status = "rejected";
//     });

//     builder.addCase(deselectAllAmbientes.pending, (state) => {
//       state.status = "pending";
//     });
//     builder.addCase(deselectAllAmbientes.fulfilled, (state) => { //action.payload
//         state.selectedImages = [];
//         state.status = "success";
//     });
//     builder.addCase(deselectAllAmbientes.rejected, (state) => {
//         state.status = "rejected";
//     });

//     builder.addCase(selectAmbiente.pending, (state) => {
//       state.status = "pending";
//     });
//     builder.addCase(selectAmbiente.fulfilled, (state, action) => { //action.payload
//        state.selectedImages.push(action.payload);
//         state.status = "success";
//     });
//     builder.addCase(selectAmbiente.rejected, (state) => {
//         state.status = "rejected";
//     });

//     builder.addCase(deselectAmbiente.pending, (state) => {
//       state.status = "pending";
//     });
//     builder.addCase(deselectAmbiente.fulfilled, (state, action) => { //action.payload
//       state.selectedImages = state.selectedImages.filter(
//         (programId) => programId !== action.payload
//       );
//         state.status = "success";
//     });
//     builder.addCase(deselectAmbiente.rejected, (state) => {
//         state.status = "rejected";
//     });
//   },
// });

// export default gallerySlices.reducer;
