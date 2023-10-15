import React from "react";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

import "./Button.css";

const AuthButton = ({ title, isLoading, onClick }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={isLoading}
      className="auth-button"
      onClick={() => (onClick ? onClick() : null)}
    >
      {isLoading ? <CircularProgress size={16} color="primary" /> : title}
    </Button>
  );
};

export default AuthButton;
