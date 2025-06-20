import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);
      toast.success(res.data.message || "Login successful!");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      setTimeout(() => navigate("/"), 1500); // delay redirect to show toast
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2 className="form-title">Log In to Soltra</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
          />

          <div className="help-text">
            You have 10 attempts to login, if you use 10 attempts you will be
            temporarily blocked from signing in.
          </div>

          <button type="submit" className="submit-btn">
            Continue
          </button>
        </div>

        <div className="HaveACC">
          <span>Don't have an account?</span>
          <Link to="/register">Sign Up →</Link>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;   