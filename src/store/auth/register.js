import { createSlice } from "@reduxjs/toolkit";
import { makeApiRequest, HttpMethod } from "../../data/axios";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    userData: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserAccount: (state, action) => {
      state.userData = action.payload;
      state.error = null;
    },
    setUserAccountError: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { setLoading, setUserAccount, setUserAccountError } =
  registerSlice.actions;

// Redux Thunk function to handle asynchronous registration
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading state to true
    const response = await makeApiRequest({
      url: "/jewelstream/api/v1/registerUser",
      method: HttpMethod.POST,
      data: {
        userName: userData.fullName,
        userEmail: userData.email,
        userMobileNumber: userData.phoneNumber,
        userCategory: 1,
        userEncryptedPassword: userData.password,
        userGstNum: userData.gstNumber,
      },
    });
    localStorage.setItem("authToken", response.data);
    dispatch(setUserAccount(response)); // Update user data in the state
    // Dispatch other actions if needed, indicating success
    return {
      success: true,
    };
  } catch (error) {
    dispatch(setUserAccountError({ error: error.message })); // Update error in the state
    throw error;
  } finally {
    dispatch(setLoading(false)); // Set loading state to false regardless of success or failure
  }
};

export default registerSlice.reducer;
