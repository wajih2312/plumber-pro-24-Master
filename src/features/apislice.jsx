import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchServices = createAsyncThunk(
  "api/fetchServices",
  async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    services: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      });
  },
});

export default apiSlice.reducer;