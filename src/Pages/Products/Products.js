import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Product from "./Product";
import "./Products.css";
import { useLocation } from "react-router-dom";
const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJjYXRlZ29yeW5hbWUiOiJzaG9wIG93bmVyIiwiaWF0IjoxNjk1ODgxODA1fQ.Si1-xq0zBVgpOYAOSC9Z04G8Unc8BAKAEbopFlEW1fY'
const Products = ({ quantity }) => {
  const [products, setProducts] = useState([]);
  const categoryToBeFetched = useLocation();
  const {state} = categoryToBeFetched;
  let productsUrl =`http://localhost:8080/jewelstream/api/v1/getproducts?usertype=guest&type=all&subtype=all&offset=0&limit=10`

  if(state){
      productsUrl = `http://localhost:8080/jewelstream/api/v1/getproducts?usertype=guest&type=${state.some}&subtype=${state.subCategory}&offset=0&limit=10`;
  }
  // fetch all products from database
  useEffect(() => {
    fetch(productsUrl, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // data.data.pop() // product limit poped here
        setProducts(data.data);
      });
  }, [state]);
  return (
    <Container className="my-md-5 my-3 text-center">
      <p className="products-title">Feature Products</p>
      <img src="https://i.ibb.co/jrcL1wV/divider1.png" alt="" />
      <br />
      <br />
      <Row className="g-3 g-sm-5">
        {products.map((product) => {
          return <>
          <Product product={product} />
          </>
        })}
      </Row>
    </Container>
  );
};

export default Products;
