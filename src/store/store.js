import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/LoginAction";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
