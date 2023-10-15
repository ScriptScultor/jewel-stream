import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { Typography } from "@mui/material";

import "./Popover.css";

export default function OptionPopover({ popoverOptions }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <MoreVertSharpIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className="popover-container"
      >
        {popoverOptions.map((item) => (
          <Typography
            onClick={() => (item.onClick ? item.onClick() : null)}
            className={`popover-option ${item.classes}`}
            key={item.title}
          >
            {item.title}
          </Typography>
        ))}
      </Popover>
    </div>
  );
}
