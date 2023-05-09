import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  // object name
  name: "alerts",

  initialState: {
    loading: true,
  },

  reducers: {
    showLoading: (state, action) => {
      state.loading = true
    },

    hideLoading: (state, action) => {
      state.loading = false
    },
  },

});

export const  { showLoading,hideLoading } = alertSlice.actions
