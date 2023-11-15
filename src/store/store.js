import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/LoginAction";
import userCategoryReducer from "./auth/UserCategory";
import myProductReducer from "./MyProducts/MyProductsAction";
import categoriesAction from "./Categories/CategoriesAction";
import shopAction from "./Shop/CreateShopAction";

export default configureStore({
  reducer: {
    auth: authReducer,
    userCategory: userCategoryReducer,
    myproduct: myProductReducer,
    categories: categoriesAction,
    shop: shopAction,
  },
});
