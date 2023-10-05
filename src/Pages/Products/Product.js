import { Button, CardActionArea, CardActions, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import "./Products.css";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Product = ({ product, mainCategory, subCategory }) => {
  return (
    <Col xs={12} md={6} lg={4} className="mt-4">
      <div class="product-card">
        <Link
          to={`/products/${mainCategory}/${subCategory}/${product.row_numbers}`}
          className="order-link"
        >
          <div class="badge">Hot</div>
          <div class="product-tumb">
            <img src={product.product_images[0]} alt="" />
          </div>
          <div class="product-details">
            <span class="product-catagory">{mainCategory}</span>
            <h4>{product.product_name}</h4>
            {/* <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,
          possimus nostrum!
        </p> */}
            <div class="product-bottom-details">
              <div class="product-price">Rs.{product.product_price}</div>
              {/* <div class="product-links">
            <a href="">
              <i class="fa fa-heart"></i>
            </a>
            <a href="">
              <i class="fa fa-shopping-cart"></i>
            </a>
          </div> */}
            </div>
          </div>
        </Link>
      </div>
    </Col>
  );
  {
    /* return (
    <Col xs={12} md={4}>
      <Card sx={{ minWidth: "90%" }}>
        <CardActionArea className='product-card'>
          <div className='product-image-container'>
            <img src={product.product_images[0]} alt='jewelry' className='product-image' />
            <div className='product-details-overlay'>
              <p className='product-title'>{product.product_name}</p>
              <p className='product-vendor'>{product.product_category}</p>
              <p className='product-price'>Rs.{product.product_price}</p>
              <p className='product-description'>BIS | HallMark | Gold Kada</p>
              <Link to={`/products/${mainCategory}/${subCategory}/${product.row_numbers}`} className='order-link'>
                 -- More Details --
              </Link>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Col>
  ); */
  }
};

export default Product;
