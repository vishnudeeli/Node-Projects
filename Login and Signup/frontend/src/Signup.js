import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import validation from "./LoginValidation";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate({});

  const handleSubmit = (event) => {
  event.preventDefault();
    setErrors(validation(values));
    axios
        .post("http://localhost:3001/signup", values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
      console.log("Button clicked!");
    }
    if (errors.name === "" && errors.email === "" && errors.password === "") {
        console.log(values);
      
  };
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            onChange={handleInput}
            className="form-control rounded-0"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleInput}
            className="form-control rounded-0"
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleInput}
            className="form-control rounded-0"
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-0">
          <strong>Sign up</strong>
        </button>
        </form>
        <p>You are agreed terms and policies</p>
        <Link to="/" className="btn btn-default border w-100 bg-light">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
