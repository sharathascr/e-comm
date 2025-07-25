import React from "react";
import { useForm } from "react-hook-form";
import "../styles/Login.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // handle login logic here
    console.log(data);
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
