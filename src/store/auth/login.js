// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { HttpMethod, makeApiRequest } from "../../data/axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;

export default authSlice.reducer;

// Example async action to simulate user login
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading()); // Set loading state
  try {
    const response = await makeApiRequest({
      url: "/jewelstream/api/v1/loginUser",
      method: HttpMethod.POST,
      data: {
        userMobileNumber: credentials.phone,
        userPassword: credentials.password,
      },
    });
    dispatch(setUser(response));
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    // Handle login errors and set error state
    dispatch(setError(error.message));
  }
};
