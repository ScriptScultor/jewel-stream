import React, { useState } from 'react';
import { Row, Carousel } from 'react-bootstrap';
import Product from '../Products/Product';

const ProductCarousel = ({ products, mainCategory, subCategory }) => {
  const [index, setIndex] = useState(0);
  let itemsPerSlide = 3; // Number of items to display per slide
  const isMobile = window.innerWidth <= 765;
  itemsPerSlide = isMobile ? 1 : 3;
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const numSlides = Math.ceil(products.length / itemsPerSlide);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      {Array.from({ length: numSlides }).map((_, slideIndex) => (
        <Carousel.Item key={slideIndex}>
          <Row className="g-3 g-sm-5">
            {products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((product, productIndex) => (
              <Product
                key={productIndex}
                product={product}
                mainCategory={mainCategory ? mainCategory : product.product_category}
                subCategory={subCategory ? subCategory : product.product_name}
              />
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
