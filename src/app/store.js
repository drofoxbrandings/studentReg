import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/students/studentSlice";
import nationalityReducer from "../features/nationality/natinalitySlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    nationality: nationalityReducer,
  },
});
