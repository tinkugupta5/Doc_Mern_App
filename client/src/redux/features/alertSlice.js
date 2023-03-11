import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alerts",

  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state, action) => {},
  },
});
