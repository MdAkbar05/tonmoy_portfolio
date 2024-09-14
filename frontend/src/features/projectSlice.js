import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get("http://localhost:5000/api/projects");
    console.log(response);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
