import React from "react";
import "../styles/ProductCard.css";
import StarRating from "./StarRating";
import PriceBlock from "./PriceBlock";
import { addProduct } from "../store/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ProductCard = ({ product }) => {
  console.log(product);
  const dispatch = useDispatch();
  const truncateDescription = (text, maxLength = 35) => {
    if (!text) return "";
    if (text.length < maxLength) return text;
    if (text.length > maxLength) {
      const trimmedText = text.substring(0, maxLength);
      const lastIndexOfSpace = trimmedText.lastIndexOf(" ");
      return trimmedText.substring(0, lastIndexOfSpace) + "...";
    }
  };
  const handleAddToCart = async() => {
   const response = await axios.post("http://localhost:4001/api/cart/add-to-cart", product)
  
   if(response.data.message==='Added to cart successfully'){
     toast.success("Added to cart ");
   }
  };

  return (
    <div className="product-card">
      <img
        src={product.images[0]}
        alt={product.title}
        className="product-image"
        loading="lazy"
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
      <ToastContainer />
    </div>
  );
};

export default ProductCard;
