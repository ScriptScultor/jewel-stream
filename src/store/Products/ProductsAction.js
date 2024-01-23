import { createSlice } from "@reduxjs/toolkit";
import { HttpMethod, makeApiRequest } from "../../data/axios";

const initialState = {
  productData: null, // to store the fetched product data
  productLoading: true, // to indicate the loading state
  productError: null, // to store error messages
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.productData = action.payload;
      state.productLoading = false;
      state.productError = null;
    },
    setProductLoading: (state) => {
      state.productLoading = true;
      state.productError = null;
    },
    setProductError: (state, action) => {
      state.productLoading = false;
      state.productError = action.payload;
    },
  },
});

export const { setProductData, setProductLoading, setProductError } =
  productDetailSlice.actions;

export default productDetailSlice.reducer;

// Redux Thunk action to fetch product details from API based on ID
export const fetchProductDetails =
  (productId) => async (dispatch, getState) => {
    try {
      dispatch(setProductLoading()); // Set loading state to true

      const response = await makeApiRequest({
        url: `/jewelstream/api/v1/getproducts?usertype=guest&type=all&subtype=all&offset=0&limit=10&product_id=${productId}`,
      });

      dispatch(setProductData(response.data.result[0])); // Update product data in the state

      // Dispatch other actions if needed, indicating success
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      dispatch(setProductError(error.message)); // Update error in the state
      throw error;
    }
  };
