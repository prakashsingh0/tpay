import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { router } from "expo-router";

interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: string; token: string }>
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
     
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
