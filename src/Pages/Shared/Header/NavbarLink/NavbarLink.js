import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import "./NavbarLink.css";

function NavbarLink({ title, subcategory }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="navbar-link-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Typography
        className={`navbar-link-text ${
          isDropdownOpen ? "nav-link-active" : ""
        }`}
      >
        {title}
      </Typography>
      {isDropdownOpen && (
        <div className="dropdown-container">
          <Paper elevation={3} className="dropdown">
            <List className="p-0">
              {subcategory.map((item, index) => (
                <ListItem className="py-1" key={index}>
                  <Link
                    to={`/products/${title}/${item}`}
                    onClick={closeDropdown}
                    className="dropdown-item"
                  >
                    <ListItemText primary={item} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      )}
    </div>
  );
}

export default NavbarLink;
