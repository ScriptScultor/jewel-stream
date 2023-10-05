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

// Redux Thunk function to handle asynchronous registration
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading()); // Set loading state to true
    const response = await makeApiRequest({
      url: "/jewelstream/api/v1/registerUser",
      method: HttpMethod.POST,
      data: {
        userName: userData.fullName,
        userEmail: userData.email,
        userMobileNumber: userData.phoneNumber,
        userCategory: userData.category,
        userEncryptedPassword: userData.password,
        userGstNum:
          userData.gstNumber === undefined ? null : userData.gstNumber,
      },
    });
    localStorage.setItem("authToken", response.data);
    dispatch(fetchUserData()); // Fetch user data after registration
    // Dispatch other actions if needed, indicating success
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    dispatch(setError({ error: error.message })); // Update error in the state
    throw error;
  }
};

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
    localStorage.setItem("authToken", response.data);
    dispatch(fetchUserData()); // Fetch user data after registration
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    // Handle login errors and set error state
    dispatch(setError(error.message));
  }
};

// Example async action to fetch user data using a token
export const fetchUserData = () => async (dispatch) => {
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
  }
};

// Redux Thunk action to handle user logout
export const logoutUser = () => async (dispatch) => {
  try {
    // Perform any additional cleanup tasks here, e.g., clearing tokens from local storage
    localStorage.removeItem("authToken");

    // Clear user data and authentication state from the Redux store
    dispatch(logout()); // Assuming you have a "logout" action in your auth slice
  } catch (error) {
    // Handle any errors during logout, if necessary
    console.error("Error during logout:", error);
  }
};
