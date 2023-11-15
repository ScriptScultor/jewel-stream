import { createSlice } from "@reduxjs/toolkit";
import { makeApiRequest, HttpMethod } from "../../data/axios";

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

const shopFormSlice = createSlice({
  name: "shopForm",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    setData: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },
  },
});

export const { setLoading, setError, setData } = shopFormSlice.actions;

export default shopFormSlice.reducer;

export const saveShopData = (shopData) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const payload = {
      shopName: "MyShop",
      shopOwnerMobileNumber: "9876543210",
      shopGstNumber: "1234567890",
      shopAddress: "123 Main Street",
      shopCity: "Sample City",
      shopPincode: "12345",
      shopLogoId: "qwertyuioplkjhgfdsaZXCVBNM",
      shopDescription: "This is a sample shop description.",
    };

    // Replace the following URL and method with your actual API endpoint and request method
    const response = await makeApiRequest({
      method: HttpMethod.POST, // or PUT based on your API
      url: "/jewelstream/api/v1/registerShop", // Replace with your API endpoint
      data: payload,
    });

    dispatch(setData(response.data));

    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
  }
};
