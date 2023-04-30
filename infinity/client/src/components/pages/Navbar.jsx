import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

export const Navbar = () => {
  return (
    <div className="nav_div">
      <div className="innerDiv">
        <h3><Link to="/home">DashBoard</Link></h3>
        <p><Link to="/student">student</Link></p>
        {/* <p><Link to="/Products">Products</Link></p> */}
        <p><Link to="/quicknotes">Quicknotes</Link></p>
        <p><Link to="/login">Logout</Link></p>
      </div>
    </div>
  );
};
