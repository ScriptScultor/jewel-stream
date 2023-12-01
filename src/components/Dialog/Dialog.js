import React from "react";

import "./Dialog.css";
import { Dialog, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Modal = ({ show, handleClose, children }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={fullScreen}
        fullWidth
      >
        {children}
      </Dialog>
    </div>
  );
};

export default Modal;
