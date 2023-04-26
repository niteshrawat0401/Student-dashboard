import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/signup.css";

let init = {
  userName: "",
  passWord: "",
  userType: ""
};

export const Signup = () => {
  const [signup, setSignupdata] = useState(init);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupdata({ ...signup, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/signup", signup)
      .then(() => {
        console.log(signup);
        navigate("/login");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log("error", err);
      });
  };

  return (
    <>
    <div className="signup_main_cont">
      <h1 style={{ fontWeight: "bold",fontSize:"21px",paddingTop:"2rem" }}>Register User</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          name="userName"
          className="inp1"
          placeholder="UserName"
          onChange={handleChange}
          value={signup.userName}
          required
        />
        <br />
        <input
          type="password"
          name="passWord"
          className="inp2"
          placeholder="PassWord"
          onChange={handleChange}
          value={signup.passWord}
          required
        />
        <br />
        <select 
        className="inp3" name="userType" onChange={handleChange} required >
          <option>Type</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
        <br/>
        <input className="inp5" type="submit" value="Sign Up" />
      </form>
      <p>
        Already have an account <Link to={"/login"}>Login</Link>
      </p>
    </div>
    </>
  );
};
