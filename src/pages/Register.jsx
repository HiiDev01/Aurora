import React, { useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { supabase } from "../config/SupabaseClient";

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
    setError("")
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullname
          }
        }
      });

      if (error) {
        if (error.code === "23505") {
          setError("Email already exists");
          toast.error("Email already exists");
          return;
        }
  
        setError(error.message);
        toast.error(error.message);
        return;
      }

      toast.success("Successfully registered!");
      if(data.user){
        login(data.user);
      }
      
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);

    } catch (error) {
      console.log(error);
      setError("Something went wrong");
      toast.error("Something went wrong");
    }

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
