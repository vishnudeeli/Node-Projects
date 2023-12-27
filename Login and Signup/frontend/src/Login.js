import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues(validation(values));
    setErrors(validation(values));

    axios.post("http://localhost:3001/login", values)
      .then((res) => {
        if (res.data.message === "Success") {
          navigate('/home');
        } else {
          alert("No record found");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign In</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' placeholder='Enter email' name='email'
              onChange={handleInput} className='form-control rounded-0' />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' placeholder='Enter password' name='password'
              onChange={handleInput} className='form-control rounded-0' />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Login</strong></button>
        </form>
        <p>You are agreed to the terms and policies</p>
        <Link to="/signup" className='btn btn-default border w-100 bg-light text-decoration-none'>Register</Link>
      </div>
    </div>
  );
}

export default Login;
