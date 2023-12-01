import React from "react";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

import "./Button.css";

const OutLineCircularButton = ({ isLoading, title, onClick }) => {
  return (
    <Button
      variant="contained"
      disabled={isLoading}
      className="outline-radius-button"
      onClick={() => (isLoading ? null : onClick ? onClick() : null)}
    >
      {isLoading ? <CircularProgress size={16} /> : title}
    </Button>
  );
};

export default OutLineCircularButton;
