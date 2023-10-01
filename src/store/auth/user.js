// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { makeApiRequest } from "../../data/axios";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;

// Example async action to fetch user data using a token
export const fetchUserData = (token) => async (dispatch) => {
  dispatch(setLoading()); // Set loading state
  try {
    const response = await makeApiRequest({
      url: "/jewelstream/api/v1/userdetails",
    });
    dispatch(setUser(response)); // Update user data in the state
    // Dispatch other actions if needed, indicating success
    return {
      success: true,
    };
  } catch (error) {
    // Handle errors and set error state
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); // Set loading state to false regardless of success or failure
  }
};
