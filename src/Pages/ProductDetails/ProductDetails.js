import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css"; // Import your CSS file for styling
import { makeApiRequest } from "../../data/axios";
import logConsole from "../../Utils/logger";
import Products from "../Products/Products";
const ProductDetails = () => {
  const { mainCategory, subCategory, id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [product, setProduct] = useState(null);
const productsUrl = `/jewelstream/api/v1/getproducts?usertype=guest&type=all&subtype=all&offset=0&limit=10&rowNumber=${id}`;
useEffect(() => {
  makeApiRequest({
    url: productsUrl,
  })
    .then((data) => {
      setProduct(data.data.result);
    })
    .catch((err) => {
      logConsole(err);
    });
}, [ productsUrl ]);
useEffect(() => {
  if (product && product[0]?.product_images) {
    setSelectedImage(product[0].product_images[0]);
  }
}, [product]);
if (!product) {
  // Handle the case where product data is still loading
  return <div>Loading...</div>;
}
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };
  

  return (
    <>
      <div className="product-details-container">
      <div className="productdetails-image-container">
        <img src={selectedImage} alt={product.product_name} className="big-image" />
        <div className="thumbnail-gallery">
          {product[0].product_images.map((image, index) => (
            <img
              key={index}
              src={image}
              // alt={`${product.name} Thumbnail ${index}`}
              className={`thumbnail ${selectedImage === image ? "active" : ""}`}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>
      
      <div className="product-info">
        <h1>{product[0].product_name}</h1>
        <p>{product[0].product_category}</p>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip  
        mollit anim id est laborum."</p>
        <p>Price: RS {product[0].product_price}</p>
        <button className="order-button">Get A Quote</button>
        <button className="add-to-cart-button">Add To Cart</button>

      </div>
    </div>
    <Products moreProducts = {10} mainCategory = {mainCategory} subCategory={subCategory} />
    </>
    
  );
};

export default ProductDetails;

