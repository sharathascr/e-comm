import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import "../styles/Cart.css";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [isCartUpdated, setIsCartUpdated]=useState(false);
  const handleCartUpdated=()=>{
    setIsCartUpdated(!isCartUpdated)
  }
  useEffect(() => {
    const fetchCart = async () => {
      const cartResponse = await axios.get("http://localhost:4001/api/cart");
      setCart(cartResponse.data);
    };
    fetchCart();
  }, [isCartUpdated]);
  // const { cart, quantity } = useSelector((state) => state.cartSlice);

  return (
    <div className="cart-page">
      <h3>Cart</h3>
      {cart.length > 0 ? (
        cart.map((product) => {
          return <CartItem product={product} key={product.id} handleCartUpdated={handleCartUpdated} />;
        })
      ) : (
        <h4>cart is empty</h4>
      )}
    </div>
  );
}

export default Cart;
