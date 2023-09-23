import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { Box } from "@mui/material";
import NavAvatar from "./NavAvatar/NavAvatar";

let routeList = [
  {
    name: "Gold",
    path: "/jewelStream",
  },
  {
    name: "Silver",
    path: "/derick",
  },
  {
    name: "Platinum",
    path: "/harsh",
  },
  {
    name: "Diamond",
    path: "/contact",
  },
  {
    name: "Collection",
    path: "/product",
  },
];

const Header = () => {
  // import user and logout from useAuth

  return (
    <div className="header sticky-top shadow-lg">
      <Navbar className="" collapseOnSelect expand="lg" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              className="logo"
              src="https://drive.google.com/uc?export=view&id=1I0wdxR7U_nTXZBglx9U7BMDYAZB2ii6Y"
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="text-bg-light" id="responsive-navbar-nav">
            <Nav className="nav-bar w-100">
              {routeList.map((route) => {
                return (
                  <NavLink
                    ac
                    as={Link}
                    to={route.path}
                    className="navbar-link-text nav-link-ltr"
                    activeClassName="nav-link-active"
                  >
                    {route.name}
                  </NavLink>
                );
              })}

              <Box sx={{ mr: "auto" }} />
              <NavAvatar />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
