import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//test

export const test = createAsyncThunk("/test", async () => {
  try {
    const data=await axios.get("https://rickandmortyapi.com/api/character");
    return data.data.results;
  } catch (error) {
    return error.message;
  }
});