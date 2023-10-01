import { configureStore } from "@reduxjs/toolkit";
import registerAction from "./auth/register";
import userReducer from "./auth/user";
import authReducer from "./auth/login";

export default configureStore({
  reducer: {
    register: registerAction,
    user: userReducer,
    auth: authReducer,
  },
});
