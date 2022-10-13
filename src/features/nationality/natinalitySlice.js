import { createSlice } from "@reduxjs/toolkit";
import { listNationality } from "./nationalityApis";

const initialState = {
  nationality: [],
  status: "idle",
  error: null,
  message: "",
};

const nationalitySlice = createSlice({
  name: "nationality",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(listNationality.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listNationality.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.nationality = action.payload;
      })
      .addCase(listNationality.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      });
  },
});
export const getAllNationality = (state) => state.nationality.nationality;
export default nationalitySlice.reducer;
