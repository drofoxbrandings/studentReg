import { createSlice } from "@reduxjs/toolkit";
import { listStudents } from "./studentApi";

const initialState = {
  students: [],
  status: "idle",
  error: null,
  message: "",
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(listStudents.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listStudents.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.students = action.payload;
      })
      .addCase(listStudents.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      });
  },
});
export const getAllStudents = (state) => state.student.students;
export default studentSlice.reducer;
