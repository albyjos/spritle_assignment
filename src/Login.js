import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  localStorage.setItem("token", "");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      if (response) {
        if (response.data.user.role === "master") {
          navigate(
            `/master?id=${response.data.user.id}&name=${response.data.user.name}`
          );
        } else {
          navigate(
            `/student?id=${response.data.user.id}&name=${response.data.user.name}`
          );
        }
      }
      localStorage.setItem("token", response.data.token);
    } catch (error) {}
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <br />
        <label>Login </label>
        <br />
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Login</button>
        <br />
      </form>
      <br />
      <br />
      <button type="button" onClick={handleSignUp}>
        Sign Up
      </button>
    </>
  );
}

export default Login;
