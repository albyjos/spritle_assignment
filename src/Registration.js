import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function RegisterForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/register", formData)
      .then((response) => {
        navigate("/")
      })
      .catch((error) => {
        alert("Error while registering. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <label> Registration </label>
      <br />
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Master:
        <input
          radioGroup="role"
          type="radio"
          name="role"
          value="master"
          onChange={handleChange}
        />
      </label>
      <label>
        Student:
        <input
          radioGroup="role"
          type="radio"
          name="role"
          value="student"
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <input type="submit" value="Sign up" />
    </form>
  );
}

export default RegisterForm;
