import React from "react";
import "../styles/ProductCard.css";
import StarRating from "./StarRating";
import PriceBlock from "./PriceBlock";

const ProductCard = ({ product }) => {
  const truncateDescription = (text, maxLength = 35) => {
    if (!text) return "";
    if (text.length < maxLength) return text;
    if (text.length > maxLength) {
      const trimmedText = text.substring(0, maxLength);
      const lastIndexOfSpace = trimmedText.lastIndexOf(" ");
      return trimmedText.substring(0, lastIndexOfSpace) + "...";
    }
  };
  const handleAddToCart = () => {
    console.log(product);
  };

  return (
    <div className="product-card">
      <img
        src={product.images[0]}
        alt={product.title}
        className="product-image"
      />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">
        {truncateDescription(product.description)}
      </p>
      <StarRating rating={product.rating} />
      <PriceBlock
        price={product.price}
        discountPercentage={product.discountPercentage}
      />
      <button className="product-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
