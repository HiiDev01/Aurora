import React, { useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Checking if email already exists
    const check = await fetch(
      `http://localhost:8080/users?email=${form.email}`
    );
    const existingUser = await check.json();

    if (existingUser.length > 0) {
      setError("Email already registered");
      toast.error("there is an existing user with this email")
      return;
    }

    // Adding new user to json db
    const newUser = {
      fullname: form.fullname,
      email: form.email,
      password: form.password
    };

    const res = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    if (!res.ok) {
      setError("Registration failed. Try again.");
      return;
    }

    const savedUser = await res.json();

    //Auto-login newly registered user
    login(savedUser);
    toast.success("successfully registered");
    //Redirecting back to page before register OR home
    const redirectTo = location.state?.from || "/";
    navigate(redirectTo);
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create Account</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="register-input"
            value={form.fullname}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="register-input"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="register-input"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="register-btn" type="submit">
             Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login" className="login-link">Login here</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
