"use client";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { loadCredentialsFromStorage } from "@/features/auth/authSlice";
import { store } from "./store";

type StoreProviderProps = {
  children: ReactNode;
};

const AuthBootstrapper = ({ children }: StoreProviderProps) => {
  useEffect(() => {
    store.dispatch(loadCredentialsFromStorage());
  }, []);

  return children;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <Provider store={store}>
      <AuthBootstrapper>{children}</AuthBootstrapper>
    </Provider>
  );
};
