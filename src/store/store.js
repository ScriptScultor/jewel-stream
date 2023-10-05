import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/LoginAction";
import userCategoryReducer from "./auth/UserCategory";

export default configureStore({
  reducer: {
    auth: authReducer,
    userCategory: userCategoryReducer,
  },
});
