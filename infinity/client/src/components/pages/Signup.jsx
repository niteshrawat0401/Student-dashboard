import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          name="userName"
          placeholder="UserName"
          onChange={handleChange}
          value={signup.userName}
          required
        />
        <br />
        <input
          type="password"
          name="passWord"
          placeholder="PassWord"
          onChange={handleChange}
          value={signup.passWord}
          required
        />
        <br />
        <select name="userType" onChange={handleChange} required style={{width:"16.5%"}}>
          <option>Type</option>
          <option value="Customer">Customer</option>
          <option value="Employee">Employee</option>
        </select>
        <br/>
        <input type="submit" value="Sign Up" />
      </form>
      <p>
        Already have an account <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
};
