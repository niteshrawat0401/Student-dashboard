import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/login.css"

let init = {
  userName: "",
  passWord: "",
  userType: ""
};

export const Login = () => {
  const [login, setlogin] = useState(init);
  const navigate = useNavigate()

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/login", login)
      .then((res) => {
        localStorage.setItem("pvtroute", JSON.stringify({
          isLoggin : true,
          userId : res.data.userID,
          token: res.data.accessToken,
          userName: login.userName,
          passWord: login.passWord,
          userType: login.userType,
        }))
        setlogin(res.data);
        // console.log(res.data);
        setlogin({ ...init });
        alert("Login sucessfully");
        navigate("/student")
      })
      .catch((err) => {
        alert("Type not found");
        console.log("error", err);
      });
  };
  return (
  <>
  <div className="login_main_container my-7">
      <h1  style={{ fontWeight: "bold", paddingTop: "2rem", fontSize: "21px" }}>Login User</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="userName"
          className="inpu1"
          placeholder="UserName"
          onChange={handleChanged}
          value={login.userName}
          required
        />
        <br />
        <input
          type="password"
          name="passWord"
          className="inpu2"
          placeholder="PassWord"
          onChange={handleChanged}
          value={login.passWord}
          required
        />
        <br />
        <select className="inpu3" name="userType" onChange={handleChanged} required >
          <option>Type</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
        <br/>
        <input className="inpu4" type="submit" value="Log In" />
      </form>
      <p className="my-4">
        Create an account <Link className="text-blue-700	" to={"/signup"}>Signup</Link>
      </p>
    </div>
    </>
  );
};
