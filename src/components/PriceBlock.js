import React from "react";

function PriceBlock({ price, discountPercentage }) {
  const getFinalPrice = (price, discountPercentage) => {
    if (!price || !discountPercentage) return 0;
    return parseFloat((price - (price * discountPercentage) / 100).toFixed(2));
  };
  const finalPrice = getFinalPrice(price, discountPercentage);
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <span style={{ color: "green", fontWeight: "bold" }}>${finalPrice}</span>
      <span style={{ textDecoration: "line-through", color: "gray" }}>
        ${price}
      </span>
      <span style={{ color: "red", fontSize: "14px" }}>
        {discountPercentage}% OFF
      </span>
    </div>
  );
}

export default PriceBlock;
