import React from "react";
import { NavLink } from "react-router-dom";

import "./NavbarAvatar.css";

const NavAvatar = () => {
  return (
    <div>
      <NavLink to="/login">
        <div className="avatar">
          <img
            src="https://i.ibb.co/ZJPQfBr/115-1150152-default-profile-picture-avatar-png-green.jpg"
            alt=""
          />
        </div>
      </NavLink>
    </div>
  );
};

export default NavAvatar;
