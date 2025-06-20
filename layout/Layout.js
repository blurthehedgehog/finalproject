import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom"
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import "./layout.css"

const Layout = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span>soltra</span>
        </div>

        <div className="search-container">
          <input type="text" className="search-box" placeholder="Search..." />
          <button className="search-btn">
            <div className="icon">
              <FaSearch />
            </div>
          </button>
        </div>

        <div className="nav-actions">
          <Link to="#" className="nav-item">
            <div className="icon1" fill="currentColor">
              <MdFavoriteBorder />
            </div>
            <span>favorites</span>
          </Link>

          {!token && (
            <Link to="/login" className="nav-item">
              <div className="icon1">
                <BsFillPeopleFill />
              </div>
              <span>Log-out</span>
            </Link>
          )}

          {token && (
            <>
              <Link to="/profile" className="nav-item">
                <div className="icon1">
                  <BsFillPeopleFill />
                </div>
                <span>Profile</span>
              </Link> 
            </>
          )}

          <Link to="#" className="nav-item">
            <div className="icon1">
              <FaCartPlus />
            </div>
            <span>Cart</span>
            <span className="Numbers">0</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Layout;