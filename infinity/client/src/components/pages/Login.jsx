import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

let init = {
  userName: "",
  passWord: "",
};

export const Login = () => {
  const [login, setlogin] = useState(init);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/login", login)
      .then((res) => {
        console.log(res.data);
        setlogin(res.data);
        setlogin({ ...init });
        alert("Login sucessfully");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log("error", err);
      });
  };
  return (
    <div>
      <h2>Login User</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="userName"
          placeholder="UserName"
          onChange={handleChanged}
          value={login.userName}
          required
        />
        <br />
        <input
          type="password"
          name="passWord"
          placeholder="PassWord"
          onChange={handleChanged}
          value={login.passWord}
          required
        />
        <br />
        <input type="submit" value="Log In" />
      </form>
      <p>
        Create an account <Link to={"/signup"}>Signup</Link>
      </p>
    </div>
  );
};
