import { createSlice } from "@reduxjs/toolkit";
import { listUsers } from "./studentApi";

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
    extraReducers(builder){
        builder.addCase(listUsers.pending, (state) => {
            state.status = "pending"
        })
    }
  })

  export default studentSlice.reducer;