import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetails.css";
import { fetchProductDetails } from "../../store/Products/ProductsAction";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productData, productLoading, productError } = useSelector(
    (state) => state.product
  );
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch product details when the component mounts
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Update selected image when product data changes
    if (productData && productData.products.length > 0) {
      setSelectedImage(productData.product_images_links[0]);
    }
  }, [productData]);

  console.log(productData, productLoading, productError);

  if (productLoading) {
    // Handle the case where product data is still loading
    return <div>Loading...</div>;
  }

  if (productError) {
    // Handle the case where there is an error fetching product data
    return <div>Error fetching product details: {productError}</div>;
  }

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <div className="product-details-container">
        <div className="productdetails-image-container">
          <img
            src={selectedImage}
            alt={productData.product_name}
            className="big-image"
          />
          <div className="thumbnail-gallery">
            {productData.product_images.split("_KEY_1_").map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${productData.product_name} Thumbnail ${index}`}
                className={`thumbnail ${
                  selectedImage === image ? "active" : ""
                }`}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{productData.product_name}</h1>
          <p>{productData.product_category}</p>
          <p>{productData.product_description}</p>
          <p>Price: RS {productData.product_base_price}</p>
          <button className="order-button">Get A Quote</button>
          <button className="add-to-cart-button">Add To Cart</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
