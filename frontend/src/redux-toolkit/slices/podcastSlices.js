import { createSlice } from "@reduxjs/toolkit";
import { getPodcastSongs, postPodcastSongsSpotify} from "../actions/podcastActions";

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

    builder.addCase(postPodcastSongsSpotify.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(postPodcastSongsSpotify.fulfilled, (state, action) => { //action.payload
        state.songs=action.payload
        state.status = "success";
    });
    builder.addCase(postPodcastSongsSpotify.rejected, (state, action) => {
        state.status = "rejected";
    });
  },
});

export default podcastSlices.reducer;
