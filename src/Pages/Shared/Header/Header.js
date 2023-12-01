import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import { Box } from "@mui/material";
import NavbarAvatar from "./NavAvatar/NavAvatar";
import NavbarLink from "./NavbarLink/NavbarLink";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/Categories/CategoriesAction";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    // Dispatch the fetchCategories action to load categories
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="header sticky-top shadow-lg">
      <Navbar collapseOnSelect expand="lg" variant="light">
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
              {categories.map((route, index) => {
                return (
                  <NavbarLink
                    key={index}
                    title={route.main_category}
                    subcategory={route.sub_categories}
                  />
                );
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
