import { Button, CardActionArea, CardActions, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Products.css";
import { useParams } from "react-router-dom";

const Product = ({ product }) => {
  const {id} = useParams();
  console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP',typeof id ,id)
   // return every product card  
  let imageLink = product.product_images.includes('$harsh$') ? product.product_images.split('$harsh$')[0] : product.product_images; 
  // return (
  //   <Col xs={12} md={4}>
  //     <Card sx={{ minWidth: "90%" }}>
  //       <CardActionArea>
  //         <CardMedia height={352} component='img' image={imageLink} alt='jewelry' />
  //         <CardContent>
  //           <p className='product-title'>{product.product_name}</p>
  //           <p className='product-vendor'>{product.product_category}</p>
  //           <Rating name='read-only' value={product.row_numbers} readOnly />
  //         </CardContent>
  //       </CardActionArea>
  //       <CardActions className='d-flex justify-content-between'>
  //         <p className='product-price'>Rs.{product.product_price}</p>
  //         <Link to={`/product/${product.row_numbers}`}>
  //           <Button variant='contained' className='order-button'>Order Now</Button>
  //         </Link> 
  //       </CardActions>
  //     </Card>
  //   </Col>
  // );
  return (
    <Col xs={12} md={4}>
      <Card sx={{ minWidth: "90%" }}>
        <CardActionArea className='product-card'>
          <div className='product-image-container'>
            <img src={product.product_images.includes('$harsh$') ? product.product_images.split('$harsh$')[0] : product.product_images} alt='jewelry' className='product-image' />
            <div className='product-details-overlay'>
              <p className='product-title'>{product.product_name}</p>
              <p className='product-vendor'>{product.product_category}</p>
              {/* <Rating name='read-only' value={product.row_numbers} readOnly /> */}
              <p className='product-price'>Rs.{product.product_price}</p>
              <p className='product-description'>BIS | HallMark | Gold Kada</p>
              <Link to={`/product/${product.row_numbers}`} className='order-link'>
                 -- More Details --
              </Link>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Col>
  );

};

export default Product;
