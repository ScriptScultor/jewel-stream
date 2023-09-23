import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

import "./NavbarLink.css";

function TextWithPopover({ title }) {
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
      <Typography
        onClick={handleClick}
        style={{
          cursor: "pointer",
        }}
        className="navbar-link-text nav-link-ltr"
      >
        {title}
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper elevation={3}>
          <Box sx={{ p: 1 }}>
            <List className="p-0">
              <ListItem className="py-1">
                <ListItemText primary="Option 1" />
              </ListItem>
              <ListItem className="py-1">
                <ListItemText primary="Lorem ipsum is a long text " />
              </ListItem>
              <ListItem className="py-1">
                <ListItemText primary="Option 3" />
              </ListItem>
            </List>
          </Box>
        </Paper>
      </Popover>
    </div>
  );
}

export default TextWithPopover;
