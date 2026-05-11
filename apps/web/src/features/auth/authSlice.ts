import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/types/api";

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: AuthUser }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    loadCredentialsFromStorage: (state) => {
      if (typeof window === "undefined") {
        return;
      }

      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      state.accessToken = accessToken;
      state.user = user ? (JSON.parse(user) as AuthUser) : null;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setCredentials, loadCredentialsFromStorage, logout } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
