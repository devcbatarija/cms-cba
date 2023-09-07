import { createSlice } from "@reduxjs/toolkit";
import { 
  getallusers,
  selectAllUsers,
  deselectAllUsers,
  selectUser,
  deselectUser, 
  deleteStateAllUsers
} from "../actions/userActions";

const initialState = {
    users:[],
    selectedUsers:[]
};

const userSlices = createSlice({
  name: "users",
  initialState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder.addCase(getallusers.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getallusers.fulfilled, (state, action) => { //action.payload
        state.users=action.payload
        state.status = "success";
    });
    builder.addCase(getallusers.rejected, (state, action) => {
        state.status = "rejected";
    });

    builder.addCase(deleteStateAllUsers.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(deleteStateAllUsers.fulfilled, (state, action) => { //action.payload
        state.users=action.payload
        state.status = "success";
    });
    builder.addCase(deleteStateAllUsers.rejected, (state, action) => {
        state.status = "rejected";
    });

    builder.addCase(selectAllUsers.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(selectAllUsers.fulfilled, (state, action) => { //action.payload
        state.selectedUsers = action.payload;
        state.status = "success";
    });
    builder.addCase(selectAllUsers.rejected, (state, action) => {
        state.status = "rejected";
    });

    builder.addCase(deselectAllUsers.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(deselectAllUsers.fulfilled, (state, action) => { //action.payload
        state.selectedUsers = [];
        state.status = "success";
    });
    builder.addCase(deselectAllUsers.rejected, (state, action) => {
        state.status = "rejected";
    });

    builder.addCase(selectUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(selectUser.fulfilled, (state, action) => { //action.payload
       state.selectedUsers.push(action.payload);
        state.status = "success";
    });
    builder.addCase(selectUser.rejected, (state, action) => {
        state.status = "rejected";
    });

    builder.addCase(deselectUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(deselectUser.fulfilled, (state, action) => { //action.payload
      state.selectedUsers = state.selectedUsers.filter(
        (userId) => userId !== action.payload
      );
        state.status = "success";
    });
    builder.addCase(deselectUser.rejected, (state, action) => {
        state.status = "rejected";
    });


  },
});

export default userSlices.reducer;
