import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTestimonio = createAsyncThunk("/getAllTestimonio", async () => {
  try {
    const response=await axios.get('testimonios/');
    console.log(response)
    return response.data
  } catch (error) {
    return error.message;
  }
});