import React from "react";
import { useForm } from "react-hook-form";
import "../styles/Login.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../store/slice/userSlice";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user, isLoggedIn } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  console.log("user and login", { user, isLoggedIn });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/api/users/login",
        data
      );
      if (response.data.message == "Login successful") {
        dispatch(setLogin(response.data.data.username));
        alert("Login Successful");
        reset();
      }
      // Handle successful login (e.g., save token, redirect)
      console.log("Login successful:", response.data);
      // Example: localStorage.setItem("token", response.data.token);
      // Example: window.location.href = "/dashboard";
    } catch (error) {
      // Handle error (e.g., show error message)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert("Login failed: An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form">
          <label className="login-label" htmlFor="email">
            Email:
          </label>
          <input
            className="login-input"
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="login-label" htmlFor="password">
            Password:
          </label>
          <input
            className="login-input"
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
