import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const DashboardLayout = ({ children }) => {
  const userData = useSelector((state) => state.auth);

  if (userData.isLoading) {
    return <CircularProgress />;
  }

  if (userData.isAuthenticated !== true) {
    return <Redirect to="/" />;
  }

  if (userData.user.user_category === "3") {
    return <Redirect to="/" />;
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
