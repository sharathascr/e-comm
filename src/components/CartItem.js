import React from "react";
import StarRating from "./StarRating";
import PriceBlock from "./PriceBlock";
import "../styles/CartItem.css";
import axios from "axios";

function CartItem({ product, handleCartUpdated }) {
  const handleQuanityIncrement = () => {
    axios.patch(
      `http://localhost:4001/api/cart/increment-quantity/${product.id}`
    );
    handleCartUpdated();
  };

  const handleQuanityDecrement = () => {
    axios.patch(
      `http://localhost:4001/api/cart/decrement-quantity/${product.id}`
    );
    handleCartUpdated();
  };

  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:4001/api/cart/${id}`);
    handleCartUpdated();
  };
  return (
    <div className="cart-item-page">
      <div className="cart-left-section">
        <img
          src={product.images[0]}
          alt={product.title}
          className="cart-product-image"
        />
      </div>
      <div className="cart-rigt-section">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <StarRating rating={product.rating} />
        <PriceBlock
          price={product.price}
          discountPercentage={product.discountPercentage}
        />
        <div className="quantity-section">
          <span className="quantity-text">quantity</span>
          <button className="quantity-btn" onClick={handleQuanityIncrement}>
            +
          </button>
          <span className="quantity-item">{product.quantity}</span>
          <button
            className="quantity-btn"
            disabled={product.quantity <= 1}
            onClick={handleQuanityDecrement}
          >
            -
          </button>
        </div>
        <button
          className="product-btn"
          onClick={() => handleRemove(product.id)}
        >
          remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
