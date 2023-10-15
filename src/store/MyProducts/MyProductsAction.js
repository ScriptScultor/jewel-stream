import { createSlice } from "@reduxjs/toolkit";
import { HttpMethod, makeApiRequest } from "../../data/axios";

const initialState = {
  products: [], // to store the fetched products
  isLoading: false, // to indicate the loading state
  error: null, // to store error messages
  nextPage: 1,
  count: 0, // to keep track of the next page
  actionLoader: false,
  actionErrorMessage: null,
  actionData: null,
};

const productSlice = createSlice({
  name: "myproduct",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.result;
      state.count = action.payload.productAvailCount;
      state.isLoading = false;
      state.error = null;
    },
    appendProducts: (state, action) => {
      state.products = state.products.concat(action.payload.result);
      state.count = action.payload.productAvailCount;
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
    actionLoading: (state) => {
      state.actionLoader = true;
      state.actionError = null;
    },
    actionError: (state, action) => {
      state.actionLoader = false;
      state.actionErrorMessage = action.payload;
    },
    actionSetData: (state, action) => {
      state.actionData = action.payload;
      state.actionLoader = false;
      state.actionErrorMessage = null;
    },
  },
});

export const {
  setProducts,
  appendProducts,
  setLoading,
  setError,
  actionLoading,
  actionError,
  actionSetData,
} = productSlice.actions;

export default productSlice.reducer;

// Redux Thunk action to fetch products from a file or API
export const fetchProducts = (page, limit) => async (dispatch, getState) => {
  try {
    dispatch(setLoading()); // Set loading state to true
    const { auth } = getState();
    // Replace this with your actual API call or file loading logic
    const response = await makeApiRequest({
      url: `/jewelstream/api/v1/getproducts?usertype=${
        auth.user ? "shop owner" : "guest"
      }&type=all&subtype=all&offset=${page}&limit=${limit}`,
    }); // Implement this function accordingly

    if (page === 0) {
      dispatch(setProducts(response.data)); // Update products in the state
    } else {
      dispatch(appendProducts(response.data)); // Append new products to the existing list
    }

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

// Redux Thunk action to delete a product
export const deleteProduct = (product) => async (dispatch) => {
  try {
    dispatch(actionLoading()); // Set loading state to true
    // Replace this with your actual API call to delete the product

    const result = await makeApiRequest({
      method: HttpMethod.DELETE,
      url: `/jewelstream/api/v1/deleteProducts?target=PRODUCTS&rowNumber=${product.id}`,
    }); // Implement this function accordingly

    // Dispatch success action
    dispatch(actionSetData(result));

    // Dispatch other actions if needed, indicating success
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    dispatch(actionError(error.message)); // Update error in the state
    throw error;
  }
};

// Redux Thunk action to edit a product
export const editProduct = (product) => async (dispatch) => {
  try {
    dispatch(actionLoading()); // Set editing state to true

    // Extract only the desired fields from the original product data
    const editedProductData = [
      {
        productId: product.id,
        fieldsToUpdate: {
          product_id_for_update: product.product_id_for_update,
          email_address: product.email_address,
          product_category: product.product_category,
          product_sub_category: product.product_sub_category,
          product_name: product.product_name,
          product_base_price: product.product_base_price,
          product_discount: product.product_discount,
          product_in_stock: product.product_in_stock,
          product_weight: product.product_weight,
          product_description: product.product_description,
          product_owner_mobile_number: product.product_owner_mobile_number,
          owner_product_id: product.owner_product_id,
          sheet_row_number: product.sheet_row_number,
          is_active: product.is_active,
        },
      },
    ];

    // Replace this with your actual API call to edit the product
    const result = await makeApiRequest({
      method: HttpMethod.PUT, // or "PATCH" based on your API
      url: `/jewelstream/api/v1/updateProducts?target=PRODUCTS`,
      data: editedProductData, // Send the edited product data
    });

    // Dispatch success action
    dispatch(actionSetData(result));

    // Dispatch other actions if needed, indicating success
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    dispatch(actionError(error.message)); // Update editing error in the state
    throw error;
  }
};
