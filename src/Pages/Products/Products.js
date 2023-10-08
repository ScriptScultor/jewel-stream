import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Product from "./Product";
import "./Products.css";
import { useParams } from "react-router-dom";
import { makeApiRequest } from "../../data/axios";
import ProductCarousel from "../ProductDetails/ProductCarousel";
const Products = ({ quantity, moreProducts, userType, openEditModal }) => {
  const [products, setProducts] = useState([]);
  let { mainCategory, subCategory } = useParams();
  if (!quantity) {
    quantity = 5;
  }
  let productsUrl = `/jewelstream/api/v1/getproducts?usertype=${userType ? userType : 'guest'}&type=all&subtype=all&offset=0&limit=${quantity}`;
  if (mainCategory && subCategory) {
    productsUrl = `/jewelstream/api/v1/getproducts?usertype=guest&type=${mainCategory}&subtype=${subCategory}&offset=0&limit=10`;
  }
  if (mainCategory && subCategory && moreProducts) {
    productsUrl = `/jewelstream/api/v1/getproducts?usertype=guest&type=${mainCategory}&subtype=${subCategory}&offset=0&limit=${moreProducts}`;
  }
  // fetch all products from database
  useEffect(() => {
    makeApiRequest({
      url: productsUrl,
    })
      .then((data) => {
        // data.data.pop() // product limit poped here
        setProducts(data.data.result);
      })
      .catch((err) => {});
  }, [productsUrl, mainCategory, subCategory]);
  return (
    <Container className="my-md-5 my-3 text-center">
      <p className="products-page-title">
        {moreProducts ? "You also may like !" : ""}
        {mainCategory && !moreProducts
          ? mainCategory
          : moreProducts
          ? ""
          : "All"}{" "}
        {subCategory && !moreProducts
          ? subCategory
          : moreProducts
          ? ""
          : "Products"}
      </p>
      <img
        className="image-link"
        src="https://i.ibb.co/jrcL1wV/divider1.png"
        alt=""
      />
      {/* <hr className="divider" /> */}
      <br />
      <br />
      {moreProducts ? (
        <ProductCarousel
          products={products}
          mainCategory={mainCategory}
          subCategory={subCategory}
        />
      ) : (
        <Row className="g-5 g-md-4 g-sm-2">
          {products.map((product, index) => {
            return (
              <>
                <Product
                  product={product}
                  mainCategory={
                    mainCategory ? mainCategory : product.product_category
                  }
                  subCategory={subCategory ? subCategory : product.product_name}
                  userType ={userType}
                  key={index}
                  openEditModal = {openEditModal}
                />
              </>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default Products;
