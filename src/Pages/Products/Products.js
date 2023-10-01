import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Product from "./Product";
import "./Products.css";
import { useParams } from "react-router-dom";
import { makeApiRequest } from "../../data/axios";
import logConsole from "../../Utils/logger";
const Products = ({ quantity }) => {
  const [products, setProducts] = useState([]);
  const { mainCategory, subCategory } = useParams();
  let productsUrl = `/jewelstream/api/v1/getproducts?usertype=guest&type=all&subtype=all&offset=0&limit=8`;

  if (mainCategory && subCategory) {
    productsUrl = `/jewelstream/api/v1/getproducts?usertype=guest&type=${mainCategory}&subtype=${subCategory}&offset=0&limit=10`;
  }
  // fetch all products from database
  useEffect(() => {
    makeApiRequest({
      url: productsUrl,
    })
      .then((res) => res.json())
      .then((data) => {
        // data.data.pop() // product limit poped here
        setProducts(data.data);
      })
      .catch((err) => {
        logConsole(err);
      });
  }, [productsUrl, mainCategory, subCategory]);
  return (
    <Container className="my-md-5 my-3 text-center">
      <p className="products-title">Feature Products</p>
      <img src="https://i.ibb.co/jrcL1wV/divider1.png" alt="" />
      <br />
      <br />
      <Row className="g-3 g-sm-5">
        {products.map((product) => {
          return (
            <>
              <Product product={product} />
            </>
          );
        })}
      </Row>
    </Container>
  );
};

export default Products;
