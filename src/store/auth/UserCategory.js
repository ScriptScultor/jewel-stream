import { createSlice } from "@reduxjs/toolkit";
import { makeApiRequest } from "../../data/axios"; // Import your API utility function

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const apiSlice = createSlice({
  name: "userCategory",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
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
  },
});

export const { setData, setLoading, setError } = apiSlice.actions;

// Async Redux Thunk action to make an API call, but only if data is not already fetched
export const fetchUserCategories = () => async (dispatch, getState) => {
  const { userCategory } = getState(); // Assuming 'api' is the name of your API state slice

  if (userCategory.data.length === 0) {
    // If data is not already fetched, make the API call
    try {
      dispatch(setLoading()); // Set loading state to true

      // Make the API request using your API utility function (e.g., makeApiRequest)
      const response = await makeApiRequest({
        url: "/jewelstream/api/v1/getusercategories",
      }); // Replace with your API request

      dispatch(setData(response.data)); // Store the API response data in state
    } catch (error) {
      dispatch(setError(error.message)); // Handle and store errors in state
    }
  }
};

export default apiSlice.reducer;
