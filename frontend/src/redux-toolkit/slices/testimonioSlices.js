import { createSlice } from "@reduxjs/toolkit";
import { deleteStateAllTestimonio, deselectAllTestimonio, deselectTestimonio, getAllTestimonio, selectAllTestimonio, selectTestimonio } from "../actions/testimonioActions";

const initialState = {
    testimonios: [],
    selectedTestimonios: []
}
const testimonioSlice = createSlice({
    name: "testimonios",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllTestimonio.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(getAllTestimonio.fulfilled, (state, action) => {
            state.testimonios = action.payload
            state.status = "success";
        });
        builder.addCase(getAllTestimonio.rejected, (state, action) => {
            state.status = "rejected";
        });
///////////
        builder.addCase(deleteStateAllTestimonio.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(deleteStateAllTestimonio.fulfilled, (state, action) => {
            state.testimonios = action.payload
            state.status = "success";
        });
        builder.addCase(deleteStateAllTestimonio.rejected, (state) => {
            state.status = "rejected";
        });
        //checkbox
        builder.addCase(selectAllTestimonio.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(selectAllTestimonio.fulfilled, (state, action) => {
            state.selectedTestimonios = action.payload;
            state.status = "success";
        });
        builder.addCase(selectAllTestimonio.rejected, (state) => {
            state.status = "rejected";
        });

        builder.addCase(deselectAllTestimonio.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(deselectAllTestimonio.fulfilled, (state) => {
            state.selectedTestimonios = [];
            state.status = "success";
        });
        builder.addCase(deselectAllTestimonio.rejected, (state) => {
            state.status = "rejected";
        });

        builder.addCase(selectTestimonio.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(selectTestimonio.fulfilled, (state, action) => {
            state.selectedTestimonios.push(action.payload);
            state.status = "success";
        });
        builder.addCase(selectTestimonio.rejected, (state) => {
            state.status = "rejected";
        });

        builder.addCase(deselectTestimonio.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(deselectTestimonio.fulfilled, (state, action) => {
            state.selectedTestimonios = state.selectedTestimonios.filter(
                (testimonioId) => testimonioId !== action.payload
            );
            state.status = "success";
        });
        builder.addCase(deselectTestimonio.rejected, (state) => {
            state.status = "rejected";
        });

    }
})
export default testimonioSlice.reducer;