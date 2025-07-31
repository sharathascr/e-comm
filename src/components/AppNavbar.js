import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../store/slice/userSlice";

function AppNavbar() {
  const { isLoggedIn } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <div id="navbar-section">
      <nav className="navbar">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        {!isLoggedIn ? (
          <>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/logup" className="nav-link">
              Logup
            </NavLink>
          </>
        ) : (
          <NavLink onClick={handleLogout} className="nav-link">
            Logout
          </NavLink>
        )}

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
