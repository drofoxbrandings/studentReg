import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//list all users api call
export const listNationality = createAsyncThunk(
  "students/listNationality",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8088/api/Nationalities ");
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
