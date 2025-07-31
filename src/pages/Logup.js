import React from "react";
import { useForm } from "react-hook-form";
import "../styles/Logup.css";
import axios from "axios";

function Logup() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/api/users/save-user",
        data
      );
      if (response.status === 201) {
        alert("Registration successful!");
        reset();
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User already exists.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="logup-container">
      <h2 className="logup-title">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form">
          <label>
            Username
            <br />
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="logup-input"
              autoComplete="username"
            />
          </label>
          {errors.username && (
            <div style={{ color: "red" }}>{errors.username.message}</div>
          )}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Email
            <br />
            <input
              type="email"
              className="logup-input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              autoComplete="email"
            />
          </label>
          {errors.email && (
            <div style={{ color: "red" }}>{errors.email.message}</div>
          )}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Password
            <br />
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="logup-input"
              autoComplete="new-password"
            />
          </label>
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password.message}</div>
          )}
        </div>
        {/* {isSubmitSuccessful && (
          <div style={{ color: "green", marginBottom: 8 }}>
            Registration successful!
          </div>
        )} */}
        <button type="submit" className="logup-btn ">
          Register
        </button>
      </form>
    </div>
  );
}

export default Logup;
