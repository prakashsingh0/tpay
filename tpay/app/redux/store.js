import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./authSlice";
import walletReducer from "./walletSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 👇 Wrap this in _layout.tsx root
import { Slot } from "expo-router";
import React from "react";

export function ReduxProvider() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}



