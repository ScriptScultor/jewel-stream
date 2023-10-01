import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { Box } from "@mui/material";
import NavbarAvatar from "./NavAvatar/NavAvatar";
import NavbarLink from "./NavbarLink/NavbarLink";


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
const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJjYXRlZ29yeW5hbWUiOiJzaG9wIG93bmVyIiwiaWF0IjoxNjk1ODgxODA1fQ.Si1-xq0zBVgpOYAOSC9Z04G8Unc8BAKAEbopFlEW1fY'
const Header = () => {
  // import user and logout from useAuth
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/jewelstream/api/v1/getmainandsubcategories", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data);
      });
  }, []);
  routeList = category;
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
                return <NavbarLink title={route.main_category} subcategory ={route.sub_categories} />;
              })}
              <Box sx={{ mr: "auto" }} />
              <NavbarAvatar />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
