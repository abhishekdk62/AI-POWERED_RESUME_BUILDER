import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  uid: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      (state.uid = null), (state.role = null), (state.isAuthenticated = false);
      state.isLoading = false; // explicitly set to false
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
