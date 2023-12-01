// productSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { makeApiRequest, HttpMethod } from "../../data/axios";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "myproduct",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
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

export const { setCategories, setLoading, setError } = productSlice.actions;

export default productSlice.reducer;

// Redux Thunk action to fetch categories
export const fetchCategories = () => async (dispatch, getState) => {
  try {
    const { categories } = getState();

    if (categories.categories.length > 0) {
      return;
    }

    dispatch(setLoading()); // Set loading state to true

    // Replace this with your actual API endpoint
    const response = await makeApiRequest({
      url: "/jewelstream/api/v1/getmainandsubcategories",
      method: HttpMethod.GET,
    });

    // Dispatch the setCategories action to update the state with fetched categories
    dispatch(setCategories(response.data));

    // Dispatch other actions if needed, indicating success
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message)); // Update error in the state
    throw error;
  }
};
