import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

export const Navbar = () => {
  return (
    <div className="nav_div bg-purple-700	text-white">
      <div className="innerDiv py-4	">
        <h3 className="text-base	"><Link to="/home">DashBoard</Link></h3>
        <p className="text-base	"><Link to="/student">student</Link></p>
        {/* <p><Link to="/Products">Products</Link></p> */}
        <p className="text-base	"><Link to="/quicknotes">Quicknotes</Link></p>
        <p className="text-base	"><Link to="/login">Logout</Link></p>
      </div>
    </div>
  );
};
