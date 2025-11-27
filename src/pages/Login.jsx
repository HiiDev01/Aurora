import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
        // request to json-server
    const res = await fetch(
      `http://localhost:8080/users?email=${form.email}&password=${form.password}`
    );
    const data = await res.json();

    // If no user found =>>>> error
    if (data.length === 0) {
      setError("Invalid email or password");
      return;
    }

    //correct user found =>>>> save user to AuthContext
    login(data[0]);
    toast.success("login successful");

    // Redirect to previous page or home
    const redirectTo = location.state?.from || "/";
    navigate(redirectTo);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email Address (user@test.com)"
            value={form.email}
            onChange={handleChange}
            className="login-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password (password)"
            value={form.password}
            onChange={handleChange}
            className="login-input"
            required
          />

          <button className="login-btn" type="submit">
            ➜ Login
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
