import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 
import "./Registration.css";

function Registration() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    country: "Georgia",
  });

  const [registered, setRegistered] = useState(false);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", form);

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token); 

      alert("Registration successful!");
      setRegistered(true);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h2 className="form-title">Sign up to Soltra</h2>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
          />

          <label htmlFor="country">Your Country/Region*</label>
          <select
            id="country"
            name="country"
            required
            onChange={handleChange}
            value={form.country}
          >
            <option value="Georgia">Georgia</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>

          {!registered && (
            <button type="submit" className="submit-btn">
              Continue
            </button>
          )}

          <div className="HaveACC">
            <span>Already have an account?</span>
            <Link to="/login">Sign in →</Link>
          </div>
        </div>

        <div className="terms">
          By creating an account, you agree to the{" "}
          <Link to="#">Terms of Service</Link>. For more information about
          Soltra's privacy practices, see the{" "}
          <Link to="#">Soltra Privacy Statement</Link>.
        </div>
      </form>
    </div>
  );
}

export default Registration;