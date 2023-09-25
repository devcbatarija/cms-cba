import { createSlice } from "@reduxjs/toolkit";
import { getPodcastSongs, getPodcastSongsSpotify, getPodcasts, hadleDeleteState } from "../actions/podcastActions";

const initialState = {
    podcasts:[],
    credentials:[],
    songs:[],
    _token_access:""
};

const podcastSlices = createSlice({
  name: "podcast",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPodcasts.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getPodcasts.fulfilled, (state, action) => { //action.payload
        state.credentials=action.payload
        state.status = "success";
    });
    builder.addCase(getPodcasts.rejected, (state, action) => {
        state.status = "rejected";
    });

    builder.addCase(getPodcastSongs.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getPodcastSongs.fulfilled, (state, action) => { //action.payload
        state.podcasts=action.payload
        state.status = "success";
    });
    builder.addCase(getPodcastSongs.rejected, (state, action) => {
        state.status = "rejected";
    });

    builder.addCase(getPodcastSongsSpotify.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getPodcastSongsSpotify.fulfilled, (state, action) => { //action.payload
        state.songs=action.payload
        state.status = "success";
    });
    builder.addCase(getPodcastSongsSpotify.rejected, (state, action) => {
        state.status = "rejected";
    });

    builder.addCase(hadleDeleteState.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(hadleDeleteState.fulfilled, (state, action) => { //action.payload
        state.songs=[];
        state.status = "success";
    });
    builder.addCase(hadleDeleteState.rejected, (state, action) => {
        state.status = "rejected";
    })
  },
});

export default podcastSlices.reducer;
