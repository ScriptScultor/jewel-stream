import React from "react";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

import "./Button.css";

const AuthButton = ({ title, isLoading, type = "submit" }) => {
  return (
    <Button
      variant="contained"
      type={type}
      disabled={isLoading}
      className="auth-button"
    >
      {isLoading ? <CircularProgress size={16} color="primary" /> : title}
    </Button>
  );
};

export default AuthButton;
