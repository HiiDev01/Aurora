import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { supabase } from "../config/SupabaseClient";

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
    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
      });
      if (error) {
        if (error.message.includes("invalid login credentials")) {
          toast.error("Incorrect password or email");
          setError("Incorrect password or email");
          return;
        }

       
        toast.error(error.message);
        setError(error.message);
        return;
      }


      if (!data.user) {
        toast.error("Email not found");
        setError("Email not found");
        return;
      }
      // Saving user in AuthContext
      login(data.user);
      toast.success("Login successful");
    
      // Redirect to previous page or home
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);

    } catch (error) {
      console.log(error, "error singing in")
    }


  };
  const handleDemoLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "demouser@example.com",
      password: "123456"
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    login(data.user);
    toast.success("Logged in as Demo User");

    navigate("/");
  } catch (err) {
    console.error("Demo login error:", err);
    toast.error("Unable to login demo user");
  }
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
          <button 
            className="login-btn" 
            type="submit" 
            onClick={handleDemoLogin}
          >
            Login  Demo
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
