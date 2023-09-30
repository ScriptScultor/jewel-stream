import { Button, CardActionArea, CardActions, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Products.css";

const Product = ({ product }) => {
  // return every product card  
  console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOO',product)
  let imageLink = product.product_images.includes('$harsh$') ? product.product_images.split('$harsh$')[0] : product.product_images; 
  return (
    <Col xs={12} md={4}>
      <Card sx={{ minWidth: "90%" }}>
        <CardActionArea>
          <CardMedia height={352} component='img' image={imageLink} alt='jewelry' />
          <CardContent>
            <p className='product-title'>{product.product_name}</p>
            <p className='product-vendor'>{product.product_category}</p>
            <Rating name='read-only' value={product.row_numbers} readOnly />
          </CardContent>
        </CardActionArea>
        <CardActions className='d-flex justify-content-between'>
          <p className='product-price'>Rs.{product.product_price}</p>
          <Link to={`/product/${product.row_numbers}`}>
            <Button variant='contained' className='order-button'>Order Now</Button>
          </Link> 
        </CardActions>
      </Card>
    </Col>
  );
};

export default Product;
