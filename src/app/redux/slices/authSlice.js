"use client";

import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely access localStorage
const getStoredAuthState = () => {
  if (typeof window === "undefined") return null;
  
  const storedState = localStorage.getItem("authState") || sessionStorage.getItem("authState");
  if (!storedState) return null;

  try {
    return JSON.parse(storedState);
  } catch (error) {
    console.error("Failed to parse stored auth state:", error);
    return null;
  }
};

// Validate the stored auth state
const validateAuthState = (state) => {
  return (
    state &&
    typeof state.isAuthenticated === "boolean" &&
    (state.user === null || (
      typeof state.user === "object" &&
      typeof state.user.token === "string" &&
      typeof state.user.userId === "number"
    ))
  );
};

// Initialize state
const initialState = (() => {
  const storedState = getStoredAuthState();
  return validateAuthState(storedState) ? storedState : {
    isAuthenticated: false,
    user: null,
  };
})();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      if (!action.payload?.token) {
        console.error("Login payload must contain a token");
        return;
      }

      state.isAuthenticated = true;
      state.user = action.payload;

      if (typeof window !== "undefined") {
        const serializedState = JSON.stringify({
          isAuthenticated: true,
          user: action.payload,
        });
        localStorage.setItem("authState", serializedState);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("authState");
        sessionStorage.removeItem("authState");
      }
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUserProfile: (state, action) => {
      if (state.isAuthenticated && state.user) {
        state.user = { ...state.user, ...action.payload };
        
        if (typeof window !== "undefined") {
          const serializedState = JSON.stringify({
            isAuthenticated: state.isAuthenticated,
            user: state.user,
          });
          localStorage.setItem("authState", serializedState);
        }
      }
    },
  },
});

export const { loginSuccess, logout, loginFailure, updateUserProfile } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.user?.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;