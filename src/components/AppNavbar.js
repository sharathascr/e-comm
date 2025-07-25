import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function AppNavbar() {
  return (
    <div id="navbar-section">
      <nav className="navbar">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
        <NavLink to="/logup" className="nav-link">
          Logup
        </NavLink>
        <NavLink to="/products" className="nav-link">
          Products
        </NavLink>
        <NavLink to="/cart" className="nav-link">
          Cart
        </NavLink>
      </nav>
    </div>
  );
}

export default AppNavbar;
