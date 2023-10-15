import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/LoginAction";
import userCategoryReducer from "./auth/UserCategory";
import myProductReducer from "./MyProducts/MyProductsAction";

export default configureStore({
  reducer: {
    auth: authReducer,
    userCategory: userCategoryReducer,
    myproduct: myProductReducer,
  },
});
