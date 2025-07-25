import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h2 className="home-header">Home</h2>
      <div className="home-products">
        {/* {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
      </div>
    </div>
  );
}

export default Home;
