import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate()
  let pvtroute = JSON.parse(localStorage.getItem("pvtroute"))

  const logout = () =>{
    localStorage.removeItem("pvtroute")
    navigate("/login")
  }

  return (
    <div className="nav_div bg-purple-700	text-white">
      <div className="innerDiv py-4	">
        <h3 className="text-base	"><Link to="/student">DashBoard</Link></h3>
        <p className="text-base	"><Link to="/student">Student</Link></p>
        {/* <p><Link to="/Products">Products</Link></p> */}
        {/* <p className="text-base	"><Link to="/quicknotes">Quicknotes</Link></p> */}
        {pvtroute===null? (<Link to={"/login"} className="text-base" onClick={()=> navigate("/login")}>Login </Link>):
        (<p  className="text-base" onClick={logout}>Logout <Link className="text-base">{pvtroute.userName}</Link></p>)}
      </div>
    </div>
  );
};
