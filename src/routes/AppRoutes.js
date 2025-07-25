import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logup from "../pages/Logup";
import Products from "../pages/Products";
import Cart from "../pages/Cart";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logup" element={<Logup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<h2>Page not found</h2>} />
    </Routes>
  );
}

export default AppRoutes;
