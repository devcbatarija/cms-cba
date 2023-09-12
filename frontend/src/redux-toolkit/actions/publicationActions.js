import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllPublication = createAsyncThunk("/getAllPublication", async () => {
  try {
    const   response=await axios.get("publication");
    console.log(response.data.results)
    return response.data.results
  } catch (error) {
    return error.message;
  }
});

export const deleteStateAllPublications = createAsyncThunk("/deleteStateAllPublications", async (payload) => {
    try {
      return [];
    } catch (error) {
      return error.message;
    }
  });
  export const selectAllPublications = createAsyncThunk("/selectAllPublications", async (publicationIds) => {
    return publicationIds;
  });
  
  export const deselectAllPublications = createAsyncThunk("/deselectAllPublications", async () => {
    return [];
  });
  
  export const selectPublication = createAsyncThunk("/selectPublication", async (publicationId) => {
    return publicationId;
  });
  
  export const deselectPublication = createAsyncThunk("/deselectPublication", async (publicationId) => {
    return publicationId;
  });